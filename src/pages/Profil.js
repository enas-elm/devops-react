import React, { useState, useEffect } from 'react';

import './style.css'; 


export default function SettingsPage() {



  const [companyName, setCompanyName] = useState('');

  const [id, setId] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {

    fetch("https://h29ummvr0j.execute-api.eu-west-1.amazonaws.com/lilraw")

      .then(response => response.json())

      .then(data => {

        setId(data.id);

      })

      .catch(error => console.error('Erreur lors de la récupération des données:', error));

  }, []); 

  
  

  
 

  const handleCompanyNameChange = (e) => {

    setCompanyName(e.target.value);

  };

  const handleImageChange = (e) => {

    const selectedImage = e.target.files[0];

    setImage(selectedImage);

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    console.log('Company Name:', companyName);

    console.log('Image:', image);

    setCompanyName('');

    setImage(null);

  };

 

 

  return (

    <div>

    <form onSubmit={handleSubmit}>
      <div>
        <div>
          <label>ID:</label>
          <span>{id}</span>
        </div>
  
        <label htmlFor="companyName">Entreprise</label>
        <input
          type="text"
          id="companyName"
          value={companyName}
          onChange={handleCompanyNameChange}
        />
      </div>
  
      <div>
        <label htmlFor="image">Upload Image:</label>
        <input type="file" id="image" onChange={handleImageChange} />
      </div>
  
      <button type="submit">Save Changes</button>
    </form>
  </div>
  

          


  );

}