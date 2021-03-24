'use strict';

const form = document.querySelector('#search-form');
const main = document.querySelector('main');

form.addEventListener('submit', async (evt)=>{
  evt.preventDefault();
  try { //poistaa rikkoutumisen joka aiheutuu null-arvosta apissa
    const hakusana = document.querySelector('input[name=search-field]').value;
    console.log(hakusana);
    const vastaus = await fetch('http://api.tvmaze.com/search/shows?q=' + hakusana);
    const sarjat = await vastaus.json();
    console.log(sarjat[0].show.name);

    sarjat.forEach((sarja)=> {
      const article = document.createElement('article');
      const h2 = document.createElement('h2');
      const figure = document.createElement('figure');
      const figcaption = document.createElement('figcaption');
      const img = document.createElement('img');
      const p = document.createElement('p');
      const div = document.createElement('div');

      h2.innerHTML = sarja.show.name;
      figcaption.innerHTML = sarja.show.name;
      p.innerHTML = sarja.show.genres.join(' | ');
      div.innerHTML = sarja.show.summary;

      img.src = sarja.show.image !== null ? sarja.show.image.medium : 'http://placekitten.com/210/295';
      img.alt = sarja.show.name;

      figure.appendChild(img);
      figure.appendChild(figcaption);
      article.appendChild(h2)
      article.appendChild(figure);
      article.appendChild(p);
      article.appendChild(div);

      figure.addEventListener('click', () => {
        console.log(sarja.show.image.original);
      });

      main.appendChild(article);
    });

  } catch (e) {
    console.log(e.message);
  }
});
