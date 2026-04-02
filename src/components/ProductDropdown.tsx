import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp, Check } from 'lucide-react';
import { Product } from '@/src/types';
import { cn } from '@/src/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface ProductDropdownProps {
  products: Product[];
  selectedProduct: Product | null;
  onSelect: (product: Product) => void;
}

export const ProductDropdown: React.FC<ProductDropdownProps> = ({ products, selectedProduct, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full border-4 border-brutal-black p-4 bg-white flex items-center justify-between transition-all",
          "shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[4px] active:translate-y-[4px]",
          isOpen && "bg-neon-green"
        )}
      >
        <div className="text-left">
          {selectedProduct ? (
            <>
              <span className="font-mono text-[10px] uppercase tracking-tighter opacity-60 block">
                {selectedProduct.category} // SELECTED
              </span>
              <span className="font-display text-xl uppercase leading-none">{selectedProduct.name}</span>
            </>
          ) : (
            <span className="font-display text-xl uppercase opacity-40">Choose a product...</span>
          )}
        </div>
        {isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute z-50 left-0 right-0 mt-4 border-4 border-brutal-black bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] max-h-[400px] overflow-y-auto custom-scrollbar"
          >
            {products.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  onSelect(product);
                  setIsOpen(false);
                }}
                className={cn(
                  "p-4 border-b-2 border-brutal-black/10 cursor-pointer transition-colors flex items-center justify-between",
                  "hover:bg-neon-green/20",
                  selectedProduct?.id === product.id && "bg-neon-green"
                )}
              >
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-tighter opacity-60 block">
                    {product.category}
                  </span>
                  <span className="font-display text-lg uppercase leading-none">{product.name}</span>
                  <p className="text-xs font-medium opacity-70 mt-1">{product.description}</p>
                </div>
                {selectedProduct?.id === product.id && <Check size={20} className="text-brutal-black" />}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
