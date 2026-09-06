// ============================================================================
// MEDANATOMY 3D — REUSABLE ANATOMICAL TERM PRONUNCIATION COMPONENT
// Standardized academic English pronunciation with IPA & Web Speech API integration
// Wraps pronunciationPlayer & anatomyPronunciationData with zero engine duplication
// ============================================================================

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Volume2 } from 'lucide-react';
import {
  getAnatomicalPronunciation,
  PronunciationRecord
} from '../../data/anatomyPronunciationData';
import { pronunciationPlayer } from '../../utils/pronunciationPlayer';

export interface AnatomicalPronunciationProps {
  /** Stable term ID or structure ID (e.g. 'spleen.hilum', 'splenic_artery', 'tooth.46', 'cn_5') */
  termId?: string | null;
  /** Explicit English anatomical name (e.g. 'Splenic Artery') */
  englishName?: string | null;
  /** Optional Latin or Terminologia Anatomica name for reverse phonetic resolution */
  latinName?: string | null;
  /** Explicit override IPA if available */
  ipa?: string;
  /** Optional custom audio URL */
  audioUrl?: string;
  /** Display mode */
  mode?: 'badge' | 'button-only' | 'inline' | 'compact';
  /** Whether to render IPA text alongside the speaker */
  showIpa?: boolean;
  /** Component size variant */
  size?: 'xs' | 'sm' | 'md';
  /** Custom CSS classes */
  className?: string;
  /** Stop click event propagation to parent elements (default: true) */
  stopEventPropagation?: boolean;
}

export const AnatomicalPronunciation: React.FC<AnatomicalPronunciationProps> = ({
  termId,
  englishName,
  latinName,
  ipa: explicitIpa,
  audioUrl: explicitAudioUrl,
  mode = 'badge',
  showIpa = true,
  size = 'sm',
  className = '',
  stopEventPropagation = true
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Resolve pronunciation record from central registry
  const record: PronunciationRecord | null = useMemo(() => {
    return getAnatomicalPronunciation(termId, englishName, latinName);
  }, [termId, englishName, latinName]);

  const resolvedEnglish = englishName || record?.englishName || '';
  const resolvedIpa = explicitIpa || record?.ipa;
  const resolvedAudioUrl = explicitAudioUrl || record?.audioUrl;

  // Subscribe to global pronunciation player state
  useEffect(() => {
    const unsubscribe = pronunciationPlayer.subscribe((playing) => {
      // If player stopped, clear our local active indicator
      if (!playing) {
        setIsPlaying(false);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const handlePlay = useCallback(
    (e: React.MouseEvent | React.KeyboardEvent) => {
      if (stopEventPropagation) {
        e.stopPropagation();
      }
      if (!resolvedEnglish) return;

      setIsPlaying(true);
      pronunciationPlayer
        .play(resolvedEnglish, resolvedAudioUrl)
        .catch(() => {
          setIsPlaying(false);
        })
        .finally(() => {
          setIsPlaying(false);
        });
    },
    [resolvedEnglish, resolvedAudioUrl, stopEventPropagation]
  );

  // If no pronounceable English term is available, return null
  if (!resolvedEnglish && !resolvedIpa) {
    return null;
  }

  // Sizing definitions
  const iconSizeClass =
    size === 'xs' ? 'w-3 h-3' : size === 'md' ? 'w-4 h-4' : 'w-3.5 h-3.5';
  const textSizeClass =
    size === 'xs' ? 'text-[10px]' : size === 'md' ? 'text-xs' : 'text-[11px]';
  const buttonHitClass =
    size === 'xs'
      ? 'min-w-[32px] min-h-[32px] p-1'
      : 'min-w-[36px] min-h-[36px] sm:min-w-[28px] sm:min-h-[28px] p-1.5 sm:p-1';

  // --------------------------------------------------------------------------
  // MODE: BUTTON ONLY (Subtle touch-friendly speaker icon)
  // --------------------------------------------------------------------------
  if (mode === 'button-only') {
    return (
      <button
        type="button"
        onClick={handlePlay}
        className={`inline-flex items-center justify-center rounded-lg text-slate-400 hover:text-amber-500 hover:bg-amber-500/15 focus:outline-none focus:ring-1 focus:ring-amber-500/50 transition-all cursor-pointer ${buttonHitClass} ${
          isPlaying ? 'text-amber-500 animate-pulse scale-110' : ''
        } ${className}`}
        title={`Nghe phát âm tiếng Anh: ${resolvedEnglish}`}
        aria-label={`Nghe phát âm tiếng Anh chuẩn: ${resolvedEnglish}`}
      >
        <Volume2 className={iconSizeClass} />
      </button>
    );
  }

  // --------------------------------------------------------------------------
  // MODE: COMPACT (Smallest footprint: optional IPA + speaker)
  // --------------------------------------------------------------------------
  if (mode === 'compact') {
    return (
      <div
        className={`inline-flex items-center gap-1 text-slate-500 dark:text-slate-400 ${textSizeClass} ${className}`}
      >
        {showIpa && resolvedIpa && (
          <span className="font-mono text-amber-700 dark:text-amber-400 select-all">
            {resolvedIpa}
          </span>
        )}
        <button
          type="button"
          onClick={handlePlay}
          className={`inline-flex items-center justify-center rounded-md hover:text-amber-500 hover:bg-amber-500/10 focus:outline-none transition cursor-pointer ${buttonHitClass} ${
            isPlaying ? 'text-amber-500 animate-pulse scale-110' : 'text-slate-400'
          }`}
          title={`Nghe phát âm: ${resolvedEnglish}`}
          aria-label={`Nghe phát âm tiếng Anh: ${resolvedEnglish}`}
        >
          <Volume2 className={iconSizeClass} />
        </button>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // MODE: INLINE (English Name + IPA badge + Speaker button)
  // --------------------------------------------------------------------------
  if (mode === 'inline') {
    return (
      <div
        className={`inline-flex items-center gap-2 flex-wrap text-slate-700 dark:text-slate-300 ${textSizeClass} ${className}`}
      >
        <span className="font-medium text-current">{resolvedEnglish}</span>
        {resolvedIpa && (
          <span className="font-mono text-[10px] sm:text-[11px] text-amber-700 dark:text-amber-400 bg-black/5 dark:bg-white/5 px-1.5 py-0.5 rounded border border-black/5 dark:border-white/10">
            {resolvedIpa}
          </span>
        )}
        <button
          type="button"
          onClick={handlePlay}
          className={`inline-flex items-center justify-center rounded-lg hover:text-amber-500 hover:bg-amber-500/15 focus:outline-none transition cursor-pointer ${buttonHitClass} ${
            isPlaying ? 'text-amber-500 animate-pulse scale-110' : 'text-slate-400'
          }`}
          title={`Nghe phát âm: ${resolvedEnglish}`}
          aria-label={`Nghe phát âm: ${resolvedEnglish}`}
        >
          <Volume2 className={iconSizeClass} />
        </button>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // DEFAULT MODE: BADGE (Academic pill with IPA + Speaker button)
  // --------------------------------------------------------------------------
  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 font-mono ${textSizeClass} text-amber-700 dark:text-amber-400 select-none ${className}`}
    >
      {showIpa && resolvedIpa && (
        <span className="tracking-tight select-all">{resolvedIpa}</span>
      )}
      <button
        type="button"
        onClick={handlePlay}
        className={`inline-flex items-center justify-center rounded p-0.5 hover:bg-amber-500/20 transition cursor-pointer focus:outline-none focus:ring-1 focus:ring-amber-500/50 ${
          isPlaying ? 'text-amber-500 animate-pulse scale-110' : 'text-slate-400 hover:text-amber-600'
        }`}
        title={`Nghe phát âm tiếng Anh chuẩn học thuật: ${resolvedEnglish}`}
        aria-label={`Nghe phát âm tiếng Anh: ${resolvedEnglish}`}
      >
        <Volume2 className={iconSizeClass} />
      </button>
    </div>
  );
};
