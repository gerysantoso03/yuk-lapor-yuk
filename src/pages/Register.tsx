import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonLabel,
  IonPage,
  IonRow,
  IonToolbar,
  IonIcon,
  IonText,
  IonButtons,
  IonBackButton,
  useIonToast,
} from '@ionic/react';
import { map } from 'ionicons/icons';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { registerUser } from '../firebase/auth/Auth';

// Import Styles
import '../assets/css/Register.css';

const Register = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [fullname, setFullname] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const h = useHistory();

  const [present, dismiss] = useIonToast();

  return (
    <IonPage className="register">
      <IonContent>
        <div className="top-bubble"></div>
        <IonHeader className="ion-no-border ion-padding-horizontal login__header">
          <IonToolbar color="clear">
            <IonButtons slot="start">
              <IonBackButton />
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <IonGrid className="register-title">
          <IonRow>
            <IonCol className="ion-text-left">
              <IonText color="light">
                <h2 className="register__title-text">
                  Belum punya akun?
                  <br />
                  Daftar dulu yuk
                </h2>
              </IonText>
            </IonCol>
          </IonRow>
        </IonGrid>

        <IonGrid className="register-container">
          <IonRow class="ion-align-items-center ion-justify-content-center">
            <IonCol size="12">
              <IonInput
                name="Username"
                placeholder="Username"
                type="text"
                className="register-input"
                onIonInput={(e: any) => setEmail(e.target.value)}
              ></IonInput>
              <IonInput
                name="Password"
                placeholder="Password"
                type="password"
                className="register-input"
                onIonInput={(e: any) => setPassword(e.target.value)}
              ></IonInput>
              <IonInput
                name="name"
                placeholder="Nama Lengkap"
                type="text"
                className="register-input"
                onIonInput={(e: any) => setFullname(e.target.value)}
              ></IonInput>

              <div className="input__wrapper">
                <IonInput
                  name="address"
                  placeholder="Alamat"
                  type="text"
                  className="register-input"
                  onIonInput={(e: any) => setAddress(e.target.value)}
                ></IonInput>

                <IonButton slot="start" className="input__button">
                  <IonIcon icon={map} />
                </IonButton>
              </div>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol className="register-button" size="12">
              <IonButton
                color="warning"
                className="button__register"
                onClick={async () => {
                  try {
                    // Regist new user data
                    await registerUser({
                      email,
                      password,
                      fullname,
                      address,
                      isAdmin,
                    });

                    present('Success to regist new user', 2000);

                    h.replace('login');
                  } catch (error) {
                    present('Failed to regist new user', 2000);
                  }
                }}
              >
                <IonLabel className="button-label">Register</IonLabel>
              </IonButton>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol className="ion-text-center">
              <IonLabel className="register__link">
                Sudah punya akun? <a href="/login">Masuk</a>
              </IonLabel>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Register;
