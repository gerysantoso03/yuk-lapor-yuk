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
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { laporanType } from '../types/LaporanTypes';
import { useHistory } from 'react-router';
import { AppContext } from '../context/AppContext';
import { getAllLaporan } from '../firebase/laporan/Laporan';

type kerusakanType = 'Ringan' | 'Sedang' | 'Berat' | null;
type observasiType = 'Observasi' | 'Perbaiki' | 'Selesai' | null;

const PopoverList = ({
  setKerusakan,
  setObservasi,
}: {
  setObservasi: Dispatch<SetStateAction<observasiType>>;
  setKerusakan: Dispatch<SetStateAction<kerusakanType>>;
}) => {
  const [tingRus, setTingRus] = useState(0);
  const [statTKP, setStatTKP] = useState(0);

  const resetButton = () => {
    setTingRus(0);
    setStatTKP(0);
  };

  const toggleTingRus = (index: number) => {
    setTingRus(index);
  };

  const toggleStatTKP = (index: number) => {
    setStatTKP(index);
  };

  return (
    <IonList className="pop">
      <div className="pop__reset">
        <IonTitle className="pop__title">Filter</IonTitle>
        <IonButton className="pop__button-reset" onClick={resetButton}>
          Reset
        </IonButton>
      </div>
      <p>Tingkat Kerusakan</p>
      <div className="pop__container">
        <IonItem
          button
          lines="none"
          className={
            tingRus === 1 ? 'pop__button pop__button--active' : 'pop__button'
          }
          onClick={() => {
            toggleTingRus(1);
            setKerusakan('Ringan');
          }}
        >
          Rusak Ringan
        </IonItem>
        <IonItem
          button
          lines="none"
          className={
            tingRus === 2 ? 'pop__button pop__button--active' : 'pop__button'
          }
          onClick={() => {
            toggleTingRus(2);
            setKerusakan('Sedang');
          }}
        >
          Rusak Sedang
        </IonItem>
        <IonItem
          button
          lines="none"
          className={
            tingRus === 3 ? 'pop__button pop__button--active' : 'pop__button'
          }
          onClick={() => {
            toggleTingRus(3);
            setKerusakan('Berat');
          }}
        >
          Rusak Parah
        </IonItem>
      </div>

      <p>Status TKP</p>
      <div className="pop__container">
        <IonItem
          button
          lines="none"
          className={
            statTKP === 1 ? 'pop__button pop__button--active' : 'pop__button'
          }
          onClick={() => {
            toggleStatTKP(1);
            setObservasi('Observasi');
          }}
        >
          Tahap Observasi
        </IonItem>
        <IonItem
          button
          lines="none"
          className={
            statTKP === 2 ? 'pop__button pop__button--active' : 'pop__button'
          }
          onClick={() => {
            toggleStatTKP(2);
            setObservasi('Perbaiki');
          }}
        >
          Tahap Perbaiki
        </IonItem>
        <IonItem
          button
          lines="none"
          className={
            statTKP === 3 ? 'pop__button pop__button--active' : 'pop__button'
          }
          onClick={() => {
            toggleStatTKP(3);
            setObservasi('Selesai');
          }}
        >
          Selesai Diperbaiki
        </IonItem>
      </div>
    </IonList>
  );
};

const Home = () => {
  const [userLaporan, setUserLaporan] = useState<laporanType[]>([]);

  const [kerusakan, setKerusakan] = useState<kerusakanType>(
    null as kerusakanType
  );

  const [observasi, setObservasi] = useState<observasiType>(
    null as observasiType
  );

  const { user, userIsAdmin, laporan } = useContext(AppContext);
  const history = useHistory();

  const [present, dismiss] = useIonPopover(
    <PopoverList setObservasi={setObservasi} setKerusakan={setKerusakan} />,
    {
      onHide: () => dismiss(),
    }
  );

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
          {(kerusakan || observasi) &&
            userLaporan
              .filter(
                (fil) =>
                  fil.damageRate === kerusakan &&
                  fil.observationStatus === observasi
              )
              .map((laporanData) => (
                <IonRow
                  key={laporanData.id}
                  onClick={() => {
                    history.push(`/user/laporanku/${laporanData.id}`);
                  }}
                >
                  <IonCol>
                    <IonCard className="home__card">
                      {laporanData.observationStatus === 'Observasi' ? (
                        <IonLabel className="dilaporkan">
                          Tahap Observasi
                        </IonLabel>
                      ) : laporanData.observationStatus === 'Perbaiki' ? (
                        <IonLabel className="perbaikan">
                          Tahap Perbaikan
                        </IonLabel>
                      ) : (
                        <IonLabel className="selesai">
                          Selesai Perbaikan
                        </IonLabel>
                      )}
                      <IonImg src={ laporanData.url ?? Jalan} />

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

          {kerusakan === null &&
            userLaporan.map((laporanData) => (
              <IonRow
                key={laporanData.id}
                onClick={() => {
                  history.push(`/user/laporanku/${laporanData.id}`);
                }}
              >
                <IonCol>
                  <IonCard className="home__card">
                    {laporanData.observationStatus === 'Observasi' ? (
                      <IonLabel className="dilaporkan">
                        Tahap Observasi
                      </IonLabel>
                    ) : laporanData.observationStatus === 'Perbaiki' ? (
                      <IonLabel className="perbaikan">Tahap Perbaikan</IonLabel>
                    ) : (
                      <IonLabel className="selesai">Selesai Perbaikan</IonLabel>
                    )}
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
