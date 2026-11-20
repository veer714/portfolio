import React, { useEffect } from 'react';
import { 
  Files, 
  Search, 
  GitBranch, 
  Brain, 
  X,
  HelpCircle,
  Terminal
} from 'lucide-react';
import { FileExplorer } from './FileExplorer';

export function Sidebar({ 
  isOpen, 
  onClose, 
  activeFile, 
  onOpenFile,
  onTogglePalette,
  onToggleTerminal 
}) {
  // Prevent background scrolling when mobile drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="md:hidden fixed inset-0 bg-black/70 z-40 backdrop-blur-xs transition-opacity duration-200"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`fixed md:static inset-y-0 left-0 z-50 flex h-full transition-transform duration-200 ease-in-out md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Left Activity Bar (VS Code style) */}
        <div className="w-12 bg-[#0C0F0E] border-r border-[#292F2D] flex flex-col items-center justify-between py-3 select-none flex-shrink-0 z-20">
          {/* Top Activity Icons */}
          <div className="flex flex-col items-center gap-3.5 w-full">
            {/* Explorer active */}
            <button
              onClick={() => {
                onOpenFile('about.md');
                if (window.innerWidth < 768) onClose();
              }}
              className="w-10 h-10 flex items-center justify-center relative text-[#E7ECE9] hover:text-[#3DD68C] transition-colors"
              title="Explorer (Files)"
            >
              <div className="absolute left-0 top-1.5 bottom-1.5 w-0.5 bg-[#3DD68C] rounded-r" />
              <Files size={18} />
            </button>

            {/* Command search */}
            <button
              onClick={() => {
                onTogglePalette();
                if (window.innerWidth < 768) onClose();
              }}
              className="w-10 h-10 flex items-center justify-center text-[#929D97] hover:text-[#E7ECE9] transition-colors"
              title="Command Palette (Ctrl+K)"
            >
              <Search size={18} />
            </button>

            {/* Neural Lab shortcut */}
            <button
              onClick={() => {
                onOpenFile('neural-playground.tsx');
                if (window.innerWidth < 768) onClose();
              }}
              className="w-10 h-10 flex items-center justify-center text-[#929D97] hover:text-[#3DD68C] transition-colors"
              title="AI & Neural Playground"
            >
              <Brain size={18} />
            </button>

            {/* Git Source Control */}
            <button
              onClick={() => {
                onOpenFile('projects');
                if (window.innerWidth < 768) onClose();
              }}
              className="w-10 h-10 flex items-center justify-center relative text-[#929D97] hover:text-[#E7ECE9] transition-colors"
              title="Projects Repository (Git)"
            >
              <GitBranch size={18} />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#3DD68C]" />
            </button>
          </div>

          {/* Bottom Activity Icons */}
          <div className="flex flex-col items-center gap-3 w-full">
            {/* Terminal launcher */}
            <button
              onClick={() => {
                onToggleTerminal();
                if (window.innerWidth < 768) onClose();
              }}
              className="w-10 h-10 flex items-center justify-center text-[#929D97] hover:text-[#3DD68C] transition-colors"
              title="Toggle Interactive Terminal"
            >
              <Terminal size={17} />
            </button>

            {/* Contact quick button */}
            <button
              onClick={() => {
                onOpenFile('contact.md');
                if (window.innerWidth < 768) onClose();
              }}
              className="w-10 h-10 flex items-center justify-center text-[#929D97] hover:text-[#E7ECE9] transition-colors"
              title="Contact Configuration"
            >
              <HelpCircle size={17} />
            </button>
          </div>
        </div>

        {/* File Explorer Content Pane */}
        <div className="w-[calc(80vw-48px)] max-w-[240px] md:w-60 lg:w-64 h-full relative">
          {/* Mobile close button inside header */}
          <button
            onClick={onClose}
            className="md:hidden absolute top-2 right-2 z-10 p-1.5 text-[#929D97] hover:text-[#E7ECE9] hover:bg-[#181D1B] rounded"
            title="Close navigation"
          >
            <X size={16} />
          </button>

          <FileExplorer 
            activeFile={activeFile} 
            onOpenFile={(file) => {
              onOpenFile(file);
              if (window.innerWidth < 768) {
                onClose();
              }
            }} 
          />
        </div>
      </aside>
    </>
  );
}
