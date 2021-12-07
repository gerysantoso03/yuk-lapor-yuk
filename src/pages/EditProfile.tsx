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
  useIonToast,
} from '@ionic/react';
import { map } from 'ionicons/icons';
import { useContext, useState } from 'react';

/* Import Assets */
import '../assets/css/Profile.css';
import '../assets/css/EditProfile.css';
import { AppContext } from '../context/AppContext';
import { getUserData, updateUserProfile } from '../firebase/auth/Auth';
import { useHistory } from 'react-router';

const EditProfile = () => {
  const { userIsAdmin, user, setUserData } = useContext(AppContext);

  const [fullname, setFullname] = useState<string>('');
  const [address, setAddress] = useState<string>('');

  const history = useHistory();
  const [present, dismiss] = useIonToast();

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
            <IonCol>
              <IonInput
                name="Fullname"
                placeholder="Fullname"
                type="text"
                className="profile-edit"
                onIonInput={(e: any) => setFullname(e.target.value)}
              ></IonInput>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <div className="input__wrapper">
                <IonInput
                  name="address"
                  placeholder="Location"
                  type="text"
                  className="profile-edit"
                  onIonInput={(e: any) => setAddress(e.target.value)}
                ></IonInput>

                <IonButton slot="start" className="input__button">
                  <IonIcon icon={map} />
                </IonButton>
              </div>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonButton
                onClick={async () => {
                  try {
                    if (!user) {
                      throw new Error('User must be exists on this point ');
                    }

                    // Update user profile data
                    await updateUserProfile(user?.uid, {
                      fullname,
                      address,
                    });

                    // Fetch new user data
                    const data = await getUserData(user.uid);

                    // Set new user data to context
                    setUserData(data);

                    // Set back form to inital value
                    setFullname('');
                    setAddress('');

                    // Success update new user
                    present('Success to update new user', 2000);

                    history.replace('/user/profile');
                  } catch (error) {
                    present('Failed to update user', 2000);
                  }
                }}
                color="warning"
                className="button__orange"
              >
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
