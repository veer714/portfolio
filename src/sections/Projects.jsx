import React, { useState } from 'react';
import {
  ArrowRight,
  ExternalLink,
  Github,
  FileCode,
  Filter
} from 'lucide-react';
import { projectsData } from '../data/projects';

export function Projects({ onOpenFile }) {
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const categories = ['ALL', 'MACHINE LEARNING', 'FULL STACK', 'TOOLS'];

  const filteredProjects = projectsData.filter((project) => {
    if (selectedCategory === 'ALL') return true;
    if (selectedCategory === 'MACHINE LEARNING') {
      return project.category.toLowerCase().includes('machine learning') || project.category.toLowerCase().includes('vision');
    }
    if (selectedCategory === 'FULL STACK') {
      return project.category.toLowerCase().includes('stack') || project.category.toLowerCase().includes('security');
    }
    if (selectedCategory === 'TOOLS') {
      return project.category.toLowerCase().includes('engineering') || project.category.toLowerCase().includes('tools');
    }
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto py-6 sm:py-8 px-3.5 sm:px-8 space-y-6 sm:space-y-8 font-sans">
      {/* Scope Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 font-mono text-[11px] text-[#5E6964] border-b border-[#292F2D] pb-3">
        <div className="flex items-center gap-2">
          <span className="text-[#3DD68C]">// start .scope-projects</span>
          <span className="hidden sm:inline">PATH: src/projects/</span>
        </div>
        <div className="flex items-center gap-2">
          <span>TOTAL: {projectsData.length} PROJECTS</span>
          <span>•</span>
          <span className="text-[#3DD68C]">STATUS: READY</span>
        </div>
      </div>

      {/* Intro Header */}
      <div className="space-y-2 sm:space-y-3">
        <h2 className="text-2xl sm:text-4xl font-extrabold text-[#E7ECE9] tracking-tight">
          Project Repository &amp; Technical Case Studies
        </h2>
        <p className="text-xs sm:text-sm text-[#929D97] max-w-3xl leading-relaxed">
          Production systems, applied machine learning architectures, and developer experiments. Click any project to open its dedicated technical workspace tab with architecture diagrams and source code snippets.
        </p>
      </div>

      {/* Filter Chips Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1.5 font-mono text-xs no-scrollbar">
        <div className="flex items-center gap-1.5 text-[#5E6964] mr-1 text-[11px] flex-shrink-0">
          <Filter size={12} />
          <span>FILTER:</span>
        </div>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded text-[11px] transition-colors whitespace-nowrap flex-shrink-0 ${selectedCategory === cat
                ? 'bg-[#3DD68C] text-[#0C0F0E] font-semibold'
                : 'bg-[#141918] text-[#929D97] hover:text-[#E7ECE9] border border-[#292F2D]'
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="group rounded-lg bg-[#141918] border border-[#292F2D] hover:border-[#3DD68C]/50 transition-all flex flex-col justify-between overflow-hidden"
          >
            {/* Top Bar of Card */}
            <div className="p-4 sm:p-5 space-y-3.5 sm:space-y-4">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="flex items-center gap-1.5 text-[#E7ECE9] font-medium truncate">
                  <FileCode size={14} className="text-[#3DD68C] flex-shrink-0" />
                  <span className="truncate">{project.file}</span>
                </span>
                <span className={`text-[10px] px-2 py-0.5 rounded border flex-shrink-0 ml-2 ${project.status.includes('Live')
                    ? 'bg-[#3DD68C]/10 text-[#3DD68C] border-[#3DD68C]/30'
                    : 'bg-[#181D1B] text-[#929D97] border-[#292F2D]'
                  }`}>
                  {project.status}
                </span>
              </div>

              {/* Title & Tagline */}
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-[#E7ECE9] group-hover:text-[#3DD68C] transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs text-[#3DD68C] font-mono mt-0.5">
                  {project.tagline}
                </p>
                <p className="text-xs text-[#929D97] mt-2 leading-relaxed">
                  {project.overview}
                </p>
              </div>

              {/* Architecture Mini Flow */}
              <div className="bg-[#0C0F0E] p-3 rounded border border-[#292F2D] space-y-1.5 font-mono text-[10px]">
                <div className="text-[#5E6964] font-semibold uppercase tracking-wider text-[9px]">
                  Pipeline Architecture
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 text-[#929D97]">
                  {project.architecture.slice(0, 2).map((step, sIdx) => (
                    <div key={sIdx} className="truncate">
                      <span className="text-[#3DD68C] mr-1">[{step.step}]</span>
                      <span className="text-[#E7ECE9] font-medium">{step.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#181D1B] text-[#929D97] border border-[#292F2D]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Actions Bar */}
            <div className="min-h-[44px] bg-[#111514] border-t border-[#292F2D] px-4 sm:px-5 py-2 flex items-center justify-between text-xs font-mono">
              <button
                onClick={() => onOpenFile(project.file)}
                className="flex items-center gap-1.5 text-[#3DD68C] hover:text-[#4ADE80] font-medium transition-colors py-1"
              >
                <span>Inspect Workspace</span>
                <ArrowRight size={13} />
              </button>

              <div className="flex items-center gap-3">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 text-[#929D97] hover:text-[#E7ECE9] transition-colors"
                    title="View GitHub Repository"
                  >
                    <Github size={15} />
                  </a>
                )}
                {project.liveDemo && (
                  <a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 text-[#929D97] hover:text-[#3DD68C] transition-colors flex items-center gap-1"
                    title="Open Live Deployment"
                  >
                    <ExternalLink size={15} />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="font-mono text-[10px] sm:text-[11px] text-[#5E6964] text-center pt-2 sm:pt-4">
        // EOF .scope-projects — Veer Pratap Projects
      </div>
    </div>
  );
}
