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
  IonInput,
  IonBackButton,
  IonButtons,
} from '@ionic/react';
import { exit, map, newspaper } from 'ionicons/icons';
import { useContext } from 'react';
import { logout } from '../firebase/auth/Auth';
import { useHistory } from 'react-router';

/* Import Assets */
import lalisa from '../assets/images/lalisa.png';
import '../assets/css/Profile.css';
import '../assets/css/EditProfile.css';
import { AppContext } from '../context/AppContext';

const EditProfile = () => {
  const { userIsAdmin, userData } = useContext(AppContext);
  const history = useHistory();

  return (
    <IonPage className="profile">
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
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

          <IonInput
            name="Username"
            placeholder="Email"
            type="text"
            className="profile-edit"
          ></IonInput>
          <IonInput
            name="name"
            placeholder={userData?.fullname}
            type="text"
            className="profile-edit"
          ></IonInput>

          <div className="input__wrapper">
            <IonInput
              name="address"
              placeholder={userData?.address}
              type="text"
              className="profile-edit"
            ></IonInput>

            <IonButton slot="start" className="input__button">
              <IonIcon icon={map} />
            </IonButton>
          </div>

          <IonRow>
            <IonCol>
              <IonButton color="warning" className="button__orange">
                <IonLabel className="button__orange-label">Simpan</IonLabel>
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default EditProfile;
