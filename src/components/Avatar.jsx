const GRADIENTS = [
  'linear-gradient(135deg, #667eea, #764ba2)',
  'linear-gradient(135deg, #f093fb, #f5576c)',
  'linear-gradient(135deg, #4facfe, #00f2fe)',
  'linear-gradient(135deg, #43e97b, #38f9d7)',
  'linear-gradient(135deg, #fa709a, #fee140)',
  'linear-gradient(135deg, #a18cd1, #fbc2eb)',
  'linear-gradient(135deg, #fccb90, #d57eeb)',
];

function getInitials(name) {
  return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
}

function getGradient(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash += name.charCodeAt(i);
  return GRADIENTS[hash % GRADIENTS.length];
}

export default function Avatar({ name = 'U', size = 40, className = '', ring = false }) {
  const initials = getInitials(name);
  const gradient = getGradient(name);

  return (
    <div
      className={`rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0 ${ring ? 'ring-2 ring-white' : ''} ${className}`}
      style={{
        width: size,
        height: size,
        background: gradient,
        fontSize: size * 0.35,
      }}
    >
      {initials}
    </div>
  );
}
