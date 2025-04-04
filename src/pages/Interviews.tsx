
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mic, UserCheck, Plus, Trash2, MessageSquare, Calendar, Clock, Check, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AiAgent from '@/components/AiAgent';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

type InterviewStatus = 'pending' | 'completed' | 'cancelled';

type InterviewType = {
  id: string;
  name: string;
  date: Date | null;
  status: InterviewStatus;
  notes: string;
  insights: string;
  questions: string[];
};

const Interviews = () => {
  const [interviews, setInterviews] = useState<InterviewType[]>([
    {
      id: '1',
      name: 'John Smith',
      date: new Date(),
      status: 'completed',
      notes: 'John provided valuable insights about the user interface and suggested improvements for the onboarding process.',
      insights: 'Need to simplify the onboarding process. Users are confused by the current flow.',
      questions: [
        'What challenges do you face with similar products?',
        'How would you describe the ideal solution?',
        'What features are most important to you?'
      ]
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      date: new Date(Date.now() + 86400000 * 2), // 2 days from now
      status: 'pending',
      notes: '',
      insights: '',
      questions: [
        'What challenges do you face with similar products?',
        'How would you describe the ideal solution?',
        'What features are most important to you?'
      ]
    }
  ]);
  
  const [selectedInterview, setSelectedInterview] = useState<InterviewType | null>(null);
  const [newQuestion, setNewQuestion] = useState('');
  
  const addQuestion = () => {
    if (!newQuestion.trim() || !selectedInterview) return;
    
    const updatedInterview = {
      ...selectedInterview,
      questions: [...selectedInterview.questions, newQuestion]
    };
    
    setSelectedInterview(updatedInterview);
    setInterviews(interviews.map(interview => 
      interview.id === updatedInterview.id ? updatedInterview : interview
    ));
    
    setNewQuestion('');
  };
  
  const removeQuestion = (index: number) => {
    if (!selectedInterview) return;
    
    const updatedQuestions = [...selectedInterview.questions];
    updatedQuestions.splice(index, 1);
    
    const updatedInterview = {
      ...selectedInterview,
      questions: updatedQuestions
    };
    
    setSelectedInterview(updatedInterview);
    setInterviews(interviews.map(interview => 
      interview.id === updatedInterview.id ? updatedInterview : interview
    ));
  };
  
  const handleNoteChange = (value: string) => {
    if (!selectedInterview) return;
    
    const updatedInterview = {
      ...selectedInterview,
      notes: value
    };
    
    setSelectedInterview(updatedInterview);
    setInterviews(interviews.map(interview => 
      interview.id === updatedInterview.id ? updatedInterview : interview
    ));
  };
  
  const handleInsightChange = (value: string) => {
    if (!selectedInterview) return;
    
    const updatedInterview = {
      ...selectedInterview,
      insights: value
    };
    
    setSelectedInterview(updatedInterview);
    setInterviews(interviews.map(interview => 
      interview.id === updatedInterview.id ? updatedInterview : interview
    ));
  };
  
  const addNewInterview = () => {
    const newInterview: InterviewType = {
      id: Date.now().toString(),
      name: 'New Interviewee',
      date: new Date(Date.now() + 86400000), // Tomorrow
      status: 'pending',
      notes: '',
      insights: '',
      questions: [
        'What challenges do you face with similar products?',
        'How would you describe the ideal solution?',
        'What features are most important to you?'
      ]
    };
    
    setInterviews([...interviews, newInterview]);
    setSelectedInterview(newInterview);
  };
  
  const getStatusColor = (status: InterviewStatus) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 text-green-400';
      case 'pending':
        return 'bg-orange-500/20 text-orange-400';
      case 'cancelled':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };
  
  return (
    <div className="min-h-screen bg-navy">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-white/60 mb-4">
            <Link to="/project/validate" className="hover:text-white flex items-center gap-1">
              <ArrowLeft size={16} />
              Back to Validation
            </Link>
            <span>/</span>
            <span>Interviews</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-orbitron font-bold text-electric-blue mb-2">
            User Interviews
          </h1>
          <p className="text-white/70">
            Organize, conduct, and analyze interviews with potential users to validate your ideas and gather insights.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <UserCheck size={20} className="text-electric-blue" />
                    <span>Interviewees</span>
                  </div>
                  <Button size="sm" variant="outline" onClick={addNewInterview} className="h-8 gap-1">
                    <Plus size={14} />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add Interview</span>
                  </Button>
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-2">
                  {interviews.map(interview => (
                    <div 
                      key={interview.id}
                      className={cn(
                        "p-3 rounded-md cursor-pointer hover:bg-navy-light transition-colors flex justify-between items-center",
                        selectedInterview?.id === interview.id ? "bg-navy-light border border-electric-blue/30" : "bg-navy-dark"
                      )}
                      onClick={() => setSelectedInterview(interview)}
                    >
                      <div>
                        <div className="font-medium">{interview.name}</div>
                        <div className="flex items-center gap-2 text-sm text-white/60">
                          {interview.date && (
                            <>
                              <Calendar size={12} />
                              <span>{format(interview.date, 'MMM d, yyyy')}</span>
                            </>
                          )}
                        </div>
                      </div>
                      <div>
                        <span className={cn("px-2 py-1 rounded-full text-xs", getStatusColor(interview.status))}>
                          {interview.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 size={20} className="text-electric-blue" />
                  <span>Interview Benefits</span>
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <Check size={16} className="text-electric-blue mt-1 flex-shrink-0" />
                    <p className="text-sm text-white/80">Validate your ideas with real user feedback</p>
                  </div>
                  <div className="flex gap-2">
                    <Check size={16} className="text-electric-blue mt-1 flex-shrink-0" />
                    <p className="text-sm text-white/80">Identify pain points and opportunities you might have missed</p>
                  </div>
                  <div className="flex gap-2">
                    <Check size={16} className="text-electric-blue mt-1 flex-shrink-0" />
                    <p className="text-sm text-white/80">Build empathy with your target users</p>
                  </div>
                  <div className="flex gap-2">
                    <Check size={16} className="text-electric-blue mt-1 flex-shrink-0" />
                    <p className="text-sm text-white/80">Gain insights that inform your MVP specification</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-2 space-y-6">
            {selectedInterview ? (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Mic size={20} className="text-electric-blue" />
                        <Input 
                          value={selectedInterview.name}
                          onChange={(e) => {
                            const updatedInterview = {
                              ...selectedInterview,
                              name: e.target.value
                            };
                            setSelectedInterview(updatedInterview);
                            setInterviews(interviews.map(interview => 
                              interview.id === updatedInterview.id ? updatedInterview : interview
                            ));
                          }}
                          className="max-w-[250px] bg-navy-light/50"
                        />
                      </div>
                      <div>
                        <select 
                          value={selectedInterview.status}
                          onChange={(e) => {
                            const updatedInterview = {
                              ...selectedInterview,
                              status: e.target.value as InterviewStatus
                            };
                            setSelectedInterview(updatedInterview);
                            setInterviews(interviews.map(interview => 
                              interview.id === updatedInterview.id ? updatedInterview : interview
                            ));
                          }}
                          className="bg-navy-light/50 border border-white/20 rounded text-sm p-1"
                        >
                          <option value="pending">Pending</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Interview Date</Label>
                          <Input 
                            type="date"
                            value={selectedInterview.date ? format(selectedInterview.date, 'yyyy-MM-dd') : ''}
                            onChange={(e) => {
                              const updatedInterview = {
                                ...selectedInterview,
                                date: e.target.value ? new Date(e.target.value) : null
                              };
                              setSelectedInterview(updatedInterview);
                              setInterviews(interviews.map(interview => 
                                interview.id === updatedInterview.id ? updatedInterview : interview
                              ));
                            }}
                            className="bg-navy-light/50"
                          />
                        </div>
                        <div>
                          <Label>Status</Label>
                          <div className={cn("px-3 py-2 rounded text-center", getStatusColor(selectedInterview.status))}>
                            {selectedInterview.status}
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <Label className="mb-2 block">Interview Questions</Label>
                        <div className="space-y-2 mb-4">
                          {selectedInterview.questions.map((question, index) => (
                            <div key={index} className="flex items-start gap-2 bg-navy-light/30 p-3 rounded">
                              <MessageSquare size={16} className="text-electric-blue mt-1 flex-shrink-0" />
                              <div className="flex-grow">{question}</div>
                              <Button variant="ghost" size="sm" onClick={() => removeQuestion(index)} className="text-white/50 hover:text-red-400 p-1 h-auto">
                                <Trash2 size={14} />
                              </Button>
                            </div>
                          ))}
                        </div>
                        
                        <div className="flex gap-2">
                          <Input 
                            value={newQuestion}
                            onChange={(e) => setNewQuestion(e.target.value)}
                            placeholder="Add a new question..."
                            className="bg-navy-light/50"
                            onKeyDown={(e) => e.key === 'Enter' && addQuestion()}
                          />
                          <Button onClick={addQuestion} size="sm" disabled={!newQuestion.trim()}>
                            <Plus size={16} />
                          </Button>
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="interview-notes">Interview Notes</Label>
                        <Textarea 
                          id="interview-notes"
                          value={selectedInterview.notes}
                          onChange={(e) => handleNoteChange(e.target.value)}
                          placeholder="Record notes during or after the interview..."
                          className="min-h-[150px] bg-navy-light/50"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="interview-insights">Key Insights</Label>
                        <Textarea 
                          id="interview-insights"
                          value={selectedInterview.insights}
                          onChange={(e) => handleInsightChange(e.target.value)}
                          placeholder="Summarize the most important insights from this interview..."
                          className="min-h-[150px] bg-navy-light/50"
                        />
                      </div>
                      
                      <div className="flex justify-end">
                        <Button className="bg-electric-blue hover:bg-electric-blue/90">
                          Save Interview
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <div className="glass-card p-8 text-center">
                <Mic size={48} className="mx-auto mb-4 text-white/40" />
                <h3 className="text-xl font-medium text-white mb-2">No Interview Selected</h3>
                <p className="text-white/60 mb-6">
                  Select an interview from the list or create a new one to get started.
                </p>
                <Button onClick={addNewInterview} className="bg-electric-blue hover:bg-electric-blue/90 flex items-center gap-2 mx-auto">
                  <Plus size={16} />
                  Create New Interview
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <AiAgent />
    </div>
  );
};

export default Interviews;
