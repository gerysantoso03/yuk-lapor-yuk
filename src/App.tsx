import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Import pages */
import SplashScreen from './pages/SplashScreen';
import Login from './pages/Login';
import Register from './pages/Register';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

/* Import Global CSS */
import './assets/css/Global.css';

/* Import Components */
import UserNavigation from './components/global/UserNavigation';
import { AppProvider } from './context/AppContext';

const App: React.FC = () => {
  return (
    <IonApp>
      <AppProvider>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route path="/user" component={UserNavigation} />
            <Route exact path="/splash-screen" component={SplashScreen} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Redirect exact from="/" to="/splash-screen" />
          </IonRouterOutlet>
        </IonReactRouter>
      </AppProvider>
    </IonApp>
  );
};
export default App;
