import React, {useEffect, useState} from "react";
import { FiClock, FiInfo} from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";
import {useParams} from 'react-router-dom';
import mapIcon from '../utils/mapIcon';
import api from '../services/api';
import '../styles/pages/orphanage.css';
import { Facebook } from 'react-content-loader';

import Sidebar from '../components/sidebar';

interface Orfanate {
    name: string,
    latitude: number,
    longitude: number,
    about: string,
    instructions: string,
    open_hour: string,
    open_on_weekends: boolean,
    images: Array<{
      id: number,
      url: string
    }>
}

interface OrphanageParams {
   id: string
}

export default function Orphanage() {


  const params = useParams<OrphanageParams>();
  const [orfanate, setOrfanate] = useState<Orfanate>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);


  useEffect(() => {
     api.get(`/create-orfanate/${params.id}`).then(response => {
         setOrfanate(response.data);
     });

  }, [params.id]);


  if(!orfanate){
     return (
         <>
           <Sidebar />
           <Facebook />
         </>
     );
  }


  return (
    <div id="page-orphanage">
      <Sidebar />

      <main>
        <div className="orphanage-details">
          <img src={orfanate.images[activeImageIndex].url} alt={orfanate.name}/>

          <div className="images">
            {orfanate.images.map((image, index) => {
              return (
                 <button 
                    key={image.id} 
                    className={activeImageIndex === index ? "active" : ''} 
                    type="button"><img 
                    src={image.url} 
                    alt={orfanate.name} 
                    onClick={() => {
                        setActiveImageIndex(index);
                    }}

                    /></button>
              );
            })}
          </div>
          
          <div className="orphanage-details-content">
            <h1>{orfanate.name}</h1>
            <p>{orfanate.about}</p>

            <div className="map-container">
              <Map 
                center={[orfanate.latitude, orfanate.longitude]} 
                zoom={16} 
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer 
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZmVsaXBlMDA3IiwiYSI6ImNrZ2NoanNxZDAxc2kyc24zbm5reWZwZ28ifQ.gEtY3Amg3DsTd5Hp6E_-sA`}
                />
                <Marker interactive={false} icon={mapIcon} position={[orfanate.latitude,orfanate.longitude]} />
              </Map>

              <footer>
                <a target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${orfanate.latitude},${orfanate.longitude}`}>Ver rotas no Google Maps</a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{orfanate.instructions}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                {orfanate.open_hour}
              </div>
              { orfanate.open_on_weekends ? (

                   <div className="open-on-weekends">
                      <FiInfo size={32} color="#39CC83" />
                      Atendemos <br />
                      fim de semana
                   </div>


              )  : ( 

                   <div className="open-on-weekends dont-open">
                      <FiInfo size={32} color="#FF669D" />
                      Não Atendemos <br />
                      fim de semana
                   </div>

              )};

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}