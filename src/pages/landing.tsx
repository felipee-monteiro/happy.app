import React, { useEffect, useState } from 'react'
import '../styles/pages/landing.css'
import logoImg from '../images/logo.svg'
import { FiArrowRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import api from '../services/api'

function Landing () {
  const [city, setCity] = useState<any>({ city: '', ip: 0, region: '' })

  useEffect(() => {
    api('https://ipinfo.io').get('?token=0c52537c77a301').then()
  }, [])

  return (
    <div id='page-landing'>
      <div className='content-wrapper'>
        <main>
          <h1>Leve Felicidade para o Mundo !</h1>
          <p>Visite um orfanato e mude o dia de muitas crianças.</p>
        </main>

        <div className='location'>
          <img src={logoImg} alt='wrapper' />

          <div className='debug'>
            <strong key={city.ip}>{city.city}, </strong>
            <span>{city.region}</span>
          </div>
        </div>

        <div className='link'>
          <Link to='/app' className='enter-app'>
            <FiArrowRight size={26} color='rgba(0, 0, 0, 0.6)' />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Landing
