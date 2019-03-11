import React, { Component } from 'react';

import { BrowserRouter, Route } from 'react-router-dom';

import MenuLanches from './components/MenuLanches';
import Lanche from './components/Lanche';
import Home from './components/Home';
import LancheInfo from './components/LancheInfo';
import Header from './components/Header';

class App extends Component {
  render() {
    return (
      <div className="App" style={{ boxSizing: 'border-box !important' }}>
        <BrowserRouter>
          <React.Fragment>
            <Route path="/" component={Header} />
            <Route exact path="/" component={Home} />
            <Route exact path="/lanches" component={MenuLanches} />
            <Route path="/lanches/:name" component={LancheInfo} />
            <Route exact path="/personalizar" component={Lanche} />
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
