// ============================================================================
// MEDANATOMY 3D — ANATOMICAL PRONUNCIATION AUDIO CONTROLLER
// High-fidelity English pronunciation using Web Speech API (en-US) & Audio Cache
// ============================================================================

class PronunciationPlayer {
  private activeUtterance: SpeechSynthesisUtterance | null = null;
  private activeAudio: HTMLAudioElement | null = null;
  private isCurrentlyPlaying: boolean = false;
  private audioCache: Map<string, HTMLAudioElement> = new Map();
  private subscribers: Set<(playing: boolean) => void> = new Set();

  /**
   * Subscribe to global playback status changes
   */
  public subscribe(callback: (playing: boolean) => void): () => void {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  private setPlaying(playing: boolean) {
    this.isCurrentlyPlaying = playing;
    this.subscribers.forEach((cb) => cb(playing));
  }

  public isPlaying(): boolean {
    return this.isCurrentlyPlaying;
  }

  /**
   * Stops any ongoing speech synthesis or audio playback
   */
  public stop() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {
        // silent ignore
      }
    }
    if (this.activeAudio) {
      this.activeAudio.pause();
      this.activeAudio.currentTime = 0;
      this.activeAudio = null;
    }
    this.activeUtterance = null;
    this.setPlaying(false);
  }

  /**
   * Plays English pronunciation for an anatomical term
   * @param text The English anatomical name to pronounce
   * @param audioUrl Optional URL to pre-recorded authentic MP3/WAV file
   */
  public play(text: string, audioUrl?: string): Promise<void> {
    this.stop();

    return new Promise((resolve) => {
      // 1. If explicit pre-recorded audio URL exists, play it
      if (audioUrl) {
        let audio = this.audioCache.get(audioUrl);
        if (!audio) {
          audio = new Audio(audioUrl);
          this.audioCache.set(audioUrl, audio);
        }

        this.activeAudio = audio;
        this.setPlaying(true);

        audio.onended = () => {
          this.activeAudio = null;
          this.setPlaying(false);
          resolve();
        };

        audio.onerror = () => {
          this.activeAudio = null;
          this.setPlaying(false);
          // Fallback to Web Speech API if audio URL fails
          this.speakText(text, resolve);
        };

        audio.play().catch(() => {
          this.activeAudio = null;
          this.setPlaying(false);
          this.speakText(text, resolve);
        });

        return;
      }

      // 2. Primary Web Speech API synthesis
      this.speakText(text, resolve);
    });
  }

  private speakText(text: string, onDone: () => void) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      this.setPlaying(false);
      onDone();
      return;
    }

    try {
      const cleanText = text
        .replace(/\(V[1-3]\)/gi, '')
        .replace(/\(CN\s*[I|V|X]+\)/gi, '')
        .replace(/\(TMJ\)/gi, '')
        .replace(/\(PDL\)/gi, '')
        .replace(/FDI\s*#?\d+/gi, '')
        .trim();

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'en-US';
      utterance.rate = 0.88; // Academic deliberate cadence for clear medical articulation
      utterance.pitch = 1.0;

      // Select natural English voice if available
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(
        (v) =>
          v.lang.startsWith('en') &&
          (v.name.includes('Google') ||
            v.name.includes('Natural') ||
            v.name.includes('Samantha') ||
            v.name.includes('Karen') ||
            v.name.includes('Daniel'))
      ) || voices.find((v) => v.lang.startsWith('en-US')) || voices.find((v) => v.lang.startsWith('en'));

      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      utterance.onstart = () => {
        this.setPlaying(true);
      };

      utterance.onend = () => {
        this.activeUtterance = null;
        this.setPlaying(false);
        onDone();
      };

      utterance.onerror = () => {
        this.activeUtterance = null;
        this.setPlaying(false);
        onDone();
      };

      this.activeUtterance = utterance;
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      this.setPlaying(false);
      onDone();
    }
  }
}

export const pronunciationPlayer = new PronunciationPlayer();
