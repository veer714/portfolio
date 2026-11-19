import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, Trash2, CornerDownLeft } from 'lucide-react';
import { profileData } from '../data/profile';
import { projectsData } from '../data/projects';
import { skillsData } from '../data/skills';

export function Terminal({ isOpen, onClose, onOpenFile }) {
  const [history, setHistory] = useState([
    {
      type: 'system',
      text: `VEER.EXE OS [Version 2.4.0-neural]\n(c) 2026 Veer Pratap. All rights reserved.\nType 'help' to inspect available workspace commands.\n`
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isMaximized, setIsMaximized] = useState(false);

  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIdx = historyIndex + 1;
        if (nextIdx < commandHistory.length) {
          setHistoryIndex(nextIdx);
          setInputVal(commandHistory[commandHistory.length - 1 - nextIdx]);
        }
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInputVal(commandHistory[commandHistory.length - 1 - nextIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal('');
      }
      return;
    }

    if (e.key !== 'Enter') return;

    const rawInput = inputVal.trim();
    if (!rawInput) {
      setHistory((prev) => [...prev, { type: 'input', text: '' }]);
      return;
    }

    // Save to command history
    setCommandHistory((prev) => [...prev, rawInput]);
    setHistoryIndex(-1);
    setInputVal('');

    const tokens = rawInput.split(' ');
    const cmd = tokens[0].toLowerCase();
    const arg = tokens.slice(1).join(' ').trim();

    const newEntries = [{ type: 'input', text: rawInput }];

    switch (cmd) {
      case 'help':
        newEntries.push({
          type: 'output',
          text: `Available commands:
  about           - View developer background & summary
  projects        - List projects and case studies
  skills          - Display categorized technical skill stack
  lab             - Launch the interactive Neural Network playground
  contact         - Show contact endpoints & social profiles
  github          - Open GitHub profile (${profileData.contact.github})
  linkedin        - Open LinkedIn profile
  open <file>     - Open a workspace file in the editor (e.g. open api-sentinel.tsx)
  cat <file>      - Print raw file contents to terminal
  whoami          - Print authenticated user credentials
  neofetch        - Output system hardware & software specs
  date            - Show current system time
  clear           - Clear the terminal screen`
        });
        break;

      case 'about':
        newEntries.push({
          type: 'output',
          text: `Name: ${profileData.name}
Role: ${profileData.role}
Degree: ${profileData.education.degree} (${profileData.education.institution})
Bio: ${profileData.bio}
Interests: ${profileData.interests.join(', ')}`
        });
        if (onOpenFile) onOpenFile('about.md');
        break;

      case 'projects':
        newEntries.push({
          type: 'output',
          text: `FEATURED PROJECTS:
  1. API Sentinel [api-sentinel.tsx] - API monitoring & security observability system
     Repo: https://github.com/MindOverFloww/Sentinel-API
     Live: https://apisentinel-azure.vercel.app/

  2. CIFAR-10 Recognition [image-recognition.py] - CNN Computer Vision architecture
     Repo: https://github.com/veer714/CIFAR_10

  3. Heart Disease ML [heart-disease-ml.py] - Predictive clinical classification
     Repo: https://github.com/veer714/

  4. BladeX Engine [bladex-engine.ts] - Developer script execution workspace
     Repo: https://github.com/veer714/bladex

Tip: Use 'open <filename>' to load any project case study into the editor.`
        });
        if (onOpenFile) onOpenFile('projects');
        break;

      case 'skills':
        const summary = skillsData.categories.map(c => 
          `  [${c.title}]:\n    ${c.skills.map(s => s.name).join(', ')}`
        ).join('\n\n');
        newEntries.push({
          type: 'output',
          text: `TECHNICAL SKILLS INVENTORY:\n${summary}`
        });
        if (onOpenFile) onOpenFile('skills.json');
        break;

      case 'lab':
        newEntries.push({
          type: 'output',
          text: `Opening Neural Network & Computer Vision Sandbox [neural-playground.tsx]...`
        });
        if (onOpenFile) onOpenFile('neural-playground.tsx');
        break;

      case 'contact':
        newEntries.push({
          type: 'output',
          text: `CONTACT ENDPOINTS:
  Email:     ${profileData.contact.email}
  GitHub:    ${profileData.contact.github}
  LinkedIn:  ${profileData.contact.linkedin}
  Instagram: ${profileData.contact.instagram}
  Location:  ${profileData.contact.location} (${profileData.contact.timezone})
  Status:    ${profileData.contact.availability}`
        });
        if (onOpenFile) onOpenFile('contact.md');
        break;

      case 'github':
        newEntries.push({
          type: 'output',
          text: `Redirecting to GitHub: ${profileData.contact.github}`
        });
        window.open(profileData.contact.github, '_blank');
        break;

      case 'linkedin':
        newEntries.push({
          type: 'output',
          text: `Redirecting to LinkedIn: ${profileData.contact.linkedin}`
        });
        window.open(profileData.contact.linkedin, '_blank');
        break;

      case 'clear':
        setHistory([]);
        return;

      case 'whoami':
        newEntries.push({
          type: 'output',
          text: `veer@workstation: uid=1000(veer) gid=1000(developers) groups=1000(developers),4(adm),27(sudo),42(ai-engineers)`
        });
        break;

      case 'date':
        newEntries.push({
          type: 'output',
          text: new Date().toString()
        });
        break;

      case 'neofetch':
      case 'sysinfo':
        newEntries.push({
          type: 'output',
          text: `
     .---.          veer@VEER-WORKSPACE
    /     \\         -------------------
   | () () |        OS: VEER.EXE v2.4.0 (x86_64)
    \\  -  /         Kernel: 6.8.0-neural-ai
     '---'          Host: Veer Pratap Portfolio Engine
                    Uptime: Nominal (Always Online)
                    Packages: React, Tailwind, Framer-Motion, Vite
                    Shell: neural-sh v1.4
                    Terminal: VEER-TERM (PTY #1)
                    CPU: Neural Tensor Processor @ 3.80GHz
                    GPU: WebGL Accelerated Shader Pipeline
                    Memory: 64MB / Workspace Shared
`
        });
        break;

      case 'open':
        if (!arg) {
          newEntries.push({
            type: 'error',
            text: `Usage: open <filename>\nExample: open api-sentinel.tsx or open skills.json`
          });
        } else {
          newEntries.push({
            type: 'output',
            text: `Loading '${arg}' into editor buffer...`
          });
          if (onOpenFile) onOpenFile(arg);
        }
        break;

      case 'cat':
        if (!arg) {
          newEntries.push({
            type: 'error',
            text: `Usage: cat <filename>\nExample: cat about.md`
          });
        } else if (arg.includes('about')) {
          newEntries.push({
            type: 'output',
            text: `# Veer Pratap\n${profileData.role}\n\n${profileData.bio}\n\nEducation: ${profileData.education.degree} at ${profileData.education.institution}`
          });
        } else if (arg.includes('skills')) {
          newEntries.push({
            type: 'output',
            text: JSON.stringify(skillsData, null, 2)
          });
        } else if (arg.includes('contact')) {
          newEntries.push({
            type: 'output',
            text: JSON.stringify(profileData.contact, null, 2)
          });
        } else {
          newEntries.push({
            type: 'output',
            text: `Displaying contents of ${arg}... (open file in editor to view complete syntax-highlighted source)`
          });
          if (onOpenFile) onOpenFile(arg);
        }
        break;

      default:
        newEntries.push({
          type: 'error',
          text: `Command not recognized: '${cmd}'. Type 'help' to view valid commands.`
        });
        break;
    }

    setHistory((prev) => [...prev, ...newEntries]);
  };

  if (!isOpen) return null;

  return (
    <div 
      className={`border-t border-[#292F2D] bg-[#0C0F0E] flex flex-col font-mono text-[12px] z-40 transition-all duration-150 ${
        isMaximized ? 'fixed inset-x-0 bottom-6 top-10' : 'h-64'
      }`}
    >
      {/* Terminal Titlebar */}
      <div className="h-8 bg-[#141918] border-b border-[#292F2D] flex items-center justify-between px-3 text-[#929D97] select-none flex-shrink-0">
        <div className="flex items-center gap-2">
          <TerminalIcon size={13} className="text-[#3DD68C]" />
          <span className="text-[11px] font-semibold text-[#E7ECE9]">TERMINAL</span>
          <span className="text-[10px] text-[#5E6964]">bash // veer@workstation</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Clear button */}
          <button
            onClick={() => setHistory([])}
            className="p-1 hover:text-[#E7ECE9] hover:bg-[#181D1B] rounded text-[#929D97]"
            title="Clear output"
          >
            <Trash2 size={13} />
          </button>

          {/* Maximize / Restore */}
          <button
            onClick={() => setIsMaximized(!isMaximized)}
            className="p-1 hover:text-[#E7ECE9] hover:bg-[#181D1B] rounded text-[#929D97]"
            title={isMaximized ? "Restore" : "Maximize"}
          >
            {isMaximized ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
          </button>

          {/* Close */}
          <button
            onClick={onClose}
            className="p-1 hover:text-[#EF4444] hover:bg-[#181D1B] rounded text-[#929D97]"
            title="Close terminal"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Terminal Console Output */}
      <div 
        onClick={() => inputRef.current?.focus()}
        className="flex-1 p-3 overflow-y-auto space-y-1.5 cursor-text bg-[#0C0F0E]"
      >
        {history.map((item, index) => {
          if (item.type === 'system') {
            return (
              <div key={index} className="text-[#5E6964] whitespace-pre-wrap leading-relaxed">
                {item.text}
              </div>
            );
          }
          if (item.type === 'input') {
            return (
              <div key={index} className="flex items-center gap-2 text-[#E7ECE9]">
                <span className="text-[#3DD68C]">veer@workstation:~$</span>
                <span className="text-[#E7ECE9]">{item.text}</span>
              </div>
            );
          }
          if (item.type === 'error') {
            return (
              <div key={index} className="text-[#EF4444] whitespace-pre-wrap pl-4 border-l border-[#EF4444]/40">
                {item.text}
              </div>
            );
          }
          return (
            <div key={index} className="text-[#929D97] whitespace-pre-wrap pl-4 border-l border-[#292F2D] leading-relaxed">
              {item.text}
            </div>
          );
        })}

        {/* Active Input Line */}
        <div className="flex items-center gap-2 pt-1 text-[#E7ECE9]">
          <span className="text-[#3DD68C] flex-shrink-0">veer@workstation:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleCommand}
            className="flex-1 bg-transparent outline-none border-none text-[#E7ECE9] font-mono text-[12px] p-0 caret-[#3DD68C]"
            autoFocus
            spellCheck="false"
            autoComplete="off"
          />
        </div>
        <div ref={bottomRef} />
      </div>
    </div>
  );
}

