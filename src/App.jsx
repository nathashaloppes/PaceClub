import { useState } from 'react';
import BottomNav from './components/BottomNav';
import HomeScreen from './screens/HomeScreen';
import RankingsScreen from './screens/RankingsScreen';
import RunScreen from './screens/RunScreen';
import CommunityScreen from './screens/CommunityScreen';
import ProfileScreen from './screens/ProfileScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import ThirdPartyProfileScreen from './screens/ThirdPartyProfileScreen';
import SettingsScreen from './screens/SettingsScreen';
import { currentUser, initialNotifications, initialCommitments } from './data/mockData';

const SCREENS = {
  home: HomeScreen,
  rankings: RankingsScreen,
  run: RunScreen,
  community: CommunityScreen,
  profile: ProfileScreen,
};

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [navStack, setNavStack] = useState([]);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [commitments, setCommitments] = useState(initialCommitments);
  const [profileData, setProfileData] = useState({
    name: currentUser.name,
    username: currentUser.username,
    assessoria: currentUser.assessoria,
    email: 'nathasha@email.com',
    phone: '(85) 99999-0000',
    city: 'Fortaleza, CE',
    password: '',
  });
  const [isPrivate, setIsPrivate] = useState(false);
  const [savedPosts, setSavedPosts] = useState([]);

  function toggleSavedPost(post) {
    setSavedPosts(prev => {
      const exists = prev.some(p => p.id === post.id);
      return exists ? prev.filter(p => p.id !== post.id) : [post, ...prev];
    });
  }

  function navigate(type, params = {}) {
    setNavStack(prev => [...prev, { type, params }]);
  }

  function goBack() {
    setNavStack(prev => prev.slice(0, -1));
  }

  function addNotification(notif) {
    setNotifications(prev => [{ id: Date.now(), read: false, ...notif }, ...prev]);
  }

  function addCommitment(commitment) {
    setCommitments(prev => [...prev, { id: Date.now(), ...commitment }]);
  }

  const unreadCount = notifications.filter(n => !n.read).length;

  const Screen = SCREENS[activeTab] || HomeScreen;

  const topNav = navStack[navStack.length - 1] || null;

  const sharedProps = {
    navigate,
    unreadCount,
    notifications,
    setNotifications,
    commitments,
    setCommitments,
    addNotification,
    addCommitment,
    profileData,
    setProfileData,
    isPrivate,
    setIsPrivate,
    savedPosts,
    toggleSavedPost,
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex-1 overflow-hidden relative">
        <Screen {...sharedProps} />

        {topNav?.type === 'notifications' && (
          <div className="absolute inset-0 z-50">
            <NotificationsScreen
              notifications={notifications}
              setNotifications={setNotifications}
              addCommitment={addCommitment}
              commitments={commitments}
              setCommitments={setCommitments}
              navigate={navigate}
              onBack={goBack}
            />
          </div>
        )}

        {topNav?.type === 'thirdPartyProfile' && (
          <div className="absolute inset-0 z-50">
            <ThirdPartyProfileScreen
              user={topNav.params.user}
              addNotification={addNotification}
              addCommitment={addCommitment}
              navigate={navigate}
              onBack={goBack}
            />
          </div>
        )}

        {topNav?.type === 'settings' && (
          <div className="absolute inset-0 z-50">
            <SettingsScreen
              profileData={profileData}
              setProfileData={setProfileData}
              isPrivate={isPrivate}
              setIsPrivate={setIsPrivate}
              savedPosts={savedPosts}
              toggleSavedPost={toggleSavedPost}
              onBack={goBack}
            />
          </div>
        )}
      </div>

      <BottomNav
        active={activeTab}
        onChange={tab => { setNavStack([]); setActiveTab(tab); }}
      />
    </div>
  );
}
