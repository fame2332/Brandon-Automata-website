import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import RegexTable from '../components/RegexTable';
import Visualization from '../components/Visualization';
import StringValidator from '../components/StringValidator';
import { CFG_1, CFG_2, DFA_1, DFA_2, PDA_1, PDA_2 } from '../types/automata';
import { ChevronDown, Code, Cpu, Zap, BookOpen } from 'lucide-react';

const regexSamples = [
  {
    id: 1,
    regex: "(111+000+101+001)(1+0)*(11+00)(11+00)*(101+111+000)(101+111+000)*(11+00)(1+0+11)(11*)(00*)(1*+0*+1+0)(1+0)*",
    dfa: DFA_2,
    cfg: CFG_2,
    pda: PDA_2
  },
  {
    id: 2,
    regex: "(ab+ba)(ab+ba)*(aaa+bbb+aba)(a+b)*(bb*)(aa*)(a+b)(aa+bb)(a+b)*(bb+aa+aba+bab)(bb+aa+aba+bab)*",
    dfa: DFA_1,
    cfg: CFG_1,
    pda: PDA_1
  }
];

const Home = () => {
  const [selectedAutomaton, setSelectedAutomaton] = useState<{
    type: 'DFA' | 'CFG' | 'PDA' | null;
    data: any;
  }>({
    type: null,
    data: null,
  });
  
  const [animatedEntry, setAnimatedEntry] = useState(false);
  const [highlightedState, setHighlightedState] = useState<string | undefined>(undefined);
  const [showContent, setShowContent] = useState(false);
  const [isExploring, setIsExploring] = useState(false); // State to track if user is already exploring
  const [sectionVisibility, setSectionVisibility] = useState({
    hero: false,
    regexTable: false,
    visualization: false,
    validator: false
  });

  const contentRef = useRef<HTMLDivElement>(null);
  const visualizationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setAnimatedEntry(true);
    
    // Only animate hero section initially
    const timer = setTimeout(() => setSectionVisibility(prev => ({ ...prev, hero: true })), 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    if (showContent) {
      // Staggered animations for sections after clicking explore
      const timer1 = setTimeout(() => setSectionVisibility(prev => ({ ...prev, regexTable: true })), 300);
      const timer2 = setTimeout(() => setSectionVisibility(prev => ({ ...prev, visualization: true })), 600);
      
      // Scroll to content
      if (contentRef.current) {
        contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [showContent]);
  
  useEffect(() => {
    if (selectedAutomaton.type) {
      setSectionVisibility(prev => ({ ...prev, validator: true }));
      
      // Scroll to visualization section when an automaton is selected
      if (visualizationRef.current) {
        visualizationRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [selectedAutomaton.type]);

  const handleViewAutomaton = (type: 'DFA' | 'CFG' | 'PDA', id: number) => {
    const sample = regexSamples.find(sample => sample.id === id);
    if (sample) {
      let data = null;
      switch (type) {
        case 'DFA':
          data = sample.dfa;
          break;
        case 'CFG':
          data = sample.cfg;
          break;
        case 'PDA':
          data = sample.pda;
          break;
      }

      setSelectedAutomaton({
        type,
        data,
      });
      setHighlightedState(undefined);
    }
  };

  const handleStateChange = (state: string | null) => {
    setHighlightedState(state || undefined);
  };
  
  const revealContent = () => {
    if (!isExploring) { // Only execute if not already exploring
      setIsExploring(true); // Prevent multiple clicks
      setShowContent(true);
    }
  };

  return (
    <div className="transition-opacity duration-700 overflow-hidden">
      {/* Hero section - hidden when content is shown */}
      <div className={`min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 pt-16 relative overflow-hidden transition-all duration-700 ${showContent ? 'hidden' : ''}`}>
        <div className={`absolute top-20 left-10 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob1`}></div>
        <div className={`absolute top-20 right-10 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob2`}></div>
        <div className={`absolute bottom-8 left-1/4 w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob3`}></div>
        
        <div className={`max-w-4xl mx-auto text-center px-4 transition-all duration-1000 ${sectionVisibility.hero ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-16'}`}>
          <div className="inline-block mb-6">
            <div className="flex items-center justify-center space-x-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 px-5 rounded-full text-sm font-medium">
              <Cpu className="w-4 h-4" />
              <span>Interactive Automata Theory</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-800">
            Automata Theory Visualizer
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto mb-10">
            Explore DFAs, CFGs and PDAs through interactive visualizations and understand complex theoretical concepts with ease.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
            <button 
              onClick={revealContent}
              disabled={isExploring}
              className={`px-8 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-all flex items-center space-x-2 transform hover:scale-105 ${isExploring ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
              <span>Explore Visualizations</span>
              <Zap className="w-5 h-5" />
            </button>
            
            <Link to="/about" className="px-8 py-3 bg-white text-blue-700 border border-blue-200 rounded-lg shadow-sm hover:bg-blue-50 transition-all flex items-center space-x-2 transform hover:scale-105">
              <span>Learn More</span>
              <BookOpen className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
      
      {/* Content sections - only shown after clicking explore */}
      <div 
        ref={contentRef}
        id="content-start" 
        className={`bg-gradient-to-b from-white to-blue-50 py-20 transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0 h-0 py-0 overflow-hidden'}`}
      >
        <div className="container mx-auto px-4">
          {/* Regular Expressions */}
          <section className={`mb-20 transition-all duration-1000 transform ${sectionVisibility.regexTable ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}>
            <div className="text-left mb-10">
              <div className="flex items-center space-x-2 mb-2">
                <Code className="w-5 h-5 text-blue-600" />
                <h4 className="text-blue-600 font-semibold tracking-wide uppercase">Automata Types</h4>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Regular Expressions</h2>
              <p className="text-lg text-gray-600">
                Select one of the automaton types below to explore its visual representation and behavior.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
        <RegexTable regexSamples={regexSamples} onViewAutomaton={handleViewAutomaton} />
            </div>
      </section>

          {/* Visualization */}
          <section 
            ref={visualizationRef} 
            className={`mb-20 transition-all duration-1000 transform ${sectionVisibility.visualization ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}
          >
            <div className="text-left mb-10">
              <div className="flex items-center space-x-2 mb-2">
                <Cpu className="w-5 h-5 text-blue-600" />
                <h4 className="text-blue-600 font-semibold tracking-wide uppercase">Interactive Models</h4>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Visualization</h2>
              <p className="text-lg text-gray-600">
                {selectedAutomaton.type 
                  ? `Explore the ${selectedAutomaton.type} visualization with interactive elements.` 
                  : 'Select an automaton type above to see its visualization.'}
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
        <Visualization
          automaton={selectedAutomaton.data}
          type={selectedAutomaton.type}
          highlightedState={highlightedState}
        />
            </div>
      </section>

          {/* Validate Strings */}
          {selectedAutomaton.type === 'DFA' && (
            <section className={`mb-20 transition-all duration-1000 transform ${sectionVisibility.validator ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}>
              <div className="text-left mb-10">
                <div className="flex items-center space-x-2 mb-2">
                  <Zap className="w-5 h-5 text-blue-600" />
                  <h4 className="text-blue-600 font-semibold tracking-wide uppercase">Test Your Strings</h4>
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Validate Strings</h2>
                <p className="text-lg text-gray-600">
                  Test different input strings against the selected automaton to see if they're accepted.
                </p>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
        {selectedAutomaton.data && selectedAutomaton.type ? (
          <StringValidator
            automaton={selectedAutomaton.data}
            type={selectedAutomaton.type}
                    onSimulationStateChange={handleStateChange}
          />
        ) : (
          <div className="bg-blue-50 p-6 rounded-lg shadow-sm text-center">
            <p className="text-blue-600">
              Please select an automaton type from the table above to validate strings.
            </p>
          </div>
        )}
              </div>
      </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;