import { Home, Trophy, Users, User } from 'lucide-react';

const tabs = [
  { id: 'home', label: 'Início', Icon: Home },
  { id: 'rankings', label: 'Rankings', Icon: Trophy },
  { id: 'run', label: 'Correr', Icon: null },
  { id: 'community', label: 'Comunidade', Icon: Users },
  { id: 'profile', label: 'Perfil', Icon: User },
];

export default function BottomNav({ active, onChange }) {
  return (
    <div className="w-full bg-white border-t border-gray-100 z-50 flex-shrink-0">
      <div className="flex items-end justify-around px-2 pt-2 pb-4" style={{ paddingBottom: 'max(16px, env(safe-area-inset-bottom))' }}>
        {tabs.map(({ id, label, Icon }) => {
          const isActive = active === id;

          if (id === 'run') {
            return (
              <button
                key={id}
                onClick={() => onChange(id)}
                className="flex flex-col items-center -mt-5"
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-95 ${isActive ? 'bg-accent' : 'bg-accent'}`}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
                    <path d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7 1.4z"/>
                  </svg>
                </div>
                <span className={`text-xs mt-1 font-semibold ${isActive ? 'text-accent' : 'text-accent'}`}>{label}</span>
              </button>
            );
          }

          return (
            <button
              key={id}
              onClick={() => onChange(id)}
              className="flex flex-col items-center gap-0.5 px-2 py-1 min-w-[48px]"
            >
              <Icon size={22} className={isActive ? 'text-accent' : 'text-gray-400'} />
              <span className={`text-xs font-medium ${isActive ? 'text-accent' : 'text-gray-400'}`}>{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
