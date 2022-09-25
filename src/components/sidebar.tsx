import React from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import mapMarkerImg from '../images/map-marker.svg'
import '../styles/components/sidebar.css'

export default function Sidebar () {
  return (
    <aside className='aside-bar'>
      <img src={mapMarkerImg} alt='Happy' />

      <footer>
        <button type='button'>
          <FiArrowLeft size={24} color='#FFF' />
        </button>
      </footer>
    </aside>
  )
}
