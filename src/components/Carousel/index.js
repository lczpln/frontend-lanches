import React, { Component } from 'react';

var changerTimeOut;

class Carousel extends Component {

  imgChanger = (child) => {
    const slider = document.querySelector("#div-slider");

    const config = {
      images: slider.childElementCount,
      transitionTime: 5,
    }

    let cld = child;

    if (child === config.images - 1) { cld = 0 } else { cld = child + 1 }

    changerTimeOut = setTimeout(() => {
      slider.children[child].style.width = '0%';
      slider.children[cld].style.width = '100%';
      this.imgChanger(cld);
    }, config.transitionTime * 1000)
  }

  componentDidMount() {
    this.imgChanger(0);
  }

  componentWillUnmount() {
    clearTimeout(changerTimeOut);
  }

  render() {
    const img = [
      {
        path: require('../../images/img1.jpg'),
        text: 'X-plosion, para os fãs de queijo!',
        initialWidth: '100%'
      },
      {
        path: require('../../images/img2.jpg'),
        text: 'Curte hambúguer ? Adiciona mais um!',
        initialWidth: '0%'
      },
      {
        path: require('../../images/img3.jpg'),
        text: 'Dieta ? Faz um light!',
        initialWidth: '0%'
      }
    ]

    const spanStyle = {
      background: 'rgba(255,255,255, 0.4)',
      maxHeight: '50px',
      transition: 'all .6s',
      textShadow: '1px 1px #606060'
    }

    const spanClassName = "truncate z-10 flex items-center text-white font-semibold p-4 pin-b absolute w-full overflow-hidden justify-center";

    return (
      <div className="shadow-lg"
        style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', margin: 'auto', width: '100%', maxWidth: '858px' }}>
        <div id="div-slider" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', width: '100%', overflow: 'hidden' }}>
          {img.map(img => (
            <div key={img.text}
              className="relative overflow-hidden"
              style={{ background: `url(${img.path})`, backgroundSize: '100% 33.33vh', width: img.initialWidth, height: 'calc(33.33vh - 40px)', transition: 'all .6s' }}>
              <span id="span-slider" className={spanClassName} style={spanStyle}>
                {img.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
