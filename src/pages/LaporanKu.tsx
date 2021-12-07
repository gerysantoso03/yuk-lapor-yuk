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

const LaporanKu = () => {
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
              <IonCard className="porku__card">
                {/* Dilaporkan */}
                <IonLabel className="dilaporkan">DILAPORKAN</IonLabel>

                {/* Dalam Perbaikan */}
                {/* <IonLabel className="perbaikan">DALAM PERBAIKAN</IonLabel> */}

                {/* Selesai */}
                {/* <IonLabel className="selesai">SELESAI</IonLabel> */}

                <IonImg src={Jalan} />
                <IonCardHeader>
                  <IonCardTitle>Jalan Berlubang</IonCardTitle>
                  <IonCardSubtitle>
                    Tingkat Kerusakan : Rusak Parah
                  </IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent className="porku-content__container">
                  <IonIcon icon={location} className="porku__icon" />
                  <p className="porku__address">
                    Jl. Persahabatan RayaRT.006/RW.003, Perwira, Kec. Bekasi
                    Utara, Kota Bks, Jawa Barat 17143
                  </p>
                </IonCardContent>
              </IonCard>

              <IonCard className="porku__card">
                <IonLabel className="dilaporkan">DILAPORKAN</IonLabel>
                <IonImg src={Jalan} />
                <IonCardHeader>
                  <IonCardTitle>Jalan Berlubang</IonCardTitle>
                  <IonCardSubtitle>
                    Tingkat Kerusakan : Rusak Parah
                  </IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent className="porku-content__container">
                  <IonIcon icon={location} className="porku__icon" />
                  <p className="porku__address">
                    Jl. Persahabatan RayaRT.006/RW.003, Perwira, Kec. Bekasi
                    Utara, Kota Bks, Jawa Barat 17143
                  </p>
                </IonCardContent>
              </IonCard>

              <IonCard className="porku__card">
                <IonLabel className="dilaporkan">DILAPORKAN</IonLabel>
                <IonImg src={Jalan} />
                <IonCardHeader>
                  <IonCardTitle>Jalan Berlubang</IonCardTitle>
                  <IonCardSubtitle>
                    Tingkat Kerusakan : Rusak Parah
                  </IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent className="porku-content__container">
                  <IonIcon icon={location} className="porku__icon" />
                  <p className="porku__address">
                    Jl. Persahabatan RayaRT.006/RW.003, Perwira, Kec. Bekasi
                    Utara, Kota Bks, Jawa Barat 17143
                  </p>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default LaporanKu;
