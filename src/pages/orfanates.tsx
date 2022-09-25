import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiPlus, FiArrowRight } from 'react-icons/fi'
import '../styles/pages/orfanates.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import mapMarkerImg from '../images/map-marker.svg'
import { mapIcon } from '../utils/mapIcon'
import { useLocation } from '../hooks/useLocation'
import Example from '../components/loading-component'

interface Orfanates {
  id: number
  name: string
  latitude: number
  longitude: number
}

function OrfanateMap () {
  const [orfanatesIndex, setOrfanatesIndex] = useState<Orfanates[]>([])
  const [location, setLocation] = useLocation()

  return (
    <>
      <div id='page-map'>
        <aside>
          <header>
            <img src={mapMarkerImg} alt='Happy' />
            <h2>Escolha um orfanato no mapa</h2>
            <p>Muitas Crianças estão esperando sua visita :)</p>
          </header>
          <footer>
            <strong>João Pessoa</strong>
            <span>Paraíba</span>
          </footer>
        </aside>
        {location?.latitude !== 0 ? (
          <MapContainer
            center={[location.latitude, location.longitude]}
            zoom={15}
            style={{ width: '100%', height: '100%' }}
          >
            <TileLayer url='https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZmVsaXBlMDA3IiwiYSI6ImNrZ2NoanNxZDAxc2kyc24zbm5reWZwZ28ifQ.gEtY3Amg3DsTd5Hp6E_-sA' />
            {orfanatesIndex.length ? (
              orfanatesIndex.map(orfanate => (
                <Marker
                  icon={mapIcon}
                  position={[orfanate.latitude, orfanate.longitude]}
                  key={orfanate.id}
                >
                  <Popup
                    closeButton={false}
                    minWidth={240}
                    maxWidth={240}
                    className='map-popup'
                  >
                    {orfanate.name}
                    <Link to={`/orphanages/${orfanate.id}`}>
                      <FiArrowRight size={20} color='#FFF' />
                    </Link>
                  </Popup>
                </Marker>
              ))
            ) : (
              <Marker
                icon={mapIcon}
                position={[location.latitude, location.longitude]}
              >
                <Popup
                  closeButton={false}
                  minWidth={240}
                  maxWidth={240}
                  className='map-popup'
                >
                  Você está aqui
                </Popup>
              </Marker>
            )}
            ;
          </MapContainer>
        ) : (
          <Example />
        )}
        <Link to='/orphanages/create' className='create-orfanate'>
          <FiPlus size={32} color='#fff' />
        </Link>
      </div>
    </>
  )
}

export default OrfanateMap
