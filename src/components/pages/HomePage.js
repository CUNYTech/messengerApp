import React from 'react';
import Particles from 'react-particles-js';
import HomeBox from './HomeBox';
import '../../style/home.css';

const HomePage = () => (
  <div>
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
    </div>
    <div className="home">
      <h1 className="title">Tangle Chat</h1>
      {
        // TODO: Need to use (react-router?) to check if we're at the home page.
        // If we are, add back button of some sort.
        // TODO: The link up there is temporary until react-router is setup.
      }
      <HomeBox />
    </div>
  </div>
);

export default HomePage;
