import { useState, useEffect } from 'react';
import { 
  DFA, 
  CFG, 
  PDA, 
  validateString, 
  validatePDA, 
  validateCFG
} from '../types/automata';
import { Play, Pause, FileText, Check, X, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';

interface StringValidatorProps {
  automaton: DFA | CFG | PDA;
  type: 'DFA' | 'CFG' | 'PDA';
  onSimulationStateChange?: (state: string | null) => void;
}

interface ValidationResult {
  input: string;
  isValid: boolean;
  states?: {
    state: string;
    isValid: boolean;
  }[];
}

const StringValidator = ({ automaton, type, onSimulationStateChange }: StringValidatorProps) => {
  const [inputStrings, setInputStrings] = useState<string>('');
  const [validationResults, setValidationResults] = useState<ValidationResult[]>([]);
  const [simulationIndex, setSimulationIndex] = useState<number | null>(null);
  const [currentStateIndex, setCurrentStateIndex] = useState<number>(0);
  const [simulationInterval, setSimulationInterval] = useState<number | null>(null);
  const [simulationInProgress, setSimulationInProgress] = useState<boolean>(false);
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isPaused, setIsPaused] = useState<boolean>(false);

  useEffect(() => {
    return () => {
      if (simulationInterval) {
        clearInterval(simulationInterval);
      }
    };
  }, [simulationInterval]);

  const isValidInput = (input: string): boolean => {
    if (type === 'DFA' || type === 'PDA') {
      const alphabet = (automaton as DFA | PDA).alphabet;
      for (const char of input) {
        if (!alphabet.includes(char)) {
          return false;
        }
      }
    }
    return true;
  };

  const validateStrings = () => {
    const strings = inputStrings.trim().split('\n').filter(s => s.trim() !== '');
    const results: ValidationResult[] = [];
    let hasInvalidChars = false;
    let invalidString = '';
    let expectedAlphabet = '';

    if (type === 'DFA' || type === 'PDA') {
      expectedAlphabet = (automaton as DFA | PDA).alphabet.join(', ');
    }

    for (const input of strings) {
      if (!isValidInput(input)) {
        hasInvalidChars = true;
        invalidString = input;
        break;
      }
    }

    if (hasInvalidChars) {
      setErrorMessage(`String "${invalidString}" contains characters not in the automaton's alphabet: [${expectedAlphabet}]`);
      setShowErrorModal(true);
      return;
    }

    strings.forEach(input => {
      let result: ValidationResult = {
        input,
        isValid: false
      };

      if (type === 'DFA') {
        const validationResult = validateString(automaton as DFA, input);
        result.isValid = validationResult.isValid;
        result.states = validationResult.stateChecks;
      } else if (type === 'PDA') {
        const validationResult = validatePDA(automaton as PDA, input);
        result.isValid = validationResult.isValid;
        result.states = validationResult.stateChecks;
      } else if (type === 'CFG') {
        result.isValid = validateCFG(automaton as CFG, input);
      }

      results.push(result);
    });

    setValidationResults(results);
    setSimulationIndex(null);
    setCurrentStateIndex(0);
    if (onSimulationStateChange) {
      onSimulationStateChange(null);
    }
  };

  const simulateValidation = (index: number) => {
    if (simulationInterval) {
      clearInterval(simulationInterval);
      setSimulationInterval(null);
      setSimulationInProgress(false);
      setCurrentStateIndex(0);
      setSimulationIndex(null);
      setIsPaused(false);
      if (onSimulationStateChange) {
        onSimulationStateChange(null);
      }
      return;
    }

    setSimulationIndex(index);
    setCurrentStateIndex(0);
    setSimulationInProgress(true);
    setIsPaused(true);

    const states = validationResults[index].states;
    if (!states) return;

    if (onSimulationStateChange) {
      onSimulationStateChange(states[0].state);
    }
  };

  const togglePlayPause = () => {
    if (!simulationInProgress || simulationIndex === null) return;
    
    if (isPaused) {
      const states = validationResults[simulationIndex].states;
      if (!states) return;
      
      let stateIndex = currentStateIndex;
      
      const interval = setInterval(() => {
        stateIndex++;
        
        if (stateIndex >= states.length) {
          clearInterval(interval);
          setSimulationInterval(null);
          setIsPaused(true);
          return;
        }

        if (onSimulationStateChange) {
          onSimulationStateChange(states[stateIndex].state);
        }
        setCurrentStateIndex(stateIndex);
      }, 1000);
      
      setSimulationInterval(interval);
      setIsPaused(false);
    } else {
      if (simulationInterval) {
        clearInterval(simulationInterval);
        setSimulationInterval(null);
      }
      setIsPaused(true);
    }
  };

  const stepBackward = () => {
    if (!simulationInProgress || simulationIndex === null || !isPaused) return;
    
    const states = validationResults[simulationIndex].states;
    if (!states) return;
    
    const newIndex = Math.max(0, currentStateIndex - 1);
    setCurrentStateIndex(newIndex);
    
    if (onSimulationStateChange) {
      onSimulationStateChange(states[newIndex].state);
    }
  };

  const stepForward = () => {
    if (!simulationInProgress || simulationIndex === null || !isPaused) return;
    
    const states = validationResults[simulationIndex].states;
    if (!states) return;
    
    const newIndex = Math.min(states.length - 1, currentStateIndex + 1);
    setCurrentStateIndex(newIndex);
    
    if (onSimulationStateChange) {
      onSimulationStateChange(states[newIndex].state);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {showErrorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md">
            <div className="flex items-center mb-4 text-red-600">
              <AlertCircle size={24} className="mr-2" />
              <h3 className="text-xl font-bold">Invalid Input</h3>
            </div>
            <p className="mb-4">{errorMessage}</p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowErrorModal(false)}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gray-50 py-3 px-6 border-b flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-800">Input Strings</h3>
            <button
              onClick={validateStrings}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <FileText size={16} />
              <span>Validate</span>
            </button>
          </div>
          <div className="p-4">
            <textarea
              className="w-full h-64 p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
              placeholder="Enter strings to validate, one per line"
              value={inputStrings}
              onChange={(e) => setInputStrings(e.target.value)}
            ></textarea>
            <p className="mt-2 text-gray-600 text-sm">
              {type === 'DFA' || type === 'PDA' ? 
                `Enter one string per line using only characters from the alphabet: [${(automaton as DFA | PDA).alphabet.join(', ')}]` : 
                'Enter one string per line. For example, "101010" or "ababa" depending on the automaton.'}
            </p>
          </div>
        </div>
      </div>
      
      <div>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gray-50 py-3 px-6 border-b">
            <h3 className="text-lg font-medium text-gray-800">Validation Results</h3>
          </div>
          <div className="p-4">
            {validationResults.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No strings validated yet. Enter strings and click "Validate".
              </div>
            ) : (
              <div className="space-y-3">
                {validationResults.map((result, index) => (
                  <div 
                    key={index}
                    className={`p-4 rounded-lg border ${
                      result.isValid 
                        ? 'bg-green-50 border-green-200' 
                        : 'bg-red-50 border-red-200'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        {result.isValid ? (
                          <Check size={18} className="text-green-500" />
                        ) : (
                          <X size={18} className="text-red-500" />
                        )}
                        <div className="font-mono">{result.input}</div>
                      </div>
                      <div className="flex items-center">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          result.isValid 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {result.isValid ? 'Valid' : 'Invalid'}
                        </span>
                        {result.states && (
                          <button
                            onClick={() => simulateValidation(index)}
                            className={`ml-3 px-3 py-1 rounded-md text-xs font-medium flex items-center space-x-1 ${
                              simulationIndex === index && simulationInProgress
                                ? 'bg-red-100 text-red-800 hover:bg-red-200'
                                : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                            }`}
                          >
                            <Play size={12} />
                            <span>
                              {simulationIndex === index && simulationInProgress
                                ? 'Stop'
                                : 'Simulate'
                              }
                            </span>
                          </button>
                        )}
                      </div>
                    </div>
                    
                    {simulationIndex === index && simulationInProgress && (
                      <div className="mt-3 flex items-center justify-center space-x-3 pt-3 border-t border-gray-200">
                        <button 
                          onClick={stepBackward}
                          disabled={!isPaused || currentStateIndex === 0}
                          className={`p-2 rounded-full ${!isPaused || currentStateIndex === 0 ? 'text-gray-300' : 'text-blue-600 hover:bg-blue-100'}`}
                        >
                          <ChevronLeft size={20} />
                        </button>
                        
                        <button
                          onClick={togglePlayPause}
                          className="p-2 rounded-full text-blue-600 hover:bg-blue-100"
                        >
                          {isPaused ? <Play size={20} /> : <Pause size={20} />}
                        </button>
                        
                        <button 
                          onClick={stepForward}
                          disabled={!isPaused || !result.states || currentStateIndex === result.states.length - 1}
                          className={`p-2 rounded-full ${!isPaused || !result.states || currentStateIndex === result.states.length - 1 ? 'text-gray-300' : 'text-blue-600 hover:bg-blue-100'}`}
                        >
                          <ChevronRight size={20} />
                        </button>
                        
                        <div className="text-sm text-gray-600 ml-2">
                          Step {currentStateIndex + 1} of {result.states ? result.states.length : '?'}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StringValidator;