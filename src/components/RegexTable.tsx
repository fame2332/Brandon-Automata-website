import { useState } from 'react';
import { DFA, CFG, PDA } from '../types/automata';

interface RegexSample {
  id: number;
  regex: string;
  dfa: DFA;
  cfg: CFG;
  pda: PDA;
}

interface RegexTableProps {
  regexSamples: RegexSample[];
  onViewAutomaton: (type: 'DFA' | 'CFG' | 'PDA', id: number) => void;
}

const RegexTable = ({ regexSamples, onViewAutomaton }: RegexTableProps) => {
  // Track which cell is active to show the highlight effect
  const [activeCell, setActiveCell] = useState<{id: number, type: string} | null>(null);

  return (
    <div className="overflow-x-auto rounded-lg shadow-lg">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th className="py-3 px-4 text-left w-3/5">REGEX</th>
            <th className="py-3 px-1 text-center">DFA</th>
            <th className="py-3 px-1 text-center">CFG</th>
            <th className="py-3 px-1 text-center">PDA</th>
          </tr>
        </thead>
        <tbody>
          {regexSamples.map((sample) => (
            <tr 
              key={sample.id} 
              className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <td className="py-3 px-4">
                <div className="font-mono text-base whitespace-nowrap overflow-x-auto">{sample.regex}</div>
              </td>
              <td className="py-1 px-1 text-center">
                <button
                  onClick={() => {
                    onViewAutomaton('DFA', sample.id);
                    setActiveCell({id: sample.id, type: 'DFA'});
                  }}
                  className={`px-3 py-1 text-base rounded-md transition-colors ${
                    activeCell?.id === sample.id && activeCell?.type === 'DFA'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 hover:bg-blue-100 text-gray-800'
                  }`}
                >
                  View
                </button>
              </td>
              <td className="py-1 px-1 text-center">
                <button
                  onClick={() => {
                    onViewAutomaton('CFG', sample.id);
                    setActiveCell({id: sample.id, type: 'CFG'});
                  }}
                  className={`px-3 py-1 text-base rounded-md transition-colors ${
                    activeCell?.id === sample.id && activeCell?.type === 'CFG'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 hover:bg-blue-100 text-gray-800'
                  }`}
                >
                  View
                </button>
              </td>
              <td className="py-1 px-1 text-center">
                <button
                  onClick={() => {
                    onViewAutomaton('PDA', sample.id);
                    setActiveCell({id: sample.id, type: 'PDA'});
                  }}
                  className={`px-3 py-1 text-base rounded-md transition-colors ${
                    activeCell?.id === sample.id && activeCell?.type === 'PDA'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 hover:bg-blue-100 text-gray-800'
                  }`}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RegexTable;