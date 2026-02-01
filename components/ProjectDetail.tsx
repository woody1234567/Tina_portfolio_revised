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
        <p className="text-[12px] tracking-[0.4em] uppercase text-[12px]-400 mb-2 font-medium">
          {project.category} / {project.year}
        </p>
        <h1 className="text-2xl md:text-5xl font-light serif text-[12px]-900 leading-tight">
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
          <button onClick={prevMainImage} className="w-10 h-10 flex items-center justify-center bg-white/90 rounded-full hover:bg-black hover:text-white transition-all text-[12px]">←</button>
          <button onClick={nextMainImage} className="w-10 h-10 flex items-center justify-center bg-white/90 rounded-full hover:bg-black hover:text-white transition-all text-[12px]">→</button>
        </div>
        <div className="absolute bottom-6 right-8 text-[12px] tracking-[0.3em] text-white bg-black/40 backdrop-blur-md px-3 py-1 rounded-sm">
          {activeImageIndex + 1} / {allImages.length}
        </div>
      </div>

      {/* 4. 內容資訊區 */}
<div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20 border-b border-neutral-100 pb-16">
  <div className="lg:col-span-8 space-y-14"> {/* 稍微加寬左側比例 (7->8) */}
    <section>
      <h2 className="text-xs tracking-[0.4em] uppercase text-neutral-400 mb-6 font-bold pb-2 border-b border-neutral-50">
        Description
      </h2>
      <p className="text-xl md:text-xl font-light text-neutral-900 leading-loose whitespace-pre-line tracking-wide">
        {project.description}
      </p>
    </section>

    <section>
      <h2 className="text-xs tracking-[0.4em] uppercase text-neutral-400 mb-6 font-bold pb-2 border-b border-neutral-50">
        Role
      </h2>
      <div className="flex flex-wrap gap-3">
        {(project.roles || []).map((role, index) => (
          <span key={index} className="px-5 py-2 text-sm tracking-[0.1em] bg-neutral-100/50 text-neutral-700 rounded-sm font-medium">
            {role}
          </span>
        ))}
      </div>
    </section>
  </div>

  <div className="lg:col-span-4"> {/* 右側比例縮小 (5->4) */}
    <div className="bg-neutral-50/80 p-10 border border-neutral-100/50 sticky top-8">
      <h2 className="text-xs tracking-[0.5em] uppercase text-neutral-400 mb-10 text-center font-bold">Project Stats</h2>
      <div className="space-y-8">
        {(project.stats || []).map((stat, index) => (
          <div key={index} className="flex flex-col border-b border-neutral-200/50 pb-5 last:border-0">
            <span className="text-[10px] tracking-[0.2em] uppercase text-neutral-400 mb-2">{stat.label}</span>
            <span className="text-lg font-normal text-neutral-800 tracking-wide">{stat.value}</span>
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
            <h3 className="text-[12px] tracking-[0.5em] uppercase text-neutral-300 font-bold italic">Gallery Records</h3>
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