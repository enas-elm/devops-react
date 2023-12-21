import React, {useState} from 'react';

import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import { get } from 'aws-amplify/api';


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
          <h1>Hello {user.username}</h1>
          <button onClick={signOut}>Sign out</button>
          <button onClick={getTodo} style={{width:'500px', height:'200px'}}></button>
          <ul>
            {items.map((item, index) => (
              <li key={index}>{JSON.stringify(item)}</li>
            ))}
          </ul>
        </main>
      )}
    </Authenticator>
  );
}