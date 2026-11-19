import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ExternalLink, 
  Github, 
  Copy, 
  Check, 
  Layers, 
  ShieldCheck, 
  Cpu, 
  FileCode, 
  Terminal,
  Activity
} from 'lucide-react';
import { projectsData } from '../data/projects';

export function ProjectDetails({ projectFile, onBack, onOpenFile }) {
  const [copied, setCopied] = useState(false);

  const project = projectsData.find(p => p.file === projectFile) || projectsData[0];

  const handleCopyCode = () => {
    if (project.codeSnippet) {
      navigator.clipboard.writeText(project.codeSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-8 space-y-10 font-sans">
      {/* Scope / Navigation Top Header */}
      <div className="flex items-center justify-between font-mono text-[11px] text-[#5E6964] border-b border-[#292F2D] pb-3">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-[#3DD68C] hover:text-[#4ADE80] transition-colors"
        >
          <ArrowLeft size={13} />
          <span>cd .. / projects</span>
        </button>
        <span className="hidden sm:inline">FILE: src/projects/{project.file}</span>
        <span className="text-[#3DD68C]">STATUS: {project.status}</span>
      </div>

      {/* Main Title & Action Bar */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#181D1B] text-[#3DD68C] border border-[#292F2D]">
                {project.category}
              </span>
              <span className="text-xs font-mono text-[#5E6964]">{project.file}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#E7ECE9] tracking-tight">
              {project.title}
            </h1>
            <p className="text-sm font-mono text-[#3DD68C]">
              {project.tagline}
            </p>
          </div>

          {/* Real Links */}
          <div className="flex items-center gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3.5 py-2 rounded bg-[#181D1B] hover:bg-[#1E2522] border border-[#292F2D] text-[#E7ECE9] text-xs font-mono transition-colors"
              >
                <Github size={14} />
                <span>GitHub Repo</span>
              </a>
            )}

            {project.liveDemo && (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3.5 py-2 rounded bg-[#3DD68C] hover:bg-[#4ADE80] text-[#0C0F0E] font-semibold text-xs font-mono transition-colors shadow-lg shadow-[#3DD68C]/10"
              >
                <span>Live Deployment</span>
                <ExternalLink size={13} />
              </a>
            )}
          </div>
        </div>

        <p className="text-base text-[#929D97] leading-relaxed pt-2">
          {project.overview}
        </p>
      </div>

      {/* Problem & Approach Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Problem Card */}
        <div className="p-6 rounded-lg bg-[#141918] border border-[#292F2D] space-y-3">
          <div className="flex items-center gap-2 font-mono text-xs text-[#EF4444]">
            <span className="w-2 h-2 rounded-full bg-[#EF4444]" />
            <span className="font-semibold uppercase tracking-wider">The Engineering Problem</span>
          </div>
          <p className="text-xs text-[#929D97] leading-relaxed">
            {project.problem}
          </p>
        </div>

        {/* Technical Approach Card */}
        <div className="p-6 rounded-lg bg-[#141918] border border-[#292F2D] space-y-3">
          <div className="flex items-center gap-2 font-mono text-xs text-[#3DD68C]">
            <span className="w-2 h-2 rounded-full bg-[#3DD68C]" />
            <span className="font-semibold uppercase tracking-wider">Technical Approach</span>
          </div>
          <p className="text-xs text-[#929D97] leading-relaxed">
            {project.approach}
          </p>
        </div>
      </div>

      {/* Architecture Pipeline Breakdown */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 font-mono text-xs text-[#5E6964]">
          <span className="text-[#3DD68C]">// start .scope-architecture</span>
          <span className="flex-1 border-b border-[#292F2D]" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {project.architecture.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-lg bg-[#141918] border border-[#292F2D] space-y-2 font-mono"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#3DD68C] font-bold">STAGE {item.step}</span>
                <span className="text-[10px] text-[#5E6964]">PHASE</span>
              </div>
              <h4 className="text-xs font-bold text-[#E7ECE9]">
                {item.name}
              </h4>
              <p className="text-[11px] text-[#929D97] leading-normal font-sans">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* My Contribution Section */}
      <div className="p-6 rounded-lg bg-[#141918] border border-[#292F2D] space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#E7ECE9] font-mono uppercase tracking-wider flex items-center gap-2">
            <span className="text-[#3DD68C]">&gt;</span>
            <span>Developer Contribution</span>
          </h3>
          <span className="text-[10px] font-mono text-[#5E6964]">AUTHOR: Veer Pratap</span>
        </div>

        <ul className="space-y-2.5 font-mono text-xs text-[#929D97]">
          {project.myContribution.map((point, pIdx) => (
            <li key={pIdx} className="flex items-start gap-2.5">
              <span className="text-[#3DD68C] mt-0.5">•</span>
              <span className="leading-relaxed font-sans text-xs text-[#929D97]">{point}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Code Snippet Viewer */}
      {project.codeSnippet && (
        <div className="space-y-3">
          <div className="flex items-center justify-between font-mono text-xs text-[#5E6964]">
            <span className="text-[#3DD68C]">// implementation-snippet: {project.file}</span>
            <button
              onClick={handleCopyCode}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#181D1B] hover:bg-[#202724] border border-[#292F2D] text-[#929D97] hover:text-[#E7ECE9] transition-colors"
            >
              {copied ? <Check size={12} className="text-[#3DD68C]" /> : <Copy size={12} />}
              <span>{copied ? 'Copied' : 'Copy Code'}</span>
            </button>
          </div>

          <div className="rounded-lg bg-[#0C0F0E] border border-[#292F2D] overflow-hidden font-mono text-xs">
            <div className="h-8 bg-[#141918] px-3 flex items-center justify-between border-b border-[#292F2D] text-[11px] text-[#5E6964]">
              <span>{project.file}</span>
              <span>read-only buffer</span>
            </div>
            <pre className="p-4 overflow-x-auto text-[#E7ECE9] leading-relaxed selection:bg-[#3DD68C]/20 selection:text-[#3DD68C]">
              <code>{project.codeSnippet}</code>
            </pre>
          </div>
        </div>
      )}

      {/* Tech Stack Footer */}
      <div className="space-y-3">
        <h4 className="text-xs font-mono text-[#5E6964] uppercase tracking-wider">
          Integrated Technologies
        </h4>
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 rounded bg-[#141918] text-[#E7ECE9] border border-[#292F2D] font-mono text-xs"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Other Projects Navigator */}
      <div className="border-t border-[#292F2D] pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
        <button
          onClick={onBack}
          className="text-[#3DD68C] hover:underline flex items-center gap-1.5"
        >
          <ArrowLeft size={13} />
          <span>Back to All Projects</span>
        </button>

        <div className="flex items-center gap-2 text-[#929D97]">
          <span>Jump to:</span>
          {projectsData
            .filter(p => p.file !== project.file)
            .map(p => (
              <button
                key={p.file}
                onClick={() => onOpenFile(p.file)}
                className="px-2 py-0.5 rounded bg-[#141918] hover:bg-[#181D1B] border border-[#292F2D] text-[11px] text-[#E7ECE9]"
              >
                {p.title}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}

