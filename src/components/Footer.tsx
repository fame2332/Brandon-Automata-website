import { Binary, Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Binary className="w-5 h-5 text-blue-400 mr-2" />
            <span className="text-md font-bold">Automata Theory Project</span>
          </div>
          
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-blue-400 transition">
              <Github size={18} />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400 transition">
              <Twitter size={18} />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400 transition">
              <Linkedin size={18} />
            </a>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-4 pt-4 text-center text-gray-500 text-xs">
          <p>&copy; {new Date().getFullYear()} Automata Theory Project</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;