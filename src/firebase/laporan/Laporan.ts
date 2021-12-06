import {
  getFirestore,
  doc,
  collection,
  getDocs,
  query,
  where,
  setDoc,
  getDoc,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';
import { laporanType } from '../../types/LaporanTypes';
import { db } from '../firebaseConfig';
import { nanoid } from 'nanoid';

/**
 * Create new laporan data
 * @param title
 * @param desc
 * @param location
 * @param damageRate
 * @returns
 */
export const addNewLaporan = async ({
  title,
  desc,
  loc,
  damageRate,
  observationStatus,
  userID,
}: Omit<laporanType, 'id' | 'createdAt'>) => {
  try {
    const uniqueID = nanoid().toString();
    const db = getFirestore();
    const laporanData = await setDoc(doc(db, 'laporans', uniqueID), {
      id: uniqueID,
      title,
      desc,
      loc,
      damageRate,
      observationStatus,
      userID,
      createdAt: Date.now(),
    });

    return laporanData;
  } catch (error) {
    console.error(error);
  }
};

/**
 * Gets all laporan that is associated with this user.
 *
 * @param {string} userId - A user ID
 * @returns All user's laporan
 */
export const getUserLaporan = async (userId: string) => {
  try {
    const laporan: laporanType[] = [];

    const laporanRef = collection(db(), 'laporans');
    const q = query(laporanRef, where('userID', '==', userId));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((s) => laporan.push(s.data() as laporanType));

    return laporan;
  } catch (error) {
    throw new Error('Cannot get user laporan data');
  }
};

/**
 * Get detail laporan data
 * @param {string} laporanId
 * @returns
 */
export const getDetailLaporan = async (laporanId: string) => {
  try {
    const laporanRef = doc(db(), 'laporans', laporanId);
    const laporan = await getDoc(laporanRef);

    return laporan.data() as laporanType;
  } catch (error) {
    throw new Error('Cannot get detail laporan data');
  }
};

/**
 * Get all laporan data for admin
 * @returns All laporan data
 */
export const getAllLaporan = async () => {
  try {
    const laporan: laporanType[] = [];

    const querySnapshot = await getDocs(collection(db(), 'laporans'));

    querySnapshot.forEach((snap) => laporan.push(snap.data() as laporanType));

    return laporan;
  } catch (error) {
    throw new Error('Cannot get all laporan data');
  }
};

/**
 * Delete laporan data
 * @param laporanId
 * @returns empty lapora data
 */
export const deleteLaporanData = async (laporanId: string) => {
  try {
    const laporanRef = doc(db(), 'laporans', laporanId);

    await deleteDoc(laporanRef);
  } catch (error) {
    throw new Error('Data cannot be deleted');
  }
};

/**
 * Update laporan observation status data
 * @param {string} laporanId
 * @returns Updated laporan data
 */
export const updateLaporanObservationStatus = async (
  laporanId: string,
  newObservationStatus: string
) => {
  const laporanRef = doc(db(), 'laporans', laporanId);

  await updateDoc(laporanRef, {
    observationStatus: newObservationStatus,
  });
};
