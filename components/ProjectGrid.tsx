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
    /* 使用 lg:grid-cols-4 確保橫向並排，gap 縮小讓圖片更飽滿 */
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
      {displayProjects.map((project) => (
        <div 
          key={project.id} 
          className="group cursor-pointer" 
          onClick={() => onProjectClick(project)}
        >
          {/* 關鍵修改：比例改為 aspect-[3/2]，降低垂直高度，解決需要往下拉的問題 */}
          <div className="overflow-hidden bg-neutral-100 aspect-[3/2] mb-4">
            <img 
              src={project.imageUrl} 
              alt={project.title} 
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
              onError={(e) => {
                // 如果圖片載入失敗，顯示優雅的灰色佔位塊
                (e.target as HTMLImageElement).src = "https://via.placeholder.com/800x533/f5f5f5/a3a3a3?text=Project+Coming+Soon";
              }}
            />
          </div>
          
          <div className="space-y-1">
            {/* 標題與分類保持精緻小字級 */}
            <h3 className="text-base font-light serif text-neutral-800 leading-tight group-hover:text-black transition-colors">
              {project.title}
            </h3>
            <div className="flex justify-between items-center">
              <p className="text-[9px] tracking-[0.2em] uppercase text-neutral-400 font-medium">
                {project.category}
              </p>
              <span className="text-[9px] font-light text-neutral-300 italic">
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