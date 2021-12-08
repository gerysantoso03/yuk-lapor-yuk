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
import { registerUser } from '../firebase/auth/Auth';
import {
  ref,
  getDownloadURL,
  getStorage,
  uploadBytesResumable,
} from 'firebase/storage';

// Import Styles
import '../assets/css/Register.css';
import ImgPlaceholder from '../assets/images/placeholder-image.png';

const Register = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [fullname, setFullname] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [imageFile, setImage] = useState<any>();
  const [imageName, setImageName] = useState('');
  const [urlImage, setURL] = useState('');
  const h = useHistory();

  const [present, dismiss] = useIonToast();

  const GetInputImage = async (e: any) => {
    const file = e.target.files[0];
    setImageName(e.target.files[0].name); // get image name
    console.log('ini nama file', imageName);

    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      // get the blob of the image:
      let blob: Blob = new Blob([new Uint8Array(reader.result as ArrayBuffer)]); // get image as blob type
      setImage(blob);

      // create blobURL, such that we could use it in an image element:
      let blobURL: string = URL.createObjectURL(blob); // get url of blob image

      // processing upload image
      const storage = getStorage();
      const storageRef = ref(storage, `/images/${'profile' + imageName}`);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);
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

                <IonButton slot="start" className="input__button">
                  <IonIcon icon={map} />
                </IonButton>
              </div>
              <IonGrid className="tambah__container">
                <IonCol>
                  <IonCard className="tambah-card__image">
                    <IonImg
                      className="img-insert"
                      src={urlImage ? urlImage : ImgPlaceholder}
                    />
                  </IonCard>
                  <input type="file" onChange={GetInputImage} />
                </IonCol>
              </IonGrid>
              <IonButton
                expand="block"
                className="button__upload"
                // color="primary"
              >
                <IonIcon slot="start" icon={camera} />
                <IonLabel>Insert Profile Picture</IonLabel>
              </IonButton>
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
                      urlImage,
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
