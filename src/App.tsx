import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Info, Upload, Box } from 'lucide-react';
import { ImageUpload } from './components/ImageUpload';
import { ProductDropdown } from './components/ProductDropdown';
import { MockupDisplay } from './components/MockupDisplay';
import { PRODUCTS, Product } from './types';
import { generateMockup } from './services/gemini';
import { cn } from './lib/utils';

export default function App() {
  const [logo, setLogo] = useState<string | null>(null);
  const [productMode, setProductMode] = useState<'preset' | 'upload'>('preset');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [customProduct, setCustomProduct] = useState<string | null>(null);
  const [mockupUrl, setMockupUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!logo) return;
    if (productMode === 'preset' && !selectedProduct) return;
    if (productMode === 'upload' && !customProduct) return;
    
    setIsGenerating(true);
    setMockupUrl(null);
    setError(null);
    
    // Add a timeout to handle hanging API calls
    const timeoutPromise = new Promise<null>((_, reject) => 
      setTimeout(() => reject(new Error("Request timed out. Please try again.")), 60000)
    );

    try {
      const result = await Promise.race([
        generateMockup(
          logo, 
          selectedProduct?.basePrompt || "Custom product image", 
          productMode === 'upload' ? (customProduct || undefined) : undefined
        ),
        timeoutPromise
      ]);

      if (result) {
        setMockupUrl(result);
      } else {
        setError("Failed to generate mockup. The AI might be busy or the image was rejected. Please try again.");
      }
    } catch (err: any) {
      console.error("Generation error:", err);
      setError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  }, [logo, selectedProduct, customProduct, productMode]);

  return (
    <div className="min-h-screen flex flex-col bg-gallery-white">
      {/* Header Marquee */}
      <div className="bg-brutal-black text-white py-2 overflow-hidden whitespace-nowrap border-b-4 border-brutal-black h-10 flex items-center">
        <div className="inline-block animate-marquee">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="font-mono text-xs uppercase tracking-[0.3em] mx-8">
              MerchMock AI // Generate Professional Mockups // Powered by Gemini // 2026 Edition //
            </span>
          ))}
        </div>
      </div>

      <main className="flex-1 grid grid-cols-1 lg:grid-cols-[450px_1fr] h-[calc(100vh-40px)] overflow-hidden">
        {/* Left Sidebar: Controls */}
        <div className="border-r-4 border-brutal-black bg-gallery-white p-8 overflow-y-auto flex flex-col gap-12 custom-scrollbar">
          {/* Logo Section */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-brutal-black text-white flex items-center justify-center font-display text-xl">01</div>
              <h2 className="font-display text-3xl uppercase">Upload Logo</h2>
            </div>
            <ImageUpload 
              image={logo} 
              onUpload={setLogo} 
              onClear={() => {
                setLogo(null);
                setMockupUrl(null);
              }} 
              label="Drop your logo"
            />
          </section>

          {/* Product Section */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-brutal-black text-white flex items-center justify-center font-display text-xl">02</div>
              <h2 className="font-display text-3xl uppercase">Product Selection</h2>
            </div>
            
            {/* Mode Toggle */}
            <div className="flex border-4 border-brutal-black mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <button
                onClick={() => setProductMode('preset')}
                className={cn(
                  "flex-1 py-3 font-display uppercase text-sm transition-colors flex items-center justify-center gap-2",
                  productMode === 'preset' ? "bg-neon-green" : "bg-white hover:bg-neon-green/10"
                )}
              >
                <Box size={16} />
                Presets
              </button>
              <button
                onClick={() => setProductMode('upload')}
                className={cn(
                  "flex-1 py-3 font-display uppercase text-sm transition-colors border-l-4 border-brutal-black flex items-center justify-center gap-2",
                  productMode === 'upload' ? "bg-neon-green" : "bg-white hover:bg-neon-green/10"
                )}
              >
                <Upload size={16} />
                Upload
              </button>
            </div>

            <AnimatePresence mode="wait">
              {productMode === 'preset' ? (
                <motion.div
                  key="preset"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                >
                  <ProductDropdown
                    products={PRODUCTS}
                    selectedProduct={selectedProduct}
                    onSelect={setSelectedProduct}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="upload"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                >
                  <ImageUpload 
                    image={customProduct} 
                    onUpload={setCustomProduct} 
                    onClear={() => {
                      setCustomProduct(null);
                      setMockupUrl(null);
                    }} 
                    label="Upload Product"
                    subLabel="Upload a photo of your own product"
                    icon={<Box size={32} />}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          {/* Action Button */}
          <button
            disabled={!logo || (productMode === 'preset' ? !selectedProduct : !customProduct) || isGenerating}
            onClick={handleGenerate}
            className="w-full bg-brutal-black text-white p-6 font-display text-2xl uppercase hover:bg-neon-green hover:text-brutal-black transition-all disabled:opacity-30 disabled:cursor-not-allowed group relative overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,255,0,0.3)]"
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              {isGenerating ? 'Generating...' : 'Generate Mockup'}
              <Sparkles className={isGenerating ? 'animate-pulse' : 'group-hover:rotate-12 transition-transform'} />
            </span>
          </button>

          <div className="mt-auto pt-8 border-t-2 border-brutal-black/10 flex items-start gap-3 text-xs font-mono opacity-50">
            <Info size={16} className="shrink-0" />
            <p>AI-generated mockups may vary in placement. For best results, use high-resolution PNG logos with transparent backgrounds.</p>
          </div>
        </div>

        {/* Right Content: Preview */}
        <div className="bg-[#f0f0f0] p-12 flex flex-col items-center justify-center relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
          
          <div className="w-full max-w-2xl relative z-10">
            {error && (
              <div className="mb-8 bg-red-500 text-white border-4 border-brutal-black p-4 font-mono text-sm uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                ERROR // {error}
              </div>
            )}
            <MockupDisplay 
              imageUrl={mockupUrl} 
              isGenerating={isGenerating} 
              onRegenerate={handleGenerate}
            />
          </div>

          {/* Floating Labels */}
          <div className="absolute top-8 right-8 font-mono text-[10px] uppercase tracking-widest text-right opacity-30">
            Preview Mode // v1.1.0<br />
            Render Engine: Gemini 2.5 Flash
          </div>
        </div>
      </main>
    </div>
  );
}
