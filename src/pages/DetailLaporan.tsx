import {
  IonCard,
  IonCardContent,
  IonRow,
  IonContent,
  IonHeader,
  IonImg,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonLabel,
  IonCol,
  IonGrid,
  IonButtons,
  IonButton,
  IonBackButton,
  IonItem,
  IonRadio,
  IonRadioGroup,
  useIonToast,
} from '@ionic/react';

// Import Assets
import { location } from 'ionicons/icons';
import '../assets/css/DetailLaporan.css';
import Placeholder from '../assets/images/lisa122.jpg';
import Placeholder1 from '../assets/images/jalanrusak.png';

import { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import {
  deleteLaporanData,
  getAllLaporan,
  getDetailLaporan,
  updateLaporanObservationStatus,
} from '../firebase/laporan/Laporan';
import { AppContext } from '../context/AppContext';
import { laporanType } from '../types/LaporanTypes';
import { userType } from '../types/UserTypes';
import { getCorrespondenUser } from '../firebase/auth/Auth';

type LaporanParams = {
  laporanId: string;
};

const DetailLaporan = () => {
  const [observation, setObservation] = useState<
    'Observasi' | 'Perbaiki' | 'Selesai'
  >('Observasi');

  const { userIsAdmin, setLaporan } = useContext(AppContext);
  const { laporanId } = useParams<LaporanParams>();
  const [detailLaporan, setDetailLaporan] = useState<laporanType>();
  const [correspondUser, setCorrespondUser] = useState<userType>();

  const history = useHistory();

  const [present, dismiss] = useIonToast();

  useEffect(() => {
    getDetailLaporan(laporanId).then((res) =>
      setDetailLaporan(res as laporanType)
    );

    getCorrespondenUser(laporanId).then((res) =>
      setCorrespondUser(res as userType)
    );
  }, [laporanId]);

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle className="title-toolbar__head ion-text-center">
            Laporan
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen class="ion-padding-horizontal">
        <IonCard className="detail__card-container">
          <IonLabel className="dilaporkan">DILAPORKAN</IonLabel>
          <IonImg className="report-image" src={Placeholder1} />
          <IonCardContent class="ion-padding-horizontal">
            <IonGrid>
              <IonCol class="detail-card">
                <IonRow>
                  <IonText className="card-title">
                    {detailLaporan?.title}
                  </IonText>
                </IonRow>
                <IonRow>
                  <IonText className="card-tag">
                    Tingkat Kerusakan : {detailLaporan?.damageRate}
                  </IonText>
                </IonRow>
                <IonGrid>
                  <IonRow>
                    <IonCol className="detail-address__container">
                      <IonIcon icon={location} className="detail__icon" />
                      <p className="detail__address">{detailLaporan?.loc}</p>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonCol>
              <IonCol class="desc-container">
                <IonRow>
                  <IonText class="desc-title">Deskripsi Kendala</IonText>
                </IonRow>
                <IonRow>
                  <IonText class="ion-text-justify desc-content">
                    {detailLaporan?.desc}
                  </IonText>
                </IonRow>

                <IonGrid>
                  <IonRow>
                    <IonGrid>
                      <IonRow class="profile-container">
                        <IonImg class="profile-photo" src={Placeholder} />
                        <IonCol>
                          <IonRow>
                            <IonText class="reporter-name">
                              {correspondUser?.fullname}
                            </IonText>
                          </IonRow>
                          <IonRow>
                            <IonText class="tag-reporter">Pelapor</IonText>
                          </IonRow>
                        </IonCol>
                      </IonRow>
                    </IonGrid>
                  </IonRow>
                </IonGrid>
              </IonCol>
            </IonGrid>
          </IonCardContent>
        </IonCard>
        {userIsAdmin && (
          <>
            <IonGrid className="ion-padding-horizontal">
              <IonRow>
                <IonCol>
                  <IonItem lines="none">
                    <IonCol>
                      <IonLabel>Status TKP</IonLabel>
                      <IonRadioGroup
                        value={observation}
                        onIonChange={(e: any) => setObservation(e.detail.value)}
                      >
                        <IonItem lines="none">
                          <IonLabel>Tahap Observasi</IonLabel>
                          <IonRadio slot="start" value="Observasi"></IonRadio>
                        </IonItem>
                        <IonItem lines="none">
                          <IonLabel>Tahap Perbaiki</IonLabel>
                          <IonRadio slot="start" value="Perbaiki"></IonRadio>
                        </IonItem>
                        <IonItem lines="none">
                          <IonLabel>Selesai Diperbaiki</IonLabel>
                          <IonRadio slot="start" value="Selesai"></IonRadio>
                        </IonItem>
                      </IonRadioGroup>
                    </IonCol>
                  </IonItem>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonButton
                    onClick={async () => {
                      try {
                        // Updated laporan observation status
                        await updateLaporanObservationStatus(
                          laporanId,
                          observation
                        );

                        // Fetch new updated laporan data from database
                        const laporan = await getAllLaporan();

                        // Set laporan data into laporan context
                        setLaporan(laporan);

                        // Back to home page
                        history.replace('/user/home');

                        // Give success toast
                        present('Success to update laporan data', 2000);
                      } catch (error) {
                        present('Failed to update laporan data', 2000);
                      }
                    }}
                    className="edit-btn"
                    color="warning"
                  >
                    Ubah Status
                  </IonButton>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonButton
                    onClick={async () => {
                      try {
                        // Delete laporan data
                        await deleteLaporanData(laporanId);

                        // Fetch new updated laporan data from database
                        const laporan = await getAllLaporan();

                        history.replace({
                          pathname: '/user/home',
                          state: { laporan },
                        });

                        // Give success toast
                        present('Success to delete laporan data', 2000);
                      } catch (error) {
                        present('Failed to delete laporan data', 2000);
                      }
                    }}
                    fill="outline"
                    className="edit-btn"
                    color="danger"
                  >
                    Hapus Laporan
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default DetailLaporan;
