
import { useState } from 'react';
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { PieChart, Building2, AlertTriangle, BadgeDollarSign, Settings, BarChart2, TimerIcon, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ScoreCriterion {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
  score: number;
  weight: number;
}

const ProjectScore = () => {
  const [criteria, setCriteria] = useState<ScoreCriterion[]>([
    {
      id: "market-size",
      title: "Market Size",
      description: "Total addressable market and growth potential",
      icon: <Building2 className="text-blue-500" />,
      score: 70,
      weight: 50
    },
    {
      id: "problem-urgency",
      title: "Problem Urgency",
      description: "How pressing is the problem for users",
      icon: <AlertTriangle className="text-red-500" />,
      score: 85,
      weight: 50
    },
    {
      id: "revenue-potential",
      title: "Revenue Potential",
      description: "Expected revenue and monetization clarity",
      icon: <BadgeDollarSign className="text-yellow-500" />,
      score: 45,
      weight: 50
    },
    {
      id: "technical-feasibility",
      title: "Technical Feasibility",
      description: "Ease of implementation and technical risks",
      icon: <Settings className="text-purple-500" />,
      score: 60,
      weight: 50
    },
    {
      id: "competition",
      title: "Competition",
      description: "Market competition and barriers to entry",
      icon: <BarChart2 className="text-green-500" />,
      score: 55,
      weight: 50
    },
    {
      id: "resource-requirements",
      title: "Resource Requirements",
      description: "Time, money, and team needed",
      icon: <PieChart className="text-indigo-500" />,
      score: 40,
      weight: 50
    },
    {
      id: "time-to-market",
      title: "Time to Market",
      description: "Expected development and launch timeline",
      icon: <Clock className="text-orange-500" />,
      score: 50,
      weight: 50
    },
  ]);

  const [globalNote, setGlobalNote] = useState('');

  const handleScoreChange = (id: string, value: number[]) => {
    setCriteria(prev => 
      prev.map(criterion => 
        criterion.id === id ? { ...criterion, score: value[0] } : criterion
      )
    );
  };

  const handleWeightChange = (id: string, value: number[]) => {
    setCriteria(prev => 
      prev.map(criterion => 
        criterion.id === id ? { ...criterion, weight: value[0] } : criterion
      )
    );
  };

  const calculateTotalScore = () => {
    const totalWeight = criteria.reduce((sum, criterion) => sum + criterion.weight, 0);
    
    if (totalWeight === 0) return 0;
    
    const weightedScoreSum = criteria.reduce(
      (sum, criterion) => sum + (criterion.score * criterion.weight), 
      0
    );
    
    return Math.round(weightedScoreSum / totalWeight);
  };

  const totalScore = calculateTotalScore();

  return (
    <div className="min-h-screen bg-navy p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-6 text-sm text-white/60">
          <span>test1</span>
          <span className="mx-2">/</span>
          <span className="text-white">Selection</span>
        </div>
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Selection Phase</h1>
          <p className="text-white/60">
            Evaluate and choose the most promising solution. Define your core value proposition.
          </p>
          
          <button className="mt-4 flex items-center gap-2 px-4 py-2 bg-electric-blue/10 text-electric-blue rounded-lg hover:bg-electric-blue/20 transition-colors">
            <TimerIcon size={18} />
            Open AI Assistant
          </button>
        </div>

        <div className="space-y-6">
          <Card className="bg-navy-light border-white/10">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-white mb-6">Scoring</h2>
              
              <div className="space-y-8">
                {criteria.map((criterion) => (
                  <div key={criterion.id} className="p-4 bg-navy rounded-lg border border-white/5">
                    <div className="flex items-center gap-3 mb-2">
                      {criterion.icon}
                      <div>
                        <h3 className="font-medium text-white">{criterion.title}</h3>
                        <p className="text-sm text-white/60">{criterion.description}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4 mt-4">
                      <div>
                        <div className="flex justify-between text-sm text-white/60 mb-2">
                          <span>Score:</span>
                          <span>{criterion.score}%</span>
                        </div>
                        <Slider
                          value={[criterion.score]}
                          onValueChange={(value) => handleScoreChange(criterion.id, value)}
                          max={100}
                          step={1}
                          className="my-4"
                        />
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm text-white/60 mb-2">
                          <span>Weight:</span>
                          <span>{criterion.weight}%</span>
                        </div>
                        <Slider
                          value={[criterion.weight]}
                          onValueChange={(value) => handleWeightChange(criterion.id, value)}
                          max={100}
                          step={1}
                          className="my-4"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <div className="p-4 bg-navy rounded-lg border border-white/5">
                  <h3 className="font-medium text-white mb-3">Global Note</h3>
                  <Textarea
                    value={globalNote}
                    onChange={(e) => setGlobalNote(e.target.value)}
                    placeholder="Add your global notes here..."
                    className="bg-navy-light border-white/10 text-white placeholder:text-white/40"
                  />
                </div>

                <div className="p-4 bg-navy rounded-lg border border-white/5">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-white">Total Score</h3>
                    <span className="text-white/60">{totalScore}%</span>
                  </div>
                  <p className="text-sm text-white/60 mb-3">Weighted average of all criteria</p>
                  <Progress value={totalScore} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProjectScore;
