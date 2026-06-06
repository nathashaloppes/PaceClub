import { useState } from 'react';
import { ArrowLeft, Heart, MessageCircle, UserPlus, Calendar, MapPin, Clock, Check, Star, X } from 'lucide-react';
import Avatar from '../components/Avatar';

const META = {
  like:            { Icon: Heart,          color: '#EF4444', bg: '#FEE2E2' },
  comment:         { Icon: MessageCircle,  color: '#3B82F6', bg: '#DBEAFE' },
  follow_request:  { Icon: UserPlus,       color: '#10B981', bg: '#D1FAE5' },
  training_invite: { Icon: Calendar,       color: '#8B5CF6', bg: '#EDE9FE' },
};

const STATUS_INFO = {
  confirmed:              { label: 'Confirmado',       color: 'text-green-600',  bg: 'bg-green-50',  border: 'border-green-100' },
  pending_my_response:    { label: 'Aguarda resposta', color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-100' },
  pending_their_response: { label: 'Aguardando',       color: 'text-gray-400',   bg: 'bg-gray-50',   border: 'border-gray-100' },
};

function RatingModal({ commitment, onSave, onClose }) {
  const [stars, setStars] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState('');

  return (
    <div className="absolute inset-0 z-50 flex flex-col justify-end">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-t-3xl z-50 max-h-[90vh] overflow-y-auto px-4 pt-5 pb-10">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-black text-gray-900">Avaliar corrida</h3>
          <button onClick={onClose} className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
            <X size={16} className="text-gray-500" />
          </button>
        </div>
        <div className="flex items-center gap-3 bg-gray-50 rounded-2xl p-3 mb-5">
          <Avatar name={commitment.friend} size={44} />
          <div>
            <p className="font-semibold text-sm text-gray-900">{commitment.friend}</p>
            <p className="text-xs text-gray-400">{commitment.location} · {commitment.distance}</p>
          </div>
        </div>
        <p className="text-sm font-semibold text-gray-700 mb-3 text-center">Como foi correr com {commitment.friend.split(' ')[0]}?</p>
        <div className="flex justify-center gap-3 mb-5">
          {[1, 2, 3, 4, 5].map(i => (
            <button key={i} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(0)} onClick={() => setStars(i)}>
              <Star size={36} className={i <= (hovered || stars) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'} />
            </button>
          ))}
        </div>
        <div className="bg-gray-50 rounded-2xl px-4 py-3 border border-gray-100 mb-4">
          <textarea
            className="w-full bg-transparent text-sm text-gray-700 outline-none resize-none"
            rows={3}
            placeholder="Deixe um comentário (opcional)..."
            value={comment}
            onChange={e => setComment(e.target.value)}
          />
        </div>
        <button
          disabled={stars === 0}
          onClick={() => { onSave(commitment.id, { stars, comment }); onClose(); }}
          className={`w-full font-bold py-4 rounded-2xl text-sm ${stars > 0 ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'}`}
        >
          Enviar avaliação
        </button>
      </div>
    </div>
  );
}

function CommitmentsTab({ commitments, setCommitments, trainingInvites, onAcceptInvite, onDeclineInvite }) {
  const [ratingTarget, setRatingTarget] = useState(null);
  const [ratings, setRatings] = useState({});

  function acceptCommitment(id) {
    setCommitments(prev => prev.map(c => c.id === id ? { ...c, status: 'confirmed' } : c));
  }

  function declineCommitment(id) {
    setCommitments(prev => prev.filter(c => c.id !== id));
  }

  const hasContent = trainingInvites.length > 0 || commitments.length > 0;

  if (!hasContent) {
    return (
      <div className="flex flex-col items-center justify-center h-52 text-center px-8">
        <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <Calendar size={24} className="text-gray-300" />
        </div>
        <p className="font-bold text-gray-900 mb-1">Nenhum compromisso</p>
        <p className="text-sm text-gray-400 leading-relaxed">Convites para correr e compromissos confirmados aparecerão aqui</p>
      </div>
    );
  }

  return (
    <div className="px-4 pt-3 space-y-3 pb-6">
      {trainingInvites.map(notif => (
        <div key={notif.id} className="rounded-2xl p-4 border bg-purple-50 border-purple-100">
          <div className="flex items-start gap-3">
            <Avatar name={notif.user} size={44} />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm text-gray-900">{notif.user}</p>
              <p className="text-xs text-gray-500 mt-0.5">convidou você para correr</p>
              <div className="mt-1.5 bg-white rounded-xl p-2.5 space-y-1">
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
              <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
            </div>
          </div>
          <div className="flex gap-2 mt-3">
            <button onClick={() => onAcceptInvite(notif)} className="flex-1 bg-primary text-white text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-1.5">
              <Check size={13} />
              Aceitar
            </button>
            <button onClick={() => onDeclineInvite(notif.id)} className="flex-1 bg-white text-gray-600 text-xs font-bold py-2.5 rounded-xl border border-gray-200">
              Recusar
            </button>
          </div>
        </div>
      ))}

      {commitments.map(c => {
        const info = STATUS_INFO[c.status] || STATUS_INFO.confirmed;
        return (
          <div key={c.id} className={`rounded-2xl p-4 border ${info.bg} ${info.border}`}>
            <div className="flex items-start gap-3">
              <Avatar name={c.friend} size={44} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-sm text-gray-900">{c.friend}</p>
                  <span className={`text-xs font-semibold ${info.color}`}>{info.label}</span>
                </div>
                <div className="mt-1.5 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-gray-600">
                    <MapPin size={11} className="text-primary flex-shrink-0" />
                    <span>{c.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar size={11} />
                      <span>{c.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={11} />
                      <span>{c.time}</span>
                    </div>
                    <span className="font-semibold text-primary">{c.distance}</span>
                  </div>
                </div>
              </div>
            </div>
            {c.status === 'pending_my_response' && (
              <div className="flex gap-2 mt-3">
                <button onClick={() => acceptCommitment(c.id)} className="flex-1 bg-primary text-white text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-1.5">
                  <Check size={13} />
                  Aceitar
                </button>
                <button onClick={() => declineCommitment(c.id)} className="flex-1 bg-white text-gray-600 text-xs font-bold py-2.5 rounded-xl border border-gray-200">
                  Recusar
                </button>
              </div>
            )}
            {c.status === 'confirmed' && (
              <div className="mt-3">
                {ratings[c.id] ? (
                  <div className="flex items-center gap-2 bg-white rounded-xl px-3 py-2">
                    <div className="flex">
                      {[1,2,3,4,5].map(i => (
                        <Star key={i} size={14} className={i <= ratings[c.id].stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'} />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 font-medium">Avaliação enviada</span>
                  </div>
                ) : (
                  <button onClick={() => setRatingTarget(c)} className="w-full bg-white text-primary text-xs font-bold py-2.5 rounded-xl border border-primary/30 flex items-center justify-center gap-1.5">
                    <Star size={13} />
                    Avaliar corrida
                  </button>
                )}
              </div>
            )}
          </div>
        );
      })}

      {ratingTarget && (
        <RatingModal
          commitment={ratingTarget}
          onSave={(id, rating) => setRatings(prev => ({ ...prev, [id]: rating }))}
          onClose={() => setRatingTarget(null)}
        />
      )}
    </div>
  );
}

export default function NotificationsScreen({ notifications, setNotifications, addCommitment, commitments = [], setCommitments, onBack }) {
  const [activeTab, setActiveTab] = useState('Interações');

  function markRead(id) {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  }

  function acceptInvite(notif) {
    addCommitment({
      friend: notif.user,
      location: notif.location || 'A definir',
      date: notif.date || 'A definir',
      time: notif.runTime || 'A definir',
      distance: notif.distance || 'A definir',
      status: 'confirmed',
    });
    setNotifications(prev => prev.map(n => n.id === notif.id ? { ...n, accepted: true, read: true } : n));
  }

  function declineNotif(id) {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }

  function accept(notif) {
    setNotifications(prev => prev.map(n => n.id === notif.id ? { ...n, accepted: true, read: true } : n));
  }

  const hasActions = type => type === 'follow_request';

  const interacoes = notifications.filter(n => ['like', 'comment'].includes(n.type));
  const solicitacoes = notifications.filter(n => n.type === 'follow_request');
  const trainingInvites = notifications.filter(n => n.type === 'training_invite' && !n.accepted);

  const displayList = activeTab === 'Interações' ? interacoes : activeTab === 'Solicitações' ? solicitacoes : [];

  const TABS = ['Interações', 'Solicitações', 'Compromissos'];

  return (
    <div className="flex flex-col h-full bg-white relative">
      <div className="flex items-center gap-3 px-4 pt-12 pb-3 border-b border-gray-100">
        <button onClick={onBack}>
          <ArrowLeft size={22} className="text-gray-700" />
        </button>
        <h2 className="font-bold text-gray-900 text-lg flex-1">Notificações</h2>
      </div>

      <div className="flex gap-2 px-4 py-3 border-b border-gray-100">
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${activeTab === tab ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="scrollable flex-1 min-h-0 pb-6">
        {activeTab === 'Compromissos' ? (
          <CommitmentsTab
            commitments={commitments}
            setCommitments={setCommitments || (() => {})}
            trainingInvites={trainingInvites}
            onAcceptInvite={acceptInvite}
            onDeclineInvite={declineNotif}
          />
        ) : (
          <>
            {displayList.length === 0 && (
              <div className="flex flex-col items-center justify-center h-48 text-gray-300">
                <p className="text-sm font-medium">Nenhuma notificação</p>
              </div>
            )}
            {displayList.map(notif => {
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
                      <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full flex items-center justify-center" style={{ background: meta.bg }}>
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
                          <button onClick={e => { e.stopPropagation(); accept(notif); }} className="flex-1 bg-primary text-white text-xs font-bold py-2 rounded-xl">
                            Aceitar
                          </button>
                          <button onClick={e => { e.stopPropagation(); declineNotif(notif.id); }} className="flex-1 bg-gray-100 text-gray-600 text-xs font-bold py-2 rounded-xl">
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
          </>
        )}
      </div>
    </div>
  );
}
