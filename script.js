const API_FILMS = "https://swapi.dev/api/films/";
const API_PEOPLE = "https://swapi.dev/api/people/";

// --- 1. GRÁFICA DE PELÍCULAS ---
async function cargarPeliculasGrafica() {
  try {
    const response = await fetch(API_FILMS);
    const dataJson = await response.json();
    const films = dataJson.results;

    films.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));

    const labels = films.map(film => film.title);
    const seriesData = films.map(film => parseInt(film.release_date.split("-")[0]));

    const chartData = {
      labels: labels,
      series: [seriesData]
    };

    const options = {
      high: 2010,
      low: 1975,
      axisX: { showGrid: false },
      axisY: { onlyInteger: true, offset: 50 }
    };

    new Chartist.Line('.ct-chart-films', chartData, options);
  } catch (error) {
    console.error("Error al cargar las películas:", error);
  }
}

// --- 2. GRÁFICA DE PERSONAJES ---
async function cargarPersonajesGrafica() {
  try {
    const response = await fetch(API_PEOPLE);
    const dataJson = await response.json();
    const people = dataJson.results;

    if (!people || people.length === 0) {
      console.error("No se encontraron personajes.");
      return;
    }

    // Extraemos el nombre para el eje X y la longitud del array de films para el eje Y
    const labels = people.map(person => person.name);
    const seriesData = people.map(person => person.films.length);

    const chartData = {
      labels: labels,
      series: [seriesData]
    };

    const options = {
      axisX: {
        showGrid: false,
        // Opcional: si los nombres se amontonan, Chartist ayuda a ajustarlos
      },
      axisY: {
        onlyInteger: true,
        offset: 30
      }
    };

    // Pintamos la gráfica de barras que pide el punto 2
    new Chartist.Bar('.ct-chart-people', chartData, options);

  } catch (error) {
    console.error("Error al cargar los personajes:", error);
  }
}

// Ejecutamos ambas funciones
cargarPeliculasGrafica();
cargarPersonajesGrafica();