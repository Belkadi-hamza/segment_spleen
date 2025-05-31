import React, { useState } from 'react';
import { UploadSection } from '@/components/UploadSection';
import { ProcessingOverlay } from '@/components/ProcessingOverlay';
import { ResultsView } from '@/components/ResultsView';

export type ProcessingState = 'idle' | 'uploading' | 'processing' | 'completed' | 'error';

export interface UploadedImage {
  file: File;
  original: string;
  overlay?: string;
}

const Index = () => {
  const [processingState, setProcessingState] = useState<ProcessingState>('idle');
  const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(null);
  const [error, setError] = useState<string>('');

  const handleImageUpload = (file: File, original: string, overlay?: string) => {
    setUploadedImage({ file, original, overlay });
    setProcessingState('uploading');
    setError('');
  };

  const handleStartProcessing = async () => {
    if (!uploadedImage) return;

    setProcessingState('processing');

    // Simule un délai de traitement
    setTimeout(() => {
      // En vrai, ici on recevrait le résultat du backend
      setUploadedImage(prev =>
        prev
          ? {
              ...prev,
              overlay: prev.overlay || 'data:image/png;base64,simulated-result'
            }
          : null
      );
      setProcessingState('completed');
    }, 3000);
  };

  const handleReset = () => {
    setProcessingState('idle');
    setUploadedImage(null);
    setError('');
  };

  const handleRetry = () => {
    setError('');
    handleStartProcessing();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col">
      <main className="flex-1 relative">
        {processingState === 'idle' && (
          <UploadSection onImageUpload={handleImageUpload} />
        )}

        {processingState === 'uploading' && uploadedImage && (
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Image téléchargée
                </h2>
                <div className="flex justify-center mb-8">
                  <img
                    src={uploadedImage.original}
                    alt="Image médicale téléchargée"
                    className="max-w-full max-h-96 rounded-lg shadow-lg"
                  />
                </div>
                <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <button
                    onClick={handleReset}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Changer d’image
                  </button>
                  <button
                    onClick={handleStartProcessing}
                    className="px-8 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg hover:from-orange-600 hover:to-pink-600 transition-all font-medium shadow-md hover:shadow-lg"
                  >
                    Démarrer la segmentation
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {processingState === 'processing' && <ProcessingOverlay />}

        {processingState === 'completed' && uploadedImage && (
          <ResultsView
            originalImage={uploadedImage.original}
            segmentedImage={uploadedImage.overlay || uploadedImage.original}
            onReset={handleReset}
          />
        )}

        {processingState === 'error' && (
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto text-center">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="text-red-500 text-6xl mb-4">⚠️</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Erreur lors du traitement
                </h2>
                <p className="text-gray-600 mb-6">{error}</p>
                <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <button
                    onClick={handleReset}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Recommencer
                  </button>
                  <button
                    onClick={handleRetry}
                    className="px-8 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg hover:from-orange-600 hover:to-pink-600 transition-all font-medium shadow-md hover:shadow-lg"
                  >
                    Réessayer
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;