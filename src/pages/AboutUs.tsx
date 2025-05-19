import { Award, BookOpen, Cpu, Server, CheckCircle } from 'lucide-react';

const AboutUs = () => {
  const milestones = [
    {
      year: 'March',
      title: 'Project Planning',
      description: 'Initial planning and design of the automata theory visualization project began with requirement gathering.'
    },
    {
      year: 'April',
      title: 'Development Phase',
      description: 'Core algorithms and user interface development for automata visualization and validation.'
    },
    {
      year: 'May',
      title: 'Public Release',
      description: 'The project is officially released as an educational tool for computer science students.'
    }
  ];

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-b from-white via-blue-50 to-white">
      <div className="max-w-5xl mx-auto px-4">
        <section className="mb-16 text-center">
          <h1 className="text-4xl font-bold mb-5 relative inline-block">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700">
              About Our Project
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            The Automata Theory Project is an educational tool designed to help students and educators
            visualize and understand the fundamental concepts of automata theory and formal languages.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <CheckCircle className="w-6 h-6 text-blue-600 mr-2" />
            <span>Our Mission</span>
          </h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition hover:shadow-lg">
            <div className="h-2 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
            <div className="p-8">
              <p className="text-gray-700 leading-relaxed mb-6">
                Our mission is to make complex concepts in theoretical computer science accessible through
                interactive visualizations and simulations. We believe that visual learning enhances understanding
                and retention of abstract concepts like finite automata, context-free grammars, and pushdown automata.
              </p>
              <p className="text-gray-700 leading-relaxed">
                By providing tools for students to experiment with these concepts, we aim to demystify
                automata theory and inspire the next generation of computer scientists and language theorists.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <CheckCircle className="w-6 h-6 text-blue-600 mr-2" />
            <span>Features</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition hover:shadow-lg hover:-translate-y-1">
              <div className="h-2 bg-gradient-to-r from-blue-500 to-blue-600"></div>
              <div className="p-6 flex items-start">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 rounded-lg mr-4">
                  <Cpu className="text-blue-600 w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">DFA Visualization</h3>
                  <p className="text-gray-600">
                    Interactive visualizations of deterministic finite automata with state transitions and acceptance conditions.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition hover:shadow-lg hover:-translate-y-1">
              <div className="h-2 bg-gradient-to-r from-indigo-500 to-indigo-600"></div>
              <div className="p-6 flex items-start">
                <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-3 rounded-lg mr-4">
                  <BookOpen className="text-indigo-600 w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">CFG Representation</h3>
                  <p className="text-gray-600">
                    Clear representation of context-free grammars and their production rules.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition hover:shadow-lg hover:-translate-y-1">
              <div className="h-2 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
              <div className="p-6 flex items-start">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-3 rounded-lg mr-4">
                  <Server className="text-indigo-600 w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">PDA Simulation</h3>
                  <p className="text-gray-600">
                    Step-by-step simulation of pushdown automata with stack operations.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition hover:shadow-lg hover:-translate-y-1">
              <div className="h-2 bg-gradient-to-r from-blue-500 to-blue-600"></div>
              <div className="p-6 flex items-start">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 rounded-lg mr-4">
                  <Award className="text-blue-600 w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">String Validation</h3>
                  <p className="text-gray-600">
                    Validate strings against automata models with detailed step-by-step analysis.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center">
            <CheckCircle className="w-6 h-6 text-blue-600 mr-2" />
            <span>Project Timeline</span>
          </h2>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 h-full w-1 bg-gradient-to-b from-blue-500 via-indigo-500 to-blue-500 rounded-full transform -translate-x-1/2"></div>
            
            {/* Timeline items */}
            <div className="space-y-16">
              {milestones.map((milestone, index) => (
                <div key={index} className="relative">
                  <div className={`flex flex-col md:flex-row items-center ${
                    index % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}>
                    {/* Date bubble */}
                    <div className="absolute left-8 md:left-1/2 w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold transform -translate-x-1/2 z-10 shadow-lg">
                      {milestone.year}
                    </div>
                    
                    {/* Content */}
                    <div className={`bg-white rounded-lg shadow-md overflow-hidden w-full md:w-5/12 transform transition hover:shadow-lg ${
                      index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'
                    } ml-24 md:ml-0`}>
                      <div className={`h-2 ${index % 2 === 0 ? 'bg-gradient-to-r from-blue-500 to-indigo-600' : 'bg-gradient-to-r from-indigo-600 to-blue-500'}`}></div>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">{milestone.title}</h3>
                        <p className="text-gray-600">{milestone.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;