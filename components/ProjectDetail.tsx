import React, { useState, useEffect, useRef } from 'react';
import { Project } from '../types';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onBack }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [project]);

  useEffect(() => {
    document.body.style.overflow = isLightboxOpen ? 'hidden' : 'unset';
  }, [isLightboxOpen]);

  if (!project) return null;

  const allImages = [project.imageUrl, ...(project.gallery || [])];

  const nextMainImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevMainImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const scrollGallery = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.8;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 max-w-6xl mx-auto px-4 md:px-0">
      
      {/* 燈箱：全螢幕檢視 */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button className="absolute top-8 right-8 text-white/50 hover:text-white text-3xl font-light">✕</button>
          <img 
            src={allImages[activeImageIndex]} 
            alt="Full view"
            className="max-w-[95vw] max-h-[90vh] object-contain shadow-2xl transition-transform duration-500"
          />
        </div>
      )}

      {/* 1. 返回按鈕 */}
      <button 
        onClick={onBack}
        className="mb-8 group flex items-center text-[10px] tracking-[0.3em] uppercase text-neutral-400 hover:text-black transition-colors"
      >
        <span className="mr-2 transition-transform group-hover:-translate-x-1">←</span>
        Back to Projects
      </button>

      {/* 2. 標題區 */}
      <header className="mb-10 text-left">
        <p className="text-[12px] tracking-[0.4em] uppercase text-neutral-400 mb-2 font-medium">
          {project.category} / {project.year}
        </p>
        <h1 className="text-2xl md:text-3xl font-light serif text-neutral-900 leading-tight">
          {project.title}
        </h1>
      </header>

      {/* 3. 主區域：圖片 (9欄) + Stats (3欄) 並排 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-24 items-stretch">
        <div className="lg:col-span-9">
          <div className="group relative aspect-video w-full overflow-hidden bg-neutral-100 shadow-sm">
            <img 
              src={allImages[activeImageIndex]} 
              alt={project.title}
              className="w-full h-full object-cover transition-all duration-1000 ease-in-out group-hover:scale-[1.03]"
            />
            
            <button 
              type="button" 
              onClick={(e) => prevMainImage(e)} 
              className="absolute left-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white/90 text-neutral-800 rounded-full hover:bg-black hover:text-white transition-all shadow-xl z-20 opacity-0 group-hover:opacity-100"
            >←</button>
            <button 
              type="button" 
              onClick={(e) => nextMainImage(e)} 
              className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white/90 text-neutral-800 rounded-full hover:bg-black hover:text-white transition-all shadow-xl z-20 opacity-0 group-hover:opacity-100"
            >→</button>
            
            <div className="absolute bottom-6 right-6 text-[10px] tracking-[0.3em] text-white bg-black/30 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
              {activeImageIndex + 1} / {allImages.length}
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="bg-neutral-50/80 p-8 border border-neutral-100/50 h-full flex flex-col justify-center">
            <h2 className="text-xs tracking-[0.5em] uppercase text-neutral-400 mb-8 font-bold text-center">Project Stats</h2>
            <div className="space-y-6">
              {(project.stats || []).map((stat, index) => (
                <div key={index} className="flex flex-col border-b border-neutral-200/50 pb-4 last:border-0">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-neutral-400 mb-1">{stat.label}</span>
                  <span className="text-base font-normal text-neutral-800 tracking-wide">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4. 內容資訊區 */}
      <div className="max-w-4xl mb-32 border-b border-neutral-100 pb-16">
        <div className="space-y-16">
          <section>
            <h2 className="text-xs tracking-[0.4em] uppercase text-neutral-400 mb-6 font-bold pb-2 border-b border-neutral-50">Description</h2>
            <p className="text-xl md:text-xl font-light text-neutral-900 leading-loose whitespace-pre-line tracking-wide">
              {project.description}
            </p>
          </section>

          {/* Role & Execution: 雙層次標籤排版 */}
          <section>
            <h2 className="text-xs tracking-[0.4em] uppercase text-neutral-400 mb-8 font-bold pb-2 border-b border-neutral-50">Project Role & Execution</h2>
            
            <div className="space-y-10">
              {/* Position: 顯示 roles 的第一個項目 */}
              {/* Position: 調整為低調優雅的邊框樣式 */}
{project.roles && project.roles.length > 0 && (
  <div>
    <p className="text-[10px] tracking-[0.3em] uppercase text-neutral-400 mb-4">Position</p>
    <span className="px-6 py-2 text-[13px] tracking-[0.2em] text-neutral-800 rounded-sm font-semibold uppercase border border-neutral-800">
      {project.roles[0]}
    </span>
  </div>
)}

              {/* Tasks: 顯示 roles 剩餘的項目 */}
              {project.roles && project.roles.length > 1 && (
                <div>
                  <p className="text-[10px] tracking-[0.3em] uppercase text-neutral-400 mb-4">Execution Tasks</p>
                  <div className="flex flex-wrap gap-3">
                    {project.roles.slice(1).map((role, index) => (
                      <span 
                        key={index} 
                        className="px-4 py-2 text-[12px] tracking-[0.05em] bg-neutral-100 text-neutral-600 rounded-sm border border-neutral-200/60 font-light"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>

      {/* 5. Gallery */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="relative group/gallery mb-32">
          <div className="flex items-center justify-between mb-8 px-2">
            <h3 className="text-[12px] tracking-[0.5em] uppercase text-neutral-400 font-bold italic">Gallery Records</h3>
            <div className="flex gap-4">
              <button onClick={() => scrollGallery('left')} className="text-neutral-400 hover:text-black transition-colors text-lg p-2">←</button>
              <button onClick={() => scrollGallery('right')} className="text-neutral-400 hover:text-black transition-colors text-lg p-2">→</button>
            </div>
          </div>
          <div ref={scrollRef} className="flex gap-6 overflow-x-hidden snap-x snap-mandatory scroll-smooth">
            {project.gallery.map((url, index) => (
              <div 
                key={index} 
                className="flex-none w-[85vw] md:w-[45vw] lg:w-[31%] snap-start aspect-[3/2] overflow-hidden bg-neutral-100 cursor-zoom-in group/item shadow-sm"
                onClick={() => { setActiveImageIndex(index + 1); setIsLightboxOpen(true); }}
              >
                <img src={url} alt={`gallery-${index}`} className="w-full h-full object-cover group-hover/item:scale-105 transition-transform duration-1000" />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProjectDetail;