// src/pages/NotFound.js
import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

const NotFound = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Page Not Found</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <h1>404 - Page Not Found</h1>
    </IonContent>
  </IonPage>
);

export default NotFound;