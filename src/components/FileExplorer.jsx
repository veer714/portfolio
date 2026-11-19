import React, { useState } from 'react';
import { 
  ChevronRight, 
  ChevronDown, 
  FileText, 
  FileCode, 
  FileJson, 
  Folder, 
  FolderOpen,
  Cpu,
  Sparkles,
  Terminal,
  ExternalLink,
  ShieldCheck,
  Brain,
  FileSpreadsheet
} from 'lucide-react';
import { projectsData } from '../data/projects';

export function FileExplorer({ activeFile, onOpenFile }) {
  const [isProjectsOpen, setIsProjectsOpen] = useState(true);
  const [isLabOpen, setIsLabOpen] = useState(true);

  const getFileIcon = (fileName) => {
    if (fileName.endsWith('.md')) {
      return <FileText size={14} className="text-[#60A5FA]" />;
    }
    if (fileName.endsWith('.tsx') || fileName.endsWith('.jsx')) {
      return <FileCode size={14} className="text-[#38BDF8]" />;
    }
    if (fileName.endsWith('.py')) {
      return <FileCode size={14} className="text-[#FBBF24]" />;
    }
    if (fileName.endsWith('.ts')) {
      return <FileCode size={14} className="text-[#3B82F6]" />;
    }
    if (fileName.endsWith('.json')) {
      return <FileJson size={14} className="text-[#F59E0B]" />;
    }
    if (fileName.endsWith('.pdf')) {
      return <FileSpreadsheet size={14} className="text-[#EF4444]" />;
    }
    return <FileText size={14} className="text-[#929D97]" />;
  };

  const isFileActive = (id) => activeFile === id;

  return (
    <div className="flex flex-col h-full bg-[#141918] text-[#929D97] select-none text-[12px] font-mono border-r border-[#292F2D]">
      {/* Explorer Header */}
      <div className="h-9 px-3 flex items-center justify-between border-b border-[#292F2D] text-[11px] font-semibold text-[#E7ECE9] tracking-wider uppercase">
        <span className="flex items-center gap-1.5">
          <span>Explorer</span>
        </span>
        <span className="text-[10px] text-[#5E6964] lowercase font-normal">veer-ws</span>
      </div>

      {/* Directory Tree */}
      <div className="flex-1 overflow-y-auto py-2 px-1">
        {/* Root Directory */}
        <div className="mb-1">
          <div className="flex items-center gap-1 px-2 py-1 text-[11px] font-bold text-[#E7ECE9] tracking-wider">
            <ChevronDown size={12} className="text-[#929D97]" />
            <FolderOpen size={13} className="text-[#3DD68C]" />
            <span>PORTFOLIO</span>
          </div>

          <div className="pl-3 space-y-0.5">
            {/* about.md */}
            <button
              onClick={() => onOpenFile('about.md')}
              className={`w-full flex items-center justify-between px-2 py-1 rounded transition-colors text-left ${
                isFileActive('about.md')
                  ? 'bg-[#181D1B] text-[#E7ECE9] font-medium border-l-2 border-[#3DD68C]'
                  : 'hover:bg-[#181D1B]/60 text-[#929D97] hover:text-[#E7ECE9]'
              }`}
            >
              <div className="flex items-center gap-2 truncate">
                {getFileIcon('about.md')}
                <span className="truncate">about.md</span>
              </div>
              <span className="text-[10px] text-[#5E6964]">bio</span>
            </button>

            {/* projects/ folder */}
            <div>
              <button
                onClick={() => setIsProjectsOpen(!isProjectsOpen)}
                className="w-full flex items-center gap-1.5 px-2 py-1 hover:bg-[#181D1B]/40 rounded text-left text-[#E7ECE9] font-medium"
              >
                {isProjectsOpen ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                {isProjectsOpen ? (
                  <FolderOpen size={13} className="text-[#60A5FA]" />
                ) : (
                  <Folder size={13} className="text-[#60A5FA]" />
                )}
                <span>projects</span>
                <span className="text-[10px] text-[#5E6964] ml-auto font-normal">({projectsData.length})</span>
              </button>

              {isProjectsOpen && (
                <div className="pl-4 space-y-0.5 mt-0.5">
                  {/* All projects explorer item */}
                  <button
                    onClick={() => onOpenFile('projects')}
                    className={`w-full flex items-center justify-between px-2 py-1 rounded transition-colors text-left ${
                      isFileActive('projects')
                        ? 'bg-[#181D1B] text-[#E7ECE9] font-medium border-l-2 border-[#3DD68C]'
                        : 'hover:bg-[#181D1B]/60 text-[#929D97] hover:text-[#E7ECE9]'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <FileCode size={13} className="text-[#A78BFA]" />
                      <span className="truncate">index.projects</span>
                    </div>
                    <span className="text-[10px] text-[#5E6964]">all</span>
                  </button>

                  {/* Individual project files */}
                  {projectsData.map((project) => (
                    <button
                      key={project.id}
                      onClick={() => onOpenFile(project.file)}
                      className={`w-full flex items-center justify-between px-2 py-1 rounded transition-colors text-left ${
                        isFileActive(project.file)
                          ? 'bg-[#181D1B] text-[#E7ECE9] font-medium border-l-2 border-[#3DD68C]'
                          : 'hover:bg-[#181D1B]/60 text-[#929D97] hover:text-[#E7ECE9]'
                      }`}
                      title={project.title}
                    >
                      <div className="flex items-center gap-2 truncate">
                        {getFileIcon(project.file)}
                        <span className="truncate">{project.file}</span>
                      </div>
                      <span className="text-[9px] px-1 py-0.2 rounded bg-[#0C0F0E] text-[#5E6964] border border-[#292F2D]">
                        {project.file.split('.').pop()}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* lab/ folder */}
            <div>
              <button
                onClick={() => setIsLabOpen(!isLabOpen)}
                className="w-full flex items-center gap-1.5 px-2 py-1 hover:bg-[#181D1B]/40 rounded text-left text-[#E7ECE9] font-medium"
              >
                {isLabOpen ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                {isLabOpen ? (
                  <FolderOpen size={13} className="text-[#3DD68C]" />
                ) : (
                  <Folder size={13} className="text-[#3DD68C]" />
                )}
                <span>lab</span>
                <span className="text-[9px] px-1 rounded bg-[#3DD68C]/10 text-[#3DD68C] ml-auto">ai</span>
              </button>

              {isLabOpen && (
                <div className="pl-4 space-y-0.5 mt-0.5">
                  <button
                    onClick={() => onOpenFile('neural-playground.tsx')}
                    className={`w-full flex items-center justify-between px-2 py-1 rounded transition-colors text-left ${
                      isFileActive('neural-playground.tsx')
                        ? 'bg-[#181D1B] text-[#E7ECE9] font-medium border-l-2 border-[#3DD68C]'
                        : 'hover:bg-[#181D1B]/60 text-[#929D97] hover:text-[#E7ECE9]'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <Brain size={13} className="text-[#3DD68C]" />
                      <span className="truncate">neural-playground.tsx</span>
                    </div>
                    <span className="text-[10px] text-[#3DD68C]">sim</span>
                  </button>
                </div>
              )}
            </div>

            {/* skills.json */}
            <button
              onClick={() => onOpenFile('skills.json')}
              className={`w-full flex items-center justify-between px-2 py-1 rounded transition-colors text-left ${
                isFileActive('skills.json')
                  ? 'bg-[#181D1B] text-[#E7ECE9] font-medium border-l-2 border-[#3DD68C]'
                  : 'hover:bg-[#181D1B]/60 text-[#929D97] hover:text-[#E7ECE9]'
              }`}
            >
              <div className="flex items-center gap-2 truncate">
                {getFileIcon('skills.json')}
                <span className="truncate">skills.json</span>
              </div>
              <span className="text-[10px] text-[#5E6964]">cfg</span>
            </button>

            {/* resume.pdf */}
            <button
              onClick={() => onOpenFile('resume.pdf')}
              className={`w-full flex items-center justify-between px-2 py-1 rounded transition-colors text-left ${
                isFileActive('resume.pdf')
                  ? 'bg-[#181D1B] text-[#E7ECE9] font-medium border-l-2 border-[#3DD68C]'
                  : 'hover:bg-[#181D1B]/60 text-[#929D97] hover:text-[#E7ECE9]'
              }`}
            >
              <div className="flex items-center gap-2 truncate">
                {getFileIcon('resume.pdf')}
                <span className="truncate">resume.pdf</span>
              </div>
              <span className="text-[10px] text-[#5E6964]">doc</span>
            </button>

            {/* contact.md */}
            <button
              onClick={() => onOpenFile('contact.md')}
              className={`w-full flex items-center justify-between px-2 py-1 rounded transition-colors text-left ${
                isFileActive('contact.md')
                  ? 'bg-[#181D1B] text-[#E7ECE9] font-medium border-l-2 border-[#3DD68C]'
                  : 'hover:bg-[#181D1B]/60 text-[#929D97] hover:text-[#E7ECE9]'
              }`}
            >
              <div className="flex items-center gap-2 truncate">
                {getFileIcon('contact.md')}
                <span className="truncate">contact.md</span>
              </div>
              <span className="text-[10px] text-[#5E6964]">msg</span>
            </button>
          </div>
        </div>

        {/* Outline / Info Panel */}
        <div className="mt-4 pt-3 border-t border-[#292F2D] px-2">
          <div className="text-[10px] font-bold text-[#5E6964] uppercase tracking-wider mb-2">
            System Workspace
          </div>
          <div className="bg-[#0C0F0E] p-2.5 rounded border border-[#292F2D] space-y-1.5 text-[11px]">
            <div className="flex justify-between">
              <span className="text-[#5E6964]">Developer:</span>
              <span className="text-[#E7ECE9]">Veer Pratap</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#5E6964]">Branch:</span>
              <span className="text-[#3DD68C]">main (HEAD)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#5E6964]">Focus:</span>
              <span className="text-[#929D97]">AI & ML Systems</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#5E6964]">Degree:</span>
              <span className="text-[#929D97]">B.Tech AI & DS</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

