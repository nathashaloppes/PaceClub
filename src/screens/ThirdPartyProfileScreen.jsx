import { useState } from 'react';
import { ArrowLeft, MapPin, Users, Star, X, Calendar, Clock, Activity, ChevronRight } from 'lucide-react';
import Avatar from '../components/Avatar';
import VerifiedBadge from '../components/VerifiedBadge';
import { suggestedUsers, friends, currentUser, thirdPartyProfilePosts } from '../data/mockData';
import ProfilePostCard from '../components/ProfilePostCard';

const MOCK_RECORDS = [
  { distance: '5 km',  time: '30:15',   isRecord: true },
  { distance: '10 km', time: '1:02:30', isRecord: true },
  { distance: '21 km', time: '2:25:00', isRecord: false },
  { distance: 'Total', time: '920 km',  isRecord: false },
];

const MOCK_ACHIEVEMENTS = [
  { id: 1, icon: '🥈', label: '8',  sublabel: 'Medalhas' },
  { id: 2, icon: '🔥', label: '30', sublabel: 'Dias seguidos' },
];

const MOCK_RANKINGS = [
  { race: 'Beira Mar 5 km', position: '5º lugar', time: '30:15' },
];

function RatingStars({ rating }) {
  return (
    <div className="flex items-center gap-1 mt-1">
      <div className="flex">
        {[1, 2, 3, 4, 5].map(i => (
          <Star key={i} size={12} className={i <= Math.round(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-blue-200'} />
        ))}
      </div>
      <span className="text-blue-100 text-xs font-semibold ml-0.5">{rating.toFixed(1)}</span>
    </div>
  );
}

// ─── Modal amigos em comum ─────────────────────────────────────────
function MutualFriendsModal({ list, navigate, onClose }) {
  return (
    <div className="absolute inset-0 z-50 bg-white flex flex-col">
      <div className="flex items-center gap-3 px-4 pt-12 pb-3 border-b border-gray-100">
        <button onClick={onClose}><ArrowLeft size={22} className="text-gray-700" /></button>
        <h2 className="font-bold text-gray-900 text-lg flex-1">Amigos em comum</h2>
        <span className="text-sm text-gray-400">{list.length}</span>
      </div>
      <div className="scrollable flex-1 min-h-0">
        {list.map((f, i) => (
          <button
            key={i}
            onClick={() => { onClose(); navigate('thirdPartyProfile', { user: f }); }}
            className="w-full flex items-center gap-3 px-4 py-3.5 border-b border-gray-50 text-left active:bg-gray-50"
          >
            <Avatar name={f.name} size={46} />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm text-gray-900">{f.name}</p>
              <p className="text-xs text-gray-400">{f.assessoria || ''}{f.pace ? ` · Ritmo ${f.pace}` : ''}</p>
            </div>
            <ChevronRight size={16} className="text-gray-300 flex-shrink-0" />
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Modal convidar para correr ────────────────────────────────────
function InviteRunModal({ user, onClose, onSend }) {
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [dist, setDist] = useState('5');
  const [pace, setPace] = useState('');

  return (
    <div className="absolute inset-0 z-50 bg-white flex flex-col">
      <div className="flex items-center justify-between px-4 pt-12 pb-4 border-b border-gray-100">
        <button onClick={onClose}><X size={22} className="text-gray-500" /></button>
        <span className="font-bold text-gray-900">Convidar para correr</span>
        <button
          onClick={() => { onSend({ location, date, time, dist, pace }); onClose(); }}
          className="bg-primary text-white text-sm font-bold px-4 py-2 rounded-full"
        >
          Enviar
        </button>
      </div>
      <div className="flex-1 scrollable p-4 space-y-3">
        <div className="flex items-center gap-3 bg-gray-50 rounded-2xl p-3">
          <Avatar name={user.name} size={40} />
          <div>
            <p className="font-semibold text-sm text-gray-900">Convidar {user.name.split(' ')[0]}</p>
            <p className="text-xs text-gray-400">para uma corrida</p>
          </div>
        </div>

        <div className="bg-blue-50 rounded-2xl p-4 space-y-3">
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Local</label>
            <div className="flex items-center gap-2 mt-1.5 bg-white rounded-xl px-3 py-2.5 border border-gray-100">
              <MapPin size={15} className="text-primary flex-shrink-0" />
              <input className="flex-1 text-sm text-gray-700 outline-none bg-transparent" placeholder="Ex: Beira Mar, Fortaleza" value={location} onChange={e => setLocation(e.target.value)} />
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
              <input
                className="flex-1 text-sm text-gray-700 outline-none bg-transparent"
                placeholder="Ex: 5:30 /km (opcional)"
                value={pace}
                onChange={e => setPace(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Third-Party Profile Screen ────────────────────────────────────
export default function ThirdPartyProfileScreen({ user, addNotification, addCommitment, navigate, onBack }) {
  const [following, setFollowing] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
  const [showMutualFriends, setShowMutualFriends] = useState(false);

  // users with id divisible by 4 have private profiles (for demo)
  const isUserPrivate = user.id && user.id % 4 === 0;
  const canSeeProfile = !isUserPrivate || following;
  const rating = 4.7;
  const mutualFriends = user.mutualFriends || 3;
  const mutualList = friends.slice(0, Math.min(mutualFriends, friends.length));

  function handleSendInvite({ location, date, time, dist, pace }) {
    const distance = dist === 'Livre' ? 'Livre' : `${dist} km`;
    addNotification({
      type: 'training_invite',
      user: currentUser.name,
      text: `convidou ${user.name.split(' ')[0]} para correr`,
      time: 'Agora',
      location: location || 'A definir',
      date: date || 'A definir',
      runTime: time || 'A definir',
      distance,
    });
    addCommitment({
      friend: user.name,
      location: location || 'A definir',
      date: date || 'A definir',
      time: time || 'A definir',
      distance,
      status: 'pending_their_response',
    });
  }

  return (
    <div className="flex flex-col h-full relative">
      <div className="scrollable flex-1 min-h-0 min-h-0">
        <div className="bg-primary pb-6">
          <div className="flex items-center px-4 pt-12 pb-4">
            <button onClick={onBack}>
              <ArrowLeft size={22} color="white" />
            </button>
          </div>

          <div className="flex flex-col items-center px-4">
            <div className="mb-3">
              <Avatar name={user.name} size={88} ring />
            </div>

            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-black text-white">{user.name}</h2>
              <VerifiedBadge size={20} />
            </div>

            <p className="text-purple-200 text-sm mt-0.5">@{user.name.toLowerCase().replace(/\s+/g, '')}</p>
            <RatingStars rating={rating} />

            <div className="flex items-center gap-1.5 mt-2">
              <MapPin size={13} color="white" opacity={0.8} />
              <span className="text-purple-200 text-sm">{user.city || 'Fortaleza, CE'}</span>
            </div>

            {canSeeProfile && (
              <div className="flex items-center gap-10 mt-4">
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-black text-white">124</span>
                  <span className="text-xs text-purple-200 mt-0.5">Seguidores</span>
                </div>
                <div className="w-px h-8 bg-white/20" />
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-black text-white">98</span>
                  <span className="text-xs text-purple-200 mt-0.5">Seguindo</span>
                </div>
                <div className="w-px h-8 bg-white/20" />
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-black text-white">213</span>
                  <span className="text-xs text-purple-200 mt-0.5">Corridas</span>
                </div>
              </div>
            )}

            <div className="flex gap-3 mt-4 w-full">
              <button
                onClick={() => setFollowing(f => !f)}
                className={`flex-1 py-2.5 rounded-2xl font-bold text-sm transition-colors ${following ? 'bg-white/20 text-white border border-white/30' : 'bg-white text-primary'}`}
              >
                {following ? 'Seguindo' : 'Seguir'}
              </button>
              <button
                onClick={() => setShowInvite(true)}
                className="flex-1 bg-accent text-white py-2.5 rounded-2xl font-bold text-sm"
              >
                Convidar para correr
              </button>
            </div>
          </div>
        </div>

      <div className="bg-gray-50 pb-6">
        {canSeeProfile ? (
          <>
            {/* Amigos em comum — clicável */}
            <button
              className="w-full bg-white px-4 pt-4 pb-4 mb-3 text-left active:bg-gray-50"
              onClick={() => setShowMutualFriends(true)}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-gray-900">Amigos em comum</h3>
                <div className="flex items-center gap-1">
                  <span className="text-sm text-gray-400">{mutualFriends}</span>
                  <ChevronRight size={15} className="text-gray-300" />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex">
                  {mutualList.slice(0, 3).map((f, i) => (
                    <div key={f.id} style={{ marginLeft: i === 0 ? 0 : -10 }}>
                      <Avatar name={f.name} size={36} ring />
                    </div>
                  ))}
                </div>
                <span className="text-xs text-gray-500">
                  {mutualList.slice(0, 2).map(f => f.name.split(' ')[0]).join(', ')}
                  {mutualFriends > 2 ? ` e mais ${mutualFriends - 2}` : ''}
                </span>
              </div>
            </button>

            <div className="bg-white px-4 pt-4 pb-5 mb-3">
              <h3 className="font-bold text-gray-900 mb-3">Conquistas</h3>
              <div className="flex gap-4">
                {MOCK_ACHIEVEMENTS.map(a => (
                  <div key={a.id} className="flex flex-col items-center gap-1.5 flex-1">
                    <div className="w-14 h-14 bg-yellow-50 rounded-2xl flex items-center justify-center text-2xl shadow-sm border border-yellow-100">
                      {a.icon}
                    </div>
                    <p className="text-xs font-bold text-gray-900 text-center">{a.label}</p>
                    <p className="text-xs text-gray-400 text-center">{a.sublabel}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white px-4 pt-4 pb-5 mb-3">
              <h3 className="font-bold text-gray-900 mb-3">Melhores marcas</h3>
              <div className="grid grid-cols-4 gap-2">
                {MOCK_RECORDS.map(pr => (
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
              <h3 className="font-bold text-gray-900 mb-3">Rankings atuais</h3>
              {MOCK_RANKINGS.map(r => (
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

            <div className="bg-white pt-4 pb-2">
              <h3 className="font-bold text-gray-900 mb-1 px-4">Últimas publicações</h3>
            </div>
            {thirdPartyProfilePosts.map(post => (
              <ProfilePostCard key={post.id} post={post} userName={user.name} />
            ))}
          </>
        ) : (
          <>
            <div className="bg-white px-4 py-8 mb-3 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                <Users size={28} className="text-gray-400" />
              </div>
              <p className="font-bold text-gray-900 mb-1">Este perfil é privado</p>
              <p className="text-sm text-gray-400 leading-relaxed">
                Siga {user.name.split(' ')[0]} para ver suas publicações e conquistas
              </p>
            </div>

            <div className="bg-white px-4 pt-4 pb-5">
              <p className="font-bold text-gray-900 mb-3">Você também pode seguir</p>
              <div className="flex gap-3 overflow-x-auto pb-1">
                {suggestedUsers.filter(u => u.name !== user.name).slice(0, 4).map(u => (
                  <div key={u.id} className="flex-shrink-0 w-32 bg-gray-50 rounded-2xl p-3 flex flex-col items-center gap-2 border border-gray-100">
                    <button onClick={() => navigate('thirdPartyProfile', { user: u })} className="flex flex-col items-center gap-1.5 w-full">
                      <Avatar name={u.name} size={46} />
                      <p className="font-semibold text-xs text-gray-900 text-center truncate w-full">{u.name}</p>
                      <p className="text-xs text-gray-400 text-center truncate w-full">{u.city}</p>
                    </button>
                    <button className="w-full py-1.5 bg-primary text-white rounded-full text-xs font-semibold">
                      Seguir
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
      </div>

      {showInvite && (
        <InviteRunModal
          user={user}
          onClose={() => setShowInvite(false)}
          onSend={handleSendInvite}
        />
      )}

      {showMutualFriends && (
        <MutualFriendsModal
          list={mutualList}
          navigate={navigate}
          onClose={() => setShowMutualFriends(false)}
        />
      )}
    </div>
  );
}
