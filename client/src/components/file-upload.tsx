import { useRef, useState, DragEvent, ChangeEvent } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { UploadCloud, X } from "lucide-react";

interface FileUploadProps {
  accept: string;
  maxFiles?: number;
  maxSize?: number; // in MB
  onFilesSelected: (files: File[]) => void;
  className?: string;
}

export function FileUpload({
  accept,
  maxFiles = 1,
  maxSize = 5,
  onFilesSelected,
  className,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    processFiles(files);
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      processFiles(files);
    }
  };

  const processFiles = (files: File[]) => {
    // Filter by file type
    const acceptedTypes = accept.split(',');
    const validFiles = files.filter(file => {
      const fileType = file.type;
      return acceptedTypes.some(type => {
        // Handle wildcard types like image/*
        if (type.includes('*')) {
          const category = type.split('/')[0];
          return fileType.startsWith(category);
        }
        return type.includes(fileType);
      });
    });

    // Filter by file size
    const validSizedFiles = validFiles.filter(file => {
      const fileSizeInMB = file.size / (1024 * 1024);
      return fileSizeInMB <= maxSize;
    });

    // Limit to max files
    const limitedFiles = validSizedFiles.slice(0, maxFiles);

    // Call callback with valid files
    if (limitedFiles.length > 0) {
      onFilesSelected(limitedFiles);
    }
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className={cn(
        "border-2 border-dashed rounded-lg p-4 text-center",
        isDragging ? "border-primary bg-primary/5" : "border-gray-300 hover:border-gray-400",
        className
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept={accept}
        multiple={maxFiles > 1}
        onChange={handleFileInputChange}
      />
      <div className="flex flex-col items-center justify-center py-4 cursor-pointer">
        <UploadCloud className="h-10 w-10 text-gray-400 mb-2" />
        <p className="text-sm font-medium text-gray-700">
          <span className="text-primary">Click to upload</span> or drag and drop
        </p>
        <p className="text-xs text-gray-500 mt-1">
          {accept.includes('image') ? 'Image files' : 'Files'} (
          {accept.split(',').map(t => t.replace('image/', '.').replace('application/', '.')).join(', ')})
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Max {maxFiles} {maxFiles === 1 ? 'file' : 'files'}, up to {maxSize}MB each
        </p>
      </div>
    </div>
  );
}
