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
  IonCard,
  IonImg,
} from '@ionic/react';
import { camera, map } from 'ionicons/icons';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { Geolocation } from '@ionic-native/geolocation';
import { registerUser } from '../firebase/auth/Auth';
import {
  ref,
  getDownloadURL,
  getStorage,
  uploadBytesResumable,
} from 'firebase/storage';
import axios from 'axios';

// Import Styles
import '../assets/css/Register.css';
import ImgPlaceholder from '../assets/images/placeholder-image.png';

const Register = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [fullname, setFullname] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [urlImage, setURL] = useState('');
  const [preview, setPreview] = useState('');
  const h = useHistory();

  const [present, dismiss] = useIonToast();

  const GetGeolocation = async () => {
    try {
      const position = await Geolocation.getCurrentPosition();
      const endPoint = `https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json?prox=${position.coords.latitude}%2C${position.coords.longitude}%2C250&mode=retrieveAddresses&maxresults=1&gen=9&apiKey=FoKp5Q3s6QYpyY09kGHrZ3FZwy2xVJQ12DNWAH5nT-I`;
      axios
        .get(endPoint)
        .then((res) => {
          setAddress(
            res.data.Response.View[0].Result[0].Location.Address.Label
          ); // get address by response
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const GetInputImage = async (e: any) => {
    const file = e.target.files[0];
    setPreview(URL.createObjectURL(e.target.files[0]));

    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      // get the blob of the image:
      let blob: Blob = new Blob([new Uint8Array(reader.result as ArrayBuffer)]); // get image as blob type

      // create blobURL, such that we could use it in an image element:
      let blobURL: string = URL.createObjectURL(blob); // get url of blob image

      // processing upload image
      const storage = getStorage();
      const storageRef = ref(storage, `/images/${'profile' + file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, blob);
      uploadTask.on('state_changed', console.log, console.error, () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log('success upload');
          setURL(url);
        });
      });
    };

    reader.onerror = (error) => {
      console.log(error);
    };
  };

  console.log('Preview : ', preview);
  console.log('URL : ', urlImage);

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
          <IonRow className="wrapper__image-upload">
            <IonCol>
              <IonCard className="wrapper__image-card">
                <IonImg
                  className="img-insert"
                  src={preview ? preview : ImgPlaceholder}
                />
              </IonCard>

              <div className="upload-btn-wrapper">
                <IonButton expand="block" className="button__upload">
                  <IonIcon slot="start" icon={camera} />
                  <IonLabel>Insert Profile Picture</IonLabel>
                </IonButton>
                <input type="file" onChange={GetInputImage} />
              </div>
            </IonCol>
          </IonRow>

          <IonRow class="ion-align-items-center ion-justify-content-center">
            <IonCol size="12">
              <IonInput
                name="Email"
                placeholder="Email"
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

                <IonButton
                  onClick={() => {
                    GetGeolocation();
                  }}
                  slot="start"
                  className="input__button"
                >
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
                    // Validate input
                    if (
                      email === '' ||
                      password === '' ||
                      fullname === '' ||
                      address === '' ||
                      urlImage === ''
                    ) {
                      throw new Error('All input form must not be empty !!');
                    }

                    // Regist new user data
                    const newUserData = await registerUser({
                      email,
                      password,
                      fullname,
                      address,
                      isAdmin,
                      urlImage,
                    });

                    if (newUserData) {
                      // If there is current registered user, show success toast
                      present('Success to regist new user', 2000);

                      // Send to login page
                      h.replace('/login');
                    } else {
                      // If register failed, set failed toast
                      present('Failed to register new user !!', 2000);
                    }
                  } catch (error) {
                    present(`${error}`, 2000);
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
