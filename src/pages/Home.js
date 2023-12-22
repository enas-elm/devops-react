import { get } from 'aws-amplify/api';
import React, {useState} from 'react';
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css'; 
import awsExports from '../aws-exports';
import ProfilePage from './Profil'; 
import './style.css';



Amplify.configure(awsExports);
 
export default function HomePage() {
  const [items, setItems] = useState([]);
  function getTodo() {
    try {
      const restOperation = get({ 
        apiName: 'users',
        path: '/getUsers' 
      });
      const response =  restOperation.json(); // Assurez-vous d'obtenir le JSON de la réponse
      console.log('GET call succeeded: ', response);
  
      if (response && Array.isArray(response.Items)) {
        setItems(response.Items); // Définir l'état avec le tableau 'Items'
      } else {
        console.error('Response format is incorrect:', response);
      }
    } catch (error) {
      console.log('GET call failed: ', error);
    }
  }
  
  return (
    <Authenticator signUpAttributes={[
      'email',
      'name',
      'family_name',
    ]}>
      {({ signOut, user }) => (
        <main>

          <h1>Hello </h1>
          <button onClick={getTodo} style={{width:'80px', height:'40px'}}>callApi</button>

          <ul>
            {items.map((item, index) => (
              <li key={index}>{JSON.stringify(item)}</li>
            ))}
          </ul>

         <ProfilePage/> 
         <button onClick={signOut}>Sign out</button> 

        </main>
      )}
    </Authenticator>
  );
}