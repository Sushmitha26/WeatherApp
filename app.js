window.addEventListener("load",()=>{
	let long;
	let lat;
	let tempDescription=document.querySelector('.temp-description');
	let tempDegree=document.querySelector('.temp-degree');
	let locationTimeZone=document.querySelector('.location-timezone');
	let iconElement=document.querySelector(".weather-icon");
	let temperatureSection=document.querySelector(".temperature");
	let temperatureSpan=document.querySelector(".temperature span");
	let notifyElement=document.querySelector(".notification");
	
	//const weather={};
	
	//checks if device's location is allowed to access
	if(navigator.geolocation){
		//returns curretn position and put into variable 'position'
		navigator.geolocation.getCurrentPosition(position=>{
			console.log(position);
			//coords=>co-ordinates
			long=position.coords.longitude;
			lat=position.coords.latitude;
			const api=`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=15fca3edbc515f9f6c77c3f66ec61cb0`;
			
			//getting data from server down to you using fetch
			fetch(api) 
			//it might take some time to get data from server to you, so use then,means after u get data,run this function
			//JSON is often used when data is sent from a server to a web page,taking the data and convert it to json,a convention becos with json,it is easy to use data
				.then(response => {
				return response.json();
				})
			
				.then(data => {
					console.log(data);
				//to pull out all info from main
					const {temp} = data.main;
				//sets DOM elements from the API
				//tempDegree.textContent=Math.round((temp-273) * 100) / 100;
				tempDegree.textContent=(temp-273).toFixed(2);
				tempDescription.textContent=data.weather[0].description;
				locationTimeZone.textContent=data.name + "/" + data.sys.country;
				iconElement.innerHTML=`<img src="icons/${data.weather[0].icon}.png">`;
				
				//Fahreneit conversion
				let fahreneit=(((temp-273).toFixed(2))*(9/5))+32;
				//onclicking,change temperature from c to F
				temperatureSection.addEventListener("click",()=>{
					if(temperatureSpan.textContent==="ºC") {
						temperatureSpan.textContent="ºF";
						tempDegree.textContent=fahreneit.toFixed(2);
					}
					else{
						temperatureSpan.textContent="ºC";
						tempDegree.textContent=(temp-273).toFixed(2);
					}
				})
				
				});
		});	
	}
	else{
		notifyElement.style.display="block";
		notifyElement.innerHTML="<p>Browser doesn't support geolocation</p>";
	}
});























