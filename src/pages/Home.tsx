import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonLabel,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  IonItem,
  IonList,
  useIonPopover,
} from '@ionic/react';
import '../assets/css/Home.css';
import Jalan from '../assets/images/Jalan.jpeg';
import { location, options } from 'ionicons/icons';
import { useContext, useEffect, useState } from 'react';
import { laporanType } from '../types/LaporanTypes';
import { useHistory } from 'react-router';
import { AppContext } from '../context/AppContext';
import { getAllLaporan, getUserLaporan } from '../firebase/laporan/Laporan';

const PopoverList = () => {
  return (
    <IonList className="pop">
      <IonTitle className="pop__title">Filter</IonTitle>

      <p>Tingkat Kerusakan</p>
      <div className="pop__container">
        <IonItem
          button
          lines="none"
          className="pop__button pop__button--active"
        >
          Rusak Ringan
        </IonItem>
        <IonItem button lines="none" className="pop__button">
          Rusak Sedang
        </IonItem>
        <IonItem button lines="none" className="pop__button">
          Rusak Parah
        </IonItem>
      </div>

      <p>Status TKP</p>
      <div className="pop__container">
        <IonItem
          button
          lines="none"
          className="pop__button pop__button--active"
        >
          Tahap Observasi
        </IonItem>
        <IonItem button lines="none" className="pop__button">
          Tahap Perbaiki
        </IonItem>
        <IonItem button lines="none" className="pop__button">
          Selesai Diperbaiki
        </IonItem>
      </div>
    </IonList>
  );
};
// { laporan = [] }: { laporan: laporanType[] }
const Home = () => {
  const [userLaporan, setUserLaporan] = useState<laporanType[]>([]);
  const { user, userIsAdmin, laporan } = useContext(AppContext);
  const history = useHistory();

  const [present, dismiss] = useIonPopover(PopoverList, {
    onHide: () => dismiss(),
  });

  useEffect(() => {
    getAllLaporan().then((res) => setUserLaporan(res));
  }, [user, laporan]);

  return (
    <IonPage className="home">
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonTitle className="title-toolbar__head ion-text-center">
            Beranda
          </IonTitle>
        </IonToolbar>
        {userIsAdmin && (
          <IonToolbar>
            <IonGrid>
              <IonRow>
                <IonCol>
                  <IonButtons>
                    <IonButton
                      color="primary"
                      expand="block"
                      fill="outline"
                      shape="round"
                      className="button__orange"
                      onClick={(e) =>
                        present({
                          event: e.nativeEvent,
                        })
                      }
                    >
                      <IonIcon icon={options} />
                      <IonLabel color="primary" className="button-label">
                        Filter
                      </IonLabel>
                    </IonButton>
                  </IonButtons>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonToolbar>
        )}
      </IonHeader>

      <IonContent fullscreen>
        <IonGrid>
          {userLaporan.map((laporanData) => (
            <IonRow
              key={laporanData.id}
              onClick={() => {
                history.push(`/user/laporanku/${laporanData.id}`);
              }}
            >
              <IonCol>
                <IonCard className="home__card">
                  <IonLabel className="dilaporkan">DILAPORKAN</IonLabel>
                  <IonImg src={Jalan} />

                  <IonCardHeader>
                    <IonCardTitle>{laporanData.title}</IonCardTitle>
                    <IonCardSubtitle>
                      Tingkat Kerusakan : {laporanData.damageRate}
                    </IonCardSubtitle>
                  </IonCardHeader>

                  <IonCardContent className="home-content__container">
                    <IonIcon icon={location} className="home__icon" />
                    <p className="home__address">{laporanData.loc}</p>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          ))}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
