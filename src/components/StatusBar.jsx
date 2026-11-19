import React from 'react';
import { 
  GitBranch, 
  Terminal as TerminalIcon, 
  CheckCircle2, 
  Radio, 
  Cpu, 
  Bell, 
  Code2,
  Sliders
} from 'lucide-react';
import { profileData } from '../data/profile';

export function StatusBar({ activeTab, onToggleTerminal, isTerminalOpen }) {
  const getLanguageMode = (tab) => {
    if (tab.endsWith('.md')) return 'Markdown';
    if (tab.endsWith('.tsx') || tab.endsWith('.jsx')) return 'TypeScript React';
    if (tab.endsWith('.py')) return 'Python 3.12';
    if (tab.endsWith('.ts')) return 'TypeScript';
    if (tab.endsWith('.json')) return 'JSON';
    if (tab.endsWith('.pdf')) return 'PDF Document';
    if (tab === 'projects') return 'Project Explorer';
    if (tab.includes('neural')) return 'Neural Model Sim';
    return 'Text';
  };

  return (
    <footer className="h-6 bg-[#0C0F0E] border-t border-[#292F2D] flex items-center justify-between px-3 text-[11px] font-mono text-[#929D97] select-none flex-shrink-0 z-30">
      {/* Left items: Git Branch, Diagnostics, Live state */}
      <div className="flex items-center gap-3">
        {/* Git Branch */}
        <div className="flex items-center gap-1 text-[#3DD68C] hover:text-[#4ADE80] cursor-pointer">
          <GitBranch size={12} />
          <span>main*</span>
        </div>

        {/* Diagnostics: 0 errors, 0 warnings */}
        <div className="hidden sm:flex items-center gap-1 text-[#5E6964]">
          <span className="text-[#3DD68C]">0⊗</span>
          <span>0⚠</span>
        </div>

        {/* System telemetry */}
        <div className="hidden md:flex items-center gap-1.5 text-[#5E6964] border-l border-[#292F2D] pl-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#3DD68C]" />
          <span>RAM: {profileData.systemStatus.memory}</span>
        </div>
      </div>

      {/* Right items: Editor formatting, Language, Terminal toggle */}
      <div className="flex items-center gap-3">
        {/* Shortcut hints */}
        <div className="hidden lg:flex items-center gap-2 text-[10px] text-[#5E6964]">
          <span>Ctrl+K: Palette</span>
          <span>•</span>
          <span>Ctrl+\: Terminal</span>
        </div>

        {/* Line & column simulation */}
        <div className="hidden sm:block text-[#5E6964]">
          <span>Ln 1, Col 1</span>
        </div>

        <div className="hidden sm:block text-[#5E6964]">
          <span>Spaces: 2</span>
        </div>

        <div className="hidden sm:block text-[#5E6964]">
          <span>UTF-8</span>
        </div>

        {/* Active Language Mode */}
        <div className="flex items-center gap-1 text-[#E7ECE9] px-1.5 py-0.5 rounded bg-[#181D1B] border border-[#292F2D]">
          <Code2 size={11} className="text-[#3DD68C]" />
          <span className="text-[10px]">{getLanguageMode(activeTab)}</span>
        </div>

        {/* Terminal Toggle Button in status bar */}
        <button
          onClick={onToggleTerminal}
          className={`flex items-center gap-1 px-1.5 py-0.5 rounded transition-colors ${
            isTerminalOpen 
              ? 'text-[#3DD68C] bg-[#181D1B]' 
              : 'text-[#929D97] hover:text-[#E7ECE9]'
          }`}
          title="Toggle Terminal"
        >
          <TerminalIcon size={11} />
          <span className="text-[10px]">Terminal</span>
        </button>
      </div>
    </footer>
  );
}

