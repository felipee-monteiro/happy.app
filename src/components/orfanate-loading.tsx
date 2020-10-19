import React from 'react';
import { RingSpinner } from 'react-spinners-kit';
import '../styles/components/spinner.css';


export default function Loading(){
  return (
    <>
      <div className="spinner">
          <RingSpinner size={70} color={"#00ff89"} loading={true} />
          <h1>Carregando...</h1>
      </div>
    </>
  );

};