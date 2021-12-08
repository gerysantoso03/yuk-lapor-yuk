import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonLabel,
  IonPage,
  IonRow,
  IonText,
  IonToolbar,
  useIonToast,
} from '@ionic/react';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { loginUser } from '../firebase/auth/Auth';

// Import Assets
import '../assets/css/Login.css';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const history = useHistory();
  const [present, dismiss] = useIonToast();

  return (
    <IonPage className="login">
      <IonContent>
        <div className="top-bubble"></div>
        <IonHeader className="ion-no-border ion-padding-horizontal login__header">
          <IonToolbar color="clear">
            <IonButtons slot="start">
              <IonBackButton />
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <IonGrid className="login-title">
          <IonRow>
            <IonCol className="ion-text-left">
              <IonText color="light">
                <h3>
                  Halo, mau lapor?
                  <br />
                  Login dulu yuk!
                </h3>
              </IonText>
            </IonCol>
          </IonRow>
        </IonGrid>

        <IonGrid className="login-container">
          <IonRow className="ion-align-items-center ion-justify-content-center">
            <IonCol size="12">
              <IonInput
                name="Email"
                placeholder="Email"
                type="text"
                className="login-input"
                value={email}
                onIonInput={(e: any) => setEmail(e.target.value)}
              ></IonInput>
              <IonInput
                name="Password"
                placeholder="Password"
                type="password"
                className="login-input"
                value={password}
                onIonInput={(e: any) => setPassword(e.target.value)}
              ></IonInput>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol className="login-button">
              <IonButton
                onClick={async () => {
                  try {
                    // Validate input
                    if (email === '') {
                      throw new Error('Email must not be empty !!');
                    }

                    if (password === '') {
                      throw new Error('Password must not be empty !!');
                    }

                    // Login to firebase authentication
                    const loggedUserId = await loginUser({ email, password });

                    if (loggedUserId) {
                      // Set success toast
                      present('Login success !!', 2000);

                      // Back to home page
                      history.replace('/user/home');
                    } else {
                      // Set failed login toast
                      present('Invalid email or password', 2000);
                    }
                  } catch (error) {
                    // Set failed toast
                    present(`${error}`, 2000);
                  }
                }}
                color="warning"
                className="button__login"
              >
                <IonLabel className="button-label">Masuk</IonLabel>
              </IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol className="ion-text-center">
              <IonLabel className="login__link">
                Belum punya akun? <a href="/register">Daftar di sini</a>
              </IonLabel>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Login;
