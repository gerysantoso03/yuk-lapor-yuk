import {
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonFabButton,
  useIonActionSheet,
} from '@ionic/react';
import { add, person, home, homeOutline, list, document } from 'ionicons/icons';
import { Redirect, useHistory } from 'react-router';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

// Import Page
import DetailLaporan from '../../pages/DetailLaporan';
import Home from '../../pages/Home';
import LaporanKu from '../../pages/LaporanKu';
import Profile from '../../pages/Profile';
import TambahLaporan from '../../pages/TambahLaporan';
import ProtectedRoute from '../auth/ProtectedRoute';

import '../../assets/css/UserNavigation.css';

const UserNavigation = () => {
  const { userIsAdmin } = useContext(AppContext);

  const history = useHistory();
  const [present, dismiss] = useIonActionSheet();

  return (
    <IonTabs>
      <IonRouterOutlet>
        <ProtectedRoute exact path="/user/home" component={Home} />
        <ProtectedRoute exact path="/user/laporanku" component={LaporanKu} />
        <ProtectedRoute
          exact
          path="/user/laporanku/:laporanId"
          component={DetailLaporan}
        />
        <ProtectedRoute exact path="/user/profile" component={Profile} />
        <ProtectedRoute
          exact
          path="/user/tambah-laporan"
          component={TambahLaporan}
        />
        <Redirect exact from="/user" to="/user/home" />
      </IonRouterOutlet>
      {userIsAdmin ? (
        <IonTabBar slot="bottom" className="nav-bottom">
          <IonTabButton tab="home" href="/user/home">
            <IonIcon color="light" icon={home} />
          </IonTabButton>

          <IonTabButton tab="profile" href="/user/profile">
            <IonIcon color="light" icon={person} />
          </IonTabButton>
        </IonTabBar>
      ) : (
        <IonTabBar slot="bottom" className="nav-bottom">
          <IonTabButton tab="list">
            <IonIcon
              onClick={() => {
                present({
                  header: 'Daftar Menu',
                  buttons: [
                    {
                      text: 'Beranda',
                      icon: homeOutline,
                      handler: () => {
                        history.replace('/user/home');
                      },
                    },
                    {
                      text: 'Laporan Saya',
                      icon: document,
                      handler: () => {
                        history.replace('/user/laporanku');
                      },
                    },
                  ],
                });
              }}
              color="light"
              icon={list}
            />
          </IonTabButton>

          <IonTabButton tab="add" href="/user/tambah-laporan">
            <IonFabButton size="small" className="nav-bottom__add">
              <IonIcon icon={add} />
            </IonFabButton>
          </IonTabButton>

          <IonTabButton tab="profile" href="/user/profile">
            <IonIcon color="light" icon={person} />
          </IonTabButton>
        </IonTabBar>
      )}
    </IonTabs>
  );
};

export default UserNavigation;
