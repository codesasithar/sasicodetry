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
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-foreground">
            Legends Collection Display
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A professional collector's display case featuring premium action figures of legendary icons
          </p>
        </div>

        {/* Multi-Tier Display Case */}
        <div className="relative bg-gradient-to-b from-gray-100 to-gray-200 rounded-lg shadow-2xl border-2 border-gray-300 overflow-hidden">
          
          {/* Case Frame */}
          <div className="bg-gradient-to-b from-white to-gray-100 p-6 border-b-2 border-gray-300">
            
            {/* Diamond Mesh Background Pattern */}
            <div className="absolute inset-6 opacity-20 pointer-events-none">
              <div 
                className="w-full h-full"
                style={{
                  backgroundImage: `
                    linear-gradient(45deg, hsl(var(--muted-foreground)) 1px, transparent 1px),
                    linear-gradient(-45deg, hsl(var(--muted-foreground)) 1px, transparent 1px)
                  `,
                  backgroundSize: '20px 20px',
                  backgroundPosition: '0 0, 10px 10px'
                }}
              ></div>
            </div>

            {/* Shelf 1 - Top Row */}
            <div className="relative mb-12 bg-white/50 rounded p-4 border-b border-gray-200">
              <div className="flex justify-center items-end gap-8 h-24">
                {/* Einstein Figure */}
                <div className="group relative animate-fade-in" style={{ animationDelay: '0ms' }}>
                  <div className="relative transform hover:scale-110 transition-all duration-300">
                    <div className="w-14 h-20 relative">
                      {/* Head */}
                      <div className="w-10 h-10 mx-auto mb-1 rounded-full overflow-hidden bg-gradient-to-b from-pink-100 to-pink-200 border border-pink-300/50 shadow-sm">
                        <img
                          src={sculptures[0].image}
                          alt="Einstein action figure"
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                      {/* Body */}
                      <div className="w-8 h-9 mx-auto bg-gradient-to-b from-gray-600 to-gray-800 rounded-sm relative shadow-sm">
                        <div className="absolute -left-1 top-1 w-1.5 h-4 bg-gradient-to-b from-pink-200 to-pink-300 rounded-full"></div>
                        <div className="absolute -right-1 top-1 w-1.5 h-4 bg-gradient-to-b from-pink-200 to-pink-300 rounded-full"></div>
                        <div className="absolute -bottom-1 left-1.5 w-1.5 h-3 bg-gradient-to-b from-gray-700 to-gray-900 rounded-full"></div>
                        <div className="absolute -bottom-1 right-1.5 w-1.5 h-3 bg-gradient-to-b from-gray-700 to-gray-900 rounded-full"></div>
                      </div>
                    </div>
                    <div className="w-10 h-1 bg-black/30 rounded-full mx-auto"></div>
                  </div>
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-card/95 backdrop-blur-sm rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
                    <p className="text-xs text-muted-foreground whitespace-nowrap">Einstein</p>
                  </div>
                </div>

                {/* Michael Jackson Figure */}
                <div className="group relative animate-fade-in transform rotate-2" style={{ animationDelay: '100ms' }}>
                  <div className="relative transform hover:scale-110 transition-all duration-300">
                    <div className="w-14 h-20 relative">
                      <div className="w-10 h-10 mx-auto mb-1 rounded-full overflow-hidden bg-gradient-to-b from-amber-100 to-amber-200 border border-amber-300/50 shadow-sm">
                        <img
                          src={sculptures[1].image}
                          alt="Michael Jackson action figure"
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                      <div className="w-8 h-9 mx-auto bg-gradient-to-b from-red-600 to-red-800 rounded-sm relative shadow-sm">
                        <div className="absolute -left-1 top-1 w-1.5 h-4 bg-gradient-to-b from-amber-200 to-amber-300 rounded-full transform rotate-12"></div>
                        <div className="absolute -right-1 top-1 w-1.5 h-4 bg-gradient-to-b from-amber-200 to-amber-300 rounded-full transform -rotate-6"></div>
                        <div className="absolute -bottom-1 left-1.5 w-1.5 h-3 bg-gradient-to-b from-black to-gray-800 rounded-full"></div>
                        <div className="absolute -bottom-1 right-1.5 w-1.5 h-3 bg-gradient-to-b from-black to-gray-800 rounded-full"></div>
                      </div>
                    </div>
                    <div className="w-10 h-1 bg-black/30 rounded-full mx-auto"></div>
                  </div>
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-card/95 backdrop-blur-sm rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
                    <p className="text-xs text-muted-foreground whitespace-nowrap">MJ</p>
                  </div>
                </div>

                {/* Bruce Lee Figure */}
                <div className="group relative animate-fade-in transform -rotate-1" style={{ animationDelay: '200ms' }}>
                  <div className="relative transform hover:scale-110 transition-all duration-300">
                    <div className="w-14 h-20 relative">
                      <div className="w-10 h-10 mx-auto mb-1 rounded-full overflow-hidden bg-gradient-to-b from-yellow-100 to-yellow-200 border border-yellow-300/50 shadow-sm">
                        <img
                          src={sculptures[2].image}
                          alt="Bruce Lee action figure"
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                      <div className="w-8 h-9 mx-auto bg-gradient-to-b from-yellow-600 to-yellow-800 rounded-sm relative shadow-sm">
                        <div className="absolute -left-1.5 top-0 w-1.5 h-4 bg-gradient-to-b from-yellow-200 to-yellow-300 rounded-full transform rotate-45"></div>
                        <div className="absolute -right-1 top-2 w-1.5 h-4 bg-gradient-to-b from-yellow-200 to-yellow-300 rounded-full transform -rotate-12"></div>
                        <div className="absolute -bottom-1 left-1 w-1.5 h-3 bg-gradient-to-b from-yellow-700 to-yellow-900 rounded-full transform rotate-12"></div>
                        <div className="absolute -bottom-1 right-2 w-1.5 h-3 bg-gradient-to-b from-yellow-700 to-yellow-900 rounded-full transform -rotate-6"></div>
                      </div>
                    </div>
                    <div className="w-10 h-1 bg-black/30 rounded-full mx-auto"></div>
                  </div>
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-card/95 backdrop-blur-sm rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
                    <p className="text-xs text-muted-foreground whitespace-nowrap">Bruce Lee</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Shelf 2 - Middle Row */}
            <div className="relative mb-12 bg-white/50 rounded p-4 border-b border-gray-200">
              <div className="flex justify-center items-end gap-8 h-24">
                {/* Duplicate figures with slight variations */}
                <div className="group relative animate-fade-in transform rotate-1" style={{ animationDelay: '300ms' }}>
                  <div className="relative transform hover:scale-110 transition-all duration-300">
                    <div className="w-14 h-20 relative">
                      <div className="w-10 h-10 mx-auto mb-1 rounded-full overflow-hidden bg-gradient-to-b from-blue-100 to-blue-200 border border-blue-300/50 shadow-sm">
                        <img
                          src={sculptures[0].image}
                          alt="Einstein variant figure"
                          className="w-full h-full object-cover object-top scale-110"
                        />
                      </div>
                      <div className="w-8 h-9 mx-auto bg-gradient-to-b from-blue-600 to-blue-800 rounded-sm relative shadow-sm">
                        <div className="absolute -left-1 top-1 w-1.5 h-4 bg-gradient-to-b from-blue-200 to-blue-300 rounded-full transform rotate-6"></div>
                        <div className="absolute -right-1 top-1 w-1.5 h-4 bg-gradient-to-b from-blue-200 to-blue-300 rounded-full transform -rotate-3"></div>
                        <div className="absolute -bottom-1 left-1.5 w-1.5 h-3 bg-gradient-to-b from-blue-700 to-blue-900 rounded-full"></div>
                        <div className="absolute -bottom-1 right-1.5 w-1.5 h-3 bg-gradient-to-b from-blue-700 to-blue-900 rounded-full"></div>
                      </div>
                    </div>
                    <div className="w-10 h-1 bg-black/30 rounded-full mx-auto"></div>
                  </div>
                </div>

                <div className="group relative animate-fade-in" style={{ animationDelay: '400ms' }}>
                  <div className="relative transform hover:scale-110 transition-all duration-300">
                    <div className="w-14 h-20 relative">
                      <div className="w-10 h-10 mx-auto mb-1 rounded-full overflow-hidden bg-gradient-to-b from-purple-100 to-purple-200 border border-purple-300/50 shadow-sm">
                        <img
                          src={sculptures[1].image}
                          alt="MJ variant figure"
                          className="w-full h-full object-cover object-top scale-105"
                        />
                      </div>
                      <div className="w-8 h-9 mx-auto bg-gradient-to-b from-purple-600 to-purple-800 rounded-sm relative shadow-sm">
                        <div className="absolute -left-1 top-1 w-1.5 h-4 bg-gradient-to-b from-purple-200 to-purple-300 rounded-full transform -rotate-6"></div>
                        <div className="absolute -right-1 top-1 w-1.5 h-4 bg-gradient-to-b from-purple-200 to-purple-300 rounded-full transform rotate-12"></div>
                        <div className="absolute -bottom-1 left-1.5 w-1.5 h-3 bg-gradient-to-b from-purple-700 to-purple-900 rounded-full"></div>
                        <div className="absolute -bottom-1 right-1.5 w-1.5 h-3 bg-gradient-to-b from-purple-700 to-purple-900 rounded-full"></div>
                      </div>
                    </div>
                    <div className="w-10 h-1 bg-black/30 rounded-full mx-auto"></div>
                  </div>
                </div>

                <div className="group relative animate-fade-in transform rotate-2" style={{ animationDelay: '500ms' }}>
                  <div className="relative transform hover:scale-110 transition-all duration-300">
                    <div className="w-14 h-20 relative">
                      <div className="w-10 h-10 mx-auto mb-1 rounded-full overflow-hidden bg-gradient-to-b from-green-100 to-green-200 border border-green-300/50 shadow-sm">
                        <img
                          src={sculptures[2].image}
                          alt="Bruce Lee variant figure"
                          className="w-full h-full object-cover object-top scale-110"
                        />
                      </div>
                      <div className="w-8 h-9 mx-auto bg-gradient-to-b from-green-600 to-green-800 rounded-sm relative shadow-sm">
                        <div className="absolute -left-1 top-1 w-1.5 h-4 bg-gradient-to-b from-green-200 to-green-300 rounded-full transform -rotate-12"></div>
                        <div className="absolute -right-1.5 top-0 w-1.5 h-4 bg-gradient-to-b from-green-200 to-green-300 rounded-full transform rotate-30"></div>
                        <div className="absolute -bottom-1 left-2 w-1.5 h-3 bg-gradient-to-b from-green-700 to-green-900 rounded-full transform -rotate-6"></div>
                        <div className="absolute -bottom-1 right-1 w-1.5 h-3 bg-gradient-to-b from-green-700 to-green-900 rounded-full transform rotate-12"></div>
                      </div>
                    </div>
                    <div className="w-10 h-1 bg-black/30 rounded-full mx-auto"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Shelf 3 - Bottom Row */}
            <div className="relative bg-white/50 rounded p-4">
              <div className="flex justify-center items-end gap-8 h-24">
                <div className="group relative animate-fade-in transform -rotate-1" style={{ animationDelay: '600ms' }}>
                  <div className="relative transform hover:scale-110 transition-all duration-300">
                    <div className="w-14 h-20 relative">
                      <div className="w-10 h-10 mx-auto mb-1 rounded-full overflow-hidden bg-gradient-to-b from-orange-100 to-orange-200 border border-orange-300/50 shadow-sm">
                        <img
                          src={sculptures[0].image}
                          alt="Einstein special edition"
                          className="w-full h-full object-cover object-top scale-105"
                        />
                      </div>
                      <div className="w-8 h-9 mx-auto bg-gradient-to-b from-orange-600 to-orange-800 rounded-sm relative shadow-sm">
                        <div className="absolute -left-1 top-1 w-1.5 h-4 bg-gradient-to-b from-orange-200 to-orange-300 rounded-full"></div>
                        <div className="absolute -right-1 top-1 w-1.5 h-4 bg-gradient-to-b from-orange-200 to-orange-300 rounded-full"></div>
                        <div className="absolute -bottom-1 left-1.5 w-1.5 h-3 bg-gradient-to-b from-orange-700 to-orange-900 rounded-full"></div>
                        <div className="absolute -bottom-1 right-1.5 w-1.5 h-3 bg-gradient-to-b from-orange-700 to-orange-900 rounded-full"></div>
                      </div>
                    </div>
                    <div className="w-10 h-1 bg-black/30 rounded-full mx-auto"></div>
                  </div>
                </div>

                <div className="group relative animate-fade-in transform rotate-1" style={{ animationDelay: '700ms' }}>
                  <div className="relative transform hover:scale-110 transition-all duration-300">
                    <div className="w-14 h-20 relative">
                      <div className="w-10 h-10 mx-auto mb-1 rounded-full overflow-hidden bg-gradient-to-b from-teal-100 to-teal-200 border border-teal-300/50 shadow-sm">
                        <img
                          src={sculptures[1].image}
                          alt="MJ special edition"
                          className="w-full h-full object-cover object-top scale-110"
                        />
                      </div>
                      <div className="w-8 h-9 mx-auto bg-gradient-to-b from-teal-600 to-teal-800 rounded-sm relative shadow-sm">
                        <div className="absolute -left-1 top-1 w-1.5 h-4 bg-gradient-to-b from-teal-200 to-teal-300 rounded-full transform rotate-6"></div>
                        <div className="absolute -right-1 top-1 w-1.5 h-4 bg-gradient-to-b from-teal-200 to-teal-300 rounded-full transform -rotate-6"></div>
                        <div className="absolute -bottom-1 left-1.5 w-1.5 h-3 bg-gradient-to-b from-teal-700 to-teal-900 rounded-full"></div>
                        <div className="absolute -bottom-1 right-1.5 w-1.5 h-3 bg-gradient-to-b from-teal-700 to-teal-900 rounded-full"></div>
                      </div>
                    </div>
                    <div className="w-10 h-1 bg-black/30 rounded-full mx-auto"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Collection Label */}
          <div className="bg-gradient-to-r from-brass-light to-brass-medium p-3 text-center border-t-2 border-brass-dark">
            <h3 className="font-bold text-brass-darker text-sm">LEGENDS COLLECTION</h3>
            <p className="text-brass-darker text-xs">Premium Action Figures</p>
          </div>
        </div>

        {/* Display Case Shadow */}
        <div className="absolute top-4 left-4 right-4 bottom-0 bg-black/15 rounded-lg -z-10 blur-lg"></div>
      </div>
    </section>
  );
};

export default WaxSculptureShelf;