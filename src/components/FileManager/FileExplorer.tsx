
import { useState } from 'react';
import { Folder, File, ChevronDown, ChevronRight, Plus, Trash2, Edit2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

export interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  content?: string;
  children?: FileItem[];
  createdAt: Date;
  updatedAt: Date;
  parentId?: string;
  extension?: string;
}

interface FileExplorerProps {
  files: FileItem[];
  onFileSelect: (file: FileItem) => void;
  onCreateFile: (name: string, type: 'file' | 'folder', parentId?: string) => void;
  onDeleteFile: (id: string) => void;
  onRenameFile: (id: string, newName: string) => void;
  selectedFileId?: string;
}

const FileExplorer = ({
  files,
  onFileSelect,
  onCreateFile,
  onDeleteFile,
  onRenameFile,
  selectedFileId
}: FileExplorerProps) => {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemType, setNewItemType] = useState<'file' | 'folder'>('file');
  const [currentParentId, setCurrentParentId] = useState<string | undefined>(undefined);
  const [fileToRename, setFileToRename] = useState<FileItem | null>(null);

  const toggleFolder = (folderId: string) => {
    const newExpandedFolders = new Set(expandedFolders);
    if (newExpandedFolders.has(folderId)) {
      newExpandedFolders.delete(folderId);
    } else {
      newExpandedFolders.add(folderId);
    }
    setExpandedFolders(newExpandedFolders);
  };

  const handleCreateFile = () => {
    if (newItemName.trim()) {
      onCreateFile(newItemName, newItemType, currentParentId);
      setNewItemName('');
      setIsCreateDialogOpen(false);
    }
  };

  const handleRenameFile = () => {
    if (fileToRename && newItemName.trim()) {
      onRenameFile(fileToRename.id, newItemName);
      setNewItemName('');
      setFileToRename(null);
      setIsRenameDialogOpen(false);
    }
  };

  const openCreateDialog = (parentId?: string) => {
    setCurrentParentId(parentId);
    setIsCreateDialogOpen(true);
  };

  const openRenameDialog = (file: FileItem) => {
    setFileToRename(file);
    setNewItemName(file.name);
    setIsRenameDialogOpen(true);
  };

  const renderFileTree = (items: FileItem[], level = 0) => {
    return items.map((item) => (
      <div key={item.id} className="pl-2">
        <ContextMenu>
          <ContextMenuTrigger>
            <div 
              className={cn(
                "flex items-center py-1 px-2 my-1 rounded cursor-pointer hover:bg-navy-light group",
                selectedFileId === item.id && "bg-electric-blue/20 text-electric-blue"
              )}
              onClick={() => item.type === 'folder' ? toggleFolder(item.id) : onFileSelect(item)}
            >
              <span className="mr-1">
                {item.type === 'folder' ? (
                  expandedFolders.has(item.id) ? (
                    <ChevronDown size={16} className="text-white/60" />
                  ) : (
                    <ChevronRight size={16} className="text-white/60" />
                  )
                ) : null}
              </span>
              {item.type === 'folder' ? (
                <Folder size={16} className="mr-2 text-yellow-400" />
              ) : (
                <File size={16} className="mr-2 text-white/60" />
              )}
              <span className="text-sm text-white">{item.name}</span>
              <div className="ml-auto opacity-0 group-hover:opacity-100 flex gap-1">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-6 w-6" 
                  onClick={(e) => {
                    e.stopPropagation();
                    openRenameDialog(item);
                  }}
                >
                  <Edit2 size={14} className="text-white/60" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-6 w-6" 
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteFile(item.id);
                  }}
                >
                  <Trash2 size={14} className="text-white/60" />
                </Button>
                {item.type === 'folder' && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6" 
                    onClick={(e) => {
                      e.stopPropagation();
                      openCreateDialog(item.id);
                    }}
                  >
                    <Plus size={14} className="text-white/60" />
                  </Button>
                )}
              </div>
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent className="w-48 bg-navy-light border-white/10">
            {item.type === 'folder' && (
              <ContextMenuItem 
                className="text-white hover:bg-navy cursor-pointer"
                onClick={() => openCreateDialog(item.id)}
              >
                Create New File
              </ContextMenuItem>
            )}
            <ContextMenuItem 
              className="text-white hover:bg-navy cursor-pointer"
              onClick={() => openRenameDialog(item)}
            >
              Rename
            </ContextMenuItem>
            <ContextMenuItem 
              className="text-white hover:bg-navy cursor-pointer"
              onClick={() => onDeleteFile(item.id)}
            >
              Delete
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
        
        {item.type === 'folder' && expandedFolders.has(item.id) && item.children && (
          <div className="ml-4 border-l border-white/10 pl-2">
            {renderFileTree(item.children, level + 1)}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="h-full bg-navy-dark p-2 rounded-lg">
      <div className="flex justify-between items-center mb-4 px-2">
        <h3 className="text-white font-medium">Files</h3>
        <Button 
          size="sm" 
          variant="ghost" 
          className="h-7 w-7 p-0"
          onClick={() => openCreateDialog()}
        >
          <Plus size={16} className="text-white" />
        </Button>
      </div>
      <div className="overflow-y-auto max-h-[calc(100vh-150px)]">
        {renderFileTree(files)}
      </div>

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="bg-navy-light border-white/10 text-white">
          <DialogHeader>
            <DialogTitle>Create New {newItemType === 'file' ? 'File' : 'Folder'}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <div className="flex gap-4">
              <Button 
                variant={newItemType === 'file' ? 'default' : 'outline'} 
                className={newItemType === 'file' ? 'bg-electric-blue' : 'border-white/20 text-white'}
                onClick={() => setNewItemType('file')}
              >
                File
              </Button>
              <Button 
                variant={newItemType === 'folder' ? 'default' : 'outline'} 
                className={newItemType === 'folder' ? 'bg-electric-blue' : 'border-white/20 text-white'}
                onClick={() => setNewItemType('folder')}
              >
                Folder
              </Button>
            </div>
            <Input
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              placeholder={`Enter ${newItemType} name`}
              className="bg-navy border-white/20 text-white"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)} className="border-white/20 text-white">
              Cancel
            </Button>
            <Button onClick={handleCreateFile} className="bg-electric-blue">
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isRenameDialogOpen} onOpenChange={setIsRenameDialogOpen}>
        <DialogContent className="bg-navy-light border-white/10 text-white">
          <DialogHeader>
            <DialogTitle>Rename {fileToRename?.type}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Input
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              placeholder="Enter new name"
              className="bg-navy border-white/20 text-white"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRenameDialogOpen(false)} className="border-white/20 text-white">
              Cancel
            </Button>
            <Button onClick={handleRenameFile} className="bg-electric-blue">
              Rename
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FileExplorer;
