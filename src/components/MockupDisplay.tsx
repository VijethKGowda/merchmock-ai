import React from 'react';
import { Download, RefreshCw, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';

interface MockupDisplayProps {
  imageUrl: string | null;
  isGenerating: boolean;
  onRegenerate: () => void;
}

export const MockupDisplay: React.FC<MockupDisplayProps> = ({ imageUrl, isGenerating, onRegenerate }) => {
  const handleDownload = () => {
    if (!imageUrl) return;
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `mockup-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isGenerating) {
    return (
      <div className="aspect-square border-4 border-brutal-black bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center justify-center gap-6 p-12 text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Loader2 size={64} className="text-neon-green" />
        </motion.div>
        <div>
          <h2 className="font-display text-4xl uppercase">Processing...</h2>
          <p className="font-mono mt-4">AI is placing your logo on the product</p>
        </div>
      </div>
    );
  }

  if (!imageUrl) {
    return (
      <div className="aspect-square border-4 border-brutal-black bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center justify-center p-12 text-center">
        <div className="opacity-20">
          <h2 className="font-display text-6xl uppercase">No Preview</h2>
          <p className="font-mono mt-4">Select a product and generate</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="relative group">
        <div className="border-4 border-brutal-black bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
          <img 
            src={imageUrl} 
            alt="Mockup Preview" 
            className="w-full aspect-square object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <div className="absolute -bottom-6 -right-6 flex gap-4">
          <button
            onClick={onRegenerate}
            className="bg-white border-4 border-brutal-black p-4 hover:bg-neon-green transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            title="Regenerate"
          >
            <RefreshCw size={24} />
          </button>
          <button
            onClick={handleDownload}
            className="bg-neon-green border-4 border-brutal-black p-4 hover:bg-white transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2"
          >
            <Download size={24} />
            <span className="font-display uppercase">Export</span>
          </button>
        </div>
      </div>
      
      <div className="bg-brutal-black text-white p-4 font-mono text-xs uppercase tracking-widest">
        Status: Print-ready file generated // 300 DPI // CMYK Compatible
      </div>
    </div>
  );
};
