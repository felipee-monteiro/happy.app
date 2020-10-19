import React, {useState, useEffect, FormEvent} from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import {useHistory} from 'react-router-dom';

import { FiPlus } from "react-icons/fi";
import '../styles/pages/create-orphanage.css';

import Sidebar from '../components/sidebar';
import mapIcon from '../utils/mapIcon';
// import Loading from '../components/location-loading';
import api from '../services/api';


export default function CreateOrphanage() {

 
  const history = useHistory();
  const [position, setPosition] = useState({latitude: 0, longitude: 0});
  const [usePosition, setUsePosition] = useState({lat: 0, long: 0});

  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [open_hour, setOpenHour] = useState('');
  const [open_on_weekends, setOpenOWeekends] = useState(true);
  const [images, setImages] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState(['']);


  useEffect(() => {

      if (navigator) {
          navigator.geolocation.getCurrentPosition(position => {
            setUsePosition({lat: position.coords.latitude, long: position.coords.longitude});
          });
      };

  });

  function handlerMapClick(event: LeafletMouseEvent){
     const {lat, lng} = event.latlng;


     setPosition({ latitude: lat, longitude: lng});
  }


  function handlerSubmit(event: FormEvent){

     event.preventDefault();

     const {latitude, longitude} = position;

     let data = new FormData();

     data.append('name', name);
     data.append('about', about);
     data.append('latitude', String(latitude));
     data.append('longitude', String(longitude));
     data.append('instructions', instructions);
     data.append('open_hour', open_hour);
     data.append('open_on_weekends', String(open_on_weekends));
     images.forEach(image => {
       data.append('images', image);
     });


    api.post('create-orfanate', data).then(response => {
       
    });

    history.push('/app');

  };

  function handleSelectImage(event: React.ChangeEvent<HTMLInputElement>) {

      if (!event.target.files) {
         return;
      }

      const selectedImages = Array.from(event.target.files);

      setImages(selectedImages);

      const selectedImagesPreview = selectedImages.map(image => {
          return URL.createObjectURL(image);
      })

      setImagePreview(selectedImagesPreview);
  };


  return (
    <div id="page-create-orphanage">

      <Sidebar />

      <main>
        <form className="create-orphanage-form" onSubmit={handlerSubmit}>
          <fieldset>
            <legend>Dados</legend>

            <Map 
              center={[usePosition.lat, usePosition.long]} 
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onClick={handlerMapClick}

            >
              <TileLayer 
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZmVsaXBlMDA3IiwiYSI6ImNrZ2NoanNxZDAxc2kyc24zbm5reWZwZ28ifQ.gEtY3Amg3DsTd5Hp6E_-sA`}
              />

              { position.latitude !== 0 && <Marker interactive={false} icon={mapIcon} position={[position.latitude, position.longitude]} />}

 
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input id="name" value={name} onChange={event => setName(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea id="name" maxLength={300} value={about} onChange={event => setAbout(event.target.value)}/>
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">

                   {imagePreview.map(image => {
                     return (
                         <>
                           <img key={image} src={image} alt={image} />
                         </>
                      );
                   })};


                  <label htmlFor="image[]" className="new-image">
                      <FiPlus size={24} color="#15b6d6" />
                  </label>
              </div>

                 <input multiple onChange={handleSelectImage} type="file" id="image[]" />
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea id="instructions" value={instructions} onChange={event => setInstructions(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário</label>
              <input id="opening_hours" value={open_hour} onChange={event => setOpenHour(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button type="button" 
                className={open_on_weekends ? "active" : ''}
                onClick={() => {setOpenOWeekends(true)}}
                >
                Sim
                </button>
                <button type="button" 
                className={!open_on_weekends ? "active" : ''}
                onClick={() => {setOpenOWeekends(false)}}
                >Não</button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
