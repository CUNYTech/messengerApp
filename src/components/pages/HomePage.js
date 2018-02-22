import React from 'react';
import { Link } from 'react-router-dom';
import Particles from 'react-particles-js';
import './home.css';

// TODO: Look into semantic for placing of home section.

const HomePage = () => (
  <div style={{ background: 'black', height: '100vh' }}>
    <Particles params={{
      particles: {
        number: {
          density: {
            enable: true,
            value_area: 250,
          },
        },
        color: {
          value: '#3ee8ff',
        },
        move: {
          enable: true,
          speed: 9,
        },
      },
      retina_detect: true,
    }}
    />
    <div className="ui container home">
      <h1>Tangle Messenger</h1>
      <Link to="/login">Login</Link>
    </div>
  </div>
);

export default HomePage;
