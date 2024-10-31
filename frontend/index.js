import { backend } from "declarations/backend";

// Mapbox access token - replace with your token
mapboxgl.accessToken = 'pk.eyJ1IjoiZXhhbXBsZXVzZXIiLCJhIjoiY2t4eGV4YWd1MDB6eDJ1cGh4MzR1c2ZoZSJ9.example-token';

let map;
let trainLayer = null;
let roadLayer = null;
let bikeLayer = null;

async function initializeMap() {
    showLoading();
    
    map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-71.0589, 42.3601], // Boston coordinates
        zoom: 12
    });

    map.on('load', async () => {
        await loadAllLayers();
        hideLoading();
    });
}

async function loadAllLayers() {
    try {
        const [trainData, roadData, bikeData] = await Promise.all([
            backend.getTrainLines(),
            backend.getRoadNetwork(),
            backend.getBikePaths()
        ]);

        // Add train lines
        map.addSource('train-lines', {
            type: 'geojson',
            data: trainData
        });
        map.addLayer({
            id: 'train-lines-layer',
            type: 'line',
            source: 'train-lines',
            paint: {
                'line-color': '#FF0000',
                'line-width': 3
            }
        });
        trainLayer = 'train-lines-layer';

        // Add roads
        map.addSource('roads', {
            type: 'geojson',
            data: roadData
        });
        map.addLayer({
            id: 'roads-layer',
            type: 'line',
            source: 'roads',
            paint: {
                'line-color': '#666666',
                'line-width': 2
            }
        });
        roadLayer = 'roads-layer';

        // Add bike paths
        map.addSource('bike-paths', {
            type: 'geojson',
            data: bikeData
        });
        map.addLayer({
            id: 'bike-paths-layer',
            type: 'line',
            source: 'bike-paths',
            paint: {
                'line-color': '#00FF00',
                'line-width': 2
            }
        });
        bikeLayer = 'bike-paths-layer';

        // Add click handlers for all layers
        map.on('click', 'train-lines-layer', (e) => showPopup(e, 'Train Line'));
        map.on('click', 'roads-layer', (e) => showPopup(e, 'Road'));
        map.on('click', 'bike-paths-layer', (e) => showPopup(e, 'Bike Path'));

    } catch (error) {
        console.error('Error loading layers:', error);
        hideLoading();
    }
}

function showPopup(e, type) {
    const coordinates = e.lngLat;
    const properties = e.features[0].properties;

    new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(`
            <h4>${type}</h4>
            <p>${properties.name || 'Unnamed'}</p>
            ${properties.description ? `<p>${properties.description}</p>` : ''}
        `)
        .addTo(map);
}

function showLoading() {
    document.getElementById('loading').classList.remove('d-none');
}

function hideLoading() {
    document.getElementById('loading').classList.add('d-none');
}

// Event listeners for toggles
document.getElementById('trainToggle').addEventListener('change', (e) => {
    if (trainLayer) {
        map.setLayoutProperty(
            trainLayer,
            'visibility',
            e.target.checked ? 'visible' : 'none'
        );
    }
});

document.getElementById('roadToggle').addEventListener('change', (e) => {
    if (roadLayer) {
        map.setLayoutProperty(
            roadLayer,
            'visibility',
            e.target.checked ? 'visible' : 'none'
        );
    }
});

document.getElementById('bikeToggle').addEventListener('change', (e) => {
    if (bikeLayer) {
        map.setLayoutProperty(
            bikeLayer,
            'visibility',
            e.target.checked ? 'visible' : 'none'
        );
    }
});

// Initialize the map when the page loads
initializeMap();
