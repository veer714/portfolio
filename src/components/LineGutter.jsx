import React from 'react';

export function LineGutter({ count = 50, show = true }) {
  if (!show) return null;

  const lines = Array.from({ length: count }, (_, i) => i + 1);

  return (
    <div 
      className="hidden md:flex flex-col select-none flex-shrink-0 text-right pr-4 pl-3 py-6 font-mono text-[11px] text-[#4D5853] border-r border-[#292F2D] bg-[#0C0F0E]"
      style={{ lineHeight: '1.75rem' }}
      aria-hidden="true"
    >
      {lines.map((num) => (
        <span key={num} className="hover:text-[#929D97] transition-colors">
          {num.toString().padStart(2, '0')}
        </span>
      ))}
    </div>
  );
}

