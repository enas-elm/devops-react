import React from 'react';
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css'; 
import awsExports from '../aws-exports';
import ProfilePage from './Profil'; 
import './style.css';



Amplify.configure(awsExports);
 
export default function HomePage() {
  
  return (
    <Authenticator signUpAttributes={[
      'email',
      'name',
      'family_name',
    ]}>
      {({ signOut, user }) => (
        <main>
          <h1>Hello</h1> 
          <button onClick={signOut}>Sign out</button> 
         <ProfilePage/>
        </main>
      )}
    </Authenticator>
  );
}