import React from 'react';
import { X, FileText, FileCode, FileJson, FileSpreadsheet, Brain, Sparkles } from 'lucide-react';

export function TabBar({ openTabs, activeTab, onSelectTab, onCloseTab }) {
  const getTabIcon = (tabId) => {
    if (tabId.endsWith('.md')) return <FileText size={13} className="text-[#60A5FA]" />;
    if (tabId.endsWith('.tsx') || tabId.endsWith('.jsx')) return <FileCode size={13} className="text-[#38BDF8]" />;
    if (tabId.endsWith('.py')) return <FileCode size={13} className="text-[#FBBF24]" />;
    if (tabId.endsWith('.ts')) return <FileCode size={13} className="text-[#3B82F6]" />;
    if (tabId.endsWith('.json')) return <FileJson size={13} className="text-[#F59E0B]" />;
    if (tabId.endsWith('.pdf')) return <FileSpreadsheet size={13} className="text-[#EF4444]" />;
    if (tabId === 'projects') return <FileCode size={13} className="text-[#A78BFA]" />;
    if (tabId.includes('neural') || tabId.includes('lab')) return <Brain size={13} className="text-[#3DD68C]" />;
    return <FileText size={13} className="text-[#929D97]" />;
  };

  const getTabLabel = (tabId) => {
    if (tabId === 'projects') return 'index.projects';
    return tabId;
  };

  return (
    <div className="h-9 bg-[#111514] border-b border-[#292F2D] flex items-center justify-between select-none overflow-x-auto overflow-y-hidden flex-shrink-0 text-xs font-mono">
      {/* Tabs Container */}
      <div className="flex items-center h-full">
        {openTabs.map((tab) => {
          const isActive = tab === activeTab;
          return (
            <div
              key={tab}
              onClick={() => onSelectTab(tab)}
              className={`group flex items-center gap-2 h-full px-3.5 border-r border-[#292F2D] cursor-pointer transition-colors relative text-[11px] ${
                isActive
                  ? 'bg-[#181D1B] text-[#E7ECE9] font-medium border-t-2 border-t-[#3DD68C]'
                  : 'bg-[#111514] text-[#929D97] hover:bg-[#141918] hover:text-[#E7ECE9]'
              }`}
            >
              <span className="flex-shrink-0">{getTabIcon(tab)}</span>
              <span className="truncate max-w-[130px]">{getTabLabel(tab)}</span>
              
              {/* Close Tab Button */}
              {openTabs.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onCloseTab(tab);
                  }}
                  className="opacity-0 group-hover:opacity-100 hover:bg-[#292F2D] p-0.5 rounded text-[#929D97] hover:text-[#E7ECE9] transition-opacity ml-1"
                  title="Close tab"
                >
                  <X size={11} />
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Right side Breadcrumb status */}
      <div className="hidden md:flex items-center gap-1.5 px-3 text-[10px] text-[#5E6964] font-mono">
        <span>portfolio</span>
        <span>&gt;</span>
        <span className="text-[#929D97]">{activeTab}</span>
      </div>
    </div>
  );
}

