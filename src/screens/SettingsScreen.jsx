import { useState } from 'react';
import { ArrowLeft, User, AtSign, MapPin, Users, Mail, Lock, Eye, EyeOff, Bookmark, Shield, ChevronRight, LogOut } from 'lucide-react';
import Avatar from '../components/Avatar';
import ProfilePostCard from '../components/ProfilePostCard';

// ─── Campo genérico ────────────────────────────────────────────────
function Field({ label, icon: Icon, value, onChange, type = 'text', placeholder }) {
  const [showPass, setShowPass] = useState(false);
  const inputType = type === 'password' ? (showPass ? 'text' : 'password') : type;
  return (
    <div>
      <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{label}</label>
      <div className="flex items-center gap-2 bg-gray-50 rounded-2xl px-4 py-3 mt-1.5 border border-gray-100">
        <Icon size={18} className="text-gray-400 flex-shrink-0" />
        <input
          type={inputType}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-sm text-gray-700 outline-none"
        />
        {type === 'password' && (
          <button onClick={() => setShowPass(s => !s)} type="button">
            {showPass ? <EyeOff size={16} className="text-gray-400" /> : <Eye size={16} className="text-gray-400" />}
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Item de menu ──────────────────────────────────────────────────
function MenuItem({ icon: Icon, label, sublabel, onClick, iconColor = 'text-gray-600', iconBg = 'bg-gray-100' }) {
  return (
    <button onClick={onClick} className="w-full flex items-center gap-4 px-4 py-3.5 text-left active:bg-gray-50">
      <div className={`w-10 h-10 ${iconBg} rounded-xl flex items-center justify-center flex-shrink-0`}>
        <Icon size={20} className={iconColor} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm text-gray-900">{label}</p>
        <p className="text-xs text-gray-400 mt-0.5">{sublabel}</p>
      </div>
      <ChevronRight size={16} className="text-gray-300 flex-shrink-0" />
    </button>
  );
}

// ─── Sub-view: Dados pessoais ──────────────────────────────────────
function DadosPessoaisView({ profileData, setProfileData, onBack }) {
  const [form, setForm] = useState({
    name: profileData.name || '',
    username: profileData.username || '',
    city: profileData.city || '',
    assessoria: profileData.assessoria || '',
  });

  function handleSave() {
    setProfileData(prev => ({ ...prev, ...form }));
    onBack();
  }

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex items-center justify-between px-4 pt-12 pb-4 border-b border-gray-100">
        <button onClick={onBack}><ArrowLeft size={22} className="text-gray-700" /></button>
        <span className="font-bold text-gray-900">Dados pessoais</span>
        <button onClick={handleSave} className="bg-primary text-white text-sm font-bold px-4 py-2 rounded-full">Salvar</button>
      </div>
      <div className="scrollable flex-1 p-4 space-y-4">
        <div className="flex flex-col items-center py-2">
          <Avatar name={form.name} size={64} />
          <button className="text-primary text-sm font-semibold mt-2">Trocar foto</button>
        </div>
        <Field label="Nome" icon={User} value={form.name} onChange={v => setForm(f => ({ ...f, name: v }))} placeholder="Seu nome completo" />
        <Field label="Nome de usuário" icon={AtSign} value={form.username} onChange={v => setForm(f => ({ ...f, username: v }))} placeholder="@usuário" />
        <Field label="Cidade" icon={MapPin} value={form.city} onChange={v => setForm(f => ({ ...f, city: v }))} placeholder="Cidade, Estado" />
        <Field label="Assessoria" icon={Users} value={form.assessoria} onChange={v => setForm(f => ({ ...f, assessoria: v }))} placeholder="Nome da assessoria" />
      </div>
    </div>
  );
}

// ─── Sub-view: Salvos ──────────────────────────────────────────────
function SalvosView({ savedPosts = [], toggleSavedPost, onBack }) {
  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex items-center gap-3 px-4 pt-12 pb-4 border-b border-gray-100">
        <button onClick={onBack}><ArrowLeft size={22} className="text-gray-700" /></button>
        <h2 className="font-bold text-gray-900 text-lg flex-1">Salvos</h2>
        <span className="text-sm text-gray-400">{savedPosts.length}</span>
      </div>
      {savedPosts.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center px-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Bookmark size={28} className="text-gray-400" />
          </div>
          <p className="font-bold text-gray-900 mb-1">Nenhuma publicação salva</p>
          <p className="text-sm text-gray-400 leading-relaxed">Salve publicações do feed para encontrá-las aqui depois</p>
        </div>
      ) : (
        <div className="scrollable flex-1 bg-gray-50">
          {savedPosts.map(post => (
            <ProfilePostCard
              key={post.id}
              post={post}
              userName={post.user?.name}
              isSaved
              onToggleSave={toggleSavedPost}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Sub-view: Privacidade ─────────────────────────────────────────
function PrivacidadeView({ isPrivate, setIsPrivate, onBack }) {
  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex items-center gap-3 px-4 pt-12 pb-4 border-b border-gray-100">
        <button onClick={onBack}><ArrowLeft size={22} className="text-gray-700" /></button>
        <h2 className="font-bold text-gray-900 text-lg">Privacidade da conta</h2>
      </div>
      <div className="p-4 space-y-3">
        <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex-1 pr-4">
              <p className="font-semibold text-sm text-gray-900">Conta privada</p>
              <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">
                Somente seguidores aprovados poderão ver suas publicações e conquistas
              </p>
            </div>
            <button
              onClick={() => setIsPrivate(p => !p)}
              className={`w-12 h-6 rounded-full transition-colors relative flex-shrink-0 ${isPrivate ? 'bg-primary' : 'bg-gray-200'}`}
            >
              <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${isPrivate ? 'translate-x-6' : 'translate-x-0.5'}`} />
            </button>
          </div>
        </div>
        <p className="text-xs text-gray-400 px-1">
          {isPrivate
            ? 'Seu perfil está privado. Apenas seus seguidores aprovados podem ver seu conteúdo.'
            : 'Seu perfil está público. Qualquer pessoa pode ver suas publicações e informações.'
          }
        </p>
      </div>
    </div>
  );
}

// ─── Sub-view: Senha e segurança ───────────────────────────────────
function SenhaView({ profileData, setProfileData, onBack }) {
  const [email, setEmail] = useState(profileData.email || '');
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setProfileData(prev => ({ ...prev, email }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex items-center justify-between px-4 pt-12 pb-4 border-b border-gray-100">
        <button onClick={onBack}><ArrowLeft size={22} className="text-gray-700" /></button>
        <span className="font-bold text-gray-900">Senha e segurança</span>
        <button
          onClick={handleSave}
          className={`text-sm font-bold px-4 py-2 rounded-full transition-colors ${saved ? 'bg-green-500 text-white' : 'bg-primary text-white'}`}
        >
          {saved ? 'Salvo ✓' : 'Salvar'}
        </button>
      </div>
      <div className="scrollable flex-1 p-4 space-y-4">
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">E-mail</p>
          <Field label="E-mail de acesso" icon={Mail} value={email} onChange={setEmail} type="email" placeholder="email@exemplo.com" />
        </div>
        <div className="h-px bg-gray-100" />
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Alterar senha</p>
          <div className="space-y-3">
            <Field label="Senha atual" icon={Lock} value={currentPass} onChange={setCurrentPass} type="password" placeholder="Senha atual" />
            <Field label="Nova senha" icon={Lock} value={newPass} onChange={setNewPass} type="password" placeholder="Mínimo 8 caracteres" />
            <Field label="Confirmar nova senha" icon={Lock} value={confirmPass} onChange={setConfirmPass} type="password" placeholder="Repita a nova senha" />
          </div>
          {newPass && confirmPass && newPass !== confirmPass && (
            <p className="text-xs text-red-500 mt-2 px-1">As senhas não coincidem</p>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Settings Screen ───────────────────────────────────────────────
export default function SettingsScreen({ profileData, setProfileData, isPrivate, setIsPrivate, savedPosts = [], toggleSavedPost, onBack }) {
  const [view, setView] = useState(null);

  if (view === 'dados')       return <DadosPessoaisView profileData={profileData} setProfileData={setProfileData} onBack={() => setView(null)} />;
  if (view === 'salvos')      return <SalvosView savedPosts={savedPosts} toggleSavedPost={toggleSavedPost} onBack={() => setView(null)} />;
  if (view === 'privacidade') return <PrivacidadeView isPrivate={isPrivate} setIsPrivate={setIsPrivate} onBack={() => setView(null)} />;
  if (view === 'senha')       return <SenhaView profileData={profileData} setProfileData={setProfileData} onBack={() => setView(null)} />;

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex items-center gap-3 px-4 pt-12 pb-4 border-b border-gray-100">
        <button onClick={onBack}><ArrowLeft size={22} className="text-gray-700" /></button>
        <h2 className="font-bold text-gray-900 text-lg flex-1">Configurações</h2>
      </div>

      <div className="scrollable flex-1 pb-10">
        <div className="flex items-center gap-4 px-4 py-5 border-b border-gray-100">
          <Avatar name={profileData.name} size={56} />
          <div>
            <p className="font-bold text-gray-900">{profileData.name}</p>
            <p className="text-sm text-gray-400">{profileData.username}</p>
          </div>
        </div>

        <div className="pt-3">
          <p className="px-4 pb-1 text-xs font-semibold text-gray-400 uppercase tracking-wide">Conta</p>
          <MenuItem
            icon={User}
            label="Dados pessoais e perfil"
            sublabel="Nome, usuário, cidade, assessoria"
            onClick={() => setView('dados')}
            iconColor="text-primary"
            iconBg="bg-blue-50"
          />
          <MenuItem
            icon={Shield}
            label="Privacidade da conta"
            sublabel={isPrivate ? 'Conta privada' : 'Conta pública'}
            onClick={() => setView('privacidade')}
            iconColor="text-green-600"
            iconBg="bg-green-50"
          />
        </div>

        <div className="pt-3 border-t border-gray-100 mt-2">
          <p className="px-4 pb-1 text-xs font-semibold text-gray-400 uppercase tracking-wide">Conteúdo</p>
          <MenuItem
            icon={Bookmark}
            label="Salvos"
            sublabel="Publicações que você salvou"
            onClick={() => setView('salvos')}
            iconColor="text-purple-600"
            iconBg="bg-purple-50"
          />
        </div>

        <div className="pt-3 border-t border-gray-100 mt-2">
          <p className="px-4 pb-1 text-xs font-semibold text-gray-400 uppercase tracking-wide">Segurança</p>
          <MenuItem
            icon={Lock}
            label="Senha e segurança"
            sublabel="E-mail e senha de acesso"
            onClick={() => setView('senha')}
            iconColor="text-orange-600"
            iconBg="bg-orange-50"
          />
        </div>

        <div className="px-4 pt-6 pb-8 mt-2 border-t border-gray-100">
          <button className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-red-50 border border-red-100 active:bg-red-100 transition-colors">
            <LogOut size={18} className="text-red-500" />
            <span className="font-bold text-sm text-red-500">Sair da conta</span>
          </button>
        </div>
      </div>
    </div>
  );
}
