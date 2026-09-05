import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const browserExe = fs.existsSync(chromePath) ? chromePath : edgePath;

const goldenTeeth = [11, 21, 16, 26, 36, 41, 46, 48];
const outputDir = path.join(rootDir, 'tests/screenshots');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function main() {
  console.log(`Starting headless Chrome via CDP: ${browserExe}`);
  const port = 9333;
  const chromeProc = spawn(browserExe, [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    '--disable-gpu',
    '--disable-extensions',
    '--window-size=1600,1000',
    '--no-first-run',
    '--no-default-browser-check',
    'about:blank'
  ]);

  chromeProc.on('error', err => {
    console.error('Failed to start browser:', err);
  });

  // Wait for debug port to become ready
  let versionData = null;
  for (let i = 0; i < 30; i++) {
    await sleep(300);
    try {
      const res = await fetch(`http://127.0.0.1:${port}/json/version`);
      if (res.ok) {
        versionData = await res.json();
        break;
      }
    } catch (e) {
      // retry
    }
  }

  if (!versionData) {
    console.error('Could not connect to Chrome debug endpoint.');
    chromeProc.kill();
    process.exit(1);
  }

  console.log('Connected to Chrome DevTools endpoint:', versionData.webSocketDebuggerUrl);

  // Get pages list
  const listRes = await fetch(`http://127.0.0.1:${port}/json/list`);
  const pages = await listRes.json();
  const pageTarget = pages.find(p => !p.url.startsWith('chrome-extension://')) || pages[0];

  let wsUrl = pageTarget.webSocketDebuggerUrl;
  console.log('Using target page WebSocket:', wsUrl);

  const ws = new WebSocket(wsUrl);

  let msgId = 1;
  const pendingCalls = new Map();

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.id && pendingCalls.has(data.id)) {
      const { resolve, reject } = pendingCalls.get(data.id);
      pendingCalls.delete(data.id);
      if (data.error) reject(new Error(data.error.message));
      else resolve(data.result);
    }
  };

  await new Promise((resolve, reject) => {
    ws.onopen = resolve;
    ws.onerror = reject;
  });

  function sendCommand(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = msgId++;
      pendingCalls.set(id, { resolve, reject });
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  await sendCommand('Page.enable');
  await sendCommand('DOM.enable');

  for (const fdi of goldenTeeth) {
    const url = `http://localhost:3000/lab/dental-neuroanatomy?specimen=tooth_specimen&structure=tooth.${fdi}`;
    const outPath = path.join(outputDir, `tooth_${fdi}_golden.png`);
    console.log(`Navigating to FDI ${fdi}: ${url}`);

    await sendCommand('Page.navigate', { url });

    // Wait 3.5 seconds for React & 3D WebGL assets to load and render
    await sleep(3500);

    console.log(`Capturing screenshot for FDI ${fdi}...`);
    const screenshotResult = await sendCommand('Page.captureScreenshot', {
      format: 'png',
      quality: 100
    });

    if (screenshotResult && screenshotResult.data) {
      const buffer = Buffer.from(screenshotResult.data, 'base64');
      fs.writeFileSync(outPath, buffer);
      console.log(`  ✅ FDI ${fdi} golden screenshot captured (${(buffer.length / 1024).toFixed(1)} KB)`);
    } else {
      console.warn(`  ⚠️ Failed to capture screenshot data for FDI ${fdi}`);
    }
  }

  ws.close();
  chromeProc.kill();
  console.log('All golden screenshots captured successfully via CDP.');
}

main().catch(err => {
  console.error('Error during CDP capture:', err);
  process.exit(1);
});
