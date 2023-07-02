// app.js

// Fetches movie details for the first movie and updates the UI
function fetchFirstMovie() {
    fetch('http://localhost:3000/films/1')
      .then(response => response.json())
      .then(movie => {
        updateMovieDetails(movie);
      })
      .catch(error => {
        console.error('Error fetching movie details:', error);
      });
  }
  
  // Fetches the list of all movies and populates the movie menu
  function fetchAllMovies() {
    fetch('http://localhost:3000/films')
      .then(response => response.json())
      .then(movies => {
        populateMovieMenu(movies);
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
      });
  }
  
  // Updates the movie details on the UI
  function updateMovieDetails(movie) {
    // Remaining code remains the same
  }
  
  // Populates the movie menu with all movies
  function populateMovieMenu(movies) {
    // Remaining code remains the same
  }
  
  // Event listener for the "Buy Ticket" button
  document.getElementById('buy-ticket').addEventListener('click', () => {
    // Remaining code remains the same
  });
  
  // Initialize the application
  function init() {
    fetchFirstMovie();
    fetchAllMovies();
  }
  
  init();
  