import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import Carousel from '../Carousel';
import Footer from '../Footer';

export default class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="animated fadeIn mx-auto bg-grey-light flex justify-center mt-10">
          <Carousel />
        </div>
        <div className="animated fadeInLeft bg-blue w-full flex items-center justify-center" style={{ height: '33.33vh' }}>
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-white w-full text-center p-4">Deu fome ? A gente mata !</h2>
            <div className="flex justify-center">
              <Link to='/lanches'>
                <button className="bg-orange border-b-2 border-orange-dark rounded px-4 py-2 text-white font-semibold hover:bg-orange-light">
                  Ver cardápio
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="animated fadeInUp bg-orange w-full flex items-center justify-center" style={{ height: '33.33vh' }}>
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-white w-full text-center p-4">Quer algo diferente ? Personalize agora !</h2>
            <div className="flex justify-center">
              <Link to='/personalizar'>
                <button className="bg-blue border-b-2 border-blue-dark rounded px-4 py-2 text-white font-semibold hover:bg-blue-light">
                  Personalizar            
                </button>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}
