import React from 'react';
import { 
  Files, 
  Search, 
  GitBranch, 
  Brain, 
  Settings, 
  X,
  ExternalLink,
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
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="md:hidden fixed inset-0 bg-black/60 z-40 backdrop-blur-xs"
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
          <div className="flex flex-col items-center gap-4 w-full">
            {/* Explorer active */}
            <button
              onClick={() => onOpenFile('about.md')}
              className="w-10 h-10 flex items-center justify-center relative text-[#E7ECE9] hover:text-[#3DD68C] transition-colors"
              title="Explorer (Files)"
            >
              <div className="absolute left-0 top-1.5 bottom-1.5 w-0.5 bg-[#3DD68C] rounded-r" />
              <Files size={18} />
            </button>

            {/* Command search */}
            <button
              onClick={onTogglePalette}
              className="w-10 h-10 flex items-center justify-center text-[#929D97] hover:text-[#E7ECE9] transition-colors"
              title="Command Palette (Ctrl+K)"
            >
              <Search size={18} />
            </button>

            {/* Neural Lab shortcut */}
            <button
              onClick={() => onOpenFile('neural-playground.tsx')}
              className="w-10 h-10 flex items-center justify-center text-[#929D97] hover:text-[#3DD68C] transition-colors"
              title="AI & Neural Playground"
            >
              <Brain size={18} />
            </button>

            {/* Git Source Control */}
            <button
              onClick={() => onOpenFile('projects')}
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
              onClick={onToggleTerminal}
              className="w-10 h-10 flex items-center justify-center text-[#929D97] hover:text-[#3DD68C] transition-colors"
              title="Toggle Interactive Terminal"
            >
              <Terminal size={17} />
            </button>

            {/* Contact quick button */}
            <button
              onClick={() => onOpenFile('contact.md')}
              className="w-10 h-10 flex items-center justify-center text-[#929D97] hover:text-[#E7ECE9] transition-colors"
              title="Contact Configuration"
            >
              <HelpCircle size={17} />
            </button>
          </div>
        </div>

        {/* File Explorer Content Pane */}
        <div className="w-64 md:w-60 lg:w-64 h-full relative">
          {/* Mobile close button inside header */}
          <button
            onClick={onClose}
            className="md:hidden absolute top-2 right-2 z-10 p-1 text-[#929D97] hover:text-[#E7ECE9]"
          >
            <X size={16} />
          </button>

          <FileExplorer 
            activeFile={activeFile} 
            onOpenFile={(file) => {
              onOpenFile(file);
              // On mobile, close sidebar on selection
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

