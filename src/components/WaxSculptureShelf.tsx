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
            Collectible Doll Shelf
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A wooden display shelf featuring miniature figurines of legendary icons
          </p>
        </div>

        {/* Wooden Shelf */}
        <div className="relative perspective-1000">
          {/* Main Shelf Structure */}
          <div className="relative bg-gradient-to-b from-amber-700 via-amber-800 to-amber-900 rounded-lg shadow-2xl border-2 border-amber-600">
            {/* Shelf Top Surface */}
            <div className="h-6 bg-gradient-to-b from-amber-600 to-amber-700 rounded-t-lg border-b-2 border-amber-800 relative">
              {/* Wood Grain Lines */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/20 to-transparent rounded-t-lg"></div>
              <div className="absolute top-1 left-0 right-0 h-px bg-amber-500/30"></div>
              <div className="absolute bottom-1 left-0 right-0 h-px bg-amber-900/50"></div>
            </div>
            
            {/* Shelf Interior */}
            <div className="px-8 py-6 bg-gradient-to-b from-amber-100/10 to-amber-900/20">
              {/* Dolls Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                {sculptures.map((sculpture, index) => (
                  <div 
                    key={sculpture.id}
                    className="group relative transform transition-all duration-500 hover:scale-110 animate-fade-in"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    {/* Doll Figure */}
                    <div className="relative">
                      {/* Doll Base/Stand */}
                      <div className="w-20 h-6 bg-gradient-to-b from-stone-300 to-stone-500 rounded-full mx-auto mb-2 shadow-lg relative">
                        {/* Base reflection */}
                        <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent rounded-full"></div>
                      </div>
                      
                      {/* Doll Image */}
                      <div className="relative mx-auto w-32 h-40 overflow-hidden rounded-lg">
                        <img
                          src={sculpture.image}
                          alt={`Collectible doll of ${sculpture.name}`}
                          className="w-full h-full object-cover object-center transform transition-all duration-300 group-hover:scale-105 filter drop-shadow-lg"
                        />
                        {/* Doll shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-white/15 pointer-events-none"></div>
                      </div>
                      
                      {/* Mini Nameplate */}
                      <div className="mt-2 mx-auto w-fit bg-gradient-to-r from-brass-light to-brass-dark rounded px-2 py-1 text-center shadow-md border border-brass-medium">
                        <h3 className="font-bold text-brass-dark text-xs">{sculpture.name}</h3>
                        <p className="text-brass-darker text-[10px]">{sculpture.era}</p>
                      </div>
                    </div>

                    {/* Hover Info Card */}
                    <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-card/95 backdrop-blur-sm rounded-lg p-3 shadow-xl border border-border/50 transition-all duration-300 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 z-10 w-48">
                      <p className="text-xs text-muted-foreground text-center">
                        {sculpture.description}
                      </p>
                    </div>

                    {/* Doll Shadow on Shelf */}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-black/20 rounded-full blur-sm"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shelf Bottom Edge */}
            <div className="h-4 bg-gradient-to-b from-amber-800 to-amber-900 rounded-b-lg border-t border-amber-700 relative">
              {/* Wood grain on bottom */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-700/30 to-transparent rounded-b-lg"></div>
            </div>

            {/* Shelf Support Brackets */}
            <div className="absolute -bottom-4 left-12 w-6 h-12 bg-gradient-to-b from-amber-700 to-amber-900 rounded-b-lg transform rotate-2 shadow-lg"></div>
            <div className="absolute -bottom-4 right-12 w-6 h-12 bg-gradient-to-b from-amber-700 to-amber-900 rounded-b-lg transform -rotate-2 shadow-lg"></div>
            
            {/* Side Wood Grains */}
            <div className="absolute left-0 top-6 bottom-4 w-1 bg-gradient-to-b from-amber-600 to-amber-800 rounded-l"></div>
            <div className="absolute right-0 top-6 bottom-4 w-1 bg-gradient-to-b from-amber-600 to-amber-800 rounded-r"></div>
          </div>

          {/* Shelf Shadow */}
          <div className="absolute top-4 left-4 right-4 bottom-0 bg-black/15 rounded-lg -z-10 blur-sm"></div>
        </div>
      </div>
    </section>
  );
};

export default WaxSculptureShelf;