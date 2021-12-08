import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';
import { getStorage } from '@firebase/storage';

const config = {
  apiKey: 'AIzaSyB3c-kYK7XOx4kiD02-mhAnGUO-EhGovdA',
  authDomain: 'yuk-lapor-68add.firebaseapp.com',
  projectId: 'yuk-lapor-68add',
  storageBucket: 'yuk-lapor-68add.appspot.com',
  messagingSenderId: '722016057080',
  appId: '1:722016057080:web:4340cb4791280aa0686d0d',
  databaseURL:
    'https://yuk-lapor-68add-default-rtdb.asia-southeast1.firebasedatabase.app/',
};

export const app = () => initializeApp(config);
export const db = () => getFirestore(app());
export const storage = () => getStorage(app(), 'yuk-lapor-68add.appspot.com');
