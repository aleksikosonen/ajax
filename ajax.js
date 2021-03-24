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

    sarjat.forEach((sarja, index)=> {

        const html = `<artcile>
                    <h2>${sarja.show.name}</h2>
                    <a href="${sarja.show.officialSite || sarja.show.url}">Link to homepage</a>
                    <figure data-id="${index}">
                      <img src="${sarja.show.image !== null ? sarja.show.image.medium : 'http://placekitten.com/210/295'}" alt="${sarja.show.name}">
                      <figcaption></figcaption>
                    </figure>
                    ${sarja.show.genres.join(', ')}
                    ${sarja.show.summary}
                  </artcile>`;
        main.innerHTML += html;
    });

    const figuret = document.querySelectorAll('figure');
    figuret.forEach((figure) => {
      figure.addEventListener('click', () => {
        const id =figure.dataset.id;
        console.log(sarjat[id].show.name);
      })
    })

  } catch (e) {
    console.log(e.message);
  }
});

/*
let kuva='http://placekitten.com/210/295';
if(sarja.show.image.medium !== null) {
  kuva = sarja.show.image.medium;
}
 */