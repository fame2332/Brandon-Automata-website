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
  
  // Determine which PDA image to show based on automaton data
  const getPdaImage = () => {
    if (!automaton || type !== 'PDA') return '/images/PDA1.png';
    
    // Check automaton properties to determine which PDA image to show
    // If automaton has state "Read8" and no "Read13", it's likely PDA2
    const pdaData = automaton as PDA;
    const hasRead8 = pdaData.states.includes('Read8');
    const hasRead13 = pdaData.states.includes('Read13');
    
    if (hasRead8 && !hasRead13) {
      return '/images/PDABrandon2.drawio.png'; // PDA 2
    } else {
      return '/images/PDA1.png'; // PDA 1 (default)
    }
  };
  
  // Render visualization when type or automaton changes
  useEffect(() => {
    if (!automaton || !type || !graphRef.current) return;
    
    setLoading(true);
    
    try {
      if (type === 'DFA') {
        const dotCode = generateDotGraph(automaton as DFA, highlightedState, '#4ade80');
        
        if (graphRef.current) {
          graphRef.current.innerHTML = '';
          
          graphviz(graphRef.current, {
            useWorker: false
          })
            .width('100%')
            .height(500)
            .zoom(false)
            .fit(true)
            .renderDot(dotCode)
            .on('end', () => {
              setLoading(false);
            });
        }
      } else if (type === 'PDA') {
        if (graphRef.current) {
          renderPdaImage();
        }
        setLoading(false);
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
  
  const renderPdaImage = () => {
    if (!graphRef.current) return;
    
    graphRef.current.innerHTML = '';
    
    // Create image container
    const imageContainer = document.createElement('div');
    imageContainer.className = 'flex flex-col items-center justify-center w-full';
    
    // Create image element - adjusted size for better fit
    const img = document.createElement('img');
    img.src = getPdaImage();
    img.alt = 'PDA Visualization';
    img.className = 'object-contain cursor-zoom-in'; // Removed w-full to prevent stretching
    img.style.maxHeight = '1200px'; // Further reduced size
    img.style.margin = 'auto'; // Center the image
    
    // Make the image clickable for fullscreen toggle
    img.onclick = toggleFullscreen;
    
    // Add image to container first
    imageContainer.appendChild(img);
    
    // Create status section for highlighted state
    if (highlightedState) {
      const statusContainer = document.createElement('div');
      statusContainer.className = 'mt-4 p-3 bg-green-100 border border-green-300 rounded-lg text-center';
      
      const stateLabel = document.createElement('span');
      stateLabel.className = 'font-medium text-green-800';
      stateLabel.textContent = `Current State: ${highlightedState}`;
      
      statusContainer.appendChild(stateLabel);
      imageContainer.appendChild(statusContainer);
    }
    
    // Add description
    const description = document.createElement('div');
    description.className = 'mt-4 text-sm text-gray-600 text-center max-w-xl mx-auto';
    description.textContent = img.src.includes('PDA1.png')
      ? 'PDA Visualization: This diagram shows the state transitions and behavior of the pushdown automaton. Click the diagram to view in fullscreen.'
      : 'PDA Visualization: Alternative representation of the pushdown automaton structure. Click the diagram to view in fullscreen.';
    
    // Append elements
    imageContainer.appendChild(description);
    graphRef.current.appendChild(imageContainer);
  };
  
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
            
            {(type === 'DFA' || type === 'PDA') && !loading && !isFullscreen && (
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
                className={`${isFullscreen ? 'h-full' : type === 'CFG' ? 'h-auto' : type === 'PDA' ? 'h-auto' : 'h-[500px]'} overflow-auto flex justify-center ${type === 'PDA' ? 'w-full mx-auto' : 'w-full'}`}
              ></div>
            )}
          </div>
          
          {isFullscreen && (
            <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 bg-opacity-70 text-white px-4 py-2 rounded-full text-sm">
              Press ESC to exit fullscreen
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Visualization;