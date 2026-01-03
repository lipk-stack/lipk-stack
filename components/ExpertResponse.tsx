
import React from 'react';

interface ExpertResponseProps {
  content: string;
}

export const ExpertResponse: React.FC<ExpertResponseProps> = ({ content }) => {
  // Parser to split by headers while keeping the headers
  const sections = content.split(/(?=###? (?:📘 THE PLANNER|🔴 THE CRITIC|🟢 THE MEDIATOR|PHASE 2: THE TRIAD ANALYSIS))/i);
  
  const renderSection = (title: string, body: string, icon: string, color: string) => (
    <div className={`mb-6 rounded-xl p-5 border-l-4 ${color} glass expert-card`}>
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-slate-800 border ${color.replace('border-', 'border-')}`}>
          <span className="text-xl">{icon}</span>
        </div>
        <h3 className="text-lg font-bold text-white tracking-tight">{title.replace(/###? /i, '').trim()}</h3>
      </div>
      <div className="text-slate-300 leading-relaxed prose prose-invert max-w-none">
        {body.split('\n').map((line, i) => {
          const trimmed = line.trim();
          if (!trimmed) return <div key={i} className="h-2" />;
          if (trimmed.startsWith('**Final Verdict**')) {
            return (
              <div key={i} className="mt-4 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                <strong className="text-emerald-400 block mb-1">Final Verdict</strong>
                {trimmed.replace('**Final Verdict**', '').replace(/^:/, '').trim()}
              </div>
            );
          }
          return <p key={i} className="mb-2">{trimmed}</p>;
        })}
      </div>
    </div>
  );

  const plannerMatch = sections.find(s => s.includes('THE PLANNER'));
  const criticMatch = sections.find(s => s.includes('THE CRITIC'));
  const mediatorMatch = sections.find(s => s.includes('THE MEDIATOR'));
  const phaseHeader = sections.find(s => s.includes('PHASE 2'));

  if (!plannerMatch && !criticMatch && !mediatorMatch) {
    return <div className="text-slate-200 whitespace-pre-wrap">{content}</div>;
  }

  return (
    <div className="flex flex-col gap-2 py-4">
      {phaseHeader && (
        <div className="mb-6 px-2">
          <h2 className="text-sm font-black text-slate-500 uppercase tracking-[0.2em]">
            {phaseHeader.replace(/###? /i, '').trim()}
          </h2>
          <div className="h-1 w-12 bg-indigo-500 mt-2 rounded-full"></div>
        </div>
      )}
      {plannerMatch && renderSection('📘 THE PLANNER', plannerMatch.replace(/###? (?:📘 THE PLANNER)/i, '').trim(), '📘', 'border-blue-500')}
      {criticMatch && renderSection('🔴 THE CRITIC', criticMatch.replace(/###? (?:🔴 THE CRITIC)/i, '').trim(), '🔴', 'border-rose-600')}
      {mediatorMatch && renderSection('🟢 THE MEDIATOR', mediatorMatch.replace(/###? (?:🟢 THE MEDIATOR)/i, '').trim(), '🟢', 'border-emerald-500')}
    </div>
  );
};
