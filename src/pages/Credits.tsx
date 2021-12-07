import {
  IonContent,
  IonHeader,
  IonLabel,
  IonPage,
  IonToolbar,
  IonIcon,
  IonTitle,
  IonAvatar,
  IonItem,
  IonList,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonText,
  IonButtons,
  IonBackButton
} from '@ionic/react';
import {
  chevronForward,
  logoLinkedin
} from 'ionicons/icons';

/* Import Assets */
import '../assets/css/Credits.css';

// Import Image
import fadlaImage from '../assets/images/pengembang/pengembang-1.jpg'
import geryImage from '../assets/images/pengembang/pengembang-2.jpg'
import ranImage from '../assets/images/pengembang/pengembang-3.jpg'
import fafaImage from '../assets/images/pengembang/pengembang-4.jpg'
import farelImage from '../assets/images/pengembang/pengembang-5.jpg'
import ridoImage from '../assets/images/pengembang/pengembang-6.jpg'

const Credits = () => {
  const dataPengembang = [

    {
      id: '01',
      name: 'Gery Santoso',
      role: 'Frontend & Backend Developer',
      linkedIn: 'https://www.linkedin.com/in/gerysantos03/',
      avatar: geryImage
    },
    {
      id: '02',
      name: 'Kharansyah Tawaddu',
      role: 'Backend Developer',
      linkedIn: 'https://www.linkedin.com/in/kharansyahts/',
      avatar: ranImage
    },
    {
      id: '03',
      name: 'Fadla Ichsan',
      role: 'Frontend Developer',
      linkedIn: 'https://www.linkedin.com/in/fadla-ichsan-a4a067207',
      avatar: fadlaImage
    },
    {
      id: '04',
      name: 'Faisal Farhan',
      role: 'Frontend Developer',
      linkedIn: 'https://www.linkedin.com/in/muhammad-faisal-frhn/',
      avatar: fafaImage
    },
    {
      id: '05',
      name: 'Farrel Irsyad Fanny',
      role: 'Frontend Developer',
      linkedIn: 'https://www.linkedin.com/in/farrel-irsyad-fanny-88a0911b9/',
      avatar: farelImage
    },
    {
      id: '06',
      name: 'Rido Hendrawan',
      role: 'UI & UX Design',
      linkedIn: 'https://www.linkedin.com/in/rido-hendrawan-9752371a4/',
      avatar: ridoImage
    }
  ]

  return (
    <IonPage className="credits">
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle className="title-toolbar__head ion-text-center">
            Credits
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonList>
        {dataPengembang.map((ngembang) => (
          <IonItemSliding key={ngembang.id}>
            <IonItemOptions side="end">
              <IonItemOption color="primary" onClick={() => {
                window.open(ngembang.linkedIn, '_blank');
              }}>
                <IonIcon icon={logoLinkedin} slot="icon-only" />
              </IonItemOption>
            </IonItemOptions>

            <IonItem lines="full" button>
              <IonAvatar slot="start">
                <img src={ngembang.avatar} alt="avatar pengembang"/>
              </IonAvatar>
              <IonLabel>
                <h2>{ngembang.name}</h2>
                <p>{ngembang.role}</p>
              </IonLabel>
              <IonIcon icon={chevronForward} slot="end" />
            </IonItem>
          </IonItemSliding>
          ))}
        </IonList>

        <footer className="credits__footer">
          <IonText>
            <p>Copyright © Kawan PDIP. All Rights Reserved.</p>
          </IonText>
        </footer>
      </IonContent>
    </IonPage>
  );
};

export default Credits;
