/* ---------------- imports --------------------------------------------------------- */

import React from 'react';

/* ---------------- component view --------------------------------------------------------- */

export default function View() {
  return (
    <div className="dashboard">
      <div className="hero">
        <div className="filter">
          <div className="hero__title">
            <div className="hero__name">Elise Cicognani</div>
            <br />
            <div className="hero__subtitle">
              Front-end development<br />Web graphic design
            </div>
          </div>
        </div>
        <video autoPlay loop muted className="hero__video"> {/* eslint-disable-line jsx-a11y/media-has-caption */}
          <source src="/assets/coffee.mp4" type="video/mp4" />Your browser does not support the video tag. I suggest you upgrade your browser.
          <source src="/assets/coffee.webm" type="video/webm" />Your browser does not support the video tag. I suggest you upgrade your browser.
        </video>
      </div>
      <div className="arrow-down" />
      <div className="skills-wrapper">
        <div className="skill">
          <div className="skill__icon icon1" />
          <div className="skill__triangle" />
          <div className="skill__paper right">
            <div className="skill__paper__content">
              <div className="title">Web Design</div>
              <p>
                Progettazione di interfacce web, gestionali per aziende, siti vetrina o dinamici
                attraverso studi di usabilità, tipo di target, obiettivi del cliente, per
                elaborare wireframes e mockups adeguati.
              </p>
            </div>
          </div>
          <div className="skill-separator" />
        </div>
        <div className="skill">
          <div className="skill__paper left">
            <div className="skill__paper__content">
              <div className="title">Coding</div>
              <p>
                Esperienza nel settore front-end: JavaScript ES5 ed ES6,
                CSS e sintassi Sass (che adoro), Bootstrap,
                 JQuery, AngularJS 1, React e Redux, Webpack e npm.
                Conoscenza superficiale dei framework Django e Middleman.
              </p>
            </div>
          </div>
          <div className="skill__triangle swapped" />
          <div className="skill__icon icon2" />
          <div className="skill-separator" />
        </div>
        <div className="skill">
          <div className="skill__icon icon3" />
          <div className="skill__triangle" />
          <div className="skill__paper right">
            <div className="skill__paper__content">
              <div className="title">Graphic design</div>
              <p>
                Progettazione e cura dell&#39;aspetto grafico, dalle icone in formato svg
                o costruite con il CSS, a completi mockups realizzati con Photoshop e Illustrator,
                per ogni tipo di applicazione web e device.
              </p>
            </div>
          </div>
          <div className="skill-separator last" />
        </div>
      </div>
      <div className="works">
        where have i worked
      </div>
      <div className="contacts">
        <div className="skill-separator--contacts" />
          contact me at
      </div>
    </div>
  );
}

View.propTypes = {};

View.defaultProps = {};
