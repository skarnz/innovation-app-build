
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import AiAgent from '@/components/AiAgent';

const GenerativeVideo = () => {
  return (
    <div className="min-h-screen bg-navy pb-20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="flex items-center gap-2 text-white/60 mb-4">
            <Link to="/project/marketing" className="hover:text-white flex items-center gap-1">
              <ArrowLeft size={16} />
              Back to Marketing
            </Link>
            <span>/</span>
            <span>Generative Video</span>
          </div>
          
          <div>
            <h1 className="text-3xl md:text-4xl font-orbitron font-bold text-electric-blue mb-2">
              Generative Video
            </h1>
            <p className="text-white/70">
              Create product demos and promotional videos using AI
            </p>
          </div>
        </div>
        
        <div className="glass-card p-6">
          <div className="flex flex-col items-center justify-center text-center py-12">
            <h2 className="text-2xl font-medium text-white mb-4">Video Generation Tools Coming Soon</h2>
            <p className="text-white/70 max-w-2xl mb-6">
              Our AI-powered video generation tools are currently under development. Soon you'll be able to create
              pitch videos, product demos, and promotional content using integrated AI tools.
            </p>
          </div>
        </div>
      </div>
      
      <AiAgent />
    </div>
  );
};

export default GenerativeVideo;
