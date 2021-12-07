import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonLabel,
  IonPage,
  IonRow,
  IonToolbar,
  IonIcon,
  IonTitle,
  IonAvatar,
} from '@ionic/react';
import { exit, map, newspaper, pencil } from 'ionicons/icons';
import { useContext } from 'react';
import { logout } from '../firebase/auth/Auth';
import { useHistory } from 'react-router';

/* Import Assets */
import lalisa from '../assets/images/lalisa.png';
import '../assets/css/Profile.css';
import { AppContext } from '../context/AppContext';

const Profile = () => {
  const { userIsAdmin, userData } = useContext(AppContext);
  const history = useHistory();

  return (
    <IonPage className="profile">
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonTitle className="title-toolbar__head ion-text-center">
            {userIsAdmin ? 'Profile Admin' : 'Profile Pelapor'}
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonGrid className="profile__bio">
          <IonRow>
            <IonCol className="profile__image">
              <IonAvatar className="profile__avatar">
                <img src={lalisa} alt="Profile" />
              </IonAvatar>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol className="ion-text-center profile__address">
              <p>{userData?.fullname}</p>
              <p>
                <IonIcon icon={map} /> {userData?.address}
              </p>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="12" className="col__button">
              <IonButton
                className="button__orange"
                color="warning"
                onClick={() => {
                  history.push('/user/editprofile');
                }}
              >
                <IonIcon
                  slot="icon-only"
                  icon={pencil}
                  className="button__orange-icon"
                />
                <IonLabel>Edit Profile</IonLabel>
              </IonButton>
            </IonCol>
          </IonRow>

          <IonRow>
            {!userIsAdmin && (
              <IonCol size="12" className="col__button">
                <IonButton color="warning" className="button__orange">
                  <IonIcon
                    slot="icon-only"
                    icon={newspaper}
                    className="button__orange-icon"
                  />
                  <IonLabel
                    onClick={() => {
                      history.replace('/user/laporanku');
                    }}
                    className="button__orange-label"
                  >
                    Lihat Laporan Saya
                  </IonLabel>
                </IonButton>
              </IonCol>
            )}
          </IonRow>
          <IonRow>
            <IonCol size="12" className="col__button">
              <IonButton
                color="danger"
                className="button__orange"
                onClick={() => {
                  logout();
                  history.replace('/login');
                }}
              >
                <IonIcon
                  slot="icon-only"
                  icon={exit}
                  className="button__orange-icon"
                />
                <IonLabel className="button__orange-label">Logout</IonLabel>
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
