
import { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { FileItem } from './FileExplorer';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Save } from 'lucide-react';

interface FileEditorProps {
  file: FileItem | null;
  onSave: (fileId: string, content: string) => void;
}

const FileEditor = ({ file, onSave }: FileEditorProps) => {
  const [content, setContent] = useState('');

  useEffect(() => {
    if (file) {
      setContent(file.content || '');
    }
  }, [file]);

  if (!file) {
    return (
      <div className="h-full flex items-center justify-center bg-navy-dark rounded-lg">
        <p className="text-white/60">No file selected</p>
      </div>
    );
  }

  const handleSave = () => {
    if (file) {
      onSave(file.id, content);
    }
  };

  return (
    <div className="h-full flex flex-col bg-navy-dark rounded-lg">
      <div className="flex justify-between items-center p-3 border-b border-white/10">
        <h3 className="text-white">{file.name}</h3>
        <Button 
          size="sm" 
          className="bg-electric-blue"
          onClick={handleSave}
        >
          <Save size={16} className="mr-2" />
          Save
        </Button>
      </div>

      <Tabs defaultValue="edit" className="flex-1 flex flex-col">
        <TabsList className="px-3 pt-2 bg-transparent border-b border-white/10">
          <TabsTrigger 
            value="edit" 
            className="data-[state=active]:bg-navy data-[state=active]:text-electric-blue"
          >
            Edit
          </TabsTrigger>
          <TabsTrigger 
            value="preview" 
            className="data-[state=active]:bg-navy data-[state=active]:text-electric-blue"
          >
            Preview
          </TabsTrigger>
        </TabsList>
        <TabsContent value="edit" className="flex-1 p-0 m-0">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="h-full resize-none rounded-none bg-navy-dark border-none text-white font-mono p-4"
          />
        </TabsContent>
        <TabsContent value="preview" className="flex-1 p-4 overflow-auto m-0">
          <div className="prose prose-invert max-w-none">
            {/* In a real app, you'd render markdown or other formatted content here */}
            <div className="whitespace-pre-wrap text-white/80">{content}</div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FileEditor;
