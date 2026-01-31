import React from 'react';
import { Project } from '../types';
import { PROJECTS } from '../constants';

interface ProjectGridProps {
  onProjectClick: (project: Project) => void;
  limit?: number;
}

const ProjectGrid: React.FC<ProjectGridProps> = ({ onProjectClick, limit }) => {
  const displayProjects = limit ? PROJECTS.slice(0, limit) : PROJECTS;

  return (
    /* 使用 lg:grid-cols-4 確保橫向並排，gap-x-6 保持適度間距 */
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
      {displayProjects.map((project) => (
        <div 
          key={project.id} 
          className="group cursor-pointer" 
          onClick={() => onProjectClick(project)}
        >
          {/* 圖片區域：黑白轉彩色效果 */}
          <div className="overflow-hidden bg-neutral-100 aspect-[3/2] mb-6">
            <img 
              src={project.imageUrl} 
              alt={project.title}
              className="w-full h-full object-cover transition-all duration-700 ease-in-out 
                         grayscale hover:grayscale-0 scale-105 hover:scale-100" 
            />
          </div>
          
          {/* 文字資訊區：放大字體版本 */}
          <div className="space-y-2">
            {/* 標題放大至 text-lg ~ text-xl */}
            <h3 className="text-lg md:text-xl font-normal serif text-neutral-800 leading-tight group-hover:text-black transition-colors">
              {project.title}
            </h3>
            
            <div className="flex justify-between items-center border-t border-neutral-50 pt-2">
              {/* 分類放大至 11px ~ xs */}
              <p className="text-[12px] md:text-[14px] tracking-[0.2em] uppercase text-neutral-500 font-medium">
                {project.category}
              </p>
              {/* 年份同步放大 */}
              <span className="text-[12px] md:text-[14px] font-light text-neutral-500 italic">
                {project.year}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectGrid;