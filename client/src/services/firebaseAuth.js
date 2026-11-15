/**
 * firebaseAuth.js
 * Official Firebase Authentication Service for Lingo555.
 * Enables 1-click Google & Facebook Sign-In / Registration Popups.
 */

export const firebaseConfig = {
  apiKey: "AIzaSyD7S-MSbrQLzvfgh0PPgyNtZzDpYntIF0k",
  authDomain: "dangnam-tuvi.firebaseapp.com",
  projectId: "dangnam-tuvi",
  storageBucket: "dangnam-tuvi.firebasestorage.app",
  messagingSenderId: "183878060405",
  appId: "1:183878060405:web:c40387b975b1bf077d2b3c"
};

let isInitialized = false;

export const getFirebaseAuth = () => {
  if (typeof window === 'undefined' || !window.firebase) {
    throw new Error('Firebase SDK chưa được tải trên trình duyệt.');
  }

  if (!isInitialized) {
    if (!window.firebase.apps || !window.firebase.apps.length) {
      window.firebase.initializeApp(firebaseConfig);
    }
    isInitialized = true;
  }

  return window.firebase.auth();
};

/**
 * Trigger Real Google Sign-In / Registration Popup
 */
export const signInWithGoogle = async () => {
  const auth = getFirebaseAuth();
  auth.useDeviceLanguage();
  const provider = new window.firebase.auth.GoogleAuthProvider();
  provider.addScope('email');
  provider.addScope('profile');
  
  const result = await auth.signInWithPopup(provider);
  const fbUser = result.user;
  const idToken = await fbUser.getIdToken();

  return {
    uid: fbUser.uid,
    email: fbUser.email,
    displayName: fbUser.displayName || 'Học viên Google',
    photoURL: fbUser.photoURL || '🦉',
    idToken
  };
};

/**
 * Trigger Real Facebook Sign-In / Registration Popup
 */
export const signInWithFacebook = async () => {
  const auth = getFirebaseAuth();
  auth.useDeviceLanguage();
  const provider = new window.firebase.auth.FacebookAuthProvider();
  provider.addScope('email');
  provider.addScope('public_profile');

  const result = await auth.signInWithPopup(provider);
  const fbUser = result.user;
  const idToken = await fbUser.getIdToken();

  return {
    uid: fbUser.uid,
    email: fbUser.email || `fb_${fbUser.uid}@facebook.lingo555.com`,
    displayName: fbUser.displayName || 'Học viên Facebook',
    photoURL: fbUser.photoURL || '🐼',
    idToken
  };
};
