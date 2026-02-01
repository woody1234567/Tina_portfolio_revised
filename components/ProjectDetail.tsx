import React, { useState, useEffect, useRef } from 'react';
import { Project } from '../types';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onBack }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [project]);

  if (!project) return null;

  const allImages = [project.imageUrl, ...(project.gallery || [])];

  // 主圖切換邏輯
  const nextMainImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevMainImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  // Gallery 左右按鈕移動邏輯
  const scrollGallery = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.8; // 每次移動 80% 的寬度
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* 1. 返回按鈕 */}
      <button 
        onClick={onBack}
        className="mb-8 group flex items-center text-[10px] tracking-[0.3em] uppercase text-neutral-400 hover:text-black transition-colors"
      >
        <span className="mr-2 transition-transform group-hover:-translate-x-1">←</span>
        Back to Projects
      </button>

      {/* 2. 標題區 */}
      <header className="mb-10 text-center md:text-left">
        <p className="text-[10px] tracking-[0.4em] uppercase text-neutral-400 mb-2 font-medium">
          {project.category} / {project.year}
        </p>
        <h1 className="text-3xl md:text-5xl font-light serif text-neutral-900 leading-tight">
          {project.title}
        </h1>
      </header>

      {/* 3. 主圖輪播 */}
      <div className="group relative aspect-[21/9] w-full overflow-hidden bg-neutral-100 mb-12 cursor-pointer shadow-sm">
        <img 
          src={allImages[activeImageIndex]} 
          alt={project.title}
          className="w-full h-full object-cover transition-all duration-700 ease-in-out"
        />
        <div className="absolute inset-0 flex items-center justify-between px-6 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={prevMainImage} className="w-10 h-10 flex items-center justify-center bg-white/90 rounded-full hover:bg-black hover:text-white transition-all text-xs">←</button>
          <button onClick={nextMainImage} className="w-10 h-10 flex items-center justify-center bg-white/90 rounded-full hover:bg-black hover:text-white transition-all text-xs">→</button>
        </div>
        <div className="absolute bottom-6 right-8 text-[9px] tracking-[0.3em] text-white bg-black/40 backdrop-blur-md px-3 py-1 rounded-sm">
          {activeImageIndex + 1} / {allImages.length}
        </div>
      </div>

      {/* 4. 內容資訊區 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12 border-b border-neutral-100 pb-12">
        <div className="lg:col-span-7 space-y-10">
          <section>
            <h2 className="text-[9px] tracking-[0.4em] uppercase text-neutral-300 mb-4 font-bold pb-2">Description</h2>
            <p className="text-base font-light text-neutral-600 leading-relaxed whitespace-pre-line">
              {project.description}
            </p>
          </section>

          <section>
            <h2 className="text-[9px] tracking-[0.4em] uppercase text-neutral-300 mb-4 font-bold pb-2">Role</h2>
            <div className="flex flex-wrap gap-2">
              {(project.roles || []).map((role, index) => (
                <span key={index} className="px-3 py-1 text-[9px] tracking-[0.1em] bg-neutral-50 border border-neutral-100 text-neutral-400 rounded-sm">
                  {role}
                </span>
              ))}
            </div>
          </section>
        </div>

        <div className="lg:col-span-5">
          <div className="bg-neutral-50/50 p-8 border border-neutral-100/50">
            <h2 className="text-[9px] tracking-[0.5em] uppercase text-neutral-300 mb-8 text-center font-bold">Project Stats</h2>
            <div className="space-y-6">
              {(project.stats || []).map((stat, index) => (
                <div key={index} className="flex flex-col border-b border-neutral-100 pb-4 last:border-0">
                  <span className="text-[9px] tracking-[0.2em] uppercase text-neutral-300 mb-1">{stat.label}</span>
                  <span className="text-sm font-light text-neutral-700 tracking-wide">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 5. Gallery：膠捲式按鈕切換 */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="relative group/gallery">
          <div className="flex items-center justify-between mb-6 px-2">
            <h3 className="text-[10px] tracking-[0.5em] uppercase text-neutral-300 font-bold italic">Gallery Records</h3>
            {/* Gallery 切換按鈕 */}
            <div className="flex gap-4">
              <button 
                onClick={() => scrollGallery('left')}
                className="text-neutral-400 hover:text-black transition-colors text-lg p-2"
              >
                ←
              </button>
              <button 
                onClick={() => scrollGallery('right')}
                className="text-neutral-400 hover:text-black transition-colors text-lg p-2"
              >
                →
              </button>
            </div>
          </div>
          
          {/* 橫向顯示容器 */}
          <div 
            ref={scrollRef}
            className="flex gap-4 overflow-x-hidden snap-x snap-mandatory scroll-smooth"
          >
            {project.gallery.map((url, index) => (
              <div 
                key={index} 
                className="flex-none w-[90vw] md:w-[45vw] lg:w-[32%] snap-start aspect-[3/2] overflow-hidden bg-neutral-100"
              >
                <img 
                  src={url} 
                  alt={`gallery-${index}`} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
                />
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* 底部留白 */}
      <div className="h-24" />
    </div>
  );
};

export default ProjectDetail;