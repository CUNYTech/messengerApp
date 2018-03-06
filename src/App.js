import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Particles from 'react-particles-js';
import Home from './components/pages/Home';
import LoginForm from './components/forms/LoginForm';
import RegisterForm from './components/forms/RegisterForm';
import './style/home.css';

const App = () => (
  <div>
    <div>
      <Particles params={{
        particles: {
          number: {
            value: 180,
            density: {
              enable: true,
              value_area: 800,
            },
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
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={LoginForm} />
        <Route path="/register" component={RegisterForm} />
      </Switch>
    </div>
  </div>
);

export default App;
