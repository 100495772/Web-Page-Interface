// Crear el mapa con
const map = L.map('map', {
    maxBounds: [
        [-60, -190], // Límite suroeste
        [100, 190]    // Límite noreste
    ],
    maxBoundsViscosity: 1.0 // Para evitar que se accceda a los laterales
}).setView([15, 0], 2); // Posición inicial y zoom inicial

// Añadimos el tileset que usará el mapa, posibles tilesets:
// https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
// https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png
// https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png
// https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png
// https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}
// https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}

// Cambiad el link de abajo por alguno de los de arriba para ver los otros mapas
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 10,
    minZoom: 2,
}).addTo(map);

// Coordenadas de las ciudades con marcadores
const cities = [
    {
        name: "Krampus. El villano de la navidad",
        location:"(Berlín, Alemania)",
        coords: [52.5243700, 13.4105300],
        image: "images/alemania.jpg",
        description: "¿Quién dijo que la Navidad no podía ser terrorífica? En Alemania, sin duda lo es. Además de premiar a los niños buenos con los regalos que trae Santa Claus, Krampus, un demonio del folclore centroeuropeo, azota a los pequeños que no se han portado bien y los arrastra con él al inframundo."
    },
    {
        name: "Cena de Navidad con KFC",
        location:"(Tokio, Japón)",
        coords: [35.6762, 139.7503],
        image: "images/japon.jpg",
        description: "Las Navidades nunca se han celebrado demasiado en Japón. Dejando a un lado pequeños gestos de intercambiar regalos o una iluminación especial, poco más se celebra en el país nipón. Sin embargo, recientemente ha surgido una extraña «tradición»: una cena a base de pollo frito del restaurante dirigido por coronel más famoso del mundo: el Kentucky Fried Chicken."
    },
    {
        name: "El día de las velitas",
        location:"(Bogotá, Colombia)",
        coords: [4.624335, -74.063644],
        image: "images/colombia.jpg",
        description: "En lugar de las típicas luces navideñas que se cuelgan por las ciudades, en Colombia dan la bienvenida a la Navidad de una forma mucho más íntima. La noche del 7 de diciembre, se homenajea a María y a la Fiesta de la Inmaculada Concepción, iluminando los hogares colombianos con millones de velas blancas y de colores en farolillos de papel."
    },
    {
        name: "Navidad en la playa",
        location:"(Sídney, Australia)",
        coords: [-33.8688, 151.2093],
        image: "images/sidney.jpg",
        description: "Aunque te pueda parecer algo surrealista, en Australia cada Navidad la media de temperatura es de 35º, así que… ¡Sustituye los guantes y bufandas por unas chanclas y disfruta de la arena en la playa! Cada Navidad se coloca en la capital un árbol de Navidad de 26 metros de altitud con más de 21.000 bombillas, 4.000 bolas de navidad y 1.599 guirnaldas."
    },
    {
        name: "Festival de los farolillos gigantes",
        location: "(San Fernando, Filipinas)",
        coords: [15.0201, 120.6992],
        image: "/images/filipinas.jpg",
        description: "Once barangays (pueblos) participan en un festival en el que que se compite por ver quién construye el mejor farolillo. Los farolillos están hechos con una gran variedad de materiales, pueden llegar a medir seis metros y son iluminados con bombillas creando unos diseños caleidoscópicos."
    },
    {
        name: "Competición de decoración navideña",
        location: "(Nueva York, EEUU)",
        coords: [40.71427, -74.00597],
        image: "/images/usa.webp",
        description: "En EEUU todo se hace a lo grande, y esto se aplica también a las celebraciones navideñas. Decoran sus casas con extravagantes decoraciones y adornos, y por supuesto el árbol de Navidad también es grande. Inclusó se organiza una competición nacional en la que se elige la casa mejor decorada cada Navidad."
    },
];

// Añadimos los marcadores al mapa
cities.forEach(city => {
    const marker = L.circleMarker(city.coords, {
        color: 'red',
        radius: 5
    }).addTo(map);

    // Añadimos los popups a los marcadores
    marker.bindPopup(`
        <div class="popup-content">
            <h4>${city.name}</h4>
            <h4>${city.location}</h4>
            <img src="${city.image}" alt="${city.name}">
            <p>${city.description}</p>
        </div>
    `);
});