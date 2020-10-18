const addMovieBtn = document.getElementById('add-movie-btn');
const searchBtn = document.getElementById('search-btn');

let movies = [];

const renderMovies = (filter = "") => {
  const movieList = document.getElementById('movie-list');

  if (movies.length === 0) {
    movieList.classList.remove('visible');
    return;
  } else {
    movieList.classList.add('visible');
  }
  movieList.innerHTML = '';

  // if filter wanst empty then give me movies otherwise give me filtered movies
  const filteredMovies = !filter ? movies : movies.filter(movie=>movie.info.title.includes(filter))
  filteredMovies.forEach((movie) => {
    const movieEl = document.createElement('li');
    // to pull info value from movie object to avoid duplicated code
    // we can also use rest parameter ...otherProps and this will now collect all properties which you
    // didnt pull by name 
    const {info, ...otherProps} = movie;
    // the same here for info object
    // i dont need this for now i do that in other way using this
    //const {title} = info;
    // i defined getFormattedTitle below
    //const {getFormattedTitle} = movie;

    let text = movie.getFormattedTitle() + "-";
    for(const key in movie.info){
      if(key !== "title"){
        text = text + `${key}: ${info[key]}`;
      }
    } 
    movieEl.textContent = text;
    movieList.append(movieEl);
  });
};

const addMovieHandler = () => {
  const title = document.getElementById('title').value;
  const extraName = document.getElementById('extra-name').value;
  const extraValue = document.getElementById('extra-value').value;

  if (
    title.trim() === '' ||
    extraName.trim() === '' ||
    extraValue.trim() === ''
  ) {
    return;
  }

  const newMovie = {
    info: {
      title,
      [extraName]: extraValue
    },
    id: Math.random().toString(),
    // could be better if I use this 
    // therefore I can call info object everywhere calling getFormattedTItle
    getFormattedTitle: function(){
     return this.info.title.toUpperCase();
    }
  };

  movies.push(newMovie);
  renderMovies();
};

const searchMovieHandler = () =>{
  const filterTerm = document.getElementById("filter-title").value;
  renderMovies(filterTerm);
}


addMovieBtn.addEventListener('click', addMovieHandler);
searchBtn.addEventListener('click', searchMovieHandler);

