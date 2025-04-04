
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import AiAgent from '@/components/AiAgent';

const Resources = () => {
  return (
    <div className="min-h-screen bg-navy pb-20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="flex items-center gap-2 text-white/60 mb-4">
            <Link to="/project/mvp" className="hover:text-white flex items-center gap-1">
              <ArrowLeft size={16} />
              Back to MVP Specification
            </Link>
            <span>/</span>
            <span>Resources & Team</span>
          </div>
          
          <div>
            <h1 className="text-3xl md:text-4xl font-orbitron font-bold text-electric-blue mb-2">
              Resources & Team
            </h1>
            <p className="text-white/70">
              Define the resources and team members needed for your MVP
            </p>
          </div>
        </div>
        
        <div className="glass-card p-6">
          <div className="flex flex-col items-center justify-center text-center py-12">
            <h2 className="text-2xl font-medium text-white mb-4">Resource Planning Tools Coming Soon</h2>
            <p className="text-white/70 max-w-2xl mb-6">
              Our resource and team planning tools are currently under development. Soon you'll be able to define
              the team members, skills, and resources needed for your MVP, along with budget estimates and allocation.
            </p>
          </div>
        </div>
      </div>
      
      <AiAgent />
    </div>
  );
};

export default Resources;
