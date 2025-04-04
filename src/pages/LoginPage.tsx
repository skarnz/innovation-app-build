
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Navbar from '@/components/Navbar';
import { Github } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Authentication logic would go here
    console.log('Login attempt with:', email);
  };
  
  return (
    <div className="min-h-screen bg-navy">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-md mx-auto glass-card p-8">
          <h1 className="text-3xl font-orbitron font-bold text-center mb-8 text-gradient">
            Welcome Back
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white/90 mb-1">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-navy-light border-white/10 text-white w-full"
                placeholder="you@example.com"
              />
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="password" className="block text-sm font-medium text-white/90">
                  Password
                </label>
                <Link to="/forgot-password" className="text-sm text-electric-blue hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-navy-light border-white/10 text-white w-full"
                placeholder="••••••••"
              />
            </div>
            
            <Button type="submit" className="w-full bg-electric-blue hover:bg-electric-blue/90">
              Log in
            </Button>
          </form>
          
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-navy-light text-white/60">Or continue with</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="w-full flex items-center justify-center gap-2 bg-transparent border-white/20 text-white hover:bg-white/5">
              <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.0003 2C6.47731 2 2.00031 6.477 2.00031 12C2.00031 16.991 5.65731 21.128 10.4373 21.879V14.89H7.89931V12H10.4373V9.797C10.4373 7.291 11.9323 5.907 14.2153 5.907C15.3103 5.907 16.4543 6.102 16.4543 6.102V8.562H15.1913C13.9503 8.562 13.5633 9.333 13.5633 10.124V12H16.3363L15.8933 14.89H13.5633V21.879C18.3433 21.129 22.0003 16.99 22.0003 12C22.0003 6.477 17.5233 2 12.0003 2Z" fill="currentColor"/></svg>
              Google
            </Button>
            <Button variant="outline" className="w-full flex items-center justify-center gap-2 bg-transparent border-white/20 text-white hover:bg-white/5">
              <Github size={20} />
              GitHub
            </Button>
          </div>
          
          <p className="mt-8 text-center text-sm text-white/60">
            Don't have an account?{' '}
            <Link to="/signup" className="text-electric-blue hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
