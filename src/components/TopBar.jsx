import React from 'react';
import {
  Terminal as TerminalIcon,
  Search,
  Github,
  Linkedin,
  Instagram,
  Menu,
  Hash
} from 'lucide-react';
import { profileData } from '../data/profile';

export function TopBar({
  onToggleSidebar,
  onTogglePalette,
  onToggleTerminal,
  isTerminalOpen,
  showLineNumbers,
  onToggleLineNumbers,
  activeTab
}) {
  return (
    <header className="h-10 bg-[#141918] border-b border-[#292F2D] flex items-center justify-between px-2.5 sm:px-3 text-xs select-none z-30 flex-shrink-0">
      {/* Left: Window controls & Logo & Workspace Path */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Mobile menu toggle */}
        <button
          onClick={onToggleSidebar}
          className="md:hidden p-1.5 rounded hover:bg-[#181D1B] text-[#929D97] hover:text-[#E7ECE9] transition-colors flex items-center justify-center min-w-[32px] min-h-[32px]"
          title="Toggle Explorer"
          aria-label="Toggle Navigation Drawer"
        >
          <Menu size={17} />
        </button>

        {/* Traffic lights / OS buttons simulation (Desktop) */}
        <div className="hidden sm:flex items-center gap-1.5 mr-1">
          <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444]/70 border border-[#EF4444]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]/70 border border-[#F59E0B]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#3DD68C]/70 border border-[#3DD68C]" />
        </div>

        {/* System Identifier */}
        <div className="flex items-center gap-2 pl-1 sm:border-l sm:border-[#292F2D]">
          <div className="flex items-center gap-1.5 font-mono font-semibold tracking-wide text-[#E7ECE9]">
            <span className="text-[#3DD68C]">{profileData.systemName}</span>
            <span className="text-[10px] text-[#929D97] hidden lg:inline font-normal">{profileData.version}</span>
          </div>

          {/* System status pill (Desktop / Tablet) */}
          <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#0C0F0E] border border-[#292F2D] text-[10px] font-mono text-[#929D97]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3DD68C] animate-pulse" />
            <span className="text-[#3DD68C]">LIVE</span>
            <span className="text-[#5E6964]">|</span>
            <span className="hidden md:inline">AI_SYS_READY</span>
          </div>
        </div>

        {/* Workspace directory (Large Desktop) */}
        <div className="hidden xl:flex items-center gap-1 text-[#929D97] font-mono text-[11px] pl-2 border-l border-[#292F2D]">
          <span className="text-[#5E6964]">dir:</span>
          <span className="text-[#E7ECE9]">~/veer-pratap/portfolio</span>
        </div>
      </div>

      {/* Center: Command Palette Trigger */}
      <div className="flex-1 max-w-md mx-2 sm:mx-6 min-w-0">
        <button
          onClick={onTogglePalette}
          className="w-full flex items-center justify-between px-2.5 sm:px-3 py-1 bg-[#0C0F0E] hover:bg-[#181D1B] border border-[#292F2D] hover:border-[#38423F] rounded text-[#929D97] hover:text-[#E7ECE9] transition-all text-[11px] font-mono"
        >
          <div className="flex items-center gap-2 truncate">
            <Search size={13} className="text-[#3DD68C] flex-shrink-0" />
            <span className="truncate hidden sm:inline">Search commands, files, projects...</span>
            <span className="truncate sm:hidden">Search...</span>
          </div>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded bg-[#181D1B] border border-[#292F2D] text-[10px] text-[#5E6964]">
            Ctrl K
          </kbd>
        </button>
      </div>

      {/* Right: Quick actions & external links */}
      <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
        {/* Toggle Line numbers (Desktop/Tablet) */}
        <button
          onClick={onToggleLineNumbers}
          className={`hidden sm:flex items-center gap-1 px-2 py-1 rounded text-[11px] font-mono border transition-colors ${
            showLineNumbers
              ? 'bg-[#181D1B] border-[#3DD68C]/50 text-[#3DD68C]'
              : 'border-[#292F2D] text-[#929D97] hover:text-[#E7ECE9]'
          }`}
          title="Toggle Editor Line Numbers"
        >
          <Hash size={13} />
          <span className="hidden lg:inline text-[10px]">Lines</span>
        </button>

        {/* Toggle Terminal */}
        <button
          onClick={onToggleTerminal}
          className={`flex items-center gap-1.5 px-2 py-1 rounded text-[11px] font-mono border transition-all ${
            isTerminalOpen
              ? 'bg-[#3DD68C]/10 border-[#3DD68C] text-[#3DD68C]'
              : 'border-[#292F2D] bg-[#0C0F0E] text-[#929D97] hover:text-[#E7ECE9] hover:border-[#38423F]'
          }`}
          title="Toggle Terminal (Ctrl+`)"
        >
          <TerminalIcon size={13} className={isTerminalOpen ? 'text-[#3DD68C]' : ''} />
          <span className="hidden md:inline text-[10px]">Terminal</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#3DD68C]" />
        </button>

        <div className="h-4 w-px bg-[#292F2D] mx-1 hidden sm:block" />

        {/* Social Links */}
        <a
          href={profileData.contact.github}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:flex p-1.5 text-[#929D97] hover:text-[#E7ECE9] hover:bg-[#181D1B] rounded border border-transparent hover:border-[#292F2D] transition-colors"
          title="GitHub profile (veer714)"
        >
          <Github size={14} />
        </a>

        <a
          href={profileData.contact.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:flex p-1.5 text-[#929D97] hover:text-[#E7ECE9] hover:bg-[#181D1B] rounded border border-transparent hover:border-[#292F2D] transition-colors"
          title="LinkedIn profile"
        >
          <Linkedin size={14} />
        </a>

        <a
          href={profileData.contact.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:flex p-1.5 text-[#929D97] hover:text-[#E7ECE9] hover:bg-[#181D1B] rounded border border-transparent hover:border-[#292F2D] transition-colors"
          title="Instagram profile (@veer.pratap.raghav)"
        >
          <Instagram size={14} />
        </a>
      </div>
    </header>
  );
}
