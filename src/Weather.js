import React from 'react';
import {
	WiCloud, WiDayHaze, WiDayRain, WiNightAltRainMix, WiSnowflakeCold, WiCloudyWindy, WiDaySunnyOvercast, WiDaySunny
} from 'weather-icons-react';

export default function Weather({ weatherMood }) {

	let TAG;
	console.log(typeof weatherMood);
	console.log(weatherMood);

	switch (weatherMood) {
		case "Haze": {
			TAG = WiDayHaze;
			break;
		}
		case "Rain": {
			TAG = WiDayRain;
			break;
		}
		case "Snowy": {
			TAG = WiSnowflakeCold;
			break;
		}
		case "Windy": {
			TAG = WiCloudyWindy;
			break;
		}
		case "Sunny": {
			TAG = WiDaySunnyOvercast;
			break;
		}
		case "Clear": {
			TAG = WiDaySunny;
			break;
		}
		default: {
			TAG = WiCloud;
			break;
		}
	}

	return (

		<TAG size={160} color='#000'></TAG>
	);
}
