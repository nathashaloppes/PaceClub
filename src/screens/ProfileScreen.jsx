import { useState } from 'react';
import { MapPin, Users, Edit3, MoreHorizontal, X, Phone, FileText, CheckCircle, AlertCircle, Star, ArrowLeft, Search, Share2, Calendar, Clock, Activity } from 'lucide-react';
import Avatar from '../components/Avatar';
import VerifiedBadge from '../components/VerifiedBadge';
import { currentUser, achievements, personalRecords, currentRankings, friends, followers, myProfilePosts } from '../data/mockData';
import ProfilePostCard from '../components/ProfilePostCard';

// ─── Modal de verificação ──────────────────────────────────────────
function VerifiedModal({ onClose }) {
  return (
    <div className="absolute inset-0 z-50 flex flex-col justify-end">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-t-3xl px-4 pt-5 pb-10 z-50">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-black text-gray-900">Verificações</h3>
          <button onClick={onClose} className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
            <X size={16} className="text-gray-500" />
          </button>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-4 bg-green-50 rounded-2xl p-4 border border-green-100">
            <div className="w-11 h-11 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Phone size={20} className="text-green-600" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm text-gray-900">Telefone</p>
              <p className="text-xs text-gray-400 mt-0.5">Número verificado com sucesso</p>
            </div>
            <CheckCircle size={22} className="text-green-500 flex-shrink-0" />
          </div>

          <div className="flex items-center gap-4 bg-gray-50 rounded-2xl p-4 border border-gray-100">
            <div className="w-11 h-11 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <FileText size={20} className="text-gray-400" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm text-gray-900">Documento (CPF)</p>
              <p className="text-xs text-gray-400 mt-0.5">Verificação de documento pendente</p>
            </div>
            <AlertCircle size={22} className="text-gray-300 flex-shrink-0" />
          </div>

          <button className="w-full bg-primary text-white font-bold py-4 rounded-2xl text-sm mt-2">
            Verificar documento agora
          </button>
          <p className="text-xs text-center text-gray-400">
            A verificação de documento aumenta sua confiabilidade na comunidade
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Modal de seguidores / seguindo ───────────────────────────────
function FollowListModal({ title, list, onClose }) {
  const [search, setSearch] = useState('');
  const filtered = list.filter(f => f.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="absolute inset-0 z-50 bg-white flex flex-col">
      <div className="flex items-center gap-3 px-4 pt-12 pb-3 border-b border-gray-100">
        <button onClick={onClose}>
          <ArrowLeft size={22} className="text-gray-700" />
        </button>
        <h3 className="font-bold text-gray-900 text-lg flex-1">{title}</h3>
      </div>
      <div className="px-4 py-3">
        <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2.5">
          <Search size={15} className="text-gray-400" />
          <input
            className="flex-1 bg-transparent text-sm outline-none text-gray-700 placeholder-gray-400"
            placeholder="Buscar..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="flex-1 scrollable">
        {filtered.map((f, i) => (
          <div key={i} className="flex items-center gap-3 px-4 py-3 border-b border-gray-50">
            <Avatar name={f.name} size={46} />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm text-gray-900">{f.name}</p>
              <p className="text-xs text-gray-400">{f.assessoria} · Ritmo {f.pace}</p>
            </div>
            <button className="border border-primary text-primary px-4 py-1.5 rounded-full text-xs font-semibold">
              Ver perfil
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}


// ─── Estrelas de avaliação ─────────────────────────────────────────
function RatingStars({ rating }) {
  return (
    <div className="flex items-center gap-1 mt-1">
      <div className="flex">
        {[1, 2, 3, 4, 5].map(i => (
          <Star
            key={i}
            size={13}
            className={i <= Math.round(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-blue-200'}
          />
        ))}
      </div>
      <span className="text-blue-100 text-xs font-semibold ml-0.5">{rating.toFixed(1)}</span>
    </div>
  );
}

// ─── Modal adicionar participantes ─────────────────────────────────
function AddParticipantsProfileModal({ post, onSave, onClose }) {
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
          onClick={() => { onSave(post.id, { participants: Array.from(selected) }); onClose(); }}
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
                {isSelected && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Modal editar publicação ───────────────────────────────────────
function EditProfilePostModal({ post, onSave, onClose }) {
  const initial = post.type === 'thought' ? (post.text || '') : (post.description || '');
  const [text, setText] = useState(initial);
  return (
    <div className="absolute inset-0 z-50 bg-white flex flex-col">
      <div className="flex items-center justify-between px-4 pt-12 pb-4 border-b border-gray-100">
        <button onClick={onClose}><X size={22} className="text-gray-500" /></button>
        <span className="font-bold text-gray-900">Editar publicação</span>
        <button
          onClick={() => { onSave(post.id, post.type === 'thought' ? { text } : { description: text }); onClose(); }}
          className="bg-primary text-white text-sm font-bold px-4 py-2 rounded-full"
        >
          Salvar
        </button>
      </div>
      <div className="p-4">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
          {post.type === 'thought' ? 'Texto' : 'Legenda'}
        </p>
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

function EditInviteProfileModal({ post, onSave, onClose }) {
  const [local, setLocal] = useState(post.local || '');
  const [date, setDate] = useState(post.date || '');
  const [time, setTime] = useState(post.runTime || '');
  const [dist, setDist] = useState(post.inviteDistance || '5');
  const [pace, setPace] = useState(post.pace || '');
  return (
    <div className="absolute inset-0 z-50 bg-white flex flex-col">
      <div className="flex items-center justify-between px-4 pt-12 pb-4 border-b border-gray-100">
        <button onClick={onClose}><X size={22} className="text-gray-500" /></button>
        <span className="font-bold text-gray-900">Editar convite</span>
        <button
          onClick={() => { onSave(post.id, { local, date, runTime: time, inviteDistance: dist, pace: pace || null }); onClose(); }}
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
      </div>
    </div>
  );
}

// ─── Profile Screen ────────────────────────────────────────────────
export default function ProfileScreen({ navigate, profileData }) {
  const [showVerified, setShowVerified] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [posts, setPosts] = useState(myProfilePosts);
  const [editPost, setEditPost] = useState(null);
  const [addParticipantsPost, setAddParticipantsPost] = useState(null);

  function handleEdit(p) {
    setEditPost(p);
  }

  function handleUpdate(id, changes) {
    setPosts(prev => prev.map(p => p.id === id ? { ...p, ...changes } : p));
  }

  function handleDelete(id) {
    setPosts(prev => prev.filter(p => p.id !== id));
  }

  const name = profileData?.name || currentUser.name;
  const username = profileData?.username || currentUser.username;
  const assessoria = profileData?.assessoria || currentUser.assessoria;
  const city = profileData?.city || currentUser.location;

  return (
    <div className="flex flex-col h-full relative">
      <div className="scrollable flex-1 min-h-0">
        <div className="bg-primary pb-6">
          <div className="flex items-center justify-between px-4 pt-12 pb-4">
            <button><Share2 size={22} color="white" /></button>
            <button onClick={() => navigate('settings')}>
              <MoreHorizontal size={22} color="white" />
            </button>
          </div>

          <div className="flex flex-col items-center px-4">
            <div className="relative mb-3">
              <Avatar name={name} size={88} ring />
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow">
                <Edit3 size={14} className="text-primary" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-black text-white">{name}</h2>
              <VerifiedBadge size={20} onClick={() => setShowVerified(true)} />
            </div>

            <p className="text-purple-200 text-sm mt-0.5">{username}</p>
            <RatingStars rating={currentUser.rating} />

            <div className="flex flex-col items-center gap-1 mt-3">
              <div className="flex items-center gap-1.5">
                <MapPin size={14} color="white" opacity={0.8} />
                <span className="text-purple-200 text-sm">{city}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users size={14} color="white" opacity={0.8} />
                <span className="text-purple-200 text-sm">Assessoria: {assessoria}</span>
              </div>
            </div>

            <div className="flex items-center gap-10 mt-6">
              <button onClick={() => setShowFollowers(true)} className="flex flex-col items-center">
                <span className="text-2xl font-black text-white">{currentUser.followers.toLocaleString('pt-BR')}</span>
                <span className="text-xs text-purple-200 mt-0.5 underline underline-offset-2">Seguidores</span>
              </button>
              <div className="w-px h-8 bg-white/20" />
              <button onClick={() => setShowFollowing(true)} className="flex flex-col items-center">
                <span className="text-2xl font-black text-white">{currentUser.following.toLocaleString('pt-BR')}</span>
                <span className="text-xs text-purple-200 mt-0.5 underline underline-offset-2">Seguindo</span>
              </button>
              <div className="w-px h-8 bg-white/20" />
              <div className="flex flex-col items-center">
                <span className="text-2xl font-black text-white">{currentUser.runs.toLocaleString('pt-BR')}</span>
                <span className="text-xs text-purple-200 mt-0.5">Corridas</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 pb-6">
        <div className="bg-white px-4 pt-4 pb-5 mb-3">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900">Conquistas</h3>
            <button className="text-primary text-sm font-semibold">Ver todas</button>
          </div>
          <div className="flex gap-4">
            {achievements.map(a => (
              <div key={a.id} className="flex flex-col items-center gap-1.5 flex-1">
                <div className="w-14 h-14 bg-yellow-50 rounded-2xl flex items-center justify-center text-2xl shadow-sm border border-yellow-100">
                  {a.icon}
                </div>
                <p className="text-xs font-bold text-gray-900 text-center leading-tight">{a.label}</p>
                <p className="text-xs text-gray-400 text-center leading-tight">{a.sublabel}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white px-4 pt-4 pb-5 mb-3">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900">Melhores marcas</h3>
            <button className="text-primary text-sm font-semibold">Ver todas</button>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {personalRecords.map(pr => (
              <div key={pr.distance} className="bg-gray-50 rounded-xl p-3 text-center">
                <p className="text-xs text-gray-400 mb-1">{pr.distance}</p>
                <p className="font-bold text-sm text-gray-900">{pr.time}</p>
                {pr.isRecord && (
                  <span className="text-xs bg-primary text-white px-1.5 py-0.5 rounded-full mt-1 inline-block font-medium">RP</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white px-4 pt-4 pb-5 mb-3">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900">Rankings atuais</h3>
            <button className="text-primary text-sm font-semibold">Ver todas</button>
          </div>
          <div className="space-y-3">
            {currentRankings.map(r => (
              <div key={r.race} className="flex items-center gap-3">
                <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">🏅</div>
                <div className="flex-1">
                  <p className="font-semibold text-sm text-gray-900">{r.race}</p>
                  <p className="text-xs text-gray-400">{r.position}</p>
                </div>
                <span className="font-bold text-sm text-gray-900">{r.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white pt-4 pb-2">
          <h3 className="font-bold text-gray-900 mb-1 px-4">Últimas publicações</h3>
        </div>
        {posts.map(post => (
          <ProfilePostCard
            key={post.id}
            post={post}
            isOwn
            onEdit={handleEdit}
            onDelete={handleDelete}
            onAddParticipants={p => setAddParticipantsPost(p)}
          />
        ))}
        </div>
      </div>

      {showVerified && <VerifiedModal onClose={() => setShowVerified(false)} />}

      {editPost && editPost.type === 'invite' && (
        <EditInviteProfileModal
          post={editPost}
          onSave={handleUpdate}
          onClose={() => setEditPost(null)}
        />
      )}

      {editPost && editPost.type !== 'invite' && (
        <EditProfilePostModal
          post={editPost}
          onSave={handleUpdate}
          onClose={() => setEditPost(null)}
        />
      )}

      {addParticipantsPost && (
        <AddParticipantsProfileModal
          post={addParticipantsPost}
          onSave={handleUpdate}
          onClose={() => setAddParticipantsPost(null)}
        />
      )}

      {showFollowers && (
        <FollowListModal
          title={`Seguidores (${currentUser.followers})`}
          list={followers}
          onClose={() => setShowFollowers(false)}
        />
      )}

      {showFollowing && (
        <FollowListModal
          title={`Seguindo (${currentUser.following})`}
          list={friends}
          onClose={() => setShowFollowing(false)}
        />
      )}
    </div>
  );
}
