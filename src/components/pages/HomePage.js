import React from 'react';
// import { Link } from 'react-router-dom';
import Particles from 'react-particles-js';
import '../../style/home.css';

// TODO: Look into semantic for placing of home section.

const HomePage = () => (
  <div style={{ background: 'black', height: '100vh' }}>
    <Particles params={{
      particles: {
        number: {
          value: 200,
          density: {
            enable: true,
            value_area: 800,
          },
        },
        color: {
          value: '#3ee8ff',
        },
        move: {
          enable: true,
          speed: 7,
        },
      },
      retina_detect: false,
    }}
    />
    <div className="home">   
      <h1 className="title">Tangle Chat</h1>
      <div className="buttonBox"> 
        <button className="medium ui button">Login</button>
        <button className="medium ui button">Register</button>
      </div>
    </div>
  </div>
);

export default HomePage;
