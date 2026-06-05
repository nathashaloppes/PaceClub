import { useState } from 'react';
import { ArrowLeft, User, AtSign, Users, Mail, Lock, Phone, MapPin, Eye, EyeOff } from 'lucide-react';
import Avatar from '../components/Avatar';

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
            {showPass
              ? <EyeOff size={16} className="text-gray-400" />
              : <Eye size={16} className="text-gray-400" />
            }
          </button>
        )}
      </div>
    </div>
  );
}

export default function EditProfileScreen({ profileData, setProfileData, isPrivate, setIsPrivate, onBack }) {
  const [form, setForm] = useState({ ...profileData });

  function update(key, val) {
    setForm(prev => ({ ...prev, [key]: val }));
  }

  function handleSave() {
    setProfileData({ ...form });
    onBack();
  }

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex items-center justify-between px-4 pt-12 pb-4 border-b border-gray-100">
        <button onClick={onBack}>
          <ArrowLeft size={22} className="text-gray-700" />
        </button>
        <span className="font-bold text-gray-900">Editar perfil</span>
        <button onClick={handleSave} className="bg-primary text-white text-sm font-bold px-4 py-2 rounded-full">
          Salvar
        </button>
      </div>

      <div className="scrollable flex-1 p-4 space-y-4">
        <div className="flex flex-col items-center py-2">
          <Avatar name={form.name} size={72} />
          <button className="text-primary text-sm font-semibold mt-2">Trocar foto</button>
        </div>

        <Field label="Nome" icon={User} value={form.name} onChange={v => update('name', v)} placeholder="Seu nome" />
        <Field label="Nome de usuário" icon={AtSign} value={form.username} onChange={v => update('username', v)} placeholder="@usuário" />
        <Field label="Assessoria" icon={Users} value={form.assessoria} onChange={v => update('assessoria', v)} placeholder="Nome da assessoria" />
        <Field label="E-mail" icon={Mail} value={form.email} onChange={v => update('email', v)} type="email" placeholder="email@exemplo.com" />
        <Field label="Senha" icon={Lock} value={form.password} onChange={v => update('password', v)} type="password" placeholder="Nova senha" />
        <Field label="Telefone" icon={Phone} value={form.phone} onChange={v => update('phone', v)} placeholder="(00) 00000-0000" />
        <Field label="Cidade" icon={MapPin} value={form.city} onChange={v => update('city', v)} placeholder="Cidade, Estado" />

        <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-sm text-gray-900">Perfil privado</p>
              <p className="text-xs text-gray-400 mt-0.5">Somente seguidores aprovados verão seu perfil</p>
            </div>
            <button
              onClick={() => setIsPrivate(p => !p)}
              className={`w-12 h-6 rounded-full transition-colors relative flex-shrink-0 ${isPrivate ? 'bg-primary' : 'bg-gray-200'}`}
            >
              <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${isPrivate ? 'translate-x-6' : 'translate-x-0.5'}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
