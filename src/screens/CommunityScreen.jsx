import { useState } from 'react';
import { Search, Calendar, X, MapPin, Clock, Check, ArrowLeft, Plus, Trash2, Activity, Flag, Star, MessageSquare } from 'lucide-react';
import Avatar from '../components/Avatar';
import { friends, events as initialEvents } from '../data/mockData';

const MAIN_TABS = ['Amigos', 'Eventos'];

// ─── Amigos ────────────────────────────────────────────────────────
function FriendsTab({ navigate }) {
  const [followState, setFollowState] = useState(
    Object.fromEntries(friends.map(f => [f.id, f.following]))
  );
  const [search, setSearch] = useState('');

  const filtered = friends.filter(f =>
    f.name.toLowerCase().includes(search.toLowerCase()) ||
    f.assessoria.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="px-4 py-3">
        <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2.5">
          <Search size={16} className="text-gray-400" />
          <input
            className="bg-transparent flex-1 text-sm outline-none text-gray-700 placeholder-gray-400"
            placeholder="Buscar amigos"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && (
            <button onClick={() => setSearch('')}>
              <X size={14} className="text-gray-400" />
            </button>
          )}
        </div>
      </div>
      <div>
        {filtered.map(friend => (
          <div key={friend.id} className="flex items-center gap-3 px-4 py-3 border-b border-gray-50">
            <button onClick={() => navigate('thirdPartyProfile', { user: friend })}>
              <Avatar name={friend.name} size={44} />
            </button>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm text-gray-900 truncate">{friend.name}</p>
              <p className="text-xs text-gray-400 truncate">
                {friend.assessoria} · {friend.distance} · Ritmo {friend.pace}
              </p>
            </div>
            <button
              onClick={() => setFollowState(s => ({ ...s, [friend.id]: !s[friend.id] }))}
              className={`px-4 py-2 rounded-full text-sm font-semibold flex-shrink-0 transition-colors ${
                followState[friend.id]
                  ? 'bg-gray-100 text-gray-600 border border-gray-200'
                  : 'bg-primary text-white'
              }`}
            >
              {followState[friend.id] ? 'Seguindo' : 'Seguir'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Modal adicionar evento ────────────────────────────────────────
function AddEventModal({ onAdd, onClose }) {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [distance, setDistance] = useState('');
  const [goalTime, setGoalTime] = useState('');
  const [goalPace, setGoalPace] = useState('');
  const [notes, setNotes] = useState('');

  function handleSave() {
    if (!name.trim()) return;
    onAdd({ name, location, date, time, distance, goalTime, goalPace, notes });
    onClose();
  }

  return (
    <div className="absolute inset-0 z-50 bg-white flex flex-col">
      <div className="flex items-center justify-between px-4 pt-12 pb-4 border-b border-gray-100">
        <button onClick={onClose}><X size={22} className="text-gray-500" /></button>
        <span className="font-bold text-gray-900">Adicionar corrida</span>
        <button
          onClick={handleSave}
          className={`text-sm font-bold px-4 py-2 rounded-full ${name.trim() ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'}`}
        >
          Salvar
        </button>
      </div>

      <div className="flex-1 scrollable p-4 space-y-4">
        <div>
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Nome da corrida *</label>
          <div className="flex items-center gap-2 mt-1.5 bg-gray-50 rounded-2xl px-4 py-3 border border-gray-100">
            <Flag size={16} className="text-primary flex-shrink-0" />
            <input
              autoFocus
              className="flex-1 text-sm text-gray-700 outline-none bg-transparent"
              placeholder="Ex: Corrida Beira Mar 2026"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Local</label>
          <div className="flex items-center gap-2 mt-1.5 bg-gray-50 rounded-2xl px-4 py-3 border border-gray-100">
            <MapPin size={16} className="text-primary flex-shrink-0" />
            <input
              className="flex-1 text-sm text-gray-700 outline-none bg-transparent"
              placeholder="Ex: Beira Mar, Fortaleza"
              value={location}
              onChange={e => setLocation(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-3">
          <div className="flex-1">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Dia</label>
            <div className="flex items-center gap-2 mt-1.5 bg-gray-50 rounded-2xl px-4 py-3 border border-gray-100">
              <Calendar size={15} className="text-primary flex-shrink-0" />
              <input
                className="flex-1 text-sm text-gray-700 outline-none bg-transparent"
                placeholder="dd/mm/aaaa"
                value={date}
                onChange={e => setDate(e.target.value)}
              />
            </div>
          </div>
          <div className="flex-1">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Horário</label>
            <div className="flex items-center gap-2 mt-1.5 bg-gray-50 rounded-2xl px-4 py-3 border border-gray-100">
              <Clock size={15} className="text-primary flex-shrink-0" />
              <input
                className="flex-1 text-sm text-gray-700 outline-none bg-transparent"
                placeholder="06:00"
                value={time}
                onChange={e => setTime(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Distância (km)</label>
          <div className="flex items-center gap-2 mt-1.5 bg-gray-50 rounded-2xl px-4 py-3 border border-gray-100">
            <span className="text-primary text-sm font-bold flex-shrink-0">km</span>
            <input
              className="flex-1 text-sm text-gray-700 outline-none bg-transparent"
              placeholder="Ex: 10"
              value={distance}
              onChange={e => setDistance(e.target.value)}
              type="number"
            />
          </div>
        </div>

        <div className="h-px bg-gray-100" />

        <div>
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Observações</label>
          <div className="mt-1.5 bg-gray-50 rounded-2xl px-4 py-3 border border-gray-100 flex items-start gap-2">
            <MessageSquare size={15} className="text-gray-400 flex-shrink-0 mt-0.5" />
            <textarea
              className="flex-1 text-sm text-gray-700 outline-none bg-transparent resize-none"
              rows={3}
              placeholder="Kit obrigatório, percurso com desvio, dicas..."
              value={notes}
              onChange={e => setNotes(e.target.value)}
            />
          </div>
        </div>

        <div className="h-px bg-gray-100" />

        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Objetivos (opcional)</p>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-gray-400 ml-1">Tempo objetivo</label>
              <div className="flex items-center gap-2 mt-1 bg-gray-50 rounded-2xl px-4 py-3 border border-gray-100">
                <Clock size={15} className="text-gray-400 flex-shrink-0" />
                <input
                  className="flex-1 text-sm text-gray-700 outline-none bg-transparent"
                  placeholder="Ex: 48:00"
                  value={goalTime}
                  onChange={e => setGoalTime(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-400 ml-1">Pace objetivo</label>
              <div className="flex items-center gap-2 mt-1 bg-gray-50 rounded-2xl px-4 py-3 border border-gray-100">
                <Activity size={15} className="text-gray-400 flex-shrink-0" />
                <input
                  className="flex-1 text-sm text-gray-700 outline-none bg-transparent"
                  placeholder="Ex: 4:48 /km"
                  value={goalPace}
                  onChange={e => setGoalPace(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Card de evento ────────────────────────────────────────────────
function EventCard({ event, onDelete }) {
  const hasGoals = event.goalTime || event.goalPace;
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
            <Flag size={18} className="text-accent" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-sm text-gray-900 truncate">{event.name}</p>
            {event.location && (
              <div className="flex items-center gap-1 mt-1">
                <MapPin size={11} className="text-gray-400" />
                <p className="text-xs text-gray-400 truncate">{event.location}</p>
              </div>
            )}
            <div className="flex items-center flex-wrap gap-x-3 gap-y-1 mt-1.5">
              {event.date && (
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Calendar size={11} />
                  <span>{event.date}</span>
                </div>
              )}
              {event.time && (
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock size={11} />
                  <span>{event.time}</span>
                </div>
              )}
              {event.distance && (
                <span className="text-xs font-semibold text-primary">{event.distance} km</span>
              )}
            </div>
            {hasGoals && (
              <div className="mt-1.5 flex items-center gap-2 flex-wrap">
                <span className="text-xs text-gray-400">Meta:</span>
                {event.goalTime && <span className="text-xs font-semibold text-gray-700">{event.goalTime}</span>}
                {event.goalTime && event.goalPace && <span className="text-xs text-gray-300">·</span>}
                {event.goalPace && <span className="text-xs font-semibold text-gray-700">{event.goalPace}</span>}
              </div>
            )}
          </div>
        </div>
        <button
          onClick={() => onDelete(event.id)}
          className="w-8 h-8 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0 ml-2"
        >
          <Trash2 size={14} className="text-gray-400" />
        </button>
      </div>
    </div>
  );
}

// ─── Aba Eventos ───────────────────────────────────────────────────
function EventsTab({ myEvents, setMyEvents, onAddClick }) {
  function deleteEvent(id) {
    setMyEvents(prev => prev.filter(e => e.id !== id));
  }

  return (
    <div>
      <div className="flex items-center justify-between px-4 pt-4 pb-3">
        <p className="text-sm font-semibold text-gray-500">Minhas corridas</p>
        <button
          onClick={onAddClick}
          className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-sm active:scale-95 transition-transform"
        >
          <Plus size={18} color="white" />
        </button>
      </div>

      {myEvents.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
          <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Flag size={24} className="text-gray-300" />
          </div>
          <p className="font-bold text-gray-900 mb-1">Nenhuma corrida adicionada</p>
          <p className="text-sm text-gray-400 leading-relaxed">
            Adicione corridas que você vai participar para acompanhar seus objetivos
          </p>
          <button
            onClick={onAddClick}
            className="mt-4 bg-primary text-white text-sm font-bold px-5 py-2.5 rounded-full"
          >
            Adicionar corrida
          </button>
        </div>
      ) : (
        <div className="px-4 pb-4 space-y-3">
          {myEvents.map(event => (
            <EventCard key={event.id} event={event} onDelete={deleteEvent} />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Modal avaliação ───────────────────────────────────────────────
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
            <button
              key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(0)}
              onClick={() => setStars(i)}
            >
              <Star
                size={36}
                className={i <= (hovered || stars) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}
              />
            </button>
          ))}
        </div>

        <div className="bg-gray-50 rounded-2xl px-4 py-3 border border-gray-100 mb-4">
          <textarea
            className="w-full bg-transparent text-sm text-gray-700 outline-none resize-none"
            rows={3}
            placeholder="Deixe um comentário sobre a corrida (opcional)..."
            value={comment}
            onChange={e => setComment(e.target.value)}
          />
        </div>

        <button
          disabled={stars === 0}
          onClick={() => { onSave(commitment.id, { stars, comment }); onClose(); }}
          className={`w-full font-bold py-4 rounded-2xl text-sm transition-colors ${stars > 0 ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'}`}
        >
          Enviar avaliação
        </button>
      </div>
    </div>
  );
}

// ─── Compromissos ──────────────────────────────────────────────────
const STATUS_INFO = {
  confirmed:              { label: 'Confirmado',       color: 'text-green-600',  bg: 'bg-green-50',  border: 'border-green-100' },
  pending_my_response:    { label: 'Aguarda resposta', color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-100' },
  pending_their_response: { label: 'Aguardando',       color: 'text-gray-400',   bg: 'bg-gray-50',   border: 'border-gray-100' },
};

function CommitmentsPage({ commitments, setCommitments, onBack }) {
  const [ratingTarget, setRatingTarget] = useState(null);
  const [ratings, setRatings] = useState({});

  function accept(id) {
    setCommitments(prev => prev.map(c => c.id === id ? { ...c, status: 'confirmed' } : c));
  }

  function decline(id) {
    setCommitments(prev => prev.filter(c => c.id !== id));
  }

  function saveRating(id, rating) {
    setRatings(prev => ({ ...prev, [id]: rating }));
  }

  return (
    <div className="flex flex-col h-full relative">
      <div className="flex items-center gap-3 px-4 pt-12 pb-3 border-b border-gray-100 bg-white">
        <button onClick={onBack}>
          <ArrowLeft size={22} className="text-gray-700" />
        </button>
        <h2 className="font-bold text-gray-900 text-lg">Compromissos</h2>
      </div>

      <div className="scrollable flex-1 bg-gray-50 pb-24">
        {commitments.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-52 text-center px-8">
            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm border border-gray-100">
              <Calendar size={24} className="text-gray-300" />
            </div>
            <p className="font-bold text-gray-900 mb-1">Nenhum compromisso</p>
            <p className="text-sm text-gray-400 leading-relaxed">Convide amigos para correr e seus compromissos aparecerão aqui</p>
          </div>
        ) : (
          <div className="px-4 pt-3 space-y-3">
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
                      <button
                        onClick={() => accept(c.id)}
                        className="flex-1 bg-primary text-white text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-1.5"
                      >
                        <Check size={13} />
                        Aceitar
                      </button>
                      <button
                        onClick={() => decline(c.id)}
                        className="flex-1 bg-white text-gray-600 text-xs font-bold py-2.5 rounded-xl border border-gray-200"
                      >
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
                        <button
                          onClick={() => setRatingTarget(c)}
                          className="w-full bg-white text-primary text-xs font-bold py-2.5 rounded-xl border border-primary/30 flex items-center justify-center gap-1.5"
                        >
                          <Star size={13} />
                          Avaliar corrida
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {ratingTarget && (
        <RatingModal
          commitment={ratingTarget}
          onSave={saveRating}
          onClose={() => setRatingTarget(null)}
        />
      )}
    </div>
  );
}

// ─── Community Screen ──────────────────────────────────────────────
export default function CommunityScreen({ commitments, setCommitments, navigate }) {
  const [tab, setTab] = useState('Amigos');
  const [showCompromissos, setShowCompromissos] = useState(false);
  const [myEvents, setMyEvents] = useState([]);
  const [showAddEvent, setShowAddEvent] = useState(false);

  function addEvent(event) {
    setMyEvents(prev => [{ id: Date.now(), ...event }, ...prev]);
  }

  if (showCompromissos) {
    return (
      <CommitmentsPage
        commitments={commitments}
        setCommitments={setCommitments}
        onBack={() => setShowCompromissos(false)}
      />
    );
  }

  return (
    <div className="flex flex-col h-full relative">
      <div className="px-4 pt-12 pb-3 bg-white border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-900">Comunidade</h2>
      </div>

      <div className="flex px-4 pt-3 pb-0 gap-2 bg-white overflow-x-auto flex-shrink-0">
        {MAIN_TABS.map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold flex-shrink-0 transition-colors ${
              tab === t ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'
            }`}
          >
            {t}
          </button>
        ))}
        <button
          onClick={() => setShowCompromissos(true)}
          className="px-5 py-2.5 rounded-full text-sm font-semibold flex-shrink-0 bg-gray-100 text-gray-600"
        >
          Compromissos
        </button>
      </div>

      <div className="scrollable flex-1 bg-white pb-24">
        {tab === 'Amigos'  && <FriendsTab navigate={navigate} />}
        {tab === 'Eventos' && <EventsTab myEvents={myEvents} setMyEvents={setMyEvents} onAddClick={() => setShowAddEvent(true)} />}
      </div>

      {showAddEvent && (
        <div className="absolute inset-0 z-50">
          <AddEventModal onAdd={addEvent} onClose={() => setShowAddEvent(false)} />
        </div>
      )}
    </div>
  );
}
