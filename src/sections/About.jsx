import React from 'react';
import { 
  ArrowRight, 
  Terminal, 
  Cpu, 
  Brain, 
  FolderGit2, 
  Code, 
  Download, 
  ExternalLink,
  MapPin,
  GraduationCap,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { profileData } from '../data/profile';
import { projectsData } from '../data/projects';

export function About({ onOpenFile, onToggleTerminal }) {
  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-8 space-y-10">
      {/* Scope Header (Fine Thought style) */}
      <div className="flex items-center justify-between font-mono text-[11px] text-[#5E6964] border-b border-[#292F2D] pb-2">
        <span className="text-[#3DD68C]">// start .scope-profile</span>
        <span className="hidden sm:inline">PATH: src/sections/about.md</span>
        <span>STATUS: 200 OK</span>
      </div>

      {/* Hero Header Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Headline and Bio */}
        <div className="lg:col-span-8 space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#181D1B] border border-[#292F2D] text-xs font-mono text-[#3DD68C]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3DD68C] animate-pulse" />
              <span>{profileData.role}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#E7ECE9] tracking-tight leading-tight">
              Building intelligent systems.
              <span className="block text-[#929D97] font-semibold text-2xl sm:text-4xl mt-1">
                Turning code into practical solutions.
              </span>
            </h1>
          </div>

          <p className="text-base sm:text-lg text-[#929D97] leading-relaxed font-normal">
            I am <strong className="text-[#E7ECE9] font-semibold">Veer Pratap</strong>, an AI &amp; Data Science student focused on machine learning architectures, computer vision pipelines, and building resilient software systems that solve real-world problems.
          </p>

          <div className="space-y-3 text-sm text-[#929D97] leading-relaxed border-l-2 border-[#292F2D] pl-4 font-mono">
            {profileData.longBio.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* Quick CTA Actions */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onOpenFile('projects')}
              className="flex items-center gap-2 px-4 py-2.5 rounded bg-[#3DD68C] hover:bg-[#4ADE80] text-[#0C0F0E] font-semibold text-xs font-mono transition-all shadow-lg shadow-[#3DD68C]/10"
            >
              <span>Explore Projects</span>
              <ArrowRight size={14} />
            </button>

            <button
              onClick={() => onOpenFile('neural-playground.tsx')}
              className="flex items-center gap-2 px-4 py-2.5 rounded bg-[#181D1B] hover:bg-[#1E2522] border border-[#292F2D] hover:border-[#3DD68C]/50 text-[#E7ECE9] text-xs font-mono transition-colors"
            >
              <Brain size={14} className="text-[#3DD68C]" />
              <span>Launch Neural Lab</span>
            </button>

            <button
              onClick={() => onOpenFile('resume.pdf')}
              className="flex items-center gap-2 px-3.5 py-2.5 rounded bg-[#141918] hover:bg-[#181D1B] border border-[#292F2D] text-[#929D97] hover:text-[#E7ECE9] text-xs font-mono transition-colors"
            >
              <Download size={13} />
              <span>Resume</span>
            </button>
          </div>
        </div>

        {/* Right Column: Profile Card with Real Photo */}
        <div className="lg:col-span-4 bg-[#141918] border border-[#292F2D] rounded-lg p-5 space-y-4 font-mono text-xs">
          {/* Avatar and Verification */}
          <div className="relative group">
            <div className="aspect-square w-full rounded-md overflow-hidden border border-[#292F2D] bg-[#0C0F0E] relative">
              <img
                src="./portfolio-img.jpg"
                alt="Veer Pratap"
                className="w-full h-full object-cover grayscale contrast-125 brightness-95 group-hover:grayscale-0 transition-all duration-300"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = `
                    <div class="w-full h-full flex flex-col items-center justify-center text-[#5E6964] font-mono">
                      <span class="text-4xl text-[#3DD68C] font-bold">VP</span>
                      <span class="text-[10px] mt-2">VEER.EXE // DEV</span>
                    </div>
                  `;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C0F0E] via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[10px] text-[#E7ECE9] bg-[#0C0F0E]/80 backdrop-blur-xs px-2 py-1 rounded border border-[#292F2D]">
                <span className="text-[#3DD68C]">● ONLINE</span>
                <span>JAIPUR, IN</span>
              </div>
            </div>
          </div>

          {/* Quick Info Grid */}
          <div className="space-y-2 pt-1 border-t border-[#292F2D] text-[11px]">
            <div className="flex justify-between items-center py-1 border-b border-[#292F2D]/50">
              <span className="text-[#5E6964]">Name:</span>
              <span className="text-[#E7ECE9] font-medium">{profileData.name}</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-[#292F2D]/50">
              <span className="text-[#5E6964]">Degree:</span>
              <span className="text-[#E7ECE9] text-right truncate max-w-[160px]" title={profileData.education.degree}>
                B.Tech (AI &amp; DS)
              </span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-[#292F2D]/50">
              <span className="text-[#5E6964]">College:</span>
              <span className="text-[#929D97] text-right truncate max-w-[160px]" title={profileData.education.institution}>
                Arya College of Engg &amp; IT
              </span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-[#5E6964]">GitHub:</span>
              <a 
                href={profileData.contact.github} 
                target="_blank" 
                rel="noreferrer"
                className="text-[#3DD68C] hover:underline flex items-center gap-1"
              >
                <span>github.com/veer714</span>
                <ExternalLink size={10} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scope Divider: Technical Focus */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 font-mono text-[11px] text-[#5E6964]">
          <span className="text-[#3DD68C]">// start .scope-interests</span>
          <span className="flex-1 border-b border-[#292F2D]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {profileData.interests.map((interest, i) => (
            <div 
              key={i} 
              className="p-3.5 rounded bg-[#141918] border border-[#292F2D] hover:border-[#3DD68C]/40 transition-colors flex items-center gap-3 font-mono text-xs"
            >
              <span className="text-[10px] text-[#3DD68C] font-mono">0{i + 1}</span>
              <span className="text-[#E7ECE9] font-medium">{interest}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Projects Highlight Row */}
      <div className="space-y-4">
        <div className="flex items-center justify-between font-mono text-[11px] text-[#5E6964]">
          <span className="text-[#3DD68C]">// start .scope-featured-work</span>
          <button 
            onClick={() => onOpenFile('projects')} 
            className="hover:text-[#E7ECE9] flex items-center gap-1 text-[10px]"
          >
            <span>view all ({projectsData.length})</span>
            <ArrowRight size={10} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Project 1: API Sentinel */}
          <div 
            onClick={() => onOpenFile('api-sentinel.tsx')}
            className="group p-5 rounded-lg bg-[#141918] border border-[#292F2D] hover:border-[#3DD68C]/60 cursor-pointer transition-all space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#3DD68C]/10 text-[#3DD68C] border border-[#3DD68C]/20">
                LIVE DEPLOYMENT
              </span>
              <span className="text-[11px] font-mono text-[#5E6964]">api-sentinel.tsx</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#E7ECE9] group-hover:text-[#3DD68C] transition-colors">
                API Sentinel
              </h3>
              <p className="text-xs text-[#929D97] mt-1 line-clamp-2">
                Real-time API monitoring, health verification, and security telemetry for distributed microservices.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {['React', 'Node.js', 'REST APIs', 'Vercel'].map(t => (
                <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0C0F0E] text-[#929D97] border border-[#292F2D]">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Project 2: Image Recognition */}
          <div 
            onClick={() => onOpenFile('image-recognition.py')}
            className="group p-5 rounded-lg bg-[#141918] border border-[#292F2D] hover:border-[#3DD68C]/60 cursor-pointer transition-all space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#60A5FA]/10 text-[#60A5FA] border border-[#60A5FA]/20">
                RESEARCH / ML
              </span>
              <span className="text-[11px] font-mono text-[#5E6964]">image-recognition.py</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#E7ECE9] group-hover:text-[#60A5FA] transition-colors">
                CIFAR-10 Image Recognition
              </h3>
              <p className="text-xs text-[#929D97] mt-1 line-clamp-2">
                Deep Convolutional Neural Network (CNN) multi-class classification for 32x32 color visual patterns.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {['Python', 'TensorFlow', 'CNN', 'Computer Vision'].map(t => (
                <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0C0F0E] text-[#929D97] border border-[#292F2D]">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Terminal Quick-Start Prompt Block */}
      <div className="p-4 rounded-lg bg-[#0C0F0E] border border-[#292F2D] flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs">
        <div className="flex items-center gap-2.5">
          <Terminal size={15} className="text-[#3DD68C]" />
          <span className="text-[#929D97]">Need an interactive command line interface?</span>
        </div>
        <button
          onClick={onToggleTerminal}
          className="px-3 py-1.5 rounded bg-[#181D1B] hover:bg-[#202724] border border-[#292F2D] text-[#3DD68C] hover:text-[#4ADE80] text-[11px] flex items-center gap-1.5 self-start sm:self-auto transition-colors"
        >
          <span>Open Shell (`help`)</span>
          <ArrowRight size={12} />
        </button>
      </div>

      <div className="font-mono text-[11px] text-[#5E6964] text-center pt-4">
        // EOF .scope-profile — Veer Pratap AI &amp; Data Science Workspace
      </div>
    </div>
  );
}

