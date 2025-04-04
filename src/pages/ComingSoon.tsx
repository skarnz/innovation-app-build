import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface ComingSoonProps {
  featureName?: string;
}

export default function ComingSoon({ featureName = "Feature" }: ComingSoonProps) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-140px)] text-center px-4">
      <h1 className="text-4xl font-bold mb-4 text-slate-light">Coming Soon!</h1>
      <p className="text-lg text-slate-dark mb-8">
        The "{featureName}" section is currently under construction.
      </p>
      <div className="flex gap-4">
        <Button variant="outline" onClick={() => navigate(-1)} className="border-navy-medium bg-navy-dark text-slate-light hover:bg-navy-light">
          <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
        </Button>
        <Link to="/dashboard">
          <Button className="bg-accent-blue hover:bg-accent-purple text-navy-darkest font-semibold">
             Go to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
} 