
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import AiAgent from '@/components/AiAgent';

const SupabaseIntegration = () => {
  return (
    <div className="min-h-screen bg-navy pb-20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="flex items-center gap-2 text-white/60 mb-4">
            <Link to="/project/launch" className="hover:text-white flex items-center gap-1">
              <ArrowLeft size={16} />
              Back to Launch
            </Link>
            <span>/</span>
            <span>Supabase Integration</span>
          </div>
          
          <div>
            <h1 className="text-3xl md:text-4xl font-orbitron font-bold text-electric-blue mb-2">
              Supabase Integration
            </h1>
            <p className="text-white/70">
              Connect your project to Supabase for backend services
            </p>
          </div>
        </div>
        
        <div className="glass-card p-6">
          <div className="flex flex-col items-center justify-center text-center py-12">
            <h2 className="text-2xl font-medium text-white mb-4">Supabase Integration Coming Soon</h2>
            <p className="text-white/70 max-w-2xl mb-6">
              Our Supabase integration tools are currently under development. Soon you'll be able to connect your project
              to Supabase for authentication, database, storage, and other backend services.
            </p>
          </div>
        </div>
      </div>
      
      <AiAgent />
    </div>
  );
};

export default SupabaseIntegration;
