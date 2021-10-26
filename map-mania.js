var favoritePlaces = [
    { "foundMessage": "You win!", "defaultHint": "You win!", "score": "10" },
    { "content": "Dubai, UAE", "coordinates": { "lat": 25.276987, "lng": 55.296249 }, "foundMessage": "You found the Dubai, UAE!", "defaultHint": "You are looking in Middle east for the city of UAE", "score": "10" },
    { "content": "Karachi, Pakistan", "coordinates": { "lat": 24.860966, "lng": 66.990501 }, "foundMessage": "You found Karachi, Pakistan!", "defaultHint": "You are looking in SouthEast Asian for the city in Pakistan", "score": "9" },
    { "content": "Makkah, Saudia Arabia", "coordinates": { "lat": 21.389082, "lng": 39.857910 }, "foundMessage": "You found Makkah, Saudia Arabia!", "defaultHint": "You are looking for the Holy city of Muslims in Middle East", "score": "8" },
    { "content": "Canberra, Australia", "coordinates": { "lat": -35.280937, "lng": 149.130005 }, "foundMessage": "You found Canberra, Australia!", "defaultHint": "You are looking for the capital city of Australia", "score": "7" },
    { "content": "Chicago, Illinois", "coordinates": { "lat": 41.878113, "lng": -87.629799 }, "foundMessage": "You found Chicago, Illinois!", "defaultHint": "You are looking for the capital of Illinois", "score": "6" },
    { "content": "Kenosha, Wisconsin", "coordinates": { "lat": 42.588081, "lng": -87.822884 }, "foundMessage": "You found Kenosha, Wisconsin!", "defaultHint": "You are looking in Midwest for the suburb city in Wisconsin", "score": "5" },
    { "content": "New York City, New York", "coordinates": { "lat": 40.730610, "lng": -73.935242 }, "foundMessage": "You found New York Ciy, NY!", "defaultHint": "You are looking for another one of the most attractive city for tourists with huge buildings in USA", "score": "4" },
    { "content": "Florida City, Florida", "coordinates": { "lat": 25.761681, "lng": -80.191788 }, "foundMessage": "You found Miami City, Florida!", "defaultHint": "You are looking for one of the most attractive city by shorline for tourists in USA", "score": "3" },
    { "content": "Lewis University", "coordinates": { "lat": 41.6050, "lng": -88.0806 }, "foundMessage": "You found Lewis University!", "defaultHint": "You are looking for a university in Illinois", "score": "2" },
    { "content": "Los Angeles, California", "coordinates": { "lat": 34.052235, "lng": -118.243683 }, "foundMessage": "You found Los Angeles, California!", "defaultHint": "You are looking for a city of rich and famous people in USA", "score": "1" }
];


var currentPlaceIndex = favoritePlaces.length - 1;

var currentPlace = favoritePlaces[currentPlaceIndex];

function initApplication() {
    console.log('Map Mania Version Two - Starting! ');

    var help = document.getElementById('helpID');
    help.style.display = "block";

}

function initMap() {
    googleMap = new google.maps.Map(document.getElementById("googleMapID"), {
        "center": { "lat": 40, "lng": -88 },
        "zoom": 4
    });

    google.maps.event.addListener(googleMap, 'idle', function() { updateGame() });

}

function updateGame() {
    console.log("updateGame()");

    var zoomLevel = googleMap.getZoom();
    console.log("Zoom Level:" + zoomLevel);

    var inBounds = false;
    console.log("coords:" + JSON.stringify(currentPlace.coordinates));
    if (googleMap.getBounds().contains(currentPlace.coordinates)) {
        var inBounds = true;
        console.log("Inbounds");
    }

    if ((zoomLevel > 6) && (inBounds)) {
        console.log("Found!!!");
        addMarker(currentPlace);
        nextPlace();
    }


    if (currentPlace == favoritePlaces[0]) {
        document.getElementById("score").innerHTML = "Score: " + favoritePlaces[0].score;
        document.getElementById("defaulthint").innerHTML = "";
        document.getElementById("message").innerHTML = favoritePlaces[0].foundMessage;


    }

}

function autoWin() {
    for (i = 0; i < favoritePlaces.length; i++) {
        addMarker(favoritePlaces[i])

    }
    document.getElementById("score").innerHTML = "Score: " + favoritePlaces[0].score;
    document.getElementById("defaulthint").innerHTML = "";
    document.getElementById("message").innerHTML = favoritePlaces[0].foundMessage;

}


function resetLocation() {
    googleMap.setZoom(4)

}

function nextPlace() {
    currentPlaceIndex--;
    currentPlace = favoritePlaces[currentPlaceIndex];
    resetLocation();

}

function myDefaultHint() {
    document.getElementById("defaulthint").innerHTML = currentPlace.defaultHint;

}

function addMarker(markerContent) {
    var marker = new google.maps.Marker({ position: markerContent.coordinates, map: googleMap, animation: google.maps.Animation.DROP });


    if (markerContent.content) {
        var infoWindow = new google.maps.InfoWindow({ "content": markerContent.content });
        marker.addListener("click", function() { infoWindow.open(googleMap, marker) });
    }



    if (markerContent.foundMessage) {
        document.getElementById("message").innerHTML = markerContent.foundMessage;
        console.log(markerContent.foundMessage)

    }


    if (markerContent.score) {
        document.getElementById("score").innerHTML = "Score: " + markerContent.score;
        console.log(markerContent.score)
    }

    document.getElementById("defaulthint").innerHTML = "";


}

function closeHelp() {
    var help = document.getElementById('helpID');
    help.style.display = "none";
}