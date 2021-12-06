import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonLabel,
  IonPage,
  IonRow,
  IonTitle,
} from '@ionic/react';

import '../assets/css/SplashScreen.css';

/* Import Assets */
import splashScreenImage from '../assets/images/splash-screen-logo.png';

const SplashScreen = () => {
  return (
    <IonPage className="splash-screen">
      <IonContent>
        <div className="top-bubble"></div>
        <IonGrid className="splash-screen-logo">
          <IonRow>
            <IonCol className="ion-text-center">
              <img src={splashScreenImage} alt="Splash Screen Logo" />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol className="ion-text-center">
              <IonTitle color="light">Yuk Lapor Yuk</IonTitle>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonGrid className="splash-screen-button">
          <IonRow>
            <IonCol className="ion-text-center">
              <IonButton color="warning" routerLink="/login" className="button__splash">
                <IonLabel className="button-label">Masuk</IonLabel>
              </IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol className="ion-text-center">
              <IonButton
                color="secondary"
                routerLink="/register"
                className="button__splash"
              >
                <IonLabel className="button-label">Daftar</IonLabel>
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonGrid className="splash-screen-footer">
          <IonRow>
            <IonCol className="ion-text-center">
              <IonLabel>Copyright © Kawan PDIP. All Rights Reserved.</IonLabel>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default SplashScreen;
