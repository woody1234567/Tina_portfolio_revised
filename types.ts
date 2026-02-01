export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  location: string;
  description: string;
  imageUrl: string;
  gallery: string[];
  // roles 留在詳情頁顯示詳細技術細節 (如：造型發想、都審、執照申請)
  roles: string[]; 
  // 新增 projectType：專門用於首頁顯示 (如：獨立專案、協助設計)
  projectType: string; 
  stats: {
    label: string;
    value: string;
  }[];
}

export type ViewState = 
  | 'home' 
  | 'about' 
  | 'projects' 
  | 'student' 
  | 'research' 
  | 'awards' 
  | 'certs' 
  | 'contact' 
  | 'project-detail';