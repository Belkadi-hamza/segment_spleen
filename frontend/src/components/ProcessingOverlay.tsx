import React, { useState, useEffect } from 'react';

export const ProcessingOverlay = () => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    "Analyse de la structure de l'image...",
    "Prétraitement des données médicales...",
    "Exécution de la segmentation U-Net...",
    "Affinement des contours de la rate...",
    "Génération des résultats finaux..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = Math.min(prev + Math.random() * 15 + 5, 100);
        
        // Mise à jour de l'étape en fonction de la progression
        if (newProgress > 80) setCurrentStep(4);
        else if (newProgress > 60) setCurrentStep(3);
        else if (newProgress > 40) setCurrentStep(2);
        else if (newProgress > 20) setCurrentStep(1);
        else setCurrentStep(0);
        
        return newProgress;
      });
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-white bg-opacity-95 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-6">
        {/* Icône médicale animée */}
        <div className="relative mb-8">
          <div className="w-32 h-32 mx-auto relative">
            {/* Anneau tournant extérieur */}
            <div className="absolute inset-0 border-4 border-indigo-200 rounded-full animate-spin border-t-indigo-600"></div>
            
            {/* Icône médicale centrale */}
            <div className="absolute inset-4 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Traitement de votre image
        </h2>
        
        <p className="text-lg text-gray-600 mb-8">
          Notre système IA analyse l'image médicale et segmente la région de la rate...
        </p>

        {/* Barre de progression */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>Progression</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-indigo-600 to-blue-600 h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Étapes en cours */}
        <div className="space-y-3">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ${
                index === currentStep
                  ? 'bg-indigo-50 text-indigo-700'
                  : index < currentStep
                  ? 'bg-green-50 text-green-700'
                  : 'text-gray-400'
              }`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                index === currentStep
                  ? 'bg-indigo-600 animate-pulse'
                  : index < currentStep
                  ? 'bg-green-600'
                  : 'bg-gray-300'
              }`}>
                {index < currentStep ? (
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <div className="w-2 h-2 bg-white rounded-full" />
                )}
              </div>
              <span className="font-medium">{step}</span>
            </div>
          ))}
        </div>

        <p className="text-sm text-gray-500 mt-8">
          Le traitement prend généralement entre 20 et 30 secondes. Veuillez ne pas fermer cette fenêtre.
        </p>
      </div>
    </div>
  );
};