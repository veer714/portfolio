import React, { useState } from 'react';
import { 
  Code2, 
  Cpu, 
  Layers, 
  Terminal, 
  FileJson, 
  Copy, 
  Check, 
  LayoutGrid, 
  SlidersHorizontal,
  Sparkles
} from 'lucide-react';
import { skillsData } from '../data/skills';

export function Skills() {
  const [viewMode, setViewMode] = useState('matrix'); // 'matrix' | 'json'
  const [copied, setCopied] = useState(false);

  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'Code2': return <Code2 size={16} className="text-[#60A5FA]" />;
      case 'Cpu': return <Cpu size={16} className="text-[#3DD68C]" />;
      case 'Layers': return <Layers size={16} className="text-[#A78BFA]" />;
      case 'Terminal': return <Terminal size={16} className="text-[#FBBF24]" />;
      default: return <Code2 size={16} className="text-[#929D97]" />;
    }
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(skillsData, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-8 space-y-8 font-sans">
      {/* Scope Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-[11px] text-[#5E6964] border-b border-[#292F2D] pb-3">
        <div className="flex items-center gap-2">
          <span className="text-[#3DD68C]">// start .scope-skills</span>
          <span>PATH: config/skills.json</span>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center gap-1 bg-[#141918] p-0.5 rounded border border-[#292F2D]">
          <button
            onClick={() => setViewMode('matrix')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] transition-colors ${
              viewMode === 'matrix'
                ? 'bg-[#181D1B] text-[#3DD68C] font-medium'
                : 'text-[#929D97] hover:text-[#E7ECE9]'
            }`}
          >
            <LayoutGrid size={12} />
            <span>Matrix View</span>
          </button>

          <button
            onClick={() => setViewMode('json')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] transition-colors ${
              viewMode === 'json'
                ? 'bg-[#181D1B] text-[#3DD68C] font-medium'
                : 'text-[#929D97] hover:text-[#E7ECE9]'
            }`}
          >
            <FileJson size={12} />
            <span>Raw skills.json</span>
          </button>
        </div>
      </div>

      {/* Section Header */}
      <div className="space-y-2">
        <h2 className="text-2xl sm:text-4xl font-extrabold text-[#E7ECE9] tracking-tight">
          Technical Capabilities &amp; Stack
        </h2>
        <p className="text-sm text-[#929D97] max-w-2xl leading-relaxed">
          Technologies and mathematical computing frameworks I work with across AI, computer vision, data engineering, and modern web software. No arbitrary percentage bars—only real technical proficiencies.
        </p>
      </div>

      {/* MATRIX VIEW */}
      {viewMode === 'matrix' ? (
        <div className="space-y-8">
          {skillsData.categories.map((category) => (
            <div key={category.id} className="space-y-4">
              {/* Category Title */}
              <div className="flex items-center gap-2.5 font-mono text-xs">
                {getCategoryIcon(category.icon)}
                <h3 className="text-sm font-bold text-[#E7ECE9] tracking-wide">
                  {category.title}
                </h3>
                <span className="text-[10px] text-[#5E6964] hidden sm:inline">
                  — {category.description}
                </span>
                <span className="flex-1 border-b border-[#292F2D] hidden md:block" />
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {category.skills.map((skill, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-lg bg-[#141918] border border-[#292F2D] hover:border-[#3DD68C]/40 transition-colors space-y-2 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="font-bold text-[#E7ECE9]">{skill.name}</span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#0C0F0E] text-[#3DD68C] border border-[#292F2D]">
                          {skill.level}
                        </span>
                      </div>
                      <div className="text-[10px] text-[#5E6964] font-mono mt-0.5">
                        {skill.tag}
                      </div>
                    </div>

                    <p className="text-[11px] text-[#929D97] leading-relaxed pt-1 border-t border-[#292F2D]/50 font-sans">
                      {skill.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* RAW JSON VIEW */
        <div className="rounded-lg bg-[#0C0F0E] border border-[#292F2D] overflow-hidden font-mono text-xs space-y-0">
          <div className="h-9 bg-[#141918] px-4 flex items-center justify-between border-b border-[#292F2D] text-[11px] text-[#5E6964]">
            <span>skills.json — 2.1 KB</span>
            <button
              onClick={handleCopyJson}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#181D1B] hover:bg-[#202724] border border-[#292F2D] text-[#929D97] hover:text-[#E7ECE9] transition-colors"
            >
              {copied ? <Check size={12} className="text-[#3DD68C]" /> : <Copy size={12} />}
              <span>{copied ? 'Copied' : 'Copy JSON'}</span>
            </button>
          </div>

          <pre className="p-4 overflow-x-auto text-[#E7ECE9] leading-relaxed selection:bg-[#3DD68C]/20 selection:text-[#3DD68C]">
            <code>{JSON.stringify(skillsData, null, 2)}</code>
          </pre>
        </div>
      )}

      <div className="font-mono text-[11px] text-[#5E6964] text-center pt-4">
        // EOF .scope-skills — Veer Pratap Skill Configuration
      </div>
    </div>
  );
}

