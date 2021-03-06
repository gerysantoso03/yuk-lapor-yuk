import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { setDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { app, db } from '../firebaseConfig';
import { loginType, registerType } from '../../types/AuthTypes';
import { userType } from '../../types/UserTypes';
import { laporanType } from '../../types/LaporanTypes';

export const loginUser = async ({ email, password }: loginType) => {
  try {
    const auth = getAuth(app());
    const res = await signInWithEmailAndPassword(auth, email, password);

    return res.user.uid;
  } catch (error) {
    console.log(error);
  }
};

export const logout = () => {
  const auth = getAuth(app());
  auth
    .signOut()
    .then(() => console.log('Berhasil Logout'))
    .catch((err) => console.log(err));
};

export const registerUser = async ({
  email,
  password,
  fullname,
  address,
  urlImage,
  isAdmin,
}: Omit<registerType, 'userId'>) => {
  try {
    const auth = getAuth(app());
    const res = await createUserWithEmailAndPassword(auth, email, password);

    if (res) {
      const data = await setDoc(doc(db(), 'users', res.user.uid), {
        userId: res.user.uid,
        fullname: fullname,
        address: address,
        urlImage: urlImage,
        isAdmin: isAdmin,
      });
    }

    return res.user.uid;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Get current logged user data
 * @param {string} userId
 * @returns Current logged user data
 */

export const getUserData = async (userId: string) => {
  try {
    // Get current logged user data
    const userRef = doc(db(), 'users', userId);
    const userData = await getDoc(userRef);

    // Return logged user data
    return userData.data() as userType;
  } catch (error) {
    throw new Error('Cannot get current logged user data');
  }
};

/**
 * Get user which corresponden with laporan data
 * @param {string} laporanId
 * @return Corresponden user data
 */
export const getCorrespondenUser = async (laporanId: string) => {
  try {
    // Get current laporan data
    const laporanRef = doc(db(), 'laporans', laporanId);

    const laporanResponse = await getDoc(laporanRef);

    const laporanData = laporanResponse.data() as laporanType;

    // Get user data which correspond with laporan data
    const userRef = doc(db(), 'users', laporanData.userID);

    const userData = await getDoc(userRef);

    return userData.data() as userType;
  } catch (error) {
    throw new Error('Cannot get correspond user');
  }
};

/**
 * Update user profile data
 * @param {string} userId
 * @returns Updated user data
 */
export const updateUserProfile = async (
  userId: string,
  { fullname, address }: { fullname: string; address: string }
) => {
  try {
    const userRef = doc(db(), 'users', userId);

    await updateDoc(userRef, {
      fullname,
      address,
    });

    return true;
  } catch (error) {
    throw new Error('Cant update user data!');
  }
};
