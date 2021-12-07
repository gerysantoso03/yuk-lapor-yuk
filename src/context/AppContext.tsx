import { getAuth, User } from 'firebase/auth';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { getUserData } from '../firebase/auth/Auth';
import { app } from '../firebase/firebaseConfig';
import { laporanType } from '../types/LaporanTypes';
import { userType } from '../types/UserTypes';

export const AppContext = createContext<{
  user: User | null;
  userIsAdmin: boolean;
  userData: userType | null;
  laporan: laporanType[];
  setUser: Dispatch<SetStateAction<User | null>>;
  setIsUserAdmin: Dispatch<SetStateAction<boolean>>;
  setUserData: Dispatch<SetStateAction<userType | null>>;
  setLaporan: Dispatch<SetStateAction<laporanType[] | []>>;
}>({
  user: null,
  userIsAdmin: false,
  userData: null,
  laporan: [],
  setUser: () => {},
  setIsUserAdmin: () => {},
  setUserData: () => {},
  setLaporan: () => {},
});

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null as User | null);
  const [userData, setUserData] = useState(null as userType | null);
  const [userIsAdmin, setIsUserAdmin] = useState(false);
  const [laporan, setLaporan] = useState<laporanType[]>([]);

  useEffect(() => {
    getAuth(app()).onAuthStateChanged(async (user) => {
      if (user) {
        const data = await getUserData(user.uid);

        console.log('App Context working, current user is', user.uid);

        setUser(user);
        setIsUserAdmin(data.isAdmin);
        setUserData(data);
      } else {
        console.log('App Context working, user is now null');
        setUser(null);
        setIsUserAdmin(false);
        setUserData(null);
      }
    });
  }, []);

  return (
    <AppContext.Provider
      value={{
        laporan,
        setLaporan,
        user,
        setUser,
        userIsAdmin,
        setIsUserAdmin,
        userData,
        setUserData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
