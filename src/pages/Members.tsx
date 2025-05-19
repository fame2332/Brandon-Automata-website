import { useState, useEffect } from 'react';
import { Mail, Github, Globe } from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  email: string;
  github: string;
  website: string;
  bio: string;
  image: string;
  specialty: string;
}

const teamMembers: TeamMember[] = [
  {
    name: 'Matthew Echavez',
    role: 'Lead Developer',
    email: 'matthew@example.com',
    github: 'matthewechavez',
    website: 'matthewechavez.dev',
    bio: 'Specializes in automata theory and formal language ',
    image: '/images/Echavez.jpg',
    specialty: 'DFA Implementation'
  },
  {
    name: 'Brandon Seducon',
    role: 'Algorithm Specialist',
    email: 'brandon@example.com',
    github: 'brandonseducon',
    website: 'brandonseducon.tech',
    bio: 'Developed core algorithms for string validation and simulation. ',
    image: '/images/brandon.jpg',
    specialty: 'Algorithms & Automata'
  },
  {
    name: 'Lauren Sotong',
    role: 'UI/UX Designer',
    email: 'lauren@example.com',
    github: 'laurensotong',
    website: 'laurensotong.design',
    bio: 'Created the interface and user experience design.',
    image: '/images/ayen.jpg',
    specialty: 'User Experience'
  },
  {
    name: 'Vanjo Geraldez',
    role: 'Frontend Developer',
    email: 'vanjo@example.com',
    github: 'vanjogeraldez',
    website: 'vanjogeraldez.dev',
    bio: 'Specialized in creating responsive and interactive',
    image: '/images/Vanjo.png',
    specialty: 'Frontend Development'
  }
];

const Members = () => {
  const [visibleMembers, setVisibleMembers] = useState<number[]>([]);

  useEffect(() => {
    const showMembersSequentially = () => {
      const timer = setTimeout(() => {
        setVisibleMembers([0, 1, 2, 3]);
      }, 300);

      return () => clearTimeout(timer);
    };

    showMembersSequentially();
  }, []);

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-b from-white via-blue-50 to-white">
      <div className="max-w-6xl mx-auto px-4">
        <section className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 relative inline-block">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700">
              Our Team
            </span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Meet the team behind this Automata Theory project, bringing unique expertise to make theoretical concepts accessible.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div 
              key={index}
              className={`bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-500 ease-out ${
                visibleMembers.includes(index) 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-16 opacity-0'
              } hover:shadow-lg hover:-translate-y-1 transition-all`}
            >
              <div className="h-64 overflow-hidden">
                <img 
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                />
              </div>
              
              <div className="p-5 border-t border-blue-50">
                <div className="text-xs font-semibold uppercase text-blue-600 mb-1">{member.specialty}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
                <p className="text-blue-700 font-medium text-sm mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{member.bio}</p>
                
                <div className="flex space-x-4 text-gray-500">
                  <a 
                    href={`mailto:${member.email}`} 
                    className="hover:text-blue-600 transition-colors"
                    title={member.email}
                  >
                    <Mail size={18} />
                  </a>
                  <a 
                    href={`https://github.com/${member.github}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-gray-800 transition-colors"
                    title={`github.com/${member.github}`}
                  >
                    <Github size={18} />
                  </a>
                  <a 
                    href={`https://${member.website}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-blue-600 transition-colors"
                    title={member.website}
                  >
                    <Globe size={18} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default Members;