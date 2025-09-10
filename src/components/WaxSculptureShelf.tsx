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
            Collectible Action Figures
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Premium collectible action figures of legendary icons displayed on a wooden collector's shelf
          </p>
        </div>

        {/* Wooden Collector's Shelf */}
        <div className="relative max-w-4xl mx-auto">
          {/* Main Shelf Structure */}
          <div className="relative bg-gradient-to-b from-amber-600 via-amber-700 to-amber-800 rounded-xl shadow-2xl border border-amber-500/50 overflow-hidden">
            
            {/* Wood Grain Texture */}
            <div className="absolute inset-0 opacity-30">
              <div className="h-full w-full bg-gradient-to-r from-transparent via-amber-900/30 to-transparent"></div>
              <div className="absolute top-0 left-0 w-full h-1 bg-amber-500/40"></div>
              <div className="absolute top-2 left-0 w-full h-px bg-amber-900/50"></div>
              <div className="absolute top-4 left-0 w-full h-px bg-amber-500/30"></div>
            </div>
            
            {/* Shelf Top Edge */}
            <div className="h-4 bg-gradient-to-b from-amber-500 to-amber-600 border-b border-amber-700 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 via-transparent to-amber-400/20"></div>
            </div>
            
            {/* Shelf Interior with Dolls */}
            <div className="px-8 py-8 bg-gradient-to-b from-amber-50/5 to-amber-900/10 relative">
              
              {/* Dolls Arrangement */}
              <div className="relative h-32 flex items-end justify-center gap-6">
                
                {/* Einstein Doll - Standing upright */}
                <div className="group relative animate-fade-in" style={{ animationDelay: '0ms' }}>
                  <div className="relative transform hover:scale-110 transition-all duration-300">
                    {/* Doll Body */}
                    <div className="w-16 h-24 relative">
                      {/* Head */}
                      <div className="w-12 h-12 mx-auto mb-1 rounded-full overflow-hidden bg-gradient-to-b from-pink-100 to-pink-200 border border-pink-300/50 shadow-md">
                        <img
                          src={sculptures[0].image}
                          alt="Einstein collectible figure"
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                      
                      {/* Body */}
                      <div className="w-10 h-11 mx-auto bg-gradient-to-b from-gray-600 to-gray-800 rounded-sm relative shadow-sm">
                        {/* Arms */}
                        <div className="absolute -left-1 top-1 w-2 h-6 bg-gradient-to-b from-pink-200 to-pink-300 rounded-full shadow-sm"></div>
                        <div className="absolute -right-1 top-1 w-2 h-6 bg-gradient-to-b from-pink-200 to-pink-300 rounded-full shadow-sm"></div>
                        {/* Legs */}
                        <div className="absolute -bottom-2 left-2 w-2 h-4 bg-gradient-to-b from-gray-700 to-gray-900 rounded-full shadow-sm"></div>
                        <div className="absolute -bottom-2 right-2 w-2 h-4 bg-gradient-to-b from-gray-700 to-gray-900 rounded-full shadow-sm"></div>
                      </div>
                    </div>
                    
                    {/* Doll Base */}
                    <div className="w-14 h-2 bg-gradient-to-b from-black to-gray-800 rounded-full mx-auto shadow-lg"></div>
                  </div>
                  
                  {/* Info Card */}
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-card/95 backdrop-blur-sm rounded px-2 py-1 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
                    <p className="text-xs text-muted-foreground whitespace-nowrap">Einstein Figure</p>
                  </div>
                </div>

                {/* Michael Jackson Doll - Slightly tilted */}
                <div className="group relative animate-fade-in transform rotate-3" style={{ animationDelay: '200ms' }}>
                  <div className="relative transform hover:scale-110 transition-all duration-300">
                    {/* Doll Body */}
                    <div className="w-16 h-24 relative">
                      {/* Head */}
                      <div className="w-12 h-12 mx-auto mb-1 rounded-full overflow-hidden bg-gradient-to-b from-amber-100 to-amber-200 border border-amber-300/50 shadow-md">
                        <img
                          src={sculptures[1].image}
                          alt="Michael Jackson collectible figure"
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                      
                      {/* Body */}
                      <div className="w-10 h-11 mx-auto bg-gradient-to-b from-red-600 to-red-800 rounded-sm relative shadow-sm">
                        {/* Arms */}
                        <div className="absolute -left-1 top-1 w-2 h-6 bg-gradient-to-b from-amber-200 to-amber-300 rounded-full shadow-sm transform rotate-12"></div>
                        <div className="absolute -right-1 top-1 w-2 h-6 bg-gradient-to-b from-amber-200 to-amber-300 rounded-full shadow-sm transform -rotate-6"></div>
                        {/* Legs */}
                        <div className="absolute -bottom-2 left-2 w-2 h-4 bg-gradient-to-b from-black to-gray-800 rounded-full shadow-sm"></div>
                        <div className="absolute -bottom-2 right-2 w-2 h-4 bg-gradient-to-b from-black to-gray-800 rounded-full shadow-sm"></div>
                      </div>
                    </div>
                    
                    {/* Doll Base */}
                    <div className="w-14 h-2 bg-gradient-to-b from-black to-gray-800 rounded-full mx-auto shadow-lg"></div>
                  </div>
                  
                  {/* Info Card */}
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-card/95 backdrop-blur-sm rounded px-2 py-1 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
                    <p className="text-xs text-muted-foreground whitespace-nowrap">MJ Figure</p>
                  </div>
                </div>

                {/* Bruce Lee Doll - In action pose */}
                <div className="group relative animate-fade-in transform -rotate-2" style={{ animationDelay: '400ms' }}>
                  <div className="relative transform hover:scale-110 transition-all duration-300">
                    {/* Doll Body */}
                    <div className="w-16 h-24 relative">
                      {/* Head */}
                      <div className="w-12 h-12 mx-auto mb-1 rounded-full overflow-hidden bg-gradient-to-b from-yellow-100 to-yellow-200 border border-yellow-300/50 shadow-md">
                        <img
                          src={sculptures[2].image}
                          alt="Bruce Lee collectible figure"
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                      
                      {/* Body */}
                      <div className="w-10 h-11 mx-auto bg-gradient-to-b from-yellow-600 to-yellow-800 rounded-sm relative shadow-sm">
                        {/* Arms in action pose */}
                        <div className="absolute -left-2 top-0 w-2 h-6 bg-gradient-to-b from-yellow-200 to-yellow-300 rounded-full shadow-sm transform rotate-45"></div>
                        <div className="absolute -right-1 top-2 w-2 h-6 bg-gradient-to-b from-yellow-200 to-yellow-300 rounded-full shadow-sm transform -rotate-12"></div>
                        {/* Legs in stance */}
                        <div className="absolute -bottom-2 left-1 w-2 h-4 bg-gradient-to-b from-yellow-700 to-yellow-900 rounded-full shadow-sm transform rotate-12"></div>
                        <div className="absolute -bottom-2 right-3 w-2 h-4 bg-gradient-to-b from-yellow-700 to-yellow-900 rounded-full shadow-sm transform -rotate-6"></div>
                      </div>
                    </div>
                    
                    {/* Doll Base */}
                    <div className="w-14 h-2 bg-gradient-to-b from-black to-gray-800 rounded-full mx-auto shadow-lg"></div>
                  </div>
                  
                  {/* Info Card */}
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-card/95 backdrop-blur-sm rounded px-2 py-1 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
                    <p className="text-xs text-muted-foreground whitespace-nowrap">Bruce Lee Figure</p>
                  </div>
                </div>
              </div>
              
              {/* Shelf Label */}
              <div className="absolute bottom-2 right-4 bg-brass-light border border-brass-medium rounded px-2 py-1 shadow-sm">
                <p className="text-xs font-bold text-brass-darker">Legends Collection</p>
              </div>
            </div>

            {/* Shelf Bottom Edge */}
            <div className="h-3 bg-gradient-to-b from-amber-700 to-amber-900 border-t border-amber-600"></div>

            {/* Shelf Support Brackets */}
            <div className="absolute -bottom-3 left-8 w-4 h-8 bg-gradient-to-b from-amber-600 to-amber-800 rounded-b shadow-lg transform rotate-1"></div>
            <div className="absolute -bottom-3 right-8 w-4 h-8 bg-gradient-to-b from-amber-600 to-amber-800 rounded-b shadow-lg transform -rotate-1"></div>
            
            {/* Shelf Front Edge Highlight */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-amber-400/50"></div>
          </div>

          {/* Shelf Shadow */}
          <div className="absolute top-3 left-3 right-3 bottom-0 bg-black/20 rounded-xl -z-10 blur-lg"></div>
          
          {/* Ambient Lighting */}
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-32 h-16 bg-gradient-radial from-yellow-200/20 via-yellow-100/10 to-transparent rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default WaxSculptureShelf;