import { graphviz } from 'd3-graphviz';

export interface DFA {
  states: string[];
  alphabet: string[];
  start_state: string;
  end_states: string[];
  transitions: Record<string, string>;
}

export interface StateCheck {
  state: string;
  isValid: boolean;
}

export interface CFG {
  productions: string[];
  start_symbol: string;
}

export interface PDA {
  states: string[];
  alphabet: string[];
  start_state: string;
  push_states: (string | null)[];
  pop_states: (string | null)[];
  accept_states: string[];
  transitions: Record<string, string>;
}

export const DFA_1 = {
  states: [
    "q0", "q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8", "q10", "q11", "q12", "q13",
    "q14", "q15", "q16", "q17", "q18", "q19", "q20", "q21", "q22", "q23", "q24", "q25", "q26", "q27", "T"
  ],
  alphabet: ["a", "b"],
  start_state: "q0",
  end_states: ["q23", "q24", "q25", "q26"],
  transitions: {
    "q0,a": "q2",
    "q0,b": "q1",
    "q1,a": "q3",
    "q1,b": "T",
    "q2,a": "T",
    "q2,b": "q3",
    "q3,a": "q4",
    "q3,b": "q6",
    "q4,a": "q8",
    "q4,b": "q5",
    "q5,a": "q10",
    "q5,b": "q6",
    "q6,a": "q3",
    "q6,b": "q7",
    "q7,a": "T",
    "q7,b": "q10",
    "q8,a": "q10",
    "q8,b": "T",
    "q10,a": "q10",
    "q10,b": "q14",
    "q11,a": "q8",
    "q11,b": "q12",
    "q12,a": "q11",
    "q12,b": "q13",
    "q13,a": "q15",
    "q13,b": "q19",
    "q14,a": "q15",
    "q14,b": "q14",
    "q15,a": "q16",
    "q15,b": "q12",
    "q16,a": "q17",
    "q16,b": "q18",
    "q17,a": "q19",
    "q17,b": "q18",
    "q18,a": "q11",
    "q18,b": "q19",
    "q19,a": "q22",
    "q19,b": "q20",
    "q20,a": "q21",
    "q20,b": "q24",
    "q21,a": "q23",
    "q21,b": "q25",
    "q22,a": "q23",
    "q22,b": "q27",
    "q23,a": "q23",
    "q23,b": "q27",
    "q24,a": "q21",
    "q24,b": "q24",
    "q25,a": "q26",
    "q25,b": "q24",
    "q26,a": "q23",
    "q26,b": "q25",
    "q27,a": "q26",
    "q27,b": "q22",
    "T,a": "T",
    "T,b": "T"
  }
};

export const DFA_2: DFA = {
  states: [
    "q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8", "q9", "q10", "q11", "q12", "q13", "q14", "q15", "q16",
    "q17", "q18", "q19", "q20", "q21", "q22", "q23", "q24", "q25", "q26", "q27", "q28", "q29", "q30",
    "q31", "q32", "q33"
  ],
  alphabet: ["1", "0"],
  start_state: "q1",
  end_states: ["q33"],
  transitions: {
    "q1,1": "q2",
    "q1,0": "q2",
    "q2,1": "q3",
    "q2,0": "q4",
    "q3,1": "q5",
    "q3,0": "q4",
    "q4,0": "q25",
    "q4,1": "q3",
    "q5,0": "q28",
    "q5,1": "q6",
    "q6,1": "q7",
    "q6,0": "q8",
    "q7,1": "q11",
    "q7,0": "q8",
    "q8,0": "q9",
    "q8,1": "q10",
    "q9,0": "q13",
    "q9,1": "q15",
    "q10,1": "q16",
    "q10,0": "q21",
    "q11,1": "q11",
    "q11,0": "q12",
    "q12,0": "q18",
    "q12,1": "q31",
    "q13,1": "q30",
    "q13,0": "q14",
    "q14,0": "q14",
    "q14,1": "q15",
    "q15,1": "q16",
    "q15,0": "q32",
    "q16,1": "q11",
    "q16,0": "q17",
    "q17,1": "q20",
    "q17,0": "q18",
    "q18,1": "q19",
    "q18,0": "q33",
    "q19,1": "q33",
    "q19,0": "q32",
    "q20,1": "q33",
    "q20,0": "q4",
    "q21,1": "q20",
    "q21,0": "q22",
    "q22,0": "q33",
    "q22,1": "q23",
    "q23,0": "q24",
    "q23,1": "q33",
    "q24,1": "q10",
    "q24,0": "q25",
    "q25,1": "q26",
    "q25,0": "q13",
    "q26,0": "q24",
    "q26,1": "q27",
    "q27,0": "q28",
    "q27,1": "q11",
    "q28,1": "q29",
    "q28,0": "q9",
    "q29,0": "q4",
    "q29,1": "q16",
    "q30,1": "q16",
    "q30,0": "q24",
    "q31,1": "q33",
    "q31,0": "q21",
    "q32,1": "q31",
    "q32,0": "q22",
    "q33,0": "q33",
    "q33,1": "q33"
  }
};

export const CFG_2: CFG = {
  start_symbol: 'S',
  productions: [
    'S → A B C D E F A I J K L',
    'A → 111 | 000 | 101 | 001 | 00G',
    'B → 7B | 0B | λ',
    'C → 1 | 00',
    'D → 1100 | 100D | λ',
    'E → 101F | 111 | 000F | λ',
    'F → G',
    'G → C',
    'H → 11011',
    'I → 111I',
    'J → 0 | 10J',
    'K → K | 0K | 01 | 1',
    'L → B'
  ]
};

export const CFG_1: CFG = {
  start_symbol: 'S',
  productions: [
    'S → A B C D E F G H I J K',
    'A → a b | b a',
    'B → a b B | b a B | λ',
    'C → a a a | b b b | a b a',
    'D → a D | b D | λ',
    'E → b | b E',
    'F → a | a F',
    'G → a | b',
    'H → a a | b b',
    'I → D',
    'J → H | a b a | b a b',
    'K → J K | λ'
  ]
};

export const PDA_1: PDA = {
  states: ["Start", "Read1", "Read2", "Read3", "Read4", "Read5", "Read6", "Read7",
    "Read8", "Read9", "Read10", "Read11", "Read12", "Read13", "Accept1", "Accept2"],
  alphabet: ["a", "b"],
  start_state: "Start",
  push_states: [null],
  pop_states: [null],
  accept_states: ["Accept1", "Accept2"],
  transitions: {
    "Start,": "Read1",
    "Read1,a": "Read2",
    "Read1,b": "Read3",
    "Read2,b": "Read4",
    "Read3,a": "Read5",
    "Read4,a": "Read6",
    "Read5,b": "Read6",
    "Read6,b": "Read7",
    "Read7,a": "Read8",
    "Read8,b": "Read9",
    "Read9,a": "Read10",
    "Read9,b": "Read11",
    "Read10,b": "Read12",
    "Read11,a": "Read13",
    "Read10,": "Accept1",
    "Read11,": "Accept1",
    "Read12,a,b,": "Accept2",
    "Read13,a,b,": "Accept2",
    "Read6,a": "Read6",
    "Read7,b": "Read7",
    "Read8,a": "Read6",
    "Read10,a": "Read10",
    "Read11,b": "Read11",
  }
};

export const PDA_2: PDA = {
  states: ["Start", "Read1", "Read2", "Read3", "Read4", "Read5", "Read6", "Read7", "Read8", "Accept"],
  alphabet: ["1", "0"],
  start_state: "Start",
  push_states: [null],
  pop_states: [null],
  accept_states: ["Accept"],
  transitions: {
    "Start,": "Read1",
    "Read1,0,1": "Read2",
    "Read2,0": "Read3",
    "Read2,1": "Read4",
    "Read3,0": "Read5",
    "Read3,1": "Read4",
    "Read4,0": "Read7",
    "Read4,1": "Read6",
    "Read6,0": "Read7",
    "Read5,0": "Read8",
    "Read5,1": "Read4",
    "Read6,1": "Read8",
    "Read7,1": "Read8",
    "Read7,0": "Read3",
    "Read8,0,1": "Read8",
    "Read8,": "Accept",
  }
};

export function generateDotGraph(automaton: DFA | PDA, highlightedState?: string, color: string = 'yellow'): string {
  let dot = 'digraph G {\n';

  // Set layout direction based on automaton type
  if ('push_states' in automaton) {
    // For PDA, set top-to-bottom layout
    dot += '  rankdir=TB;\n';
    dot += '  node [shape=diamond];\n'; // Default shape for PDA states
  } else {
    // For DFA, keep left-to-right layout
    dot += '  rankdir=LR;\n';
    dot += '  node [shape=circle];\n';
  }

  // Add nodes
  const states = 'states' in automaton ? automaton.states : [];
  const endStates = 'end_states' in automaton ? automaton.end_states :
    'accept_states' in automaton ? automaton.accept_states : [];

  // Create invisible edge from a special node to start state for consistent positioning
  if ('push_states' in automaton) {
    dot += '  start [shape=none, label=""];\n';
    dot += `  start -> ${automaton.start_state} [label="start"];\n`;

    // Set specific shapes for PDA states
    states.forEach(state => {
      let shape = 'diamond'; // Default shape
      let attributes = [];

      if (state === automaton.start_state || automaton.accept_states.includes(state)) {
        shape = 'ellipse';
      } else if (automaton.push_states.includes(state)) {
        shape = 'rectangle';
      }

      if (state === highlightedState) {
        attributes.push(`style=filled`, `fillcolor="${color}"`);
      }

      if (automaton.accept_states.includes(state)) {
        attributes.push('peripheries=2');
      }

      attributes.push(`shape=${shape}`);
      dot += `  "${state}" [${attributes.join(', ')}];\n`;
    });
  } else {
    // DFA styling
    states.forEach(state => {
      let nodeAttributes = [];
      if (endStates.includes(state)) {
        nodeAttributes.push('shape=doublecircle');
      }
      if (state === highlightedState) {
        nodeAttributes.push(`style=filled`, `fillcolor="${color}"`);
      }
      dot += `  "${state}" [${nodeAttributes.join(', ')}];\n`;
    });
  }

  // Add transitions
  if ('transitions' in automaton) {
    Object.entries(automaton.transitions).forEach(([key, value]) => {
      const [source, symbol] = key.split(',');
      const label = symbol || 'ε';
      dot += `  "${source}" -> "${value}" [label="${label}"];\n`;
    });
  }

  dot += '}';
  return dot;
}

export function generateCFGGraph(cfg: CFG): string {
  let dot = 'digraph G {\n';
  dot += '  node [shape=rectangle];\n';

  // Create nodes for each production
  cfg.productions.forEach((prod, i) => {
    const [lhs, rhs] = prod.split('->').map(s => s.trim());
    dot += `  "${prod}" [label="${prod}"];\n`;

    // Connect related productions
    if (i > 0) {
      const prevProd = cfg.productions[i - 1];
      dot += `  "${prevProd}" -> "${prod}" [style=invis];\n`;
    }
  });

  dot += '}';
  return dot;
}

export function validateString(dfa: DFA, input: string): { isValid: boolean; stateChecks: StateCheck[] } {
  const stateChecks: StateCheck[] = [];
  let currentState = dfa.start_state;
  stateChecks.push({ state: currentState, isValid: true });

  for (const char of input) {
    const transition = `${currentState},${char}`;
    if (!dfa.transitions[transition]) {
      stateChecks.push({ state: currentState, isValid: false });
      return { isValid: false, stateChecks };
    }
    currentState = dfa.transitions[transition];
    stateChecks.push({ state: currentState, isValid: true });
  }

  const isValid = dfa.end_states.includes(currentState);
  stateChecks[stateChecks.length - 1].isValid = isValid;

  return { isValid, stateChecks };
}

export function validatePDA(pda: PDA, input: string): { isValid: boolean; stateChecks: StateCheck[] } {
  const stateChecks: StateCheck[] = [];
  let currentState = pda.start_state;
  stateChecks.push({ state: currentState, isValid: true });

  for (const char of input) {
    const transition = `${currentState},${char}`;
    if (!pda.transitions[transition]) {
      const epsilonTransition = `${currentState},`;
      if (!pda.transitions[epsilonTransition]) {
        stateChecks.push({ state: currentState, isValid: false });
        return { isValid: false, stateChecks };
      }
      currentState = pda.transitions[epsilonTransition];
    } else {
      currentState = pda.transitions[transition];
    }
    stateChecks.push({ state: currentState, isValid: true });
  }

  // Check for epsilon transitions at the end
  const epsilonTransition = `${currentState},`;
  if (pda.transitions[epsilonTransition]) {
    currentState = pda.transitions[epsilonTransition];
    stateChecks.push({ state: currentState, isValid: true });
  }

  const isValid = pda.accept_states.includes(currentState);
  stateChecks[stateChecks.length - 1].isValid = isValid;

  return { isValid, stateChecks };
}

export function validateCFG(cfg: CFG, input: string): boolean {
  // This is a simplified validation that checks if the input matches the basic pattern
  // A full CFG validation would require a more complex parsing algorithm
  const firstProd = cfg.productions[0];
  if (firstProd.includes('101') || firstProd.includes('111')) {
    return /^[01]+$/.test(input);
  } else {
    return /^[ab]+$/.test(input);
  }
}