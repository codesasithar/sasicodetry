import React from 'react';
import einsteinWax from '@/assets/sculptures/einstein-wax.jpg';
import michaelJacksonWax from '@/assets/sculptures/michael-jackson-wax.jpg';
import bruceLeeWax from '@/assets/sculptures/bruce-lee-wax.jpg';

interface Sculpture {
  id: string;
  name: string;
  image: string;
  description: string;
  era: string;
}

const sculptures: Sculpture[] = [
  {
    id: 'einstein',
    name: 'Albert Einstein',
    image: einsteinWax,
    description: 'The genius physicist who revolutionized our understanding of space and time',
    era: '1879-1955'
  },
  {
    id: 'michael-jackson',
    name: 'Michael Jackson',
    image: michaelJacksonWax,
    description: 'The King of Pop who transformed music and dance forever',
    era: '1958-2009'
  },
  {
    id: 'bruce-lee',
    name: 'Bruce Lee',
    image: bruceLeeWax,
    description: 'The martial arts legend and philosophy master',
    era: '1940-1973'
  }
];

const WaxSculptureShelf = () => {
  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-foreground">
            Wax Sculpture Gallery
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A collection of lifelike wax sculptures celebrating legendary figures who shaped our world
          </p>
        </div>

        {/* 3D Gallery Space */}
        <div className="relative min-h-[500px]">
          {/* Ambient Lighting */}
          <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-accent/5 pointer-events-none"></div>
          
          {/* Gallery Floor */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-muted/20 to-transparent pointer-events-none"></div>
            
        {/* 3D Floating Sculptures */}
        <div className="relative h-96 perspective-1000">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 h-full items-center">
            {sculptures.map((sculpture, index) => (
              <div 
                key={sculpture.id}
                className="group relative h-full flex flex-col items-center justify-center"
                style={{ animationDelay: `${index * 500}ms` }}
              >
                {/* 3D Floating Container */}
                <div className="relative preserve-3d animate-float" style={{
                  animation: `float 6s ease-in-out infinite ${index * 2}s, rotate3d 20s linear infinite ${index * 3}s`
                }}>
                  {/* 3D Model Container */}
                  <div className="relative w-48 h-64 preserve-3d group-hover:animate-spin-slow">
                    {/* Front Face */}
                    <div className="absolute inset-0 backface-hidden">
                      <div className="w-full h-full bg-gradient-to-b from-stone-100 to-stone-300 rounded-lg p-3 shadow-2xl border-2 border-stone-400">
                        <img
                          src={sculpture.image}
                          alt={`3D wax model of ${sculpture.name}`}
                          className="w-full h-48 object-cover object-center rounded-md shadow-lg"
                        />
                        <div className="mt-2 bg-gradient-to-r from-amber-100 to-amber-200 rounded px-2 py-1 text-center shadow-sm">
                          <h3 className="font-bold text-amber-900 text-xs">{sculpture.name}</h3>
                        </div>
                      </div>
                    </div>

                    {/* Back Face */}
                    <div className="absolute inset-0 backface-hidden rotate-y-180">
                      <div className="w-full h-full bg-gradient-to-b from-stone-200 to-stone-400 rounded-lg p-3 shadow-2xl border-2 border-stone-500 flex flex-col justify-center items-center text-center">
                        <h3 className="font-bold text-stone-800 text-lg mb-2">{sculpture.name}</h3>
                        <p className="text-stone-600 text-sm mb-2">{sculpture.era}</p>
                        <p className="text-stone-700 text-xs leading-relaxed">{sculpture.description}</p>
                      </div>
                    </div>

                    {/* Side Faces for 3D Effect */}
                    <div className="absolute inset-0 backface-hidden rotate-y-90 translate-z-6">
                      <div className="w-full h-full bg-gradient-to-b from-stone-300 to-stone-500 rounded-lg shadow-xl border border-stone-600"></div>
                    </div>
                    <div className="absolute inset-0 backface-hidden rotate-y-270 translate-z-6">
                      <div className="w-full h-full bg-gradient-to-b from-stone-300 to-stone-500 rounded-lg shadow-xl border border-stone-600"></div>
                    </div>

                    {/* Top Face */}
                    <div className="absolute inset-0 backface-hidden rotate-x-90 translate-z-32">
                      <div className="w-full h-full bg-gradient-to-b from-stone-200 to-stone-400 rounded-lg shadow-lg border border-stone-500"></div>
                    </div>

                    {/* Bottom Face */}
                    <div className="absolute inset-0 backface-hidden rotate-x-270 translate-z-32">
                      <div className="w-full h-full bg-gradient-to-b from-stone-400 to-stone-600 rounded-lg shadow-lg border border-stone-700"></div>
                    </div>
                  </div>

                  {/* Floating Particles */}
                  <div className="absolute -inset-8 pointer-events-none">
                    <div className="absolute top-0 left-1/4 w-2 h-2 bg-primary/30 rounded-full animate-pulse" style={{animationDelay: `${index * 0.5}s`}}></div>
                    <div className="absolute bottom-1/4 right-1/4 w-1.5 h-1.5 bg-accent/40 rounded-full animate-pulse" style={{animationDelay: `${index * 0.7}s`}}></div>
                    <div className="absolute top-1/3 right-0 w-1 h-1 bg-secondary/50 rounded-full animate-pulse" style={{animationDelay: `${index * 0.3}s`}}></div>
                  </div>

                  {/* Holographic Base */}
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-gradient-radial from-primary/20 via-primary/10 to-transparent rounded-full animate-pulse"></div>
                </div>

                {/* 3D Shadow */}
                <div 
                  className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-40 h-20 bg-black/20 rounded-full blur-xl animate-float"
                  style={{
                    animation: `float 6s ease-in-out infinite ${index * 2}s reverse`
                  }}
                ></div>
              </div>
            ))}
          </div>
        </div>

        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotateX(0deg); }
          50% { transform: translateY(-20px) rotateX(5deg); }
        }
        
        @keyframes rotate3d {
          0% { transform: rotateY(0deg) rotateX(0deg); }
          25% { transform: rotateY(90deg) rotateX(5deg); }
          50% { transform: rotateY(180deg) rotateX(0deg); }
          75% { transform: rotateY(270deg) rotateX(-5deg); }
          100% { transform: rotateY(360deg) rotateX(0deg); }
        }

        .perspective-1000 {
          perspective: 1000px;
        }
        
        .preserve-3d {
          transform-style: preserve-3d;
        }
        
        .backface-hidden {
          backface-visibility: hidden;
        }
        
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        
        .rotate-y-90 {
          transform: rotateY(90deg);
        }
        
        .rotate-y-270 {
          transform: rotateY(270deg);
        }
        
        .rotate-x-90 {
          transform: rotateX(90deg);
        }
        
        .rotate-x-270 {
          transform: rotateX(270deg);
        }
        
        .translate-z-6 {
          transform: translateZ(6px);
        }
        
        .translate-z-32 {
          transform: translateZ(32px);
        }
        
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
      `}</style>
    </section>
  );
};

export default WaxSculptureShelf;