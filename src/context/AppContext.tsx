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
import { userType } from '../types/UserTypes';

export const AppContext = createContext<{
  user: User | null;
  userIsAdmin: boolean;
  userData: userType | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  setIsUserAdmin: Dispatch<SetStateAction<boolean>>;
  setUserData: Dispatch<SetStateAction<userType | null>>;
}>({
  user: null,
  userIsAdmin: false,
  userData: null,
  setUser: () => {},
  setIsUserAdmin: () => {},
  setUserData: () => {},
});

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null as User | null);
  const [userData, setUserData] = useState(null as userType | null);
  const [userIsAdmin, setIsUserAdmin] = useState(false);

  useEffect(() => {
    getAuth(app()).onAuthStateChanged(async (user) => {
      if (user) {
        const data = await getUserData(user.uid);

        console.log('App Context working, current user is', user);

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
