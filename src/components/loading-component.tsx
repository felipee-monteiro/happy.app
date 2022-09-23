import React from 'react';
import { RingSpinner } from 'react-spinners-kit';
import '../styles/components/spinner.css';

export default function Example(){
  return (
    <>
      <div className="spinner">
          <RingSpinner size={70} color={"#00ff89"} loading={true} />
          <h1>Carregando sua localização Atual...</h1>
      </div>
    </>
  );
};
