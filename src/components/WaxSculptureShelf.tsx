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

        {/* Shelf Container */}
        <div className="relative">
          {/* Shelf Background */}
          <div className="bg-gradient-to-b from-wood-light to-wood-dark rounded-lg p-8 shadow-2xl border border-wood-medium">
            {/* Top Shelf Edge */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-b from-wood-medium to-wood-dark rounded-t-lg"></div>
            
            {/* Sculptures Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {sculptures.map((sculpture, index) => (
                <div 
                  key={sculpture.id}
                  className="group relative transform transition-all duration-500 hover:scale-105 animate-fade-in"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  {/* Sculpture Pedestal */}
                  <div className="bg-gradient-to-b from-stone-200 to-stone-400 rounded-lg p-4 mb-4 shadow-lg">
                    {/* Sculpture Image */}
                    <div className="relative overflow-hidden rounded-lg bg-gradient-to-b from-gray-100 to-gray-200 p-2">
                      <img
                        src={sculpture.image}
                        alt={`Wax sculpture of ${sculpture.name}`}
                        className="w-full h-64 object-cover object-center rounded-md shadow-md transform transition-transform duration-300 group-hover:scale-102"
                      />
                      {/* Glass Case Effect */}
                      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-white/20 pointer-events-none rounded-md"></div>
                    </div>
                    
                    {/* Nameplate */}
                    <div className="mt-3 bg-gradient-to-r from-amber-100 to-amber-200 rounded px-3 py-2 text-center shadow-sm">
                      <h3 className="font-bold text-amber-900 text-sm">{sculpture.name}</h3>
                      <p className="text-amber-700 text-xs">{sculpture.era}</p>
                    </div>
                  </div>

                  {/* Description Card */}
                  <div className="bg-card/80 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-border/50 transform transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:-translate-y-2">
                    <p className="text-sm text-muted-foreground text-center">
                      {sculpture.description}
                    </p>
                  </div>

                  {/* Spotlight Effect */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-radial from-yellow-200/30 via-yellow-100/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                </div>
              ))}
            </div>

            {/* Shelf Support Brackets */}
            <div className="absolute bottom-0 left-8 w-4 h-8 bg-gradient-to-b from-wood-medium to-wood-dark rounded-b-lg"></div>
            <div className="absolute bottom-0 right-8 w-4 h-8 bg-gradient-to-b from-wood-medium to-wood-dark rounded-b-lg"></div>
          </div>

          {/* Shelf Shadow */}
          <div className="absolute top-2 left-2 right-2 bottom-2 bg-black/10 rounded-lg -z-10"></div>
        </div>
      </div>
    </section>
  );
};

export default WaxSculptureShelf;