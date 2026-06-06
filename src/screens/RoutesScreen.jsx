import { useState } from 'react';
import { Map, List, MoreHorizontal, Users, Trophy } from 'lucide-react';
import { routes } from '../data/mockData';

const ROUTE_PATHS = [
  "M 40 180 Q 80 150 120 130 Q 160 110 200 120 Q 230 130 260 100",
  "M 30 160 Q 60 140 100 130 Q 140 120 170 140 Q 200 160 230 130 Q 250 110 270 120",
  "M 50 170 Q 90 160 130 140 Q 160 125 190 135 Q 220 145 250 115",
];

function MapView() {
  return (
    <div className="px-4 pt-3">
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
        <div className="h-64 relative map-bg">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 320 256" preserveAspectRatio="none">
            {routes.map((route, i) => (
              <path
                key={route.id}
                d={ROUTE_PATHS[i]}
                fill="none"
                stroke={route.color}
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            ))}
            {routes.map((route, i) => {
              const coords = [
                [40, 180], [30, 160], [50, 170]
              ];
              return (
                <circle key={route.id} cx={coords[i][0]} cy={coords[i][1]} r="5" fill={route.color} />
              );
            })}
          </svg>

          <div className="absolute top-3 left-3 bg-white rounded-xl shadow-sm px-3 py-1.5">
            <p className="text-xs font-bold text-gray-700">Fortaleza</p>
          </div>

          <div className="absolute bottom-3 right-3 flex flex-col gap-1.5">
            {routes.map(route => (
              <div key={route.id} className="flex items-center gap-1.5 bg-white/90 backdrop-blur rounded-lg px-2 py-1 shadow-sm">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: route.color }} />
                <span className="text-xs font-medium text-gray-700">{route.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-3 pb-6">
        {routes.map(route => (
          <RouteCard key={route.id} route={route} />
        ))}
      </div>
    </div>
  );
}

function RouteCard({ route }) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 active:scale-98 transition-transform">
      <div className="flex items-start gap-3">
        <div
          className="w-4 h-4 rounded-full flex-shrink-0 mt-1"
          style={{ background: route.color }}
        />
        <div className="flex-1">
          <p className="font-bold text-gray-900">{route.name}</p>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-1.5">
              <Users size={13} className="text-gray-400" />
              <span className="text-xs text-gray-500">{route.participants.toLocaleString('pt-BR')}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Trophy size={13} className="text-gray-400" />
              <span className="text-xs text-gray-500">Recorde {route.record}</span>
            </div>
          </div>
        </div>
        <button
          className="text-white text-sm font-semibold px-4 py-2 rounded-full flex-shrink-0"
          style={{ background: route.color }}
        >
          Correr
        </button>
      </div>
    </div>
  );
}

export default function RoutesScreen() {
  const [view, setView] = useState('map');

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-4 pt-12 pb-3 bg-white border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-900">Percursos</h2>
        <button>
          <MoreHorizontal size={22} className="text-gray-400" />
        </button>
      </div>

      <div className="flex items-center gap-2 px-4 py-3 bg-white">
        <button
          onClick={() => setView('map')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-colors ${
            view === 'map' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'
          }`}
        >
          <Map size={15} />
          Mapa
        </button>
        <button
          onClick={() => setView('list')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-colors ${
            view === 'list' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'
          }`}
        >
          <List size={15} />
          Lista
        </button>
      </div>

      <div className="scrollable flex-1 min-h-0 bg-gray-50">
        {view === 'map' ? (
          <MapView />
        ) : (
          <div className="px-4 pt-3 pb-6 space-y-3">
            {routes.map(route => (
              <RouteCard key={route.id} route={route} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
