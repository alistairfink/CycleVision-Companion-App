// API Key
const API_KEY = 'AIzaSyB077uo46fGMiZLC8gdZcS353sbTAzzN28';

// URLs
const SearchNearbyURL =
	'https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=' +
	API_KEY +
	'&rankby=distance';

class GoogleApiUtility {
	static async SearchNearby(keyword, currLat, currLong) {
		let currURL = `${SearchNearbyURL}&keyword=${keyword}&location=${currLat},${currLong}`;
		return await fetch(currURL)
			.then(response => response.json())
			.then(json => json);
	}
}

export default GoogleApiUtility;
