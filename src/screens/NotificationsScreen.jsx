import { ArrowLeft, Heart, MessageCircle, UserPlus, Users, Calendar, MapPin, Clock } from 'lucide-react';
import Avatar from '../components/Avatar';

const META = {
  like:            { Icon: Heart,          color: '#EF4444', bg: '#FEE2E2' },
  comment:         { Icon: MessageCircle,  color: '#3B82F6', bg: '#DBEAFE' },
  follow_request:  { Icon: UserPlus,       color: '#10B981', bg: '#D1FAE5' },
  participate:     { Icon: Users,          color: '#F97316', bg: '#FFEDD5' },
  training_invite: { Icon: Calendar,       color: '#8B5CF6', bg: '#EDE9FE' },
};

export default function NotificationsScreen({ notifications, setNotifications, addCommitment, onBack }) {
  function markRead(id) {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  }

  function accept(notif) {
    if (notif.type === 'training_invite') {
      addCommitment({
        friend: notif.user,
        location: notif.location || 'A definir',
        date: notif.date || 'A definir',
        time: notif.runTime || 'A definir',
        distance: notif.distance || 'A definir',
        status: 'confirmed',
      });
    }
    setNotifications(prev => prev.map(n => n.id === notif.id ? { ...n, accepted: true, read: true } : n));
  }

  function decline(id) {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }

  const hasActions = type => ['follow_request', 'participate', 'training_invite'].includes(type);

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex items-center gap-3 px-4 pt-12 pb-3 border-b border-gray-100">
        <button onClick={onBack}>
          <ArrowLeft size={22} className="text-gray-700" />
        </button>
        <h2 className="font-bold text-gray-900 text-lg flex-1">Notificações</h2>
      </div>

      <div className="scrollable flex-1 pb-6">
        {notifications.length === 0 && (
          <div className="flex flex-col items-center justify-center h-48 text-gray-300">
            <p className="text-sm font-medium">Nenhuma notificação</p>
          </div>
        )}

        {notifications.map(notif => {
          const meta = META[notif.type] || META.like;
          const { Icon } = meta;

          return (
            <div
              key={notif.id}
              className={`px-4 py-3 border-b border-gray-50 ${!notif.read ? 'bg-blue-50/40' : ''}`}
              onClick={() => markRead(notif.id)}
            >
              <div className="flex items-start gap-3">
                <div className="relative flex-shrink-0">
                  <Avatar name={notif.user} size={44} />
                  <div
                    className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ background: meta.bg }}
                  >
                    <Icon size={11} style={{ color: meta.color }} />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 leading-snug">
                    <span className="font-semibold">{notif.user}</span>{' '}{notif.text}
                  </p>

                  {notif.preview && (
                    <p className="text-xs text-gray-400 mt-0.5">{notif.preview}</p>
                  )}

                  {notif.type === 'training_invite' && (
                    <div className="mt-1.5 bg-purple-50 rounded-xl p-2.5 space-y-1">
                      <div className="flex items-center gap-1.5 text-xs text-gray-600">
                        <MapPin size={11} className="text-purple-500" />
                        <span>{notif.location}</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar size={11} />
                          <span>{notif.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={11} />
                          <span>{notif.runTime}</span>
                        </div>
                        <span className="font-semibold text-purple-600">{notif.distance}</span>
                      </div>
                    </div>
                  )}

                  <p className="text-xs text-gray-400 mt-1">{notif.time}</p>

                  {hasActions(notif.type) && !notif.accepted && (
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={e => { e.stopPropagation(); accept(notif); }}
                        className="flex-1 bg-primary text-white text-xs font-bold py-2 rounded-xl"
                      >
                        Aceitar
                      </button>
                      <button
                        onClick={e => { e.stopPropagation(); decline(notif.id); }}
                        className="flex-1 bg-gray-100 text-gray-600 text-xs font-bold py-2 rounded-xl"
                      >
                        Recusar
                      </button>
                    </div>
                  )}

                  {notif.accepted && (
                    <p className="text-xs text-green-600 font-semibold mt-1.5">✓ Aceito</p>
                  )}
                </div>

                {!notif.read && (
                  <div className="w-2.5 h-2.5 bg-primary rounded-full flex-shrink-0 mt-1.5" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
