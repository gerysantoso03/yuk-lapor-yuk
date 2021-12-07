import {
  IonBackButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/react';
import '../assets/css/LaporanKu.css';
import Jalan from '../assets/images/Jalan.jpeg';
import { location } from 'ionicons/icons';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { getUserLaporan } from '../firebase/laporan/Laporan';
import { laporanType } from '../types/LaporanTypes';
import { useHistory } from 'react-router';

const LaporanKu = () => {
  const { user, laporan } = useContext(AppContext);
  const [userLaporan, setUserLaporan] = useState<laporanType[]>(laporan);

  const history = useHistory();

  useEffect(() => {
    if (user) {
      getUserLaporan(user.uid).then((res) =>
        setUserLaporan(res as laporanType[])
      );
    }
  }, [user, laporan]);

  return (
    <IonPage className="porku">
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle className="title-toolbar__head ion-text-center">
            Laporan Saya
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            <IonCol>
              {userLaporan.map((laporan) => (
                <IonCard
                  className="porku__card"
                  key={laporan.id}
                  onClick={() => {
                    history.push(`/user/laporanku/${laporan.id}`);
                  }}
                >
                  <IonLabel className="dilaporkan">DILAPORKAN</IonLabel>
                  <IonImg src={Jalan} />
                  <IonCardHeader>
                    <IonCardTitle>{laporan.title}</IonCardTitle>
                    <IonCardSubtitle>
                      Tingkat Kerusakan : {laporan.damageRate}
                    </IonCardSubtitle>
                  </IonCardHeader>
                  <IonCardContent className="porku-content__container">
                    <IonIcon icon={location} className="porku__icon" />
                    <p className="porku__address">{laporan.loc}</p>
                  </IonCardContent>
                </IonCard>
              ))}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default LaporanKu;
