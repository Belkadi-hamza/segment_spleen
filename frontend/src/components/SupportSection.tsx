import React from 'react';

export const SupportSection = () => {
  return (
    <section id="support" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Titre principal */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-emerald-400 to-pink-500 text-transparent bg-clip-text">
              Assistance
            </h2>
            <p className="text-lg text-gray-600">
              Nous sommes là pour vous aider à tirer le meilleur parti de SpleenVision
            </p>
          </div>

          {/* Cartes d’assistance */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="text-center transition-transform hover:scale-105">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Chat en direct 24/7</h3>
              <p className="text-gray-600 text-sm">Obtenez une assistance immédiate grâce à notre chat en ligne</p>
            </div>

            <div className="text-center transition-transform hover:scale-105">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Support par e-mail</h3>
              <p className="text-gray-600 text-sm">Contactez-nous par e-mail pour un support technique détaillé</p>
            </div>

            <div className="text-center transition-transform hover:scale-105">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Base de connaissances</h3>
              <p className="text-gray-600 text-sm">Explorez notre bibliothèque complète de tutoriels et guides</p>
            </div>

            <div className="text-center transition-transform hover:scale-105">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Forum Communautaire</h3>
              <p className="text-gray-600 text-sm">Échangez avec d’autres utilisateurs et partagez vos expériences</p>
            </div>
          </div>

          {/* Bloc premium / entreprise */}
          <div className="bg-gradient-to-r from-violet-50 to-blue-50 rounded-2xl p-8 shadow-lg">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Besoin d’un support professionnel ?</h3>
              <p className="text-gray-600 mb-6">
                Notre équipe d'experts en imagerie médicale et en intelligence artificielle est disponible 
                pour les clients professionnels qui ont besoin d'un support dédié, d'intégrations personnalisées ou de formations spécifiques.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-8 py-3 rounded-lg hover:from-orange-600 hover:to-pink-600 transition-all font-medium shadow-md hover:shadow-lg">
                  Contactez-nous
                </button>
                <button className="border border-orange-500 text-orange-600 px-8 py-3 rounded-lg hover:bg-orange-50 transition-colors font-medium">
                  Demander une démo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};