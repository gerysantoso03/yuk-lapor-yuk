import {
  IonCard,
  IonRow,
  IonContent,
  IonHeader,
  IonImg,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonLabel,
  IonCol,
  IonGrid,
  IonButton,
  IonInput,
  IonItem,
  IonTextarea,
  IonRadioGroup,
  IonRadio,
  useIonToast,
} from '@ionic/react';

// Import Assets
import '../assets/css/TambahLaporan.css';
import ImgPlaceholder from '../assets/images/placeholder-image.png';

import { useContext, useState } from 'react';
import { addNewLaporan, getUserLaporan } from '../firebase/laporan/Laporan';
import { location } from 'ionicons/icons';
import { Geolocation } from '@ionic-native/geolocation';

import axios from 'axios';
import { useHistory } from 'react-router';
import { AppContext } from '../context/AppContext';

const TambahLaporan = () => {
  const [title, setTitle] = useState<string>('');
  const [desc, setDesc] = useState<string>('');
  const [loc, setLoc] = useState<string>('');
  const [damageRate, setDamageRate] = useState<'Ringan' | 'Sedang' | 'Parah'>(
    'Ringan'
  );
  const [present, dismiss] = useIonToast();
  const { user, userIsAdmin } = useContext(AppContext);
  const history = useHistory();

  const GetGeolocation = async () => {
    try {
      const position = await Geolocation.getCurrentPosition();
      const endPoint = `https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json?prox=${position.coords.latitude}%2C${position.coords.longitude}%2C250&mode=retrieveAddresses&maxresults=1&gen=9&apiKey=FoKp5Q3s6QYpyY09kGHrZ3FZwy2xVJQ12DNWAH5nT-I`;
      axios
        .get(endPoint)
        .then((res) => {
          setLoc(res.data.Response.View[0].Result[0].Location.Address.Label); // get address by response
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonTitle className="title-toolbar__head ion-text-center">
            Laporan Pak
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent class="ion-padding-horizontal" fullscreen>
        <IonGrid className="tambah__container">
          <IonCol>
            <IonCard className="tambah-card__image">
              <IonImg className="img-insert" src={ImgPlaceholder} />
            </IonCard>
          </IonCol>

          <IonRow className="tambah-wrapper__button">
            <IonCol className="ion-text-left">
              <IonButton
                className="width-50 button-ylw tambah__button"
                color="warning"
              >
                Ambil Foto
              </IonButton>
            </IonCol>
            <IonCol className="ion-text-right">
              <IonButton
                className="width-50 button-blu tambah__button"
                color="secondary"
              >
                Unggah Foto
              </IonButton>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonItem lines="none">
                <IonCol>
                  <IonLabel>Judul Laporan</IonLabel>
                  <IonCard className="ion-padding-horizontal no-margin tambah-input__card ">
                    <IonInput
                      className="form-input"
                      type="text"
                      placeholder="Judul Laporan"
                      value={title}
                      onIonInput={(e: any) => setTitle(e.target.value)}
                    ></IonInput>
                  </IonCard>
                </IonCol>
              </IonItem>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonItem lines="none">
                <IonCol>
                  <IonLabel>Deskripsi Laporan</IonLabel>
                  <IonCard className="ion-padding-horizontal no-margin tambah-input__card ">
                    <IonTextarea
                      className="form-input"
                      placeholder="Deskripsi Laporan"
                      rows={8}
                      value={desc}
                      onIonInput={(e: any) => setDesc(e.target.value)}
                    ></IonTextarea>
                  </IonCard>
                </IonCol>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem lines="none">
                <IonCol>
                  <IonLabel>Lokasi Laporan</IonLabel>
                  <IonCard className="ion-padding-horizontal no-margin tambah-input__card ">
                    <IonRow>
                      <IonCol className="width-50">
                        <IonInput
                          className="form-input width-50"
                          placeholder="Lokasi Laporan"
                          value={loc}
                          onIonChange={(e: any) => setLoc(e.detail.value)}
                        ></IonInput>
                      </IonCol>
                      <IonCol className="width-sm">
                        <IonButton
                          onClick={() => {
                            GetGeolocation();
                          }}
                          className="location-btn"
                          color="warning"
                        >
                          <IonIcon icon={location}></IonIcon>
                        </IonButton>
                      </IonCol>
                    </IonRow>
                  </IonCard>
                </IonCol>
              </IonItem>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonItem lines="none">
                <IonCol>
                  <IonLabel>Tingkat Kerusakan</IonLabel>
                  <IonRadioGroup
                    value={damageRate}
                    onIonChange={(e: any) => setDamageRate(e.detail.value)}
                  >
                    <IonItem lines="none">
                      <IonLabel>Rusak Ringan</IonLabel>
                      <IonRadio slot="start" value="Ringan"></IonRadio>
                    </IonItem>
                    <IonItem lines="none">
                      <IonLabel>Rusak Sedang</IonLabel>
                      <IonRadio slot="start" value="Sedang"></IonRadio>
                    </IonItem>
                    <IonItem lines="none">
                      <IonLabel>Rusak Parah</IonLabel>
                      <IonRadio slot="start" value="Parah"></IonRadio>
                    </IonItem>
                  </IonRadioGroup>
                </IonCol>
              </IonItem>
            </IonCol>
          </IonRow>

          <IonRow className="width-50">
            <IonCol>
              <IonButton
                onClick={async () => {
                  // Add new laporan data to DB
                  try {
                    // Validate data
                    if (title === '' || desc === '' || loc === '') {
                      throw new Error('Input data must not be empty!!');
                    }

                    if (!user) {
                      throw new Error(
                        'Something wrong happened. User is supposed to exist in this point.'
                      );
                    }

                    await addNewLaporan({
                      title,
                      desc,
                      loc,
                      damageRate,
                      observationStatus: 'Observasi',
                      userID: user.uid,
                    });

                    // Fetch new updated data
                    const laporan = await getUserLaporan(user.uid);

                    // Set form back to initial value
                    setTitle('');
                    setDesc('');
                    setLoc('');
                    setDamageRate('Ringan');

                    // Set success toast
                    present('Success add new laporan data', 2000);

                    // Return back to homepage
                    history.replace({
                      pathname: '/user/home',
                      state: { laporan },
                    });
                  } catch {
                    present('Failed to add new laporan data', 2000);
                  }
                }}
                className="width-50 button-ylw tambah__btn-action"
                color="warning"
              >
                Lapor Sekarang
              </IonButton>

              {userIsAdmin && (
                <>
                  <IonButton
                    className="width-50 button-ylw tambah__btn-action"
                    fill="outline"
                    color="danger"
                  >
                    Hapus Laporan
                  </IonButton>

                  <IonButton
                    className="width-50 button-ylw tambah__btn-action"
                    fill="outline"
                    color="danger"
                  >
                    Hapus Pelapor
                  </IonButton>
                </>
              )}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default TambahLaporan;
