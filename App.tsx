
import React, { useState, useEffect, useMemo } from 'react';
import { VisitStep } from './types';
import { INITIAL_STEPS } from './constants';
import StepCard from './components/StepCard';
import StepEditor from './components/StepEditor';
import { Plus, Globe, Coffee, Utensils } from './components/Icons';

const App: React.FC = () => {
  // Changement de clé pour forcer la mise à jour des horaires chez l'utilisateur
  const STORAGE_KEY = 'visit-steps-factorial-v6h-3h';
  
  const [steps, setSteps] = useState<VisitStep[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : INITIAL_STEPS;
  });
  
  const [startTime, setStartTime] = useState('09:00');
  const [editingStep, setEditingStep] = useState<VisitStep | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(steps));
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
    if (window.confirm('Réinitialiser la structure complète (6h avec 3h business) ?')) {
      setSteps(INITIAL_STEPS);
    }
  };

  // Helper pour parser la durée (ex: "1h 30" ou "45 min")
  const parseDuration = (durationStr: string): number => {
    let totalMinutes = 0;
    const hoursMatch = durationStr.match(/(\d+)\s*h/);
    const minsMatch = durationStr.match(/(\d+)\s*min/);
    
    if (hoursMatch) totalMinutes += parseInt(hoursMatch[1]) * 60;
    if (minsMatch) totalMinutes += parseInt(minsMatch[1]);
    
    // Si c'est juste un chiffre sans unité, on assume des minutes
    if (!hoursMatch && !minsMatch) {
      const fallback = parseInt(durationStr);
      if (!isNaN(fallback)) totalMinutes = fallback;
    }
    
    return totalMinutes || 30; // 30min par défaut si parsing échoue
  };

  // Helper pour formater l'heure HH:mm
  const formatTime = (totalMinutes: number): string => {
    const h = Math.floor(totalMinutes / 60) % 24;
    const m = totalMinutes % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
  };

  // Calcul des tranches horaires
  const stepsWithTime = useMemo(() => {
    const [startH, startM] = startTime.split(':').map(Number);
    let currentTotalMinutes = startH * 60 + startM;

    return steps.map(step => {
      const duration = parseDuration(step.duration);
      const start = formatTime(currentTotalMinutes);
      currentTotalMinutes += duration;
      const end = formatTime(currentTotalMinutes);
      return { ...step, timeRange: `${start} - ${end}` };
    });
  }, [steps, startTime]);

  const exportToJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(steps, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "planning_visite_factorial_thales.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden pb-32">
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
              <p className="text-amber-400 font-bold tracking-[0.3em] uppercase mb-4 text-sm">Visite Partenaire : Factorial</p>
              <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">THALES INFORMATIQUE</h1>
              <p className="text-blue-50 text-lg md:text-xl max-w-2xl font-light">
                Programme d'immersion stratégique de <strong>6 heures</strong> pour les équipes de <strong>Factorial</strong>. Excellence, innovation et culture au cœur du Maroc.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 items-center">
              <div className="bg-white/10 p-2 rounded-xl backdrop-blur-sm border border-white/20 mr-2">
                <label className="block text-[10px] uppercase font-bold text-amber-400 mb-1">Heure de début</label>
                <input 
                  type="time" 
                  value={startTime} 
                  onChange={(e) => setStartTime(e.target.value)}
                  className="bg-transparent text-white font-bold outline-none"
                />
              </div>
              <button 
                onClick={resetSchedule}
                className="px-6 py-2 border border-white/20 hover:bg-white/10 rounded-full text-sm font-medium transition-all"
              >
                Réinitialiser
              </button>
              <button 
                onClick={exportToJson}
                className="px-6 py-2 bg-white text-thales hover:bg-blue-50 rounded-full text-sm font-bold transition-all shadow-lg"
              >
                Exporter la config
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 mt-12 relative z-10">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-2xl font-serif font-bold text-thales">Parcours de visite (6h)</h2>
            <p className="text-sm text-gray-500 mt-1">Les horaires s'ajustent automatiquement selon la durée des étapes.</p>
          </div>
          <button 
            onClick={handleAddStep}
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-6 py-2.5 rounded-full font-bold shadow-lg shadow-amber-500/30 transition-all active:scale-95"
          >
            <Plus className="w-5 h-5" />
            Ajouter une étape
          </button>
        </div>

        {/* Timeline */}
        <div className="relative mb-20">
          {stepsWithTime.map((step, index) => (
            <StepCard
              key={step.id}
              step={step}
              isEven={index % 2 !== 0}
              onEdit={() => handleEdit(step)}
              onDelete={() => handleDelete(step.id)}
              timeRange={(step as any).timeRange}
            />
          ))}

          {steps.length === 0 && (
            <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200">
              <p className="text-gray-400">Aucune étape définie. Commencez par en ajouter une !</p>
            </div>
          )}
        </div>

        {/* Bonus Ideas Section */}
        <section className="bg-amber-50/50 border border-amber-100 rounded-3xl p-8 md:p-12 mb-20">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-3xl">🌍</span>
            <h2 className="text-2xl font-serif font-bold text-thales">IDÉES BONUS <span className="text-amber-600 font-sans text-lg font-medium opacity-80">(SI TEMPS DISPONIBLE)</span></h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-amber-100 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 mb-4">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Quartier Emblématique</h3>
              <p className="text-sm text-gray-500">Petite balade immersive pour découvrir l'âme de la ville.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-amber-100 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 mb-4">
                <Utensils className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Lieu Culturel</h3>
              <p className="text-sm text-gray-500">Visite express d’un monument ou d'une galerie d'art locale.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-amber-100 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 mb-4">
                <Coffee className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Rooftop Café</h3>
              <p className="text-sm text-gray-500">Pause détente avec une vue imprenable pour clôturer la journée.</p>
            </div>
          </div>
        </section>
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
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex gap-4 w-full max-w-md px-4 print:hidden">
        <div className="bg-white/95 backdrop-blur-md w-full px-6 py-4 rounded-2xl shadow-2xl border border-blue-100 flex items-center justify-between text-thales">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-thales opacity-50 uppercase tracking-widest">Partenaire</span>
            <span className="font-bold text-lg">Factorial</span>
          </div>
          <div className="w-px h-8 bg-blue-100" />
          <div className="flex gap-4">
            <button 
              className="text-sm font-bold hover:text-amber-600 transition-colors bg-blue-50 px-4 py-2 rounded-lg"
              onClick={() => window.print()}
            >
              Imprimer PDF
            </button>
          </div>
        </div>
      </div>

      {/* Footer Branding */}
      <footer className="mt-20 py-12 border-t border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="w-16 h-px bg-amber-200 mx-auto mb-6" />
          <p className="text-thales font-serif font-bold text-xl mb-2 italic">Thales x Factorial : Ensemble pour l'avenir</p>
          <p className="text-gray-400 text-sm">© 2025 Thales Informatique Maroc - Programme de Visite Partenaire</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
