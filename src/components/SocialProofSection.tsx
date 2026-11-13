import React, { useState } from 'react';
import { Star, Instagram, Heart, MessageCircle, CheckCircle, ExternalLink, ShieldCheck, Flame } from 'lucide-react';
import { GOOGLE_REVIEWS, INSTAGRAM_POSTS, GYM_CONFIG } from '../data/gymData';

export const SocialProofSection: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<typeof INSTAGRAM_POSTS[0] | null>(null);

  return (
    <section id="comunidad" className="py-20 bg-neutral-950 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest text-amber-400 uppercase block mb-2">
            PRUEBA SOCIAL & COMUNIDAD
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-['Oswald'] uppercase text-white tracking-tight mb-4">
            LA COMUNIDAD MÁS ENÉRGICA DE PEREIRA
          </h2>
          <p className="text-neutral-300 text-base sm:text-lg">
            No te fíes solo de nuestra palabra. Mira lo que opinan nuestros socios en Google y cómo se vive el ambiente a diario en nuestras redes sociales.
          </p>
        </div>

        {/* Google Reviews Header Banner */}
        <div className="mb-12 p-6 sm:p-8 bg-neutral-900/60 border border-neutral-800 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-16 h-16 bg-neutral-950 rounded-2xl border border-neutral-800 flex items-center justify-center shrink-0">
              <span className="text-3xl font-black font-['Oswald'] text-amber-400">G</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5 justify-center md:justify-start mb-1">
                <span className="text-2xl font-black font-['Oswald'] text-white">4.9</span>
                <div className="flex items-center text-amber-400">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                </div>
              </div>
              <p className="text-xs text-neutral-300">
                Calificación promedio basada en <strong>+348 reseñas verificadas</strong> en Google Maps Pereira
              </p>
            </div>
          </div>

          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-xs font-bold text-white rounded-lg border border-neutral-700 transition-colors flex items-center gap-2 shrink-0"
          >
            <span>Ver perfil en Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
          </a>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {GOOGLE_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-neutral-900/40 border border-neutral-800/80 rounded-xl p-6 flex flex-col justify-between hover:border-amber-400/40 transition-colors"
            >
              <div>
                {/* Rating stars & tag */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center text-amber-400">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 bg-neutral-950 px-2 py-0.5 rounded border border-neutral-800">
                    {rev.tag}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-neutral-300 italic leading-relaxed mb-6">
                  "{rev.text}"
                </p>
              </div>

              {/* Author attribution */}
              <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs">
                <div>
                  <strong className="text-white block font-medium">{rev.author}</strong>
                  <span className="text-[11px] text-neutral-500">{rev.timeAgo}</span>
                </div>
                {rev.verified && (
                  <span className="flex items-center gap-1 text-[11px] text-emerald-400">
                    <CheckCircle className="w-3 h-3" /> Verificado
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Instagram Feed Section */}
        <div className="pt-8 border-t border-neutral-800/80">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 rounded-xl text-white">
                <Instagram className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-['Oswald'] uppercase text-white tracking-wide">
                  FEED DE INSTAGRAM EN VIVO
                </h3>
                <p className="text-xs text-neutral-400">
                  Sigue a <strong className="text-amber-400">{GYM_CONFIG.instagram}</strong> y etiquétanos para salir en pantalla
                </p>
              </div>
            </div>

            <a
              href={`https://instagram.com`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold uppercase tracking-wider text-amber-400 hover:text-amber-300 flex items-center gap-1.5"
            >
              <span>Seguir en Instagram</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Instagram Posts Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {INSTAGRAM_POSTS.map((post) => (
              <div
                key={post.id}
                onClick={() => setSelectedPost(post)}
                className="group relative aspect-square rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800 cursor-pointer"
              >
                <img
                  src={post.image}
                  alt="Post de la comunidad Fuego Fit Pereira"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 text-center">
                  <div className="flex items-center gap-4 text-white text-xs font-bold mb-2">
                    <span className="flex items-center gap-1">
                      <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                      {post.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4 fill-white" />
                      {post.comments}
                    </span>
                  </div>
                  <span className="text-[11px] text-amber-400 font-semibold uppercase">
                    Click para ver post
                  </span>
                </div>

                <div className="absolute top-2 right-2 bg-neutral-950/80 backdrop-blur-md px-2 py-0.5 rounded text-[10px] text-white font-mono">
                  {post.type}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Instagram Post Detail Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="bg-neutral-950 border border-neutral-800 rounded-2xl w-full max-w-2xl overflow-hidden flex flex-col md:flex-row relative shadow-2xl">
            <button
              type="button"
              onClick={() => setSelectedPost(null)}
              className="absolute top-4 right-4 z-10 text-neutral-400 hover:text-white bg-black/60 p-1.5 rounded-full"
              aria-label="Cerrar modal"
            >
              ✕
            </button>

            <div className="w-full md:w-1/2 aspect-square bg-black">
              <img
                src={selectedPost.image}
                alt="Post de Fuego Fit"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-neutral-800">
                  <div className="w-8 h-8 rounded-full bg-amber-400 text-black font-black flex items-center justify-center text-xs font-['Oswald']">
                    FF
                  </div>
                  <div>
                    <strong className="text-white text-xs block">{GYM_CONFIG.instagram}</strong>
                    <span className="text-[11px] text-neutral-400">Pereira, Risaralda</span>
                  </div>
                </div>

                <p className="text-xs text-neutral-300 leading-relaxed mb-6">
                  {selectedPost.caption}
                </p>

                <div className="flex items-center gap-4 text-xs text-neutral-400 mb-2">
                  <span className="text-white font-bold">{selectedPost.likes} me gusta</span>
                  <span>{selectedPost.date}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
                <a
                  href={`https://wa.me/${GYM_CONFIG.whatsappNumber}?text=${encodeURIComponent('Hola Fuego Fit, vi su publicación en Instagram y quiero información para entrenar con ustedes.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-amber-400 text-black text-xs font-bold rounded-lg uppercase"
                >
                  Contactar por este plan
                </a>
                <button
                  type="button"
                  onClick={() => setSelectedPost(null)}
                  className="text-xs text-neutral-400 hover:text-white"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
