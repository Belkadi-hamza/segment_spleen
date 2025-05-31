import React, { useCallback, useState } from 'react';
import { FiUpload, FiImage, FiFile } from 'react-icons/fi';

interface UploadSectionProps {
  onImageUpload: (file: File, original: string, overlay?: string) => void;
}

export const UploadSection: React.FC<UploadSectionProps> = ({ onImageUpload }) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileChange = useCallback((file: File) => {
    if (!file.type.startsWith('image/') && !file.name.endsWith('.nii.gz')) {
      alert("Veuillez sélectionner un fichier image (JPEG, PNG) ou un fichier NIfTI (.nii.gz)");
      return;
    }

    // Gestion des fichiers .nii.gz
    if (file.name.endsWith('.nii.gz')) {
      const formData = new FormData();
      formData.append('nii_file', file);
      fetch('http://localhost/5000/predict', {
        method: 'POST',
        body: formData,
      })
        .then(async (response) => {
          if (!response.ok) {
            const error = await response.json();
            alert(error.error || "Erreur lors du traitement du fichier");
            return;
          }
          const data = await response.json();
          onImageUpload(file, data.original_image, data.overlay_image);
        })
        .catch(() => {
          alert("Impossible d’atteindre le serveur de segmentation.");
        });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        onImageUpload(file, e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  }, [onImageUpload]);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        handleFileChange(files[0]);
      }
    },
    [handleFileChange]
  );

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileChange(files[0]);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto text-center">
        {/* Titre principal */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-pink-500 text-transparent bg-clip-text mb-4">
            Téléversez une image médicale pour analyser la rate
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Notre système utilise un modèle U-Net avancé entraîné sur des données cliniques pour segmenter précisément la rate sur vos images IRM ou scanner.
          </p>
        </div>

        {/* Zone de dépôt */}
        <div
          className={`relative border-2 border-dashed rounded-3xl p-12 transition-all duration-300 ${
            isDragOver
              ? "border-orange-400 bg-orange-50 scale-105"
              : "border-gray-300 hover:border-orange-300 hover:bg-orange-25 bg-white"
          } shadow-xl`}
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
        >
          <input
            type="file"
            accept=".nii.gz,image/*"
            onChange={handleFileInput}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            id="file-upload"
          />

          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mb-6">
              <FiUpload className="w-10 h-10 text-orange-600" />
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              {isDragOver ? "Relâchez pour télécharger" : "Glissez votre image ici"}
            </h3>

            <p className="text-gray-500 mb-6">
              ou{" "}
              <label
                htmlFor="file-upload"
                className="text-orange-600 hover:text-orange-800 cursor-pointer font-medium transition-colors"
              >
                choisissez un fichier
              </label>
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <FiImage /> JPEG, PNG
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <FiFile /> NIfTI (.nii.gz)
              </span>
              <span>•</span>
              <span>Taille max 10 Mo</span>
            </div>
          </div>
        </div>

        {/* Avantages / Features */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="bg-white border border-gray-200 rounded-xl p-6 text-center transition-transform duration-300 hover:scale-105 hover:shadow-lg">
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Résultats fiables</h4>
            <p className="text-gray-600">Précision supérieure à 95 % sur des données réelles</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 text-center transition-transform duration-300 hover:scale-105 hover:shadow-lg">
            <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Traitement rapide</h4>
            <p className="text-gray-600">Obtenez vos résultats en quelques secondes seulement</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 text-center transition-transform duration-300 hover:scale-105 hover:shadow-lg">
            <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Données protégées</h4>
            <p className="text-gray-600">Aucun stockage des données – votre confidentialité est notre priorité</p>
          </div>
        </div>
      </div>
    </div>
  );
};