
import React, { useState } from 'react';
import { VisitStep } from '../types';
import { X } from './Icons';

interface StepEditorProps {
  step: VisitStep;
  onSave: (updatedStep: VisitStep) => void;
  onClose: () => void;
}

const StepEditor: React.FC<StepEditorProps> = ({ step, onSave, onClose }) => {
  const [editedStep, setEditedStep] = useState<VisitStep>({ ...step });

  const handleActionChange = (index: number, value: string) => {
    const newActions = [...editedStep.actions];
    newActions[index] = value;
    setEditedStep({ ...editedStep, actions: newActions });
  };

  const handleTipChange = (index: number, value: string) => {
    const newTips = [...editedStep.tips];
    newTips[index] = value;
    setEditedStep({ ...editedStep, tips: newTips });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-thales text-white">
          <h2 className="text-xl font-bold font-serif">Modifier l'étape</h2>
          <button onClick={onClose} className="hover:bg-white/20 p-2 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Titre</label>
              <input
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-thales outline-none"
                value={editedStep.title}
                onChange={(e) => setEditedStep({ ...editedStep, title: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Durée</label>
              <input
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-thales outline-none"
                value={editedStep.duration}
                onChange={(e) => setEditedStep({ ...editedStep, duration: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Objectif Principal</label>
            <input
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-thales outline-none"
              value={editedStep.objective}
              onChange={(e) => setEditedStep({ ...editedStep, objective: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Actions à mener</label>
            <div className="space-y-2">
              {editedStep.actions.map((action, idx) => (
                <input
                  key={idx}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:ring-1 focus:ring-thales outline-none"
                  value={action}
                  onChange={(e) => handleActionChange(idx, e.target.value)}
                />
              ))}
              <button
                onClick={() => setEditedStep({ ...editedStep, actions: [...editedStep.actions, ''] })}
                className="text-thales text-sm font-medium hover:underline"
              >
                + Ajouter une action
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Astuces & Idées en plus</label>
            <div className="space-y-2">
              {editedStep.tips.map((tip, idx) => (
                <input
                  key={idx}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:ring-1 focus:ring-thales outline-none italic"
                  value={tip}
                  onChange={(e) => handleTipChange(idx, e.target.value)}
                />
              ))}
              <button
                onClick={() => setEditedStep({ ...editedStep, tips: [...editedStep.tips, ''] })}
                className="text-amber-600 text-sm font-medium hover:underline"
              >
                + Ajouter une astuce
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg text-gray-600 font-medium hover:bg-gray-100 transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={() => onSave(editedStep)}
            className="px-6 py-2 rounded-lg bg-thales hover:bg-thales-dark text-white font-medium shadow-lg transition-all"
          >
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
};

export default StepEditor;
