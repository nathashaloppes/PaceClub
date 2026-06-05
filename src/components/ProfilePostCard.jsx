import { useState } from 'react';
import { Heart, MessageCircle, MapPin, Image, MoreHorizontal, Edit2, Trash2, UserCheck, Bookmark } from 'lucide-react';
import Avatar from './Avatar';

function WorkoutContent({ post }) {
  return (
    <>
      <div className="mx-4 mb-3 rounded-2xl overflow-hidden">
        <div className="h-40 relative map-bg">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <div className="flex items-end justify-between text-white">
              <div>
                <span className="text-2xl font-bold">{post.distance}</span>
                <span className="text-xs ml-1 opacity-80">km</span>
              </div>
              <div className="text-right">
                <p className="text-base font-bold">{post.duration}</p>
                <p className="text-xs opacity-80">Ritmo {post.pace}</p>
              </div>
            </div>
          </div>
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
      <div className="mx-4 mb-3 bg-gray-100 rounded-2xl overflow-hidden h-44 flex items-center justify-center">
        <div className="text-center">
          <Image size={32} className="text-gray-300 mx-auto mb-1" />
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

function ThoughtContent({ post }) {
  return (
    <div className="px-4 mb-4">
      <p className="text-base font-medium text-gray-800 leading-relaxed">{post.text}</p>
    </div>
  );
}

export default function ProfilePostCard({
  post,
  userName,
  isOwn = false,
  onEdit,
  onDelete,
  onAddParticipants,
  isSaved = false,
  onToggleSave,
}) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes);
  const [showMenu, setShowMenu] = useState(false);
  const name = userName || (post.user && post.user.name) || '';

  return (
    <div className="bg-white border-b border-gray-100">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <Avatar name={name} size={38} />
          <div>
            <p className="font-semibold text-sm text-gray-900">{name}</p>
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

        {isOwn && (
          <div className="relative">
            <button onClick={() => setShowMenu(m => !m)} className="p-1">
              <MoreHorizontal size={20} className="text-gray-400" />
            </button>
            {showMenu && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setShowMenu(false)} />
                <div className="absolute right-0 top-8 z-40 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden w-52">
                  <button
                    onClick={() => { onEdit?.(post); setShowMenu(false); }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left border-b border-gray-50 active:bg-gray-50"
                  >
                    <Edit2 size={15} className="text-primary flex-shrink-0" />
                    <span className="text-sm font-medium text-gray-700">Editar</span>
                  </button>
                  <button
                    onClick={() => { onAddParticipants?.(post); setShowMenu(false); }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left border-b border-gray-50 active:bg-gray-50"
                  >
                    <UserCheck size={15} className="text-green-600 flex-shrink-0" />
                    <span className="text-sm font-medium text-gray-700">Add participantes</span>
                  </button>
                  <button
                    onClick={() => { onDelete?.(post.id); setShowMenu(false); }}
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
      {post.type === 'thought' && <ThoughtContent post={post} />}

      <div className="flex items-center justify-between px-4 pb-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => { setLiked(l => !l); setLikes(n => liked ? n - 1 : n + 1); }}
            className="flex items-center gap-1.5"
          >
            <Heart size={20} className={liked ? 'text-red-500 fill-red-500' : 'text-gray-400'} />
            <span className="text-sm font-medium text-gray-600">{likes}</span>
          </button>
          <div className="flex items-center gap-1.5">
            <MessageCircle size={20} className="text-gray-400" />
            <span className="text-sm font-medium text-gray-600">{post.comments}</span>
          </div>
        </div>
        {onToggleSave && (
          <button onClick={() => onToggleSave(post)}>
            <Bookmark size={20} className={isSaved ? 'text-primary fill-primary' : 'text-gray-400'} />
          </button>
        )}
      </div>
    </div>
  );
}
