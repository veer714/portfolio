import React, { useState } from 'react';
import { TopBar } from './components/TopBar';
import { Sidebar } from './components/Sidebar';
import { TabBar } from './components/TabBar';
import { StatusBar } from './components/StatusBar';
import { Terminal } from './components/Terminal';
import { CommandPalette } from './components/CommandPalette';
import { LineGutter } from './components/LineGutter';

// Sections
import { About } from './sections/About';
import { Projects } from './sections/Projects';
import { ProjectDetails } from './sections/ProjectDetails';
import { Skills } from './sections/Skills';
import { Lab } from './sections/Lab';
import { Resume } from './sections/Resume';
import { Contact } from './sections/Contact';

import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';

export default function App() {
  // Initialize state from URL params if present
  const getInitialState = () => {
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get('tab');
    const terminalParam = params.get('terminal') === 'true';
    const paletteParam = params.get('palette') === 'true';

    const defaultTabs = ['about.md', 'api-sentinel.tsx'];
    const active = tabParam || 'about.md';
    const tabs = defaultTabs.includes(active) ? defaultTabs : [...defaultTabs, active];

    return {
      tabs,
      active,
      terminal: terminalParam,
      palette: paletteParam
    };
  };

  const initial = getInitialState();
  const [openTabs, setOpenTabs] = useState(initial.tabs);
  const [activeTab, setActiveTab] = useState(initial.active);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(initial.terminal);
  const [isPaletteOpen, setIsPaletteOpen] = useState(initial.palette);
  const [showLineNumbers, setShowLineNumbers] = useState(true);

  // Keyboard shortcuts integration
  useKeyboardShortcuts({
    onTogglePalette: () => setIsPaletteOpen((prev) => !prev),
    onToggleTerminal: () => setIsTerminalOpen((prev) => !prev),
    onOpenFile: (file) => handleOpenFile(file),
    onCloseOverlay: () => {
      setIsPaletteOpen(false);
      setIsSidebarOpen(false);
    }
  });

  const handleOpenFile = (fileId) => {
    if (!openTabs.includes(fileId)) {
      setOpenTabs((prev) => [...prev, fileId]);
    }
    setActiveTab(fileId);
  };

  const handleSelectTab = (tabId) => {
    setActiveTab(tabId);
  };

  const handleCloseTab = (tabId) => {
    const updated = openTabs.filter((t) => t !== tabId);
    if (updated.length === 0) {
      setOpenTabs(['about.md']);
      setActiveTab('about.md');
      return;
    }
    setOpenTabs(updated);
    if (activeTab === tabId) {
      setActiveTab(updated[updated.length - 1]);
    }
  };

  // Render current active tab content
  const renderActiveContent = () => {
    switch (activeTab) {
      case 'about.md':
        return (
          <About 
            onOpenFile={handleOpenFile} 
            onToggleTerminal={() => setIsTerminalOpen(true)} 
          />
        );

      case 'projects':
        return <Projects onOpenFile={handleOpenFile} />;

      case 'api-sentinel.tsx':
      case 'image-recognition.py':
      case 'heart-disease-ml.py':
      case 'bladex-engine.ts':
        return (
          <ProjectDetails 
            projectFile={activeTab} 
            onBack={() => handleOpenFile('projects')}
            onOpenFile={handleOpenFile}
          />
        );

      case 'skills.json':
        return <Skills />;

      case 'neural-playground.tsx':
        return <Lab />;

      case 'resume.pdf':
        return <Resume />;

      case 'contact.md':
        return <Contact />;

      default:
        return (
          <About 
            onOpenFile={handleOpenFile} 
            onToggleTerminal={() => setIsTerminalOpen(true)} 
          />
        );
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-[#0C0F0E] text-[#E7ECE9] overflow-hidden selection:bg-[#3DD68C]/20 selection:text-[#3DD68C]">
      {/* 1. TOP APPLICATION BAR */}
      <TopBar
        onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
        onTogglePalette={() => setIsPaletteOpen((prev) => !prev)}
        onToggleTerminal={() => setIsTerminalOpen((prev) => !prev)}
        isTerminalOpen={isTerminalOpen}
        showLineNumbers={showLineNumbers}
        onToggleLineNumbers={() => setShowLineNumbers((prev) => !prev)}
        activeTab={activeTab}
      />

      {/* 2. MAIN BODY (SIDEBAR + EDITOR CONTENT) */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Sidebar / Activity Bar & File Explorer */}
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          activeFile={activeTab}
          onOpenFile={handleOpenFile}
          onTogglePalette={() => setIsPaletteOpen(true)}
          onToggleTerminal={() => setIsTerminalOpen((prev) => !prev)}
        />

        {/* Center Main Editor Area */}
        <main className="flex-1 flex flex-col min-w-0 bg-[#0C0F0E] overflow-hidden">
          {/* Tab Bar with Open Files */}
          <TabBar
            openTabs={openTabs}
            activeTab={activeTab}
            onSelectTab={handleSelectTab}
            onCloseTab={handleCloseTab}
          />

          {/* Editor Workspace & Line Gutter */}
          <div className="flex-1 flex overflow-hidden">
            {/* Line Numbers Gutter */}
            <LineGutter count={48} show={showLineNumbers} />

            {/* Scrollable Document Content */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden editor-comment-grid">
              {renderActiveContent()}
            </div>
          </div>

          {/* Interactive Bash Terminal Drawer */}
          <Terminal
            isOpen={isTerminalOpen}
            onClose={() => setIsTerminalOpen(false)}
            onOpenFile={handleOpenFile}
          />
        </main>
      </div>

      {/* 3. BOTTOM STATUS BAR */}
      <StatusBar
        activeTab={activeTab}
        onToggleTerminal={() => setIsTerminalOpen((prev) => !prev)}
        isTerminalOpen={isTerminalOpen}
      />

      {/* 4. MODALS & OVERLAYS */}
      <CommandPalette
        isOpen={isPaletteOpen}
        onClose={() => setIsPaletteOpen(false)}
        onOpenFile={handleOpenFile}
        onToggleTerminal={() => setIsTerminalOpen((prev) => !prev)}
        onToggleLineNumbers={() => setShowLineNumbers((prev) => !prev)}
      />
    </div>
  );
}
