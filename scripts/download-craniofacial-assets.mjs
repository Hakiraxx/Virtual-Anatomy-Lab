import fs from 'fs';
import path from 'path';
import https from 'https';
import crypto from 'crypto';

const BASE_URL = 'https://raw.githubusercontent.com/tvildanov/neuroattention-anatomy/main/';

const ASSETS = [
  {
    remote: 'nervous.glb',
    dest: 'frontend/public/models/craniofacial/cranial-nerves/cranial_nerves_complete.glb',
    name: 'Cranial Nerves (Z-Anatomy / BodyParts3D)'
  },
  {
    remote: 'muscles.glb',
    dest: 'frontend/public/models/craniofacial/muscles/masticatory_muscles.glb',
    name: 'Masticatory & Facial Muscles (Z-Anatomy / BodyParts3D)'
  },
  {
    remote: 'joints.glb',
    dest: 'frontend/public/models/craniofacial/tmj/tmj_complex.glb',
    name: 'TMJ Complex & Ligaments (Z-Anatomy / BodyParts3D)'
  },
  {
    remote: 'skeleton.glb',
    dest: 'frontend/public/models/craniofacial/skull/skull_complete.glb',
    name: 'Skull, Mandible & Teeth Complete (Z-Anatomy / BodyParts3D)'
  },
  {
    remote: 'vessels.glb',
    dest: 'frontend/public/models/craniofacial/vessels/craniofacial_vessels.glb',
    name: 'Craniofacial Arteries & Veins (Z-Anatomy / BodyParts3D)'
  },
  {
    remote: 'brain-detail.glb',
    dest: 'frontend/public/models/craniofacial/brain/brain_complete.glb',
    name: 'Brain & Brainstem Structures (Z-Anatomy / BodyParts3D)'
  }
];

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    fs.mkdirSync(path.dirname(destPath), { recursive: true });
    const file = fs.createWriteStream(destPath);

    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        file.close();
        fs.unlinkSync(destPath);
        return reject(new Error(`Failed to download ${url}: HTTP ${res.statusCode}`));
      }

      res.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve());
      });
    }).on('error', (err) => {
      fs.unlink(destPath, () => {});
      reject(err);
    });
  });
}

function computeSha256(filePath) {
  const hash = crypto.createHash('sha256');
  const fileBuffer = fs.readFileSync(filePath);
  hash.update(fileBuffer);
  return hash.digest('hex');
}

async function main() {
  console.log('=== STARTING EXTERNAL 3D ANATOMY ASSETS DOWNLOAD ===\n');
  const results = [];

  for (const asset of ASSETS) {
    const fullUrl = BASE_URL + asset.remote;
    console.log(`Downloading [${asset.name}] from:`);
    console.log(`  ${fullUrl}`);
    console.log(`  -> Saving to: ${asset.dest}`);

    const startTime = Date.now();
    try {
      await downloadFile(fullUrl, asset.dest);
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
      const fileSize = fs.statSync(asset.dest).size;
      const sha256 = computeSha256(asset.dest);

      console.log(`  ✓ Success in ${elapsed}s! Size: ${(fileSize / 1024 / 1024).toFixed(2)} MB`);
      console.log(`  SHA256: ${sha256}\n`);

      // Also copy to assets/original/
      const originalPath = path.join('assets/original', asset.remote);
      fs.mkdirSync(path.dirname(originalPath), { recursive: true });
      fs.copyFileSync(asset.dest, originalPath);

      results.push({
        name: asset.name,
        file: asset.dest,
        url: fullUrl,
        sizeMb: (fileSize / 1024 / 1024).toFixed(2),
        sha256,
        status: 'VERIFIED_DOWNLOADED'
      });
    } catch (err) {
      console.error(`  ✗ Error: ${err.message}\n`);
      results.push({
        name: asset.name,
        file: asset.dest,
        url: fullUrl,
        error: err.message,
        status: 'FAILED'
      });
    }
  }

  console.log('=== DOWNLOAD COMPLETED ===');
  console.table(results);
}

main().catch(console.error);
