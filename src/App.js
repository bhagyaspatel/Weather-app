import './App.css';
import { useEffect, useState } from 'react';
import { WiStrongWind, WiSunset, WiHumidity, WiFlood } from 'weather-icons-react';
import Weather from './Weather';
var format = require('date-format');

function App() {

	const [data, setData] = useState({});
	const [input, setInput] = useState('surat');
	const [weatherIcon, setWeatherIcon] = useState("");

	const fetchData = async () => {
		try {
			let url = `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=8ea49feae52ff6536312f38252e4f07e`;
			let response = await fetch(url);
			let myData = await response.json();

			let { temp, pressure, humidity } = myData.main;
			let { speed: wind } = myData.wind;
			let { main: weatherMood } = myData.weather[0];
			let { name } = myData;
			let { country, sunset } = myData.sys;


			let date = new Date(sunset * 1000);
			let timeStr = `${date.getHours()} : ${date.getMinutes()}`;

			const myObj = {
				temp,
				pressure,
				humidity,
				wind,
				weatherMood,
				timeStr,
				name,
				country,
			};
			setData(myObj);
		}
		catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const handleSubmit = (event) => {
		event.preventDefault();
		if (input) {
			console.log(input);
			console.log("handleSubmit");
			fetchData();
			setInput('');
		}
		else {
			//...TODO 
		}
	};

	return (
		<main>
			<div className="content">
				<form className="search" onSubmit={handleSubmit}>
					<input type='text' placeholder='Search city' value={input} onChange={(e) =>
						setInput(e.target.value)}></input>
					<button className="btn" type='submit'>Search</button>
				</form>

				<div className='card'>
					<div className="icon-big">
						<Weather weatherMood={data.weatherMood} />
					</div>

					<div className="row2">
						<div className="black">
							<div className="temp">
								<h3>{data.temp}°</h3>
							</div>
							<div className="place">
								<h1>{data.weatherMood}</h1>
								<h3>{data.name},{data.country}</h3>
							</div>
						</div>
						<div className="green">
							<div className="time">
								<h2>{format.asString('dd-MM-yyyy', new Date())}</h2>
								<h2>{format.asString('hh:mm', new Date())}</h2>
							</div>
							<div></div>
						</div>
					</div>

					<div className="four-col">
						<div className="col">
							<div className="icon">
								<WiSunset size={44} color='#000'></WiSunset>
							</div>
							<div className="text">
								<h4>{data.timeStr}</h4>
								<h4>Sunset</h4>
							</div>
						</div>
						<div className="col">
							<div className="icon">
								<WiHumidity size={44} color='#000'></WiHumidity>
							</div>
							<div className="text">
								<h4>{data.humidity}</h4>
								<h4>Humidity</h4>
							</div>
						</div>
						<div className="col">
							<div className="icon">
								<WiFlood size={44} color='#000'></WiFlood>
							</div>
							<div className="text">
								<h4>{data.pressure}</h4>
								<h4>Pressure</h4>
							</div>
						</div>
						<div className="col">
							<div className="icon">
								<WiStrongWind size={44} color='#000'></WiStrongWind>
							</div>
							<div className="text">
								<h4>{data.wind}</h4>
								<h4>Wind</h4>
							</div>
						</div>
					</div>
				</div>
			</div>

		</main>

	);
}

export default App;
