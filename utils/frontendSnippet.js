const bodyOfDocument = document.querySelectorAll('.rankingType');
const backendAddress = `http://localhost:3001/send-movies-to-database`;
const arrayOfMovies = [];

for (let i = 0; i < bodyOfDocument.length; i++) {
  const position = bodyOfDocument[i].querySelector('.rankingType__position').innerText;
  const origTitle = bodyOfDocument[i].querySelector('.rankingType__originalTitle').innerText;
  const year = bodyOfDocument[i].querySelector('.rankingType__year').innerText;
  const hrefText = bodyOfDocument[i].querySelector('.rankingType__title a').innerHTML;
  const imgOfMovie = bodyOfDocument[i].querySelector('.efficientPoster a img').src;
  const genres = [...bodyOfDocument[i].querySelectorAll('.rankingType__genres a')];

  arrayOfMovies.push({
    position,
    origTitle:  origTitle.substring(0, origTitle.length-5),
    polTitle: hrefText,
    year,
    imgOfMovie,
    genres: genres.map(elem => elem.innerText),
  });
}

const sendMoviesList = async ()=>{
  try {
    await fetch(backendAddress, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(arrayOfMovies),
    });

  } catch(err){
    console.error(err);
  }
}
sendMoviesList();



