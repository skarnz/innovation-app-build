import React, { useCallback } from 'react';
import { useDropzone, FileRejection, Accept } from 'react-dropzone';
import { UploadCloud, File as FileIcon, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AssetUploaderProps {
  files: File[];
  onFilesChange: (files: File[]) => void;
  maxFiles?: number;
  maxSize?: number; // Size in bytes
  accept?: Accept; // e.g. { 'image/*': ['.png', '.jpeg'] }
  className?: string;
}

const AssetUploader: React.FC<AssetUploaderProps> = ({
  files,
  onFilesChange,
  maxFiles = 5,
  maxSize = 10 * 1024 * 1024, // 10MB default
  accept = { 'image/*': [], 'application/pdf': [] }, // Accept images and PDFs by default
  className,
}) => {
  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      const newFiles = acceptedFiles.slice(0, maxFiles - files.length);
      onFilesChange([...files, ...newFiles]);

      if (fileRejections.length > 0) {
        // Handle rejections (e.g., show toast notification)
        console.warn('Some files were rejected:', fileRejections);
        // Example: Show notification for size/type errors
        fileRejections.forEach(({ file, errors }) => {
          errors.forEach((err) => {
            if (err.code === 'file-too-large') {
              alert(`Error: ${file.name} is larger than ${maxSize / 1024 / 1024}MB.`);
            }
            if (err.code === 'file-invalid-type') {
              alert(`Error: ${file.name} type is not accepted.`);
            }
          });
        });
      }
    },
    [files, onFilesChange, maxFiles, maxSize]
  );

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    onDrop,
    accept,
    maxSize,
    maxFiles,
    multiple: true,
  });

  const removeFile = (indexToRemove: number) => {
    onFilesChange(files.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div
        {...getRootProps()}
        className={cn(
          "flex flex-col items-center justify-center w-full h-32 px-4 text-center border-2 border-dashed rounded-lg cursor-pointer transition-colors",
          "border-muted hover:border-primary/50",
          isDragActive && "border-primary",
          isDragAccept && "border-green-500",
          isDragReject && "border-destructive"
        )}
      >
        <input {...getInputProps()} />
        <UploadCloud className={cn("w-8 h-8 mb-2", isDragActive ? "text-primary" : "text-muted-foreground")} />
        {isDragActive ? (
            isDragReject ? (
                <p className="text-sm text-destructive">File type not accepted</p>
            ) : (
                 <p className="text-sm text-primary">Drop the files here ...</p>
            )
        ) : (
          <p className="text-sm text-muted-foreground">
            Drag & drop some files here, or click to select files
          </p>
        )}
        <p className="text-xs text-muted-foreground/70 mt-1">
            (Max {maxFiles} files, up to {maxSize / 1024 / 1024}MB each)
        </p>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium">Selected files:</p>
          <ul className="space-y-2">
            {files.map((file, index) => (
              <li key={index} className="flex items-center justify-between p-2 text-sm rounded-md bg-muted/50">
                <div className="flex items-center gap-2 truncate">
                   <FileIcon className="w-4 h-4 text-muted-foreground" />
                   <span className="truncate">{file.name}</span>
                   <span className="text-xs text-muted-foreground ml-2 flex-shrink-0">
                       ({(file.size / 1024).toFixed(1)} KB)
                   </span>
                </div>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeFile(index)}>
                    <X className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AssetUploader; 