import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  FileText, 
  FileCode, 
  FileJson, 
  Terminal, 
  ExternalLink, 
  Brain, 
  User, 
  Mail, 
  Sparkles,
  ArrowRight,
  Hash
} from 'lucide-react';
import { projectsData } from '../data/projects';
import { profileData } from '../data/profile';

export function CommandPalette({ 
  isOpen, 
  onClose, 
  onOpenFile, 
  onToggleTerminal,
  onToggleLineNumbers 
}) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  const baseCommands = [
    {
      id: 'file-about',
      title: 'about.md',
      category: 'Workspace Files',
      desc: 'Developer introduction, background and bio',
      icon: <FileText size={15} className="text-[#60A5FA]" />,
      action: () => onOpenFile('about.md')
    },
    {
      id: 'file-projects',
      title: 'index.projects',
      category: 'Workspace Files',
      desc: 'Browse all featured technical projects',
      icon: <FileCode size={15} className="text-[#A78BFA]" />,
      action: () => onOpenFile('projects')
    },
    {
      id: 'file-skills',
      title: 'skills.json',
      category: 'Workspace Files',
      desc: 'Inspect technical skills configuration',
      icon: <FileJson size={15} className="text-[#F59E0B]" />,
      action: () => onOpenFile('skills.json')
    },
    {
      id: 'file-lab',
      title: 'neural-playground.tsx',
      category: 'Workspace Files',
      desc: 'Interactive AI & Computer Vision simulation',
      icon: <Brain size={15} className="text-[#3DD68C]" />,
      action: () => onOpenFile('neural-playground.tsx')
    },
    {
      id: 'file-resume',
      title: 'resume.pdf',
      category: 'Workspace Files',
      desc: 'View education, training, and qualifications',
      icon: <FileText size={15} className="text-[#EF4444]" />,
      action: () => onOpenFile('resume.pdf')
    },
    {
      id: 'file-contact',
      title: 'contact.md',
      category: 'Workspace Files',
      desc: 'Contact configuration file and message composer',
      icon: <Mail size={15} className="text-[#60A5FA]" />,
      action: () => onOpenFile('contact.md')
    },
    // Projects
    ...projectsData.map(p => ({
      id: `project-${p.id}`,
      title: `Project: ${p.title}`,
      category: 'Projects',
      desc: `${p.tagline} (${p.techStack.slice(0, 3).join(', ')})`,
      icon: <FileCode size={15} className="text-[#38BDF8]" />,
      action: () => onOpenFile(p.file)
    })),
    // Actions
    {
      id: 'action-terminal',
      title: 'Toggle Terminal',
      category: 'Actions',
      desc: 'Open / close the interactive bash shell',
      icon: <Terminal size={15} className="text-[#3DD68C]" />,
      action: onToggleTerminal
    },
    {
      id: 'action-linenumbers',
      title: 'Toggle Line Numbers',
      category: 'Actions',
      desc: 'Show or hide editor line number gutter',
      icon: <Hash size={15} className="text-[#929D97]" />,
      action: onToggleLineNumbers
    },
    {
      id: 'action-copyemail',
      title: 'Copy Email Address',
      category: 'Actions',
      desc: profileData.contact.email,
      icon: <Mail size={15} className="text-[#3DD68C]" />,
      action: () => {
        navigator.clipboard.writeText(profileData.contact.email);
        alert(`Copied ${profileData.contact.email} to clipboard!`);
      }
    },
    // External
    {
      id: 'ext-github',
      title: 'Open GitHub Profile',
      category: 'External Links',
      desc: 'https://github.com/veer714/',
      icon: <ExternalLink size={15} className="text-[#929D97]" />,
      action: () => window.open(profileData.contact.github, '_blank')
    },
    {
      id: 'ext-linkedin',
      title: 'Open LinkedIn Profile',
      category: 'External Links',
      desc: 'https://www.linkedin.com/in/veer-pratap-raghav',
      icon: <ExternalLink size={15} className="text-[#929D97]" />,
      action: () => window.open(profileData.contact.linkedin, '_blank')
    }
  ];

  const filtered = baseCommands.filter(item => {
    const term = query.toLowerCase();
    return (
      item.title.toLowerCase().includes(term) ||
      item.desc.toLowerCase().includes(term) ||
      item.category.toLowerCase().includes(term)
    );
  });

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        filtered[selectedIndex].action();
        onClose();
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-xs select-none"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-xl bg-[#141918] border border-[#292F2D] rounded-lg shadow-2xl overflow-hidden font-mono flex flex-col max-h-[70vh] animate-in fade-in zoom-in-95 duration-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="h-12 border-b border-[#292F2D] px-3 flex items-center gap-2.5 bg-[#181D1B]">
          <Search size={16} className="text-[#3DD68C] flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a command or file name..."
            className="flex-1 bg-transparent border-none outline-none text-[#E7ECE9] placeholder-[#5E6964] text-xs font-mono"
            spellCheck="false"
          />
          <kbd className="text-[10px] bg-[#0C0F0E] px-1.5 py-0.5 rounded border border-[#292F2D] text-[#5E6964]">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-1.5 space-y-0.5">
          {filtered.length === 0 ? (
            <div className="p-6 text-center text-xs text-[#5E6964]">
              No matching commands or files found for "{query}"
            </div>
          ) : (
            filtered.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    item.action();
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between px-3 py-2 rounded cursor-pointer transition-colors text-xs ${
                    isSelected
                      ? 'bg-[#181D1B] text-[#E7ECE9] border-l-2 border-[#3DD68C]'
                      : 'text-[#929D97] hover:bg-[#181D1B]/50'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="flex-shrink-0">{item.icon}</span>
                    <div className="truncate">
                      <div className="font-medium text-[#E7ECE9] truncate">{item.title}</div>
                      <div className="text-[10px] text-[#5E6964] truncate">{item.desc}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#0C0F0E] border border-[#292F2D] text-[#5E6964]">
                      {item.category}
                    </span>
                    {isSelected && <ArrowRight size={12} className="text-[#3DD68C]" />}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="h-7 border-t border-[#292F2D] bg-[#0C0F0E] px-3 flex items-center justify-between text-[10px] text-[#5E6964]">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>Esc Close</span>
          </div>
          <span>VEER.EXE Quick Command</span>
        </div>
      </div>
    </div>
  );
}

