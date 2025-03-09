document.addEventListener('DOMContentLoaded', function() {
    console.log('Restaurant Dakar app initialized');
    
    // Données des restaurants pour la carte
    const restaurants = [
        {
            name: "La Parrilla",
            lat: 14.6937,
            lng: -17.4441,
            address: "Centre-ville, près du Palais Présidentiel",
            speciality: "Viande argentine",
            price: "€€€"
        },
        {
            name: "La Calebasse",
            lat: 14.7406,
            lng: -17.5139,
            address: "Les Almadies, Route des Mamelles",
            speciality: "Cuisine sénégalaise",
            price: "€€€"
        },
        {
            name: "Chez Lulu",
            lat: 14.6866,
            lng: -17.4684,
            address: "Fann Résidence, Corniche Ouest",
            speciality: "Cuisine belge",
            price: "€€"
        },
        {
            name: "Le Kermel",
            lat: 14.6629,
            lng: -17.4372,
            address: "Plateau, près du marché Kermel",
            speciality: "Cuisine française",
            price: "€€"
        },
        {
            name: "Chez Fatou Kim",
            lat: 14.7472,
            lng: -17.5218,
            address: "Les Almadies, plage",
            speciality: "Fruits de mer",
            price: "€€"
        },
        {
            name: "Caesar's République",
            lat: 14.6584,
            lng: -17.4362,
            address: "Centre-ville, face au Café de Rome",
            speciality: "Cuisine internationale",
            price: "€"
        },
        {
            name: "Le Mboté",
            lat: 14.6952,
            lng: -17.4536,
            address: "Médina, Rue 6x11",
            speciality: "Dibiterie",
            price: "€"
        },
        {
            name: "Noflaye Beach",
            lat: 14.7453,
            lng: -17.5235,
            address: "Route des Almadies",
            speciality: "Crêpes et galettes",
            price: "€"
        },
        {
            name: "Mood Café",
            lat: 14.7081,
            lng: -17.4879,
            address: "4 Boulevard El Hadji Mbaye",
            speciality: "Brunch",
            price: "€€"
        },
        {
            name: "Matcha Café",
            lat: 14.7036,
            lng: -17.4574,
            address: "Point E",
            speciality: "Sushi",
            price: "€€"
        }
    ];

    // Fonction pour initialiser la carte Google Maps
    function initMap() {
        // Cette fonction sera appelée quand l'API Google Maps sera chargée
        if (typeof google !== 'undefined' && document.getElementById('map-container')) {
            const mapOptions = {
                center: { lat: 14.7167, lng: -17.4677 }, // Centre de Dakar
                zoom: 12,
                styles: [
                    {
                        "featureType": "poi.business",
                        "stylers": [
                            { "visibility": "off" }
                        ]
                    },
                    {
                        "featureType": "road",
                        "elementType": "geometry",
                        "stylers": [
                            { "color": "#f5f1e6" }
                        ]
                    },
                    {
                        "featureType": "water",
                        "elementType": "geometry.fill",
                        "stylers": [
                            { "color": "#b7deed" }
                        ]
                    }
                ]
            };
            
            const map = new google.maps.Map(document.getElementById('map-container'), mapOptions);
            
            // Ajouter les marqueurs pour chaque restaurant
            restaurants.forEach((restaurant, index) => {
                const marker = new google.maps.Marker({
                    position: { lat: restaurant.lat, lng: restaurant.lng },
                    map: map,
                    title: restaurant.name,
                    label: (index + 1).toString()
                });
                
                // Ajouter une info-bulle pour chaque marqueur
                const infoWindow = new google.maps.InfoWindow({
                    content: `
                        <div style="padding: 10px; max-width: 200px;">
                            <h3 style="margin-top: 0; color: #00704A;">${restaurant.name}</h3>
                            <p><strong>Adresse:</strong> ${restaurant.address}</p>
                            <p><strong>Spécialité:</strong> ${restaurant.speciality}</p>
                            <p><strong>Gamme de prix:</strong> ${restaurant.price}</p>
                        </div>
                    `
                });
                
                marker.addListener('click', () => {
                    infoWindow.open(map, marker);
                });
            });
        }
    }
    
    // Fonction pour filtrer les restaurants
    function setupFilters() {
        const filterButtons = document.querySelectorAll('.filter-button');
        if (filterButtons.length > 0) {
            filterButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const filterValue = this.getAttribute('data-filter');
                    
                    // Marquer le bouton actif
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');
                    
                    // Filtrer les restaurants
                    const cards = document.querySelectorAll('.restaurant-card');
                    cards.forEach(card => {
                        if (filterValue === 'all') {
                            card.style.display = 'block';
                        } else {
                            const features = card.querySelectorAll('.feature');
                            let hasFeature = false;
                            
                            features.forEach(feature => {
                                if (feature.textContent.toLowerCase().includes(filterValue.toLowerCase())) {
                                    hasFeature = true;
                                }
                            });
                            
                            card.style.display = hasFeature ? 'block' : 'none';
                        }
                    });
                });
            });
        }
    }
    
    // Exposer les fonctions pour qu'elles soient accessibles globalement
    window.restaurantApp = {
        initMap: initMap,
        setupFilters: setupFilters
    };
    
    // Initialiser les filtres
    setupFilters();
});