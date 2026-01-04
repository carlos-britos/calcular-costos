import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const handleLogout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
  }
};

export default handleLogout;