'use client';

import { useState, useEffect, useCallback } from 'react';

interface GridItem {
  id: number;
  cols: number;
  rows: number;
  gradient: string;
  image?: string;
}

interface ImageModalProps {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

const RobotLogo = () => (
  <div className="w-40 h-40 relative transform transition-transform group-hover:scale-110">
    {/* Purple glow effect */}
    <div 
      className="absolute inset-0 blur-xl bg-purple-500/30 rounded-full animate-pulse"
      style={{
        animation: 'glow 2s ease-in-out infinite'
      }}
    />
    
    {/* Robot image with floating animation */}
    <div className="relative w-full h-full animate-float">
      <img 
        src="/robot.png" 
        alt="Jasmine AI Robot"
        className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]"
      />
      
      {/* Bottom glow reflection */}
      <div 
        className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-2/3 h-4 bg-purple-500/30 rounded-full blur-xl"
        style={{
          animation: 'reflection 2s ease-in-out infinite'
        }}
      />
    </div>
  </div>
);

const ImageModal: React.FC<ImageModalProps> = ({ images, currentIndex, onClose, onNext, onPrevious }) => {
  if (!images.length) return null;

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center" onClick={onClose}>
      <div className="relative max-w-7xl mx-auto px-4 w-full" onClick={e => e.stopPropagation()}>
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white/70 hover:text-white z-50 p-2"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="relative aspect-square max-h-[80vh] overflow-hidden rounded-xl">
          <img 
            src={images[currentIndex]} 
            alt={`Generated image ${currentIndex + 1}`}
            className="w-full h-full object-contain"
          />
      </div>

        <div className="absolute inset-y-0 left-4 flex items-center">
          <button 
            onClick={onPrevious}
            disabled={currentIndex === 0}
            className="p-2 text-white/70 hover:text-white disabled:opacity-30"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
      </div>

        <div className="absolute inset-y-0 right-4 flex items-center">
          <button 
            onClick={onNext}
            disabled={currentIndex === images.length - 1}
            className="p-2 text-white/70 hover:text-white disabled:opacity-30"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  );
};

const GridPlaceholder = ({ cols, rows }: { cols: number; rows: number }) => (
  <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
    {/* Animated background pattern */}
    <div className="absolute inset-0 opacity-10">
      <div className="absolute inset-0" style={{
        backgroundImage: 'linear-gradient(45deg, #6366f1 25%, transparent 25%), linear-gradient(-45deg, #6366f1 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #6366f1 75%), linear-gradient(-45deg, transparent 75%, #6366f1 75%)',
        backgroundSize: '20px 20px',
        backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
        animation: 'pattern-slide 20s linear infinite'
      }} />
    </div>

    {/* Center animated elements */}
    <div className="relative">
      {/* Spinning rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-24 h-24 rounded-full border-2 border-purple-500/20 animate-[spin_8s_linear_infinite]" />
        <div className="absolute w-20 h-20 rounded-full border-2 border-indigo-500/20 animate-[spin_6s_linear_infinite_reverse]" />
        <div className="absolute w-16 h-16 rounded-full border-2 border-purple-500/20 animate-[spin_4s_linear_infinite]" />
      </div>

      {/* Pulsing core */}
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-full animate-[pulse_2s_ease-in-out_infinite]" />
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full animate-[pulse_2s_ease-in-out_infinite_reverse]" />
      </div>
    </div>

    {/* Floating particles */}
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-purple-500/20 rounded-full"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `float-particle ${3 + i}s linear infinite`
          }}
        />
      ))}
    </div>

    {/* Corner decorations */}
    <div className="absolute inset-0">
      <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-purple-500/20 animate-[pulse_2s_ease-in-out_infinite]" />
      <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-purple-500/20 animate-[pulse_2s_ease-in-out_infinite_delay-500]" />
      <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-purple-500/20 animate-[pulse_2s_ease-in-out_infinite_delay-1000]" />
      <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-purple-500/20 animate-[pulse_2s_ease-in-out_infinite_delay-1500]" />
    </div>
  </div>
);

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [usedGeneratedImages] = useState(() => new Set<string>());
  const [lastPrompt, setLastPrompt] = useState('');

  // Grid layout configuration
  const gridLayout = [
    // Opening showcase
    { cols: 8, rows: 8 }, // Hero image
    { cols: 4, rows: 4 }, // Supporting feature
    { cols: 4, rows: 4 }, // Supporting feature

    // Feature section
    { cols: 6, rows: 6 }, // Wide feature
    { cols: 6, rows: 6 }, // Wide feature

    // Mixed gallery
    { cols: 4, rows: 4 }, // Square
    { cols: 4, rows: 4 }, // Square
    { cols: 4, rows: 4 }, // Square

    // Statement piece
    { cols: 12, rows: 6 }, // Full-width feature
  ];

  // Helper function to create a hash of the image data
  const hashImage = async (base64: string): Promise<string> => {
    const data = base64.split(',')[1];
    const msgUint8 = new TextEncoder().encode(data);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  // Track last prompt
  useEffect(() => {
    setLastPrompt(prompt);
  }, [prompt]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    // Store current images as previous images
    const previousImages = [...generatedImages];

    try {
      if (prompt !== lastPrompt) {
        usedGeneratedImages.clear();
      }
      
      const batchSize = 3;
      const totalImages = gridLayout.length;
      // Initialize new images array with previous images
      const newImages = new Array(totalImages).fill(null).map((_, i) => previousImages[i] || null);
      let retryCount = 0;
      const maxRetries = 3;

      for (let i = 0; i < totalImages; i += batchSize) {
        if (i > 0) {
          await new Promise(resolve => setTimeout(resolve, 60000));
        }

        const batchPromises = Array(Math.min(batchSize, totalImages - i))
          .fill(null)
          .map(async (_, index) => {
            try {
              let imageUrl: string | null = null;
              let attempts = 0;
              
              while (!imageUrl && attempts < maxRetries) {
                const response = await fetch('/api/generate', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ 
                    prompt,
                    seed: Math.floor(Math.random() * 1000000)
                  }),
                });

                if (!response.ok) {
                  throw new Error('Image generation failed');
                }

                const data = await response.json();
                
                if (data.imageUrl && data.imageUrl.startsWith('data:image/')) {
                  const imageHash = await hashImage(data.imageUrl);
                  if (!usedGeneratedImages.has(imageHash)) {
                    imageUrl = data.imageUrl;
                    usedGeneratedImages.add(imageHash);
                  } else {
                    attempts++;
                  }
                } else {
                  console.error('Invalid image data received:', data);
                  attempts++;
                }
              }

              if (imageUrl) {
                setGeneratedImages(prev => {
                  const updated = [...prev];
                  updated[i + index] = imageUrl;
                  return updated;
                });
                newImages[i + index] = imageUrl;
              }

              return imageUrl;
            } catch (error) {
              console.error('Error generating image:', error);
              return null;
            }
          });

        const batchResults = await Promise.all(batchPromises);
        
        const nullCount = batchResults.filter(r => r === null).length;
        if (nullCount > 0 && retryCount < maxRetries) {
          retryCount++;
          i -= nullCount;
        }
      }

    } catch (error) {
      console.error('Error generating images:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Display grid items - show previous images while loading new ones
  const displayItems: GridItem[] = gridLayout.map((layout, index) => {
    const hasImage = generatedImages[index] !== undefined;
    const isLoadingNew = isLoading && !hasImage;
    return {
      id: index,
      cols: layout.cols,
      rows: layout.rows,
      gradient: isLoadingNew ? 'from-purple-500/10 to-indigo-500/10' : 'from-purple-500/20 to-indigo-500/20',
      image: generatedImages[index],
    };
  });

  return (
    <main className="min-h-screen bg-[#111111] relative overflow-hidden">
      {/* Background Grid Pattern with Animation */}
      <div 
        className="absolute inset-0 animate-[pulse_4s_ease-in-out_infinite]"
        style={{
          backgroundImage: 'radial-gradient(circle, #333333 1px, transparent 1px)',
          backgroundSize: '30px 30px',
          opacity: '0.2'
        }} 
      />

      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/5 via-transparent to-indigo-900/5 animate-[gradient_15s_ease_infinite]" />

      {/* Main Content */}
      <div className="relative">
        {/* Hero Section */}
        <div className="pt-16 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-6 mb-6 group">
              <RobotLogo />
              <h1 className="text-4xl font-bold">
                Unleash Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-500 animate-[gradient_3s_ease_infinite]">Creativity</span> with
                <br />
                the Power of <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-500 animate-[gradient_3s_ease_infinite]">Jasmine AI</span>
              </h1>
            </div>
            <p className="text-gray-400 text-lg mb-8 transform transition-all hover:scale-105">
              Effortlessly create stunning visuals from your ideas.
            </p>

            {/* Search Input */}
            <div className="max-w-2xl mx-auto transform transition-all">
              <form onSubmit={handleSubmit} className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe what you want..."
                  className="w-full px-6 py-4 bg-[#2a2a2a] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-700 relative z-10 transition-all duration-300 focus:scale-[1.01]"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg text-white font-medium hover:opacity-90 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 relative z-10"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-t-2 border-r-2 border-white rounded-full animate-spin" />
                      <span className="animate-pulse">Creating...</span>
                    </div>
                  ) : (
                    <span className="flex items-center gap-1">
                      Create 
                      <span className="transform translate-x-0 transition-transform group-hover:translate-x-1">→</span>
                    </span>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Generated Images Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-semibold mb-6 text-white group">
            {generatedImages.length > 0 ? (
              isLoading ? (
                <>Generating New <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-500 animate-[gradient_3s_ease_infinite]">AI Images</span></>
              ) : (
                <>Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-500 animate-[gradient_3s_ease_infinite]">Generated</span> AI Images</>
              )
            ) : (
              <>Enter a prompt to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-500 animate-[gradient_3s_ease_infinite]">generate images</span></>
            )}
          </h2>
          <div className="grid grid-cols-12 gap-4 auto-rows-[60px]">
            {displayItems.map((item) => (
              <div 
                key={item.id}
                onClick={() => item.image && setSelectedImageIndex(item.id)}
                style={{
                  gridColumn: `span ${item.cols}`,
                  gridRow: `span ${item.rows}`,
                }}
                className={`
                  group relative rounded-xl bg-gradient-to-br ${item.gradient}
                  border border-gray-800 hover:border-purple-500 transition-all duration-300 
                  cursor-pointer overflow-hidden hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/20
                  backdrop-blur-sm backdrop-filter
                  ${!item.image && 'animate-[shimmer_2s_infinite]'}
                  ${isTyping && 'animate-[blink_1s_ease-in-out_infinite]'}
                  ${isLoading && !item.image && 'animate-pulse'}
                `}
              >
                {item.image ? (
                  <>
                    <img 
                      src={item.image} 
                      alt={`Generated image ${item.id + 1}`}
                      className={`w-full h-full object-cover rounded-xl transition-opacity duration-300 ${isLoading ? 'opacity-30' : ''}`}
                    />
                    <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 bg-black/50 transition-opacity duration-300">
                      {/* View Icon */}
                      <button 
                        className="p-2 rounded-full hover:bg-white/10 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedImageIndex(item.id);
                        }}
                      >
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      
                      {/* Download Icon */}
                      <button 
                        className="p-2 rounded-full hover:bg-white/10 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Create temporary link to download the image
                          const link = document.createElement('a');
                          link.href = item.image!;
                          link.download = `jasmine-ai-${item.id + 1}.png`;
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                        }}
                      >
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </button>
                    </div>
                    {isLoading && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
                      </div>
                    )}
                  </>
                ) : (
                  <GridPlaceholder cols={item.cols} rows={item.rows} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImageIndex !== null && (
        <ImageModal
          images={generatedImages}
          currentIndex={selectedImageIndex}
          onClose={() => setSelectedImageIndex(null)}
          onNext={() => setSelectedImageIndex((prev) => 
            prev !== null && prev < generatedImages.length - 1 ? prev + 1 : prev
          )}
          onPrevious={() => setSelectedImageIndex((prev) => 
            prev !== null && prev > 0 ? prev - 1 : prev
          )}
        />
      )}

      {/* Add keyframes for custom animations */}
      <style jsx global>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes blink {
          0% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(0.99); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes shimmer {
          0% { opacity: 0.5; }
          50% { opacity: 0.8; }
          100% { opacity: 0.5; }
        }
        @keyframes pattern-slide {
          0% { background-position: 0 0, 0 10px, 10px -10px, -10px 0px; }
          100% { background-position: -20px -20px, -20px -10px, -10px -30px, -30px -20px; }
        }
        @keyframes float-particle {
          0% { transform: translate(0, 0) scale(1); opacity: 0; }
          25% { transform: translate(50px, -50px) scale(1.5); opacity: 0.5; }
          50% { transform: translate(100px, 0) scale(1); opacity: 1; }
          75% { transform: translate(50px, 50px) scale(1.5); opacity: 0.5; }
          100% { transform: translate(0, 0) scale(1); opacity: 0; }
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        @keyframes glow {
          0% { opacity: 0.3; transform: scale(0.95); }
          50% { opacity: 0.5; transform: scale(1.05); }
          100% { opacity: 0.3; transform: scale(0.95); }
        }
        @keyframes reflection {
          0% { opacity: 0.3; transform: translateX(-50%) scale(0.95); }
          50% { opacity: 0.5; transform: translateX(-50%) scale(1.05); }
          100% { opacity: 0.3; transform: translateX(-50%) scale(0.95); }
        }
      `}</style>
    </main>
  );
}
