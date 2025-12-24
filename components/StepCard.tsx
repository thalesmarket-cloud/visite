
import React from 'react';
import { VisitStep } from '../types';
import * as Icons from './Icons';

interface StepCardProps {
  step: VisitStep;
  onEdit: () => void;
  onDelete: () => void;
  isEven: boolean;
  timeRange?: string; // Nouvelle prop pour afficher l'horaire calculé
}

const StepCard: React.FC<StepCardProps> = ({ step, onEdit, onDelete, isEven, timeRange }) => {
  const IconComponent = Icons[step.icon as keyof typeof Icons] || Icons.Briefcase;

  return (
    <div className={`relative flex items-center justify-between w-full mb-12 group`}>
      {/* Connector Line (Desktop) */}
      <div className="absolute left-1/2 -ml-0.5 w-1 h-full bg-blue-100 hidden md:block group-last:hidden" />
      
      {/* Mobile Connector */}
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-blue-100 md:hidden" />

      <div className={`w-full md:w-[45%] flex flex-col ${isEven ? 'md:order-last' : 'md:order-first'}`}>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 relative">
          
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-thales shadow-inner">
                <IconComponent className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 leading-tight">{step.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs font-bold text-white bg-thales px-2 py-0.5 rounded shadow-sm tracking-wider">
                    {timeRange || step.duration}
                  </span>
                  <span className="text-[10px] text-gray-400 font-medium">({step.duration})</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity print:hidden">
              <button 
                onClick={onEdit}
                className="p-2 hover:bg-gray-100 rounded-full text-thales"
                title="Modifier"
              >
                <Icons.Edit3 className="w-4 h-4" />
              </button>
              <button 
                onClick={onDelete}
                className="p-2 hover:bg-red-50 rounded-full text-red-600"
                title="Supprimer"
              >
                <Icons.Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Objectif stratégique</span>
              <p className="text-sm text-gray-700 font-medium">🎯 {step.objective}</p>
            </div>

            <div className="pt-2">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Actions clés</span>
              <ul className="grid grid-cols-1 gap-1.5">
                {step.actions.filter(a => a.trim()).map((action, idx) => (
                  <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 flex-shrink-0" />
                    {action}
                  </li>
                ))}
              </ul>
            </div>

            {step.tips.some(t => t.trim()) && (
              <div className="pt-3 mt-1 border-t border-gray-50 bg-amber-50/30 -mx-6 px-6 py-3 rounded-b-2xl italic">
                <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest block mb-1">💡 Astuce & Note</span>
                <ul className="space-y-1">
                  {step.tips.filter(t => t.trim()).map((tip, idx) => (
                    <li key={idx} className="text-xs text-amber-800">• {tip}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Central Marker */}
      <div className="z-10 absolute left-6 md:left-1/2 md:-ml-3 w-6 h-6 rounded-full border-4 border-white bg-thales shadow-lg transition-transform group-hover:scale-110" />
    </div>
  );
};

export default StepCard;
