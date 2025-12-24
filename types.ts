
export interface VisitStep {
  id: string;
  title: string;
  duration: string;
  objective: string;
  actions: string[];
  tips: string[];
  icon: 'Coffee' | 'Briefcase' | 'Globe' | 'Utensils' | 'Camera' | 'Gift';
}

export type IconType = VisitStep['icon'];
