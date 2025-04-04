
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, Folder, FolderPlus, File, Plus, Search, Download, Trash, Edit, Save, X, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AiAgent from '@/components/AiAgent';
import ProjectRules from '@/components/FileManager/ProjectRules';
import FileExplorer, { FileItem } from '@/components/FileManager/FileExplorer';
import FileEditor from '@/components/FileManager/FileEditor';
import { v4 as uuidv4 } from 'uuid';
import { toast } from '@/components/ui/use-toast';

const FileManagement = () => {
  const [activeTab, setActiveTab] = useState("explorer");
  const [searchQuery, setSearchQuery] = useState('');
  const [files, setFiles] = useState<FileItem[]>([
    {
      id: 'root',
      name: 'Project Files',
      type: 'folder',
      children: [
        {
          id: 'docs',
          name: 'Documents',
          type: 'folder',
          children: [
            {
              id: 'mvp-spec',
              name: 'MVP Specification.md',
              type: 'file',
              content: '# MVP Specification\n\n## Core Features\n- Feature 1\n- Feature 2\n\n## Timeline\n- Week 1: Planning\n- Week 2: Development',
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              id: 'business-canvas',
              name: 'Business Canvas.md',
              type: 'file',
              content: '# Business Model Canvas\n\n## Value Proposition\n- Our product solves X problem\n\n## Customer Segments\n- Segment 1\n- Segment 2',
              createdAt: new Date(),
              updatedAt: new Date(),
            }
          ],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'assets',
          name: 'Assets',
          type: 'folder',
          children: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'code',
          name: 'Code',
          type: 'folder',
          children: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ]);
  
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  
  const handleFileSelect = (file: FileItem) => {
    if (file.type === 'file') {
      setSelectedFile(file);
    }
  };
  
  const handleCreateFile = (name: string, type: 'file' | 'folder', parentId?: string) => {
    const newFile: FileItem = {
      id: uuidv4(),
      name,
      type,
      content: type === 'file' ? '' : undefined,
      children: type === 'folder' ? [] : undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    const updateFilesRecursively = (items: FileItem[]): FileItem[] => {
      return items.map(item => {
        if (item.id === parentId) {
          return {
            ...item,
            children: [...(item.children || []), newFile]
          };
        } else if (item.children) {
          return {
            ...item,
            children: updateFilesRecursively(item.children)
          };
        }
        return item;
      });
    };
    
    if (parentId) {
      setFiles(updateFilesRecursively(files));
    } else {
      setFiles([...files, newFile]);
    }
    
    toast({
      description: `${type === 'file' ? 'File' : 'Folder'} "${name}" created successfully`,
    });
  };
  
  const handleDeleteFile = (id: string) => {
    const deleteFileRecursively = (items: FileItem[]): FileItem[] => {
      return items.filter(item => {
        if (item.id === id) {
          return false;
        }
        
        if (item.children) {
          item.children = deleteFileRecursively(item.children);
        }
        
        return true;
      });
    };
    
    setFiles(deleteFileRecursively(files));
    
    // If the deleted file is the selected file, clear the selection
    if (selectedFile && selectedFile.id === id) {
      setSelectedFile(null);
    }
    
    toast({
      description: "Item deleted successfully",
    });
  };
  
  const handleRenameFile = (id: string, newName: string) => {
    const updateFilesRecursively = (items: FileItem[]): FileItem[] => {
      return items.map(item => {
        if (item.id === id) {
          const updatedItem = { ...item, name: newName, updatedAt: new Date() };
          
          // Update selected file if it's the one being renamed
          if (selectedFile && selectedFile.id === id) {
            setSelectedFile(updatedItem);
          }
          
          return updatedItem;
        } else if (item.children) {
          return {
            ...item,
            children: updateFilesRecursively(item.children)
          };
        }
        return item;
      });
    };
    
    setFiles(updateFilesRecursively(files));
    
    toast({
      description: "Item renamed successfully",
    });
  };
  
  const handleSaveFile = (fileId: string, content: string) => {
    const updateFilesRecursively = (items: FileItem[]): FileItem[] => {
      return items.map(item => {
        if (item.id === fileId) {
          const updatedItem = { 
            ...item, 
            content, 
            updatedAt: new Date() 
          };
          
          // Update selected file if it's the one being saved
          if (selectedFile && selectedFile.id === fileId) {
            setSelectedFile(updatedItem);
          }
          
          return updatedItem;
        } else if (item.children) {
          return {
            ...item,
            children: updateFilesRecursively(item.children)
          };
        }
        return item;
      });
    };
    
    setFiles(updateFilesRecursively(files));
    
    toast({
      description: "File saved successfully",
    });
  };
  
  // Placeholder for search functionality
  const searchFiles = (query: string) => {
    // This would filter files based on the query
    console.log(`Searching for: ${query}`);
  };
  
  return (
    <div className="min-h-screen bg-navy pb-20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="flex items-center gap-2 text-white/60 mb-4">
            <Link to="/dashboard" className="hover:text-white flex items-center gap-1">
              <ArrowLeft size={16} />
              Back to Dashboard
            </Link>
            <span>/</span>
            <span>File Management</span>
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-orbitron font-bold text-electric-blue mb-2">
                Project Files
              </h1>
              <p className="text-white/70">
                Manage your project documents, code, and assets in one place.
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" size={16} />
                <Input
                  type="text"
                  placeholder="Search files..."
                  className="pl-9 bg-navy-light/50 text-white border-white/20 focus:border-electric-blue w-[200px] md:w-[300px]"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    searchFiles(e.target.value);
                  }}
                />
              </div>
              
              <Button 
                variant="outline" 
                className="border-white/20 text-white"
                onClick={() => handleCreateFile("New Folder", "folder")}
              >
                <FolderPlus size={16} className="mr-2" />
                New Folder
              </Button>
              
              <Button 
                className="bg-electric-blue hover:bg-electric-blue/90"
                onClick={() => handleCreateFile("New File.md", "file")}
              >
                <Plus size={16} className="mr-2" />
                New File
              </Button>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="explorer" className="mb-10" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-navy-light">
            <TabsTrigger value="explorer" className="data-[state=active]:bg-electric-blue data-[state=active]:text-white">
              File Explorer
            </TabsTrigger>
            <TabsTrigger value="rules" className="data-[state=active]:bg-electric-blue data-[state=active]:text-white">
              Project Rules
            </TabsTrigger>
            <TabsTrigger value="dataflow" className="data-[state=active]:bg-electric-blue data-[state=active]:text-white">
              Data Flow
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="explorer" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* File Explorer Component */}
              <div className="lg:col-span-1">
                <FileExplorer 
                  files={files}
                  onFileSelect={handleFileSelect}
                  onCreateFile={handleCreateFile}
                  onDeleteFile={handleDeleteFile}
                  onRenameFile={handleRenameFile}
                  selectedFileId={selectedFile?.id}
                />
              </div>
              
              {/* File Editor Component */}
              <div className="lg:col-span-3">
                <FileEditor 
                  file={selectedFile}
                  onSave={handleSaveFile}
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="rules" className="mt-6">
            <ProjectRules />
            {/* Fallback Project Rules UI if component doesn't exist */}
            {!ProjectRules && (
              <div className="glass-card p-6">
                <div className="flex items-center gap-2 mb-6">
                  <BookOpen size={20} className="text-electric-blue" />
                  <h2 className="text-xl font-semibold text-white">Project Rules</h2>
                </div>
                
                <div className="space-y-6">
                  <div className="glass-card p-4">
                    <h3 className="text-white font-medium mb-3">Naming Conventions</h3>
                    <p className="text-white/70 mb-2">
                      - Use kebab-case for file names (example-file-name.ext)<br />
                      - Use PascalCase for component names (ExampleComponent)<br />
                      - Use camelCase for variable names (exampleVariable)
                    </p>
                  </div>
                  
                  <div className="glass-card p-4">
                    <h3 className="text-white font-medium mb-3">File Organization</h3>
                    <p className="text-white/70 mb-2">
                      - Keep related files in the same directory<br />
                      - Organize files by feature rather than by file type<br />
                      - Use index files to export from directories
                    </p>
                  </div>
                  
                  <div className="glass-card p-4">
                    <h3 className="text-white font-medium mb-3">Coding Standards</h3>
                    <p className="text-white/70 mb-2">
                      - Follow the project's ESLint and Prettier configuration<br />
                      - Write unit tests for all functionality<br />
                      - Document all public APIs
                    </p>
                  </div>
                  
                  <div className="glass-card p-4">
                    <h3 className="text-white font-medium mb-3">Custom Rules</h3>
                    <div className="space-y-2">
                      <textarea 
                        placeholder="Add your custom project rules here..." 
                        className="w-full min-h-[120px] bg-navy-light/50 text-white placeholder-white/40 border-white/20 focus:border-electric-blue p-3 rounded-md"
                      />
                      <div className="flex justify-end">
                        <Button className="bg-electric-blue hover:bg-electric-blue/90">
                          Save Rules
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="dataflow" className="mt-6">
            <div className="glass-card p-6">
              <div className="flex items-center gap-2 mb-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-electric-blue">
                  <path d="M2 12L7 2L12 12L17 2L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 22L7 12L12 22L17 12L22 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <h2 className="text-xl font-semibold text-white">Data Flow</h2>
              </div>
              
              <div className="bg-navy-dark/50 rounded-lg p-8 text-center min-h-[400px] flex items-center justify-center">
                <div className="max-w-md">
                  <p className="text-white/70 mb-6">
                    Visualize how data flows through your application, from user inputs to database storage and back.
                  </p>
                  <Button className="bg-electric-blue hover:bg-electric-blue/90">
                    Create Data Flow Diagram
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <AiAgent />
    </div>
  );
};

export default FileManagement;
