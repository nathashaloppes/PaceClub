import { useState } from 'react';
import {
  Bell, MoreHorizontal, Heart, MessageCircle, Bookmark, Users,
  Plus, X, Image, Calendar, MessageSquare, Watch, ChevronRight,
  MapPin, Clock, UserPlus, Edit2, Trash2, UserCheck, Check, Activity,
} from 'lucide-react';
import Avatar from '../components/Avatar';
import { initialFeedPosts, suggestedUsers, currentUser, friends } from '../data/mockData';

// ─── Sugestão de usuário ───────────────────────────────────────────
function SuggestedCard({ user, navigate }) {
  const [following, setFollowing] = useState(false);
  return (
    <div className="flex-shrink-0 w-36 bg-gray-50 rounded-2xl p-3 flex flex-col items-center gap-2 border border-gray-100">
      <button onClick={() => navigate('thirdPartyProfile', { user })} className="flex flex-col items-center gap-2 w-full">
        <Avatar name={user.name} size={52} />
        <div className="text-center w-full">
          <p className="font-semibold text-sm text-gray-900 truncate leading-tight">{user.name}</p>
          <p className="text-xs text-gray-400 mt-0.5 truncate">{user.city}</p>
          <div className="flex items-center justify-center gap-1 mt-1">
            <Users size={11} className="text-gray-400 flex-shrink-0" />
            <p className="text-xs text-gray-400">{user.mutualFriends} em comum</p>
          </div>
        </div>
      </button>
      <button
        onClick={() => setFollowing(f => !f)}
        className={`w-full py-1.5 rounded-full text-xs font-semibold transition-colors ${following ? 'bg-gray-200 text-gray-600' : 'bg-primary text-white'}`}
      >
        {following ? 'Seguindo' : 'Seguir'}
      </button>
    </div>
  );
}

// ─── Conteúdos por tipo ───────────────────────────────────────────
function WorkoutContent({ post }) {
  return (
    <>
      <div className="mx-4 mb-3 rounded-2xl overflow-hidden">
        <div className="h-48 relative map-bg">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="flex items-end justify-between text-white">
              <div>
                <span className="text-3xl font-bold">{post.distance}</span>
                <span className="text-sm ml-1 opacity-80">km</span>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold">{post.duration}</p>
                <p className="text-xs opacity-80">Ritmo médio {post.pace}</p>
              </div>
            </div>
          </div>
          <div className="absolute top-4 left-4">
            <div className="flex items-center gap-1.5 bg-primary/90 px-2.5 py-1 rounded-full">
              <div className="w-2 h-2 bg-white rounded-full" />
              <span className="text-white text-xs font-medium">GPS</span>
            </div>
          </div>
          {post.bpm && (
            <div className="absolute top-4 right-4 bg-red-500/90 px-2.5 py-1 rounded-full">
              <span className="text-white text-xs font-medium">♥ {post.bpm} bpm</span>
            </div>
          )}
        </div>
      </div>
      {post.description ? (
        <div className="px-4 mb-3">
          <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{post.description}</p>
        </div>
      ) : null}
    </>
  );
}

function PhotoContent({ post }) {
  return (
    <>
      <div className="mx-4 mb-3 bg-gray-100 rounded-2xl overflow-hidden h-52 flex items-center justify-center relative">
        <div className="text-center">
          <Image size={36} className="text-gray-300 mx-auto mb-1" />
          <p className="text-xs text-gray-300">Foto</p>
        </div>
      </div>
      {post.description ? (
        <div className="px-4 mb-3">
          <p className="text-sm text-gray-700 leading-relaxed">{post.description}</p>
        </div>
      ) : null}
    </>
  );
}

function InviteContent({ post }) {
  const [joined, setJoined] = useState(false);
  const [joinCount, setJoinCount] = useState(post.joinCount ?? 0);

  function handleJoin() {
    setJoined(j => !j);
    setJoinCount(n => joined ? n - 1 : n + 1);
  }

  return (
    <div className="mx-4 mb-3 bg-blue-50 rounded-2xl p-4 border border-blue-100">
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2">
          <MapPin size={14} className="text-primary flex-shrink-0" />
          <span className="text-sm font-semibold text-gray-800">{post.local || 'Local a definir'}</span>
        </div>
        <div className="flex items-center flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Calendar size={12} />
            <span>{post.date || 'Data'}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={12} />
            <span>{post.runTime || '--:--'}</span>
          </div>
          <span className="font-semibold text-primary">
            {post.inviteDistance === 'Livre' ? 'Livre' : `${post.inviteDistance} km`}
          </span>
          {post.pace && (
            <div className="flex items-center gap-1">
              <Activity size={12} className="text-gray-400" />
              <span className="font-semibold text-gray-600">{post.pace} /km</span>
            </div>
          )}
        </div>
        {joinCount > 0 && (
          <p className="text-xs text-gray-400">{joinCount} {joinCount === 1 ? 'confirmado' : 'confirmados'}</p>
        )}
      </div>
      {post.isOwn ? (
        <div className="bg-white rounded-xl px-3 py-2 text-center">
          <p className="text-xs text-gray-400">{joinCount} {joinCount === 1 ? 'participante confirmado' : 'participantes confirmados'}</p>
        </div>
      ) : (
        <button
          onClick={handleJoin}
          className={`w-full py-2.5 rounded-xl text-sm font-bold transition-colors ${joined ? 'bg-green-500 text-white' : 'bg-primary text-white'}`}
        >
          {joined ? '✓ Confirmado' : 'Participar'}
        </button>
      )}
    </div>
  );
}

function ThoughtContent({ post }) {
  return (
    <div className="px-4 mb-4">
      <p className="text-lg font-medium text-gray-800 leading-relaxed">{post.text}</p>
    </div>
  );
}

// ─── Card do post ──────────────────────────────────────────────────
function PostCard({ post, onEdit, onDelete, onAddParticipants, navigate, savedPosts, toggleSavedPost }) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes);
  const [showMenu, setShowMenu] = useState(false);
  const saved = savedPosts?.some(p => p.id === post.id) ?? false;

  return (
    <div className="bg-white border-b border-gray-100">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('thirdPartyProfile', { user: { ...post.user, id: post.id } })}>
            <Avatar name={post.user.name} size={40} />
          </button>
          <div>
            <p className="font-semibold text-sm text-gray-900 leading-tight">
              {post.participants && post.participants.length > 0 ? (
                <>
                  {post.user.name}{' '}
                  <span className="text-gray-400 font-normal text-xs">com </span>
                  <button
                    onClick={e => { e.stopPropagation(); navigate('thirdPartyProfile', { user: { name: post.participants[0], id: post.id * 100 + 1 } }); }}
                    className="text-primary font-semibold"
                  >
                    {post.participants[0]}
                  </button>
                  {post.participants.length > 1 && (
                    <span className="text-gray-500 font-normal text-xs"> e mais {post.participants.length - 1}</span>
                  )}
                </>
              ) : post.user.name}
            </p>
            <div className="flex items-center gap-1 flex-wrap">
              <p className="text-xs text-gray-400">{post.time}</p>
              {post.location && (
                <>
                  <span className="text-gray-300 text-xs">·</span>
                  <MapPin size={10} className="text-gray-400" />
                  <p className="text-xs text-gray-400">{post.location}</p>
                </>
              )}
            </div>
          </div>
        </div>

        {post.isOwn && (
          <div className="relative">
            <button onClick={() => setShowMenu(m => !m)} className="p-1">
              <MoreHorizontal size={20} className="text-gray-400" />
            </button>
            {showMenu && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setShowMenu(false)} />
                <div className="absolute right-0 top-8 z-40 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden w-52">
                  <button
                    onClick={() => { onEdit(post); setShowMenu(false); }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left border-b border-gray-50 active:bg-gray-50"
                  >
                    <Edit2 size={15} className="text-primary flex-shrink-0" />
                    <span className="text-sm font-medium text-gray-700">Editar</span>
                  </button>
                  <button
                    onClick={() => { onAddParticipants(post); setShowMenu(false); }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left border-b border-gray-50 active:bg-gray-50"
                  >
                    <UserCheck size={15} className="text-green-600 flex-shrink-0" />
                    <span className="text-sm font-medium text-gray-700">Add participantes</span>
                  </button>
                  <button
                    onClick={() => { onDelete(post.id); setShowMenu(false); }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left active:bg-red-50"
                  >
                    <Trash2 size={15} className="text-red-500 flex-shrink-0" />
                    <span className="text-sm font-medium text-red-500">Excluir</span>
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {post.type === 'workout' && <WorkoutContent post={post} />}
      {post.type === 'photo'   && <PhotoContent post={post} />}
      {post.type === 'invite'  && <InviteContent post={post} />}
      {post.type === 'thought' && <ThoughtContent post={post} />}

      <div className="flex items-center justify-between px-4 pb-4">
        <div className="flex items-center gap-4">
          <button onClick={() => { setLiked(l => !l); setLikes(n => liked ? n - 1 : n + 1); }} className="flex items-center gap-1.5">
            <Heart size={22} className={liked ? 'text-red-500 fill-red-500' : 'text-gray-400'} />
            <span className="text-sm font-medium text-gray-600">{likes}</span>
          </button>
          <button className="flex items-center gap-1.5">
            <MessageCircle size={22} className="text-gray-400" />
            <span className="text-sm font-medium text-gray-600">{post.comments}</span>
          </button>
        </div>
        <button onClick={() => toggleSavedPost?.(post)}>
          <Bookmark size={22} className={saved ? 'text-primary fill-primary' : 'text-gray-400'} />
        </button>
      </div>
    </div>
  );
}

// ─── Modal editar convite ──────────────────────────────────────────
function EditInviteModal({ post, onSave, onClose }) {
  const [local, setLocal] = useState(post.local || '');
  const [date, setDate] = useState(post.date || '');
  const [time, setTime] = useState(post.runTime || '');
  const [dist, setDist] = useState(post.inviteDistance || '5');
  const [pace, setPace] = useState(post.pace || '');
  const [description, setDescription] = useState(post.description || '');

  return (
    <div className="absolute inset-0 z-50 bg-white flex flex-col">
      <div className="flex items-center justify-between px-4 pt-12 pb-4 border-b border-gray-100">
        <button onClick={onClose}><X size={22} className="text-gray-500" /></button>
        <span className="font-bold text-gray-900">Editar convite</span>
        <button
          onClick={() => { onSave({ local, date, runTime: time, inviteDistance: dist, pace: pace || null, description }); onClose(); }}
          className="bg-primary text-white text-sm font-bold px-4 py-2 rounded-full"
        >
          Salvar
        </button>
      </div>
      <div className="flex-1 scrollable p-4 space-y-3">
        <div className="bg-blue-50 rounded-2xl p-4 space-y-3">
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Local</label>
            <div className="flex items-center gap-2 mt-1.5 bg-white rounded-xl px-3 py-2.5 border border-gray-100">
              <MapPin size={15} className="text-primary flex-shrink-0" />
              <input className="flex-1 text-sm text-gray-700 outline-none bg-transparent" placeholder="Ex: Beira Mar, Fortaleza" value={local} onChange={e => setLocal(e.target.value)} />
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Data</label>
              <div className="flex items-center gap-2 mt-1.5 bg-white rounded-xl px-3 py-2.5 border border-gray-100">
                <Calendar size={15} className="text-primary flex-shrink-0" />
                <input className="flex-1 text-sm text-gray-700 outline-none bg-transparent" placeholder="dd/mm" value={date} onChange={e => setDate(e.target.value)} />
              </div>
            </div>
            <div className="flex-1">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Horário</label>
              <div className="flex items-center gap-2 mt-1.5 bg-white rounded-xl px-3 py-2.5 border border-gray-100">
                <Clock size={15} className="text-primary flex-shrink-0" />
                <input className="flex-1 text-sm text-gray-700 outline-none bg-transparent" placeholder="06:00" value={time} onChange={e => setTime(e.target.value)} />
              </div>
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Distância</label>
            <div className="flex gap-2 mt-1.5">
              {['5', '10', '21', 'Livre'].map(d => (
                <button key={d} onClick={() => setDist(d)} className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-colors ${dist === d ? 'bg-primary text-white' : 'bg-white text-gray-500 border border-gray-100'}`}>
                  {d === 'Livre' ? d : `${d} km`}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Ritmo alvo</label>
            <div className="flex items-center gap-2 mt-1.5 bg-white rounded-xl px-3 py-2.5 border border-gray-100">
              <Activity size={15} className="text-primary flex-shrink-0" />
              <input className="flex-1 text-sm text-gray-700 outline-none bg-transparent" placeholder="Ex: 5:30 /km (opcional)" value={pace} onChange={e => setPace(e.target.value)} />
            </div>
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Descrição</label>
          <textarea
            className="w-full mt-1.5 bg-gray-50 rounded-2xl p-4 text-sm text-gray-700 outline-none resize-none border border-gray-100"
            rows={3} placeholder="Adicione uma descrição..."
            value={description} onChange={e => setDescription(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

// ─── Modal editar legenda ──────────────────────────────────────────
function EditPostModal({ post, onSave, onClose }) {
  const initial = post.type === 'thought' ? (post.text || '') : (post.description || '');
  const [text, setText] = useState(initial);

  function handleSave() {
    onSave(post.type === 'thought' ? { text } : { description: text });
    onClose();
  }

  return (
    <div className="absolute inset-0 z-50 bg-white flex flex-col">
      <div className="flex items-center justify-between px-4 pt-12 pb-4 border-b border-gray-100">
        <button onClick={onClose}><X size={22} className="text-gray-500" /></button>
        <span className="font-bold text-gray-900">Editar publicação</span>
        <button onClick={handleSave} className="bg-primary text-white text-sm font-bold px-4 py-2 rounded-full">Salvar</button>
      </div>
      <div className="p-4">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Legenda</p>
        <textarea
          autoFocus
          className="w-full bg-gray-50 rounded-2xl p-4 text-sm text-gray-700 outline-none resize-none border border-gray-100"
          rows={6}
          value={text}
          onChange={e => setText(e.target.value)}
        />
      </div>
    </div>
  );
}

// ─── Modal adicionar participantes ─────────────────────────────────
function AddParticipantsModal({ post, onSave, onClose }) {
  const [selected, setSelected] = useState(new Set(post.participants || []));

  function toggle(name) {
    setSelected(prev => {
      const s = new Set(prev);
      s.has(name) ? s.delete(name) : s.add(name);
      return s;
    });
  }

  return (
    <div className="absolute inset-0 z-50 bg-white flex flex-col">
      <div className="flex items-center justify-between px-4 pt-12 pb-4 border-b border-gray-100">
        <button onClick={onClose}><X size={22} className="text-gray-500" /></button>
        <span className="font-bold text-gray-900">Adicionar participantes</span>
        <button
          onClick={() => { onSave({ participants: Array.from(selected) }); onClose(); }}
          className="bg-primary text-white text-sm font-bold px-4 py-2 rounded-full"
        >
          Salvar
        </button>
      </div>
      <p className="px-4 pt-3 pb-1 text-xs text-gray-400">Selecione amigos para marcar nesta publicação</p>
      <div className="flex-1 scrollable">
        {friends.map(f => {
          const isSelected = selected.has(f.name);
          return (
            <button key={f.id} onClick={() => toggle(f.name)} className="w-full flex items-center gap-3 px-4 py-3 border-b border-gray-50">
              <Avatar name={f.name} size={44} />
              <div className="flex-1 text-left">
                <p className="font-semibold text-sm text-gray-900">{f.name}</p>
                <p className="text-xs text-gray-400">{f.assessoria}</p>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${isSelected ? 'bg-primary border-primary' : 'border-gray-200'}`}>
                {isSelected && <Check size={14} color="white" strokeWidth={3} />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Seletor de localização ────────────────────────────────────────
const QUICK_LOCS = ['Beira Mar, Fortaleza', 'Parque do Cocó', 'Praia do Futuro', 'Centro, Fortaleza'];

function LocationPicker({ location, onChange }) {
  return (
    <div className="space-y-2 mt-1">
      <div className="flex flex-wrap gap-2">
        {QUICK_LOCS.map(loc => (
          <button
            key={loc}
            onClick={() => onChange(location === loc ? '' : loc)}
            className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${location === loc ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'}`}
          >
            {loc}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2.5">
        <MapPin size={14} className="text-gray-400" />
        <input
          className="flex-1 bg-transparent text-sm outline-none text-gray-700 placeholder-gray-400"
          placeholder="Outro local..."
          value={QUICK_LOCS.includes(location) ? '' : location}
          onChange={e => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}

// ─── Modais de criação ─────────────────────────────────────────────
const POST_TYPES = [
  { id: 'photo',   icon: Image,          label: 'Postar foto',          description: 'Compartilhe um momento da sua corrida', color: '#8B5CF6', bg: '#F5F3FF' },
  { id: 'invite',  icon: UserPlus,       label: 'Convidar para treino', description: 'Crie um convite para correr junto',      color: '#7C3AED', bg: '#EFF6FF' },
  { id: 'thought', icon: MessageSquare,  label: 'Pensamentos',          description: 'Compartilhe uma ideia ou motivação',    color: '#F97316', bg: '#FFF7ED' },
  { id: 'workout', icon: Watch,          label: 'Treino concluído',     description: 'Sincronize do seu relógio',             color: '#16A34A', bg: '#F0FDF4' },
];

function PostTypeMenu({ onSelect, onClose }) {
  return (
    <div className="absolute inset-0 z-40 flex flex-col justify-end">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-t-3xl z-50 max-h-[85vh] flex flex-col">
        <div className="px-4 pt-5 pb-3 flex-shrink-0 flex items-center justify-between">
          <h3 className="text-lg font-black text-gray-900">Nova publicação</h3>
          <button onClick={onClose} className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
            <X size={16} className="text-gray-500" />
          </button>
        </div>
        <div className="overflow-y-auto px-4 pb-10 space-y-2">
          {POST_TYPES.map(({ id, icon: Icon, label, description, color, bg }) => (
            <button key={id} onClick={() => onSelect(id)} className="w-full flex items-center gap-4 p-4 rounded-2xl active:scale-98 transition-transform text-left" style={{ background: bg }}>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: color + '22' }}>
                <Icon size={22} style={{ color }} />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm text-gray-900">{label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{description}</p>
              </div>
              <ChevronRight size={16} className="text-gray-300 flex-shrink-0" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function PhotoModal({ onPublish, onClose }) {
  const [text, setText] = useState('');
  const [location, setLocation] = useState('');
  const [showLoc, setShowLoc] = useState(false);

  return (
    <div className="absolute inset-0 z-50 bg-white flex flex-col">
      <div className="flex items-center justify-between px-4 pt-12 pb-4 border-b border-gray-100">
        <button onClick={onClose}><X size={22} className="text-gray-500" /></button>
        <span className="font-bold text-gray-900">Postar foto</span>
        <button
          onClick={() => { onPublish({ type: 'photo', description: text, location }); onClose(); }}
          className={`text-sm font-bold px-4 py-2 rounded-full ${text.trim() ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'}`}
        >
          Publicar
        </button>
      </div>
      <div className="flex-1 scrollable p-4 flex flex-col gap-4">
        <div className="w-full rounded-2xl bg-gray-100 flex flex-col items-center justify-center gap-3 border-2 border-dashed border-gray-300" style={{ minHeight: 200 }}>
          <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm">
            <Image size={28} className="text-gray-400" />
          </div>
          <p className="text-sm text-gray-400 font-medium">Toque para selecionar uma foto</p>
        </div>
        <textarea
          className="w-full bg-gray-50 rounded-2xl p-4 text-sm text-gray-700 outline-none resize-none border border-gray-100"
          rows={4} placeholder="Escreva uma legenda..."
          value={text} onChange={e => setText(e.target.value)}
        />
        <button onClick={() => setShowLoc(s => !s)} className="flex items-center gap-2 text-primary text-sm font-semibold">
          <MapPin size={16} />
          {location || 'Adicionar localização'}
        </button>
        {showLoc && <LocationPicker location={location} onChange={setLocation} />}
      </div>
    </div>
  );
}

function InviteModal({ onPublish, onClose }) {
  const [local, setLocal] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [dist, setDist] = useState('5');
  const [pace, setPace] = useState('');

  return (
    <div className="absolute inset-0 z-50 bg-white flex flex-col">
      <div className="flex items-center justify-between px-4 pt-12 pb-4 border-b border-gray-100">
        <button onClick={onClose}><X size={22} className="text-gray-500" /></button>
        <span className="font-bold text-gray-900">Convidar para treino</span>
        <button
          onClick={() => { onPublish({ type: 'invite', local, date, runTime: time, inviteDistance: dist, pace: pace !== 'Livre' ? pace : null, participants: [], joinCount: 0 }); onClose(); }}
          className="bg-primary text-white text-sm font-bold px-4 py-2 rounded-full"
        >
          Publicar
        </button>
      </div>
      <div className="flex-1 scrollable p-4 space-y-3">
        <div className="bg-blue-50 rounded-2xl p-4 space-y-3">
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Local</label>
            <div className="flex items-center gap-2 mt-1.5 bg-white rounded-xl px-3 py-2.5 border border-gray-100">
              <MapPin size={15} className="text-primary flex-shrink-0" />
              <input className="flex-1 text-sm text-gray-700 outline-none bg-transparent" placeholder="Ex: Beira Mar, Fortaleza" value={local} onChange={e => setLocal(e.target.value)} />
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Data</label>
              <div className="flex items-center gap-2 mt-1.5 bg-white rounded-xl px-3 py-2.5 border border-gray-100">
                <Calendar size={15} className="text-primary flex-shrink-0" />
                <input className="flex-1 text-sm text-gray-700 outline-none bg-transparent w-full" placeholder="dd/mm" value={date} onChange={e => setDate(e.target.value)} />
              </div>
            </div>
            <div className="flex-1">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Horário</label>
              <div className="flex items-center gap-2 mt-1.5 bg-white rounded-xl px-3 py-2.5 border border-gray-100">
                <Clock size={15} className="text-primary flex-shrink-0" />
                <input className="flex-1 text-sm text-gray-700 outline-none bg-transparent w-full" placeholder="06:00" value={time} onChange={e => setTime(e.target.value)} />
              </div>
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Distância</label>
            <div className="flex gap-2 mt-1.5">
              {['5', '10', '21', 'Livre'].map(d => (
                <button key={d} onClick={() => setDist(d)} className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-colors ${dist === d ? 'bg-primary text-white' : 'bg-white text-gray-500 border border-gray-100'}`}>
                  {d === 'Livre' ? d : `${d} km`}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Ritmo alvo</label>
            <div className="flex items-center gap-2 mt-1.5 bg-white rounded-xl px-3 py-2.5 border border-gray-100">
              <Activity size={15} className="text-primary flex-shrink-0" />
              <input
                className="flex-1 text-sm text-gray-700 outline-none bg-transparent"
                placeholder="Ex: 5:30 /km (opcional)"
                value={pace}
                onChange={e => setPace(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-2xl p-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Prévia</p>
          <div className="bg-white rounded-xl p-4 border border-blue-100">
            <div className="flex items-center gap-3 mb-3">
              <Avatar name={currentUser.name} size={36} />
              <div>
                <p className="font-semibold text-sm text-gray-900">{currentUser.name}</p>
                <p className="text-xs text-gray-400">convida para treinar</p>
              </div>
            </div>
            <div className="bg-blue-50 rounded-xl p-3 space-y-1 mb-3">
              <p className="text-sm font-semibold text-gray-800">{local || 'Local a definir'}</p>
              <p className="text-xs text-gray-500">
                {date || 'Data'} às {time || '--:--'} · {dist === 'Livre' ? 'Distância livre' : `${dist} km`}
                {pace ? ` · ${pace}` : ''}
              </p>
            </div>
            <button className="w-full bg-primary text-white font-bold py-2.5 rounded-xl text-sm">Participar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ThoughtModal({ onPublish, onClose }) {
  const [text, setText] = useState('');
  const [location, setLocation] = useState('');
  const [showLoc, setShowLoc] = useState(false);
  const SUGGESTIONS = ['Bora correr! 🔥', 'Sem desculpas hoje 💪', 'Cada km conta ⚡', 'Mente forte, pernas mais 🏃'];

  return (
    <div className="absolute inset-0 z-50 bg-white flex flex-col">
      <div className="flex items-center justify-between px-4 pt-12 pb-4 border-b border-gray-100">
        <button onClick={onClose}><X size={22} className="text-gray-500" /></button>
        <span className="font-bold text-gray-900">Pensamentos</span>
        <button
          onClick={() => { if (text.trim()) { onPublish({ type: 'thought', text, location }); onClose(); } }}
          className={`text-sm font-bold px-4 py-2 rounded-full ${text.trim() ? 'bg-accent text-white' : 'bg-gray-100 text-gray-400'}`}
        >
          Publicar
        </button>
      </div>
      <div className="flex-1 scrollable p-4 flex flex-col gap-4">
        <div className="flex items-start gap-3">
          <Avatar name={currentUser.name} size={40} />
          <textarea
            autoFocus
            className="flex-1 text-base text-gray-700 outline-none resize-none bg-transparent min-h-[120px]"
            placeholder="O que você está pensando?"
            value={text} onChange={e => setText(e.target.value)}
          />
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Sugestões</p>
          <div className="flex flex-wrap gap-2">
            {SUGGESTIONS.map(s => (
              <button key={s} onClick={() => setText(s)} className="bg-orange-50 text-accent text-xs font-semibold px-3 py-2 rounded-full border border-orange-100">{s}</button>
            ))}
          </div>
        </div>
        <button onClick={() => setShowLoc(s => !s)} className="flex items-center gap-2 text-primary text-sm font-semibold">
          <MapPin size={16} />
          {location || 'Adicionar localização'}
        </button>
        {showLoc && <LocationPicker location={location} onChange={setLocation} />}
      </div>
    </div>
  );
}

function WorkoutModal({ onPublish, onClose }) {
  const [syncing, setSyncing] = useState(false);
  const [synced, setSynced] = useState(false);
  const [description, setDescription] = useState('');

  const stats = [
    { label: 'Distância', value: '8,3 km' },
    { label: 'Tempo', value: '46:22' },
    { label: 'Ritmo médio', value: '5:35 /km' },
    { label: 'BPM médio', value: 162 },
    { label: 'Calorias', value: '487 kcal' },
  ];

  return (
    <div className="absolute inset-0 z-50 bg-white flex flex-col">
      <div className="flex items-center justify-between px-4 pt-12 pb-4 border-b border-gray-100">
        <button onClick={onClose}><X size={22} className="text-gray-500" /></button>
        <span className="font-bold text-gray-900">Treino concluído</span>
        <button
          disabled={!synced}
          onClick={() => { onPublish({ type: 'workout', distance: '8,3', duration: '46:22', pace: '5:35 /km', bpm: 162, description }); onClose(); }}
          className={`text-sm font-bold px-4 py-2 rounded-full transition-colors ${synced ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-300'}`}
        >
          Publicar
        </button>
      </div>
      <div className="flex-1 scrollable p-4 space-y-4">
        {!synced ? (
          <div className="flex flex-col items-center gap-5 pt-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full border-4 border-green-100 flex items-center justify-center bg-green-50">
                <Watch size={38} className={`text-green-500 ${syncing ? 'animate-pulse' : ''}`} />
              </div>
              {syncing && <div className="absolute inset-0 rounded-full border-4 border-green-400 border-t-transparent animate-spin" />}
            </div>
            <div className="text-center">
              <p className="font-bold text-gray-900 text-lg">{syncing ? 'Sincronizando...' : 'Sincronizar do relógio'}</p>
              <p className="text-sm text-gray-400 mt-1">{syncing ? 'Aguarde um momento' : 'Apple Watch · Garmin · Samsung · Fitbit'}</p>
            </div>
            {!syncing && (
              <div className="flex flex-col gap-2 w-full">
                {['Apple Watch', 'Garmin', 'Samsung Watch', 'Fitbit'].map(device => (
                  <button key={device} onClick={() => { setSyncing(true); setTimeout(() => { setSyncing(false); setSynced(true); }, 2000); }} className="flex items-center gap-3 w-full bg-gray-50 rounded-2xl px-4 py-3.5 border border-gray-100">
                    <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center shadow-sm">
                      <Watch size={18} className="text-gray-600" />
                    </div>
                    <span className="flex-1 text-left font-medium text-sm text-gray-800">{device}</span>
                    <ChevronRight size={15} className="text-gray-300" />
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-green-50 rounded-2xl p-4 border border-green-100">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-xs font-semibold text-green-600 uppercase tracking-wide">Sincronizado</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {stats.map(({ label, value }) => (
                  <div key={label} className="bg-white rounded-xl p-3 text-center">
                    <p className="text-xs text-gray-400">{label}</p>
                    <p className="font-bold text-gray-900 mt-0.5">{value}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="h-32 map-bg rounded-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-black/20" />
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 320 128" preserveAspectRatio="none">
                <path d="M 20 100 Q 70 80 120 70 Q 170 60 210 75 Q 250 90 290 60" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" />
                <circle cx="20" cy="100" r="5" fill="#22c55e" />
                <circle cx="290" cy="60" r="5" fill="#22c55e" />
              </svg>
            </div>
            <textarea
              className="w-full bg-gray-50 rounded-2xl p-4 text-sm text-gray-700 outline-none resize-none border border-gray-100"
              rows={3} placeholder="Adicione uma descrição..."
              value={description} onChange={e => setDescription(e.target.value)}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function NewPostFlow({ onPublish, onClose }) {
  const [selected, setSelected] = useState(null);
  if (selected === 'photo')   return <PhotoModal onPublish={onPublish} onClose={onClose} />;
  if (selected === 'invite')  return <InviteModal onPublish={onPublish} onClose={onClose} />;
  if (selected === 'thought') return <ThoughtModal onPublish={onPublish} onClose={onClose} />;
  if (selected === 'workout') return <WorkoutModal onPublish={onPublish} onClose={onClose} />;
  return <PostTypeMenu onSelect={setSelected} onClose={onClose} />;
}

// ─── Home Screen ───────────────────────────────────────────────────
export default function HomeScreen({ navigate, unreadCount, savedPosts, toggleSavedPost }) {
  const [posts, setPosts] = useState(initialFeedPosts);
  const [newPostOpen, setNewPostOpen] = useState(false);
  const [editPost, setEditPost] = useState(null);
  const [editInvitePost, setEditInvitePost] = useState(null);
  const [participantsPost, setParticipantsPost] = useState(null);

  function handleEdit(p) {
    if (p.type === 'invite') setEditInvitePost(p);
    else setEditPost(p);
  }

  function handlePublish(data) {
    setPosts(prev => [{
      id: Date.now(),
      user: { name: currentUser.name },
      time: 'Agora',
      likes: 0,
      comments: 0,
      isOwn: true,
      participants: [],
      ...data,
    }, ...prev]);
  }

  function handleUpdate(id, changes) {
    setPosts(prev => prev.map(p => p.id === id ? { ...p, ...changes } : p));
  }

  return (
    <div className="flex flex-col h-full relative">
      <div className="flex items-center justify-between px-4 pt-12 pb-3 bg-white border-b border-gray-100">
        <div className="flex items-center">
          <span className="text-2xl font-black text-primary">pace</span>
          <img src="/logo-runner.jpeg" alt="" className="h-9 w-9 object-contain -mx-1" style={{ mixBlendMode: 'multiply' }} />
          <span className="text-2xl font-black text-gray-800">club</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setNewPostOpen(true)}
            className="w-9 h-9 bg-primary rounded-full flex items-center justify-center shadow-sm active:scale-95 transition-transform"
          >
            <Plus size={20} color="white" strokeWidth={2.5} />
          </button>
          <button className="relative p-1" onClick={() => navigate('notifications')}>
            <Bell size={24} className="text-gray-700" />
            {unreadCount > 0 && (
              <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-red-500 rounded-full" />
            )}
          </button>
        </div>
      </div>

      <div className="scrollable flex-1 pb-24">
        <div className="py-3 border-b border-gray-100">
          <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Sugestões para você</p>
          <div className="flex gap-3 px-4 overflow-x-auto">
            {suggestedUsers.map(u => <SuggestedCard key={u.id} user={u} navigate={navigate} />)}
          </div>
        </div>
        <div>
          {posts.map(post => (
            <PostCard
              key={post.id}
              post={post}
              onEdit={handleEdit}
              onDelete={id => setPosts(prev => prev.filter(p => p.id !== id))}
              onAddParticipants={p => setParticipantsPost(p)}
              navigate={navigate}
              savedPosts={savedPosts}
              toggleSavedPost={toggleSavedPost}
            />
          ))}
        </div>
      </div>

      {newPostOpen && <NewPostFlow onPublish={handlePublish} onClose={() => setNewPostOpen(false)} />}

      {editPost && (
        <EditPostModal
          post={editPost}
          onSave={changes => handleUpdate(editPost.id, changes)}
          onClose={() => setEditPost(null)}
        />
      )}

      {editInvitePost && (
        <EditInviteModal
          post={editInvitePost}
          onSave={changes => handleUpdate(editInvitePost.id, changes)}
          onClose={() => setEditInvitePost(null)}
        />
      )}

      {participantsPost && (
        <AddParticipantsModal
          post={participantsPost}
          onSave={changes => handleUpdate(participantsPost.id, changes)}
          onClose={() => setParticipantsPost(null)}
        />
      )}
    </div>
  );
}
