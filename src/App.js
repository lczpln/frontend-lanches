import React, { Component } from 'react';

import MenuLanches from './components/MenuLanches';
import Lanche from './components/Lanche';
import Home from './components/Home';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/lanches" component={MenuLanches} />
            <Route exact path="/lanche" component={Lanche} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
