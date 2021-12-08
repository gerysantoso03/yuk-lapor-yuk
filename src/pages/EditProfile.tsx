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
                    // Validate input
                    if (fullname === '') {
                      throw new Error('Fullname must not be empty !!');
                    }
                    if (address === '') {
                      throw new Error('Address must not be empty !!');
                    }

                    // Check if user is exists or not
                    if (!user) {
                      throw new Error('User must be exists at this point ');
                    }

                    // Update user profile data
                    const successUpdate = await updateUserProfile(user?.uid, {
                      fullname,
                      address,
                    });

                    if (successUpdate) {
                      // Fetch new user data
                      const data = await getUserData(user.uid);

                      // Set new user data to context
                      setUserData(data);

                      // Success update new user
                      present('Success to update new user', 2000);

                      // Back to profile page
                      history.replace('/user/profile');
                    } else {
                      // Make failed toast
                      present('Failed to update user data !!', 2000);
                    }
                  } catch (error) {
                    present(`${error}`, 2000);
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
