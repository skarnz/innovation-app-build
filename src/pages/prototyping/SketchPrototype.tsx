
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import AiAgent from '@/components/AiAgent';

const SketchPrototype = () => {
  return (
    <div className="min-h-screen bg-navy pb-20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="flex items-center gap-2 text-white/60 mb-4">
            <Link to="/project/prototype" className="hover:text-white flex items-center gap-1">
              <ArrowLeft size={16} />
              Back to Prototyping
            </Link>
            <span>/</span>
            <span>Sketch Prototype</span>
          </div>
          
          <div>
            <h1 className="text-3xl md:text-4xl font-orbitron font-bold text-electric-blue mb-2">
              Sketch Prototype
            </h1>
            <p className="text-white/70">
              Create and manage basic sketches and 2D concept drawings
            </p>
          </div>
        </div>
        
        <div className="glass-card p-6">
          <div className="flex flex-col items-center justify-center text-center py-12">
            <h2 className="text-2xl font-medium text-white mb-4">Sketch Tools Coming Soon</h2>
            <p className="text-white/70 max-w-2xl mb-6">
              Our sketching and 2D concept drawing tools are currently under development. Soon you'll be able to create, upload,
              and manage sketches and concept drawings for your project.
            </p>
          </div>
        </div>
      </div>
      
      <AiAgent />
    </div>
  );
};

export default SketchPrototype;
