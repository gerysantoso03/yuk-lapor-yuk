import {
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonFabButton,
} from '@ionic/react';
import { add, person, home } from 'ionicons/icons';
import { Redirect } from 'react-router';
import { useContext } from 'react';

// Import Page
import DetailLaporan from '../../pages/DetailLaporan';
import Home from '../../pages/Home';
import LaporanKu from '../../pages/LaporanKu';
import Profile from '../../pages/Profile';
import TambahLaporan from '../../pages/TambahLaporan';
import ProtectedRoute from '../auth/ProtectedRoute';

import '../../assets/css/UserNavigation.css';
import { AppContext } from '../../context/AppContext';

const UserNavigation = () => {
  const { userIsAdmin } = useContext(AppContext);

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
      <IonTabBar slot="bottom" className="nav-bottom">
        <IonTabButton tab="schedule" href="/user/home">
          <IonIcon color="light" icon={home} />
        </IonTabButton>

        {!userIsAdmin ? (
          <IonTabButton tab="add" href="/user/tambah-laporan">
            <IonFabButton size="small" className="nav-bottom__add">
              <IonIcon icon={add} />
            </IonFabButton>
          </IonTabButton>
        ) : null}

        <IonTabButton tab="profile" href="/user/profile">
          <IonIcon color="light" icon={person} />
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default UserNavigation;
