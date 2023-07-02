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
    const { title, runtime, showtime, tickets_sold, capacity, poster } = movie;
    const availableTickets = capacity - tickets_sold;
  
    document.getElementById('poster').src = poster;
    document.getElementById('title').textContent = title;
    document.getElementById('runtime').textContent = `Runtime: ${runtime} min`;
    document.getElementById('showtime').textContent = `Showtime: ${showtime}`;
    document.getElementById('available-tickets').textContent = `Available Tickets: ${availableTickets}`;
  
    const buyTicketButton = document.getElementById('buy-ticket');
    buyTicketButton.disabled = availableTickets === 0;
    buyTicketButton.textContent = availableTickets === 0 ? 'Sold Out' : 'Buy Ticket';
    buyTicketButton.removeEventListener('click', buyTicketHandler);
    buyTicketButton.addEventListener('click', buyTicketHandler.bind(null, movie.id, availableTickets));
  }
  
  // Populates the movie menu with all movies
  function populateMovieMenu(movies) {
    const filmList = document.getElementById('films');
    filmList.innerHTML = '';
  
    movies.forEach(movie => {
      const listItem = document.createElement('li');
      listItem.textContent = movie.title;
      listItem.classList.add('film', 'item');
      listItem.addEventListener('click', () => {
        fetchMovieDetails(movie.id);
      });
  
      filmList.appendChild(listItem);
    });
  }
  
  // Fetches movie details for a specific movie and updates the UI
  function fetchMovieDetails(movieId) {
    fetch(`http://localhost:3000/films/${movieId}`)
      .then(response => response.json())
      .then(movie => {
        updateMovieDetails(movie);
      })
      .catch(error => {
        console.error('Error fetching movie details:', error);
      });
  }
  
  // Event handler for the "Buy Ticket" button
  function buyTicketHandler(movieId, availableTickets) {
    if (availableTickets > 0) {
      const updatedTickets = availableTickets - 1;
      const buyTicketButton = document.getElementById('buy-ticket');
      buyTicketButton.disabled = updatedTickets === 0;
      buyTicketButton.textContent = updatedTickets === 0 ? 'Sold Out' : 'Buy Ticket';
      document.getElementById('available-tickets').textContent = `Available Tickets: ${updatedTickets}`;
  
      // Send a PATCH request to update tickets_sold on the server
      fetch(`http://localhost:3000/films/${movieId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tickets_sold: updatedTickets,
        }),
      })
        .then(response => response.json())
        .then(movie => {
          console.log('Ticket purchased successfully:', movie);
        })
        .catch(error => {
          console.error('Error purchasing ticket:', error);
        });
    }
  }
  
  // Initialize the application
  function init() {
    fetchFirstMovie();
    fetchAllMovies();
  }
  
  init();
  