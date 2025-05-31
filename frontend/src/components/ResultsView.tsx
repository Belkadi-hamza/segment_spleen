import React from 'react';

interface ResultsViewProps {
  originalImage: string;
  segmentedImage: string;
  onReset: () => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({
  originalImage,
  segmentedImage,
  onReset
}) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = segmentedImage;
    link.download = 'resultat-segmentation-rate.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* En-tête */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-emerald-400 to-pink-500 text-transparent bg-clip-text">
            Segmentation Terminée
          </h2>
          <p className="text-lg text-gray-600">
            La segmentation de la rate a été effectuée avec succès. Comparez les résultats ci-dessous.
          </p>
        </div>

        {/* Comparaison des images */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="grid md:grid-cols-2">
            {/* Image originale */}
            <div className="p-8 border-b md:border-b-0 md:border-r border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
                Image Originale
              </h3>
              <div className="relative group">
                <img
                  src={originalImage}
                  alt="Image médicale originale"
                  className="w-full h-auto rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 rounded-lg" />
              </div>
            </div>

            {/* Résultat segmenté */}
            <div className="p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
                Résultat Segmenté
              </h3>
              <div className="relative group">
                <img
                  src={segmentedImage}
                  alt="Résultat de la segmentation de la rate"
                  className="w-full h-auto rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 rounded-lg" />

                {/* Badge indiquant la segmentation */}
                <div className="absolute top-4 right-4 bg-rose-500 bg-opacity-80 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Zone de la Rate
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Métadonnées des résultats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center transition-transform hover:scale-105">
            <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Score de Précision</h4>
            <p className="text-3xl font-bold text-teal-600 mb-1">96,7%</p>
            <p className="text-sm text-gray-500">Niveau de confiance</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center transition-transform hover:scale-105">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Durée du Traitement</h4>
            <p className="text-3xl font-bold text-orange-600 mb-1">23,4s</p>
            <p className="text-sm text-gray-500">Temps d’analyse</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center transition-transform hover:scale-105">
            <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Volume de la Rate</h4>
            <p className="text-3xl font-bold text-rose-600 mb-1">142</p>
            <p className="text-sm text-gray-500">cm³ (estimé)</p>
          </div>
        </div>

        {/* Boutons d'action */}
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <button
            onClick={handleDownload}
            className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-medium rounded-xl hover:from-orange-600 hover:to-pink-600 transition-all shadow-lg hover:shadow-xl"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Télécharger le Résultat
          </button>
          
          <button
            onClick={onReset}
            className="inline-flex items-center justify-center px-8 py-4 border-2 border-orange-300 text-orange-700 font-medium rounded-xl hover:bg-orange-50 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Traiter une Nouvelle Image
          </button>
        </div>
      </div>
    </div>
  );
};