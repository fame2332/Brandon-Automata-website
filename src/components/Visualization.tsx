import { useEffect, useRef, useState } from 'react';
import { graphviz } from 'd3-graphviz';
import { DFA, CFG, PDA, generateDotGraph } from '../types/automata';
import { FileCode, Maximize2, X } from 'lucide-react';
import * as d3 from 'd3';

interface VisualizationProps {
  automaton: DFA | CFG | PDA | null;
  type: 'DFA' | 'CFG' | 'PDA' | null;
  highlightedState?: string;
}

const Visualization = ({ automaton, type, highlightedState }: VisualizationProps) => {
  const graphRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Render visualization when type or automaton changes
  useEffect(() => {
    if (!automaton || !type || !graphRef.current) return;
    
    setLoading(true);
    
    try {
      if (type === 'DFA' || type === 'PDA') {
        const dotCode = generateDotGraph(automaton as DFA | PDA, highlightedState, '#4ade80');
        
        if (graphRef.current) {
          graphRef.current.innerHTML = '';
          
          graphviz(graphRef.current, {
            useWorker: false
          })
            .width('100%')
            .height(type === 'PDA' ? 700 : 500)
            .zoom(false) // Disable built-in zoom
            .fit(true)
            .renderDot(dotCode)
            .on('end', () => {
              setLoading(false);
            });
        }
      } else if (type === 'CFG') {
        if (graphRef.current) {
          renderCFG(automaton as CFG);
        }
        setLoading(false);
      }
    } catch (error) {
      console.error('Error rendering graph:', error);
      setLoading(false);
    }
  }, [automaton, type, highlightedState]);
  
  const renderCFG = (cfg: CFG) => {
    if (!graphRef.current) return;
    
    graphRef.current.innerHTML = '';
    const container = document.createElement('div');
    container.className = 'font-mono text-left p-6 text-gray-800 w-full';
    
    cfg.productions.forEach(prod => {
      const line = document.createElement('div');
      line.className = 'mb-2';
      line.textContent = prod;
      container.appendChild(line);
    });
    
    graphRef.current.appendChild(container);
  };
  
  const toggleFullscreen = () => {
    if (!document.fullscreenEnabled) {
      console.error("Fullscreen not supported in your browser");
      return;
    }
    
    setIsFullscreen(!isFullscreen);
    
    if (containerRef.current && !isFullscreen) {
      containerRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen mode: ${err.message}`);
      });
    } else if (document.fullscreenElement && isFullscreen) {
      document.exitFullscreen().catch(err => {
        console.error(`Error attempting to exit fullscreen mode: ${err.message}`);
      });
    }
  };
  
  // Listen for fullscreen change events from browser
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);
  
  return (
    <div 
      ref={containerRef}
      className={`bg-white rounded-lg shadow-md overflow-hidden relative ${isFullscreen ? 'fixed inset-0 z-50 p-4 bg-white' : ''}`}
    >
      {isFullscreen && (
        <button 
          onClick={toggleFullscreen}
          className="absolute top-4 right-4 z-10 bg-red-600 text-white p-2 rounded-full shadow-lg hover:bg-red-700 transition-colors"
          aria-label="Exit fullscreen"
        >
          <X size={20} />
        </button>
      )}
      
      {!automaton || !type ? (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-blue-50">
          <FileCode size={48} className="text-blue-400 mb-4" />
          <h3 className="text-xl font-medium text-gray-800">Select an automaton to visualize</h3>
          <p className="mt-2 text-gray-600 max-w-md">
            Click on any "View" button in the table above to see the corresponding automaton visualization here.
          </p>
        </div>
      ) : (
        <div>
          <div className="bg-gray-50 py-3 px-6 border-b flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-800">
              {type === 'DFA' && 'Deterministic Finite Automaton (DFA)'}
              {type === 'CFG' && 'Context-Free Grammar (CFG)'}
              {type === 'PDA' && 'Pushdown Automaton (PDA)'}
            </h3>
            
            {(type === 'DFA' || type === 'PDA') && !loading && (
              <button
                onClick={toggleFullscreen}
                className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors"
                aria-label="Fullscreen"
              >
                <Maximize2 size={16} />
              </button>
            )}
          </div>
          
          <div className={`p-4 ${isFullscreen ? 'h-[calc(100vh-120px)]' : ''}`}>
            {loading ? (
              <div className="flex justify-center items-center h-96">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <div 
                ref={graphRef} 
                className={`${isFullscreen ? 'h-full' : type === 'CFG' ? 'h-auto' : type === 'PDA' ? 'h-[700px]' : 'h-[500px]'} overflow-hidden flex justify-center ${type === 'PDA' ? 'w-[70%] mx-auto' : 'w-full'}`}
              ></div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Visualization;