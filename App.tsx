
import React, { useState, useRef, useEffect } from 'react';
import { gemini } from './services/gemini';
import { Message, AppState } from './types';
import { ExpertResponse } from './components/ExpertResponse';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    messages: [],
    isThinking: false,
    contextCollected: false,
    hasStarted: false,
  });
  const [inputValue, setInputValue] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [state.messages, state.isThinking]);

  const handleSend = async (e?: React.FormEvent, overrideText?: string) => {
    e?.preventDefault();
    const textToSend = overrideText || inputValue;
    if (!textToSend.trim() || state.isThinking) return;

    const userMessage: Message = { role: 'user', text: textToSend };
    setInputValue('');
    
    setState(prev => ({
      ...prev,
      hasStarted: true,
      messages: [...prev.messages, userMessage],
      isThinking: true,
    }));

    try {
      const responseText = await gemini.sendMessage(textToSend);
      const isAnalysis = responseText.toLowerCase().includes('the planner') && 
                         responseText.toLowerCase().includes('the critic') && 
                         responseText.toLowerCase().includes('the mediator');

      const botMessage: Message = { 
        role: 'model', 
        text: responseText,
        isAnalysis 
      };

      setState(prev => ({
        ...prev,
        messages: [...prev.messages, botMessage],
        isThinking: false,
        contextCollected: isAnalysis ? true : prev.contextCollected
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        isThinking: false,
        messages: [...prev.messages, { role: 'model', text: "Sorry, I encountered an error. Please try again or check your API key." }]
      }));
    }
  };

  const handleReset = () => {
    gemini.reset();
    setState({
      messages: [],
      isThinking: false,
      contextCollected: false,
      hasStarted: false,
    });
  };

  const isDiscoveryPhase = state.hasStarted && !state.contextCollected;

  return (
    <div className="flex flex-col h-screen max-h-screen overflow-hidden text-slate-200">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 glass border-b border-slate-700 z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <i className="fas fa-gem text-white"></i>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white">The MAP Gem</h1>
            <p className="text-xs text-slate-400 font-medium uppercase tracking-widest">Multi-role Analytical Prompt</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
           {isDiscoveryPhase && (
            <span className="hidden md:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-500 border border-amber-500/20 animate-pulse">
              <i className="fas fa-search-plus mr-1.5"></i> Discovery Mode
            </span>
          )}
          <button 
            onClick={handleReset}
            className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors text-slate-400 hover:text-white"
            title="Reset Session"
          >
            <i className="fas fa-rotate-right"></i>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden relative flex flex-col md:flex-row">
        
        {/* Sidebar Info - Hidden on mobile */}
        <aside className="hidden lg:flex w-80 flex-col p-6 border-r border-slate-800 bg-slate-900/50">
          <div className="mb-8">
            <h2 className="text-sm font-semibold text-slate-400 uppercase mb-4 tracking-wider">MAP Protocol</h2>
            <div className="space-y-4">
              <div className="flex gap-3">
                <i className="fas fa-circle-nodes text-indigo-500 mt-1"></i>
                <p className="text-sm leading-relaxed text-slate-300">Phase 1: Iterative one-by-one inquiry to map context.</p>
              </div>
              <div className="flex gap-3">
                <i className="fas fa-wand-magic-sparkles text-indigo-500 mt-1"></i>
                <p className="text-sm leading-relaxed text-slate-300">Phase 2: Triple-expert synthesis (Planner, Critic, Mediator).</p>
              </div>
            </div>
          </div>

          <div className="mt-auto">
             <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700 mb-4">
                <h3 className="text-xs font-bold text-slate-400 uppercase mb-3">Discovery Tip</h3>
                <p className="text-xs text-slate-500 italic leading-relaxed">
                  The engine will refine your query through focused questions. You can type "Analyze now" at any point.
                </p>
             </div>
            <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
              <h3 className="text-xs font-bold text-indigo-400 uppercase mb-2">Expert Personas</h3>
              <ul className="text-xs space-y-2 text-slate-400">
                <li><span className="text-slate-200">The Planner:</span> Tactical strategy</li>
                <li><span className="text-slate-200">The Critic:</span> Risk identification</li>
                <li><span className="text-slate-200">The Mediator:</span> Unified synthesis</li>
              </ul>
            </div>
          </div>
        </aside>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col min-w-0 bg-slate-900/30">
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6">
            {!state.hasStarted && (
              <div className="h-full flex flex-col items-center justify-center text-center max-w-2xl mx-auto space-y-6 opacity-80">
                <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center text-3xl mb-4 border border-slate-700 shadow-xl">
                  <i className="fas fa-brain text-indigo-500"></i>
                </div>
                <h2 className="text-3xl font-bold text-white tracking-tight">Analytical Decision Engine</h2>
                <p className="text-lg text-slate-400 leading-relaxed">
                  Welcome. I will act as a Planner, Critic, and Mediator. 
                  To begin, share your situation and I will ask concise foundational questions to build context.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full mt-4">
                  <button 
                    onClick={() => { setInputValue("Should I transition my career to renewable energy consulting?"); }}
                    className="p-4 rounded-xl glass border border-slate-700 hover:border-indigo-500/50 text-left text-sm transition-all hover:bg-slate-800"
                  >
                    "Career transition advice"
                  </button>
                  <button 
                    onClick={() => { setInputValue("Evaluate the expansion of my bakery into a second location."); }}
                    className="p-4 rounded-xl glass border border-slate-700 hover:border-indigo-500/50 text-left text-sm transition-all hover:bg-slate-800"
                  >
                    "Business expansion analysis"
                  </button>
                </div>
              </div>
            )}

            {state.messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[90%] md:max-w-[80%] rounded-2xl px-5 py-4 ${
                  msg.role === 'user' 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/10' 
                    : msg.isAnalysis ? 'w-full max-w-none' : 'glass border-slate-700/50 text-slate-200'
                }`}>
                  {msg.isAnalysis ? (
                    <ExpertResponse content={msg.text} />
                  ) : (
                    <div className="flex gap-3">
                       {msg.role === 'model' && (
                         <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                           <i className="fas fa-gem text-indigo-400 text-xs"></i>
                         </div>
                       )}
                       <div className="whitespace-pre-wrap leading-relaxed py-0.5">{msg.text}</div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {state.isThinking && (
              <div className="flex justify-start">
                <div className="glass rounded-2xl px-6 py-4 flex items-center gap-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>
                    <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></div>
                  </div>
                  <span className="text-sm font-medium text-slate-400 italic">Synthesizing perspectives...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input Bar */}
          <div className="p-4 md:p-6 bg-slate-900/50 border-t border-slate-800">
            <div className="max-w-4xl mx-auto">
              <form onSubmit={handleSend} className="flex gap-3 relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={state.hasStarted ? "Answer the question or type 'Analyze now'..." : "What is the situation?"}
                  className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all shadow-inner"
                />
                
                <div className="flex flex-col md:flex-row gap-2">
                  {isDiscoveryPhase && (
                    <button
                      type="button"
                      onClick={() => handleSend(undefined, "I have shared enough context. Please provide the multi-role analysis now.")}
                      className="bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-600/30 px-4 rounded-xl font-bold transition-all text-sm whitespace-nowrap"
                    >
                      <i className="fas fa-bolt mr-2"></i> Analyze Now
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={state.isThinking || !inputValue.trim()}
                    className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 disabled:opacity-50 text-white px-6 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20"
                  >
                    <span>{state.isThinking ? "" : "Send"}</span>
                    <i className={`fas ${state.isThinking ? 'fa-spinner fa-spin' : 'fa-paper-plane'}`}></i>
                  </button>
                </div>
              </form>
              <div className="flex justify-between mt-3 px-1">
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">
                  Discovery Phase: 1 question per turn
                </p>
                <p className="text-[10px] text-slate-600 hidden md:block italic">
                   Powered by Gemini 3 Pro
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
