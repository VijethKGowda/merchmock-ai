import React, { useCallback } from 'react';
import { useDropzone, DropzoneOptions } from 'react-dropzone';
import { Upload, X } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface ImageUploadProps {
  onUpload: (base64: string) => void;
  image: string | null;
  onClear: () => void;
  label: string;
  subLabel?: string;
  icon?: React.ReactNode;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ 
  onUpload, 
  image, 
  onClear, 
  label, 
  subLabel = "PNG, JPG, SVG (MAX 5MB)",
  icon = <Upload size={32} />
}) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File is too large. Please upload an image smaller than 5MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpload(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.svg'] },
    multiple: false,
  } as any);

  if (image) {
    return (
      <div className="relative group">
        <div className="border-4 border-brutal-black p-4 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <img 
            src={image} 
            alt="Uploaded preview" 
            className="max-h-48 mx-auto object-contain"
            referrerPolicy="no-referrer"
          />
          <button
            onClick={onClear}
            className="absolute -top-4 -right-4 bg-neon-green border-4 border-brutal-black p-2 hover:bg-white transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          >
            <X size={24} />
          </button>
        </div>
        <p className="mt-4 font-mono text-xs uppercase tracking-widest text-center">IMAGE LOADED // READY</p>
      </div>
    );
  }

  return (
    <div
      {...getRootProps()}
      className={cn(
        "border-4 border-dashed border-brutal-black p-12 transition-all cursor-pointer bg-white hover:bg-neon-green/10",
        isDragActive && "bg-neon-green/20 border-solid scale-[1.02]",
        "shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
      )}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="p-4 bg-neon-green border-4 border-brutal-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          {icon}
        </div>
        <div>
          <p className="font-display text-2xl uppercase">{label}</p>
          <p className="font-mono text-sm mt-2">{subLabel}</p>
        </div>
      </div>
    </div>
  );
};
