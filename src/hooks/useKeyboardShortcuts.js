import { useEffect } from 'react';

export function useKeyboardShortcuts({
  onTogglePalette,
  onToggleTerminal,
  onOpenFile,
  onCloseOverlay
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const modKey = isMac ? e.metaKey : e.ctrlKey;

      // Escape -> close overlays
      if (e.key === 'Escape') {
        if (onCloseOverlay) onCloseOverlay();
        return;
      }

      // Ctrl/Cmd + K -> Command Palette
      if (modKey && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        if (onTogglePalette) onTogglePalette();
        return;
      }

      // Ctrl + ` or Ctrl + \ -> Toggle Terminal
      if (modKey && (e.key === '`' || e.key === '\\')) {
        e.preventDefault();
        if (onToggleTerminal) onToggleTerminal();
        return;
      }

      // Ctrl + 1 -> about.md
      if (modKey && e.key === '1') {
        e.preventDefault();
        if (onOpenFile) onOpenFile('about.md');
        return;
      }

      // Ctrl + 2 -> projects
      if (modKey && e.key === '2') {
        e.preventDefault();
        if (onOpenFile) onOpenFile('projects');
        return;
      }

      // Ctrl + 3 -> skills.json
      if (modKey && e.key === '3') {
        e.preventDefault();
        if (onOpenFile) onOpenFile('skills.json');
        return;
      }

      // Ctrl + 4 -> lab
      if (modKey && e.key === '4') {
        e.preventDefault();
        if (onOpenFile) onOpenFile('neural-playground.tsx');
        return;
      }

      // Ctrl + 5 -> contact.md
      if (modKey && e.key === '5') {
        e.preventDefault();
        if (onOpenFile) onOpenFile('contact.md');
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onTogglePalette, onToggleTerminal, onOpenFile, onCloseOverlay]);
}

