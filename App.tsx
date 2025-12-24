
import React, { useState, useEffect } from 'react';
import { VisitStep } from './types';
import { INITIAL_STEPS } from './constants';
import StepCard from './components/StepCard';
import StepEditor from './components/StepEditor';
import { Plus } from './components/Icons';

const App: React.FC = () => {
  const [steps, setSteps] = useState<VisitStep[]>(() => {
    const saved = localStorage.getItem('visit-steps');
    return saved ? JSON.parse(saved) : INITIAL_STEPS;
  });
  const [editingStep, setEditingStep] = useState<VisitStep | null>(null);

  useEffect(() => {
    localStorage.setItem('visit-steps', JSON.stringify(steps));
  }, [steps]);

  const handleEdit = (step: VisitStep) => {
    setEditingStep(step);
  };

  const handleSave = (updatedStep: VisitStep) => {
    setSteps(prev => prev.map(s => s.id === updatedStep.id ? updatedStep : s));
    setEditingStep(null);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Voulez-vous vraiment supprimer cette étape ?')) {
      setSteps(prev => prev.filter(s => s.id !== id));
    }
  };

  const handleAddStep = () => {
    const newStep: VisitStep = {
      id: Date.now().toString(),
      title: 'Nouvelle étape',
      duration: '30 min',
      objective: 'Définir un objectif',
      actions: ['Première action'],
      tips: ['Astuce ou détail'],
      icon: 'Briefcase'
    };
    setSteps([...steps, newStep]);
    setEditingStep(newStep);
  };

  const resetSchedule = () => {
    if (window.confirm('Réinitialiser la structure complète ?')) {
      setSteps(INITIAL_STEPS);
    }
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden pb-20">
      <div className="moroccan-pattern fixed inset-0 pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 bg-thales text-white shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
           <svg className="w-64 h-64 text-amber-500 fill-current" viewBox="0 0 100 100">
             <path d="M50 0 L61 39 L100 50 L61 61 L50 100 L39 61 L0 50 L39 39 Z" />
           </svg>
        </div>
        
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-amber-400 font-bold tracking-[0.3em] uppercase mb-4 text-sm">Planning de Visite Partenaire</p>
              <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">THALES INFORMATIQUE</h1>
              <p className="text-blue-50 text-lg md:text-xl max-w-2xl font-light">
                Une demi-journée d'immersion stratégique, culturelle et gastronomique pour sceller notre partenariat franco-marocain.
              </p>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={resetSchedule}
                className="px-6 py-2 border border-white/20 hover:bg-white/10 rounded-full text-sm font-medium transition-all"
              >
                Réinitialiser
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 mt-12 relative z-10">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-2xl font-serif font-bold text-thales">Structure de la demi-journée</h2>
          <button 
            onClick={handleAddStep}
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-6 py-2.5 rounded-full font-bold shadow-lg shadow-amber-500/30 transition-all active:scale-95"
          >
            <Plus className="w-5 h-5" />
            Ajouter une étape
          </button>
        </div>

        {/* Timeline */}
        <div className="relative">
          {steps.map((step, index) => (
            <StepCard
              key={step.id}
              step={step}
              isEven={index % 2 !== 0}
              onEdit={() => handleEdit(step)}
              onDelete={() => handleDelete(step.id)}
            />
          ))}

          {steps.length === 0 && (
            <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200">
              <p className="text-gray-400">Aucune étape définie. Commencez par en ajouter une !</p>
            </div>
          )}
        </div>
      </main>

      {/* Modal Editor */}
      {editingStep && (
        <StepEditor
          step={editingStep}
          onSave={handleSave}
          onClose={() => setEditingStep(null)}
        />
      )}

      {/* Sticky Bottom Actions */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex gap-4">
        <div className="bg-white/90 backdrop-blur-md px-6 py-3 rounded-full shadow-2xl border border-blue-100 flex items-center gap-8 text-thales">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-thales opacity-50 uppercase tracking-widest">Total Étapes</span>
            <span className="font-bold">{steps.length}</span>
          </div>
          <div className="w-px h-8 bg-blue-100" />
          <button 
            className="text-sm font-bold hover:text-amber-600 transition-colors"
            onClick={() => window.print()}
          >
            Imprimer le programme
          </button>
        </div>
      </div>

      {/* Footer Branding */}
      <footer className="mt-20 py-12 border-t border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="w-16 h-px bg-amber-200 mx-auto mb-6" />
          <p className="text-thales font-serif font-bold text-xl mb-2 italic">L’excellence au service du partenariat</p>
          <p className="text-gray-400 text-sm">© 2024 Thales Informatique Maroc - Planification de Visite VIP</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
