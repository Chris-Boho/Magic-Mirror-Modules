Module.register("MMM-SimpleWeather", {
    defaults: {},
    start: function () {
        console.log("THE SIMPLE WEATHER MODULE IS STARTING!!!!");
        this.appID = "9ee6f6cb32f0d62f32fb20f5b7ea1634";
        this.city = "miami";
        this.units = "imperial";
        this.location_city = null;
        this.temp_degree = null;
        this.temp_descp = null;
        this.icon_id = null;

        //this.refreshWeather();

    },
    getStyles: function () {
        return ["myweather_styles.css"];
    },
    getDom: function() {
        //Main Wrappers
        var wrapper = document.createElement("div");
        
        //Sub - Wrappers
        var locationWrapper = document.createElement("div");
            var location_timezone_wrapper = document.createElement("h1");
            var iconWrapper = document.createElement("img");
        var temperatureWrapper = document.createElement("div");
            var temperature_degree_section_wrapper = document.createElement("div");
                var temperature_degree_wrapper = document.createElement("h2");
                var temperature_symbol_wrapper = document.createElement("span");
            var temperature_description_wrapper = document.createElement("div");

        //Style Wrappers - Class Names
        locationWrapper.className = "location";
            location_timezone_wrapper.className = "location-timezone";
            iconWrapper.className = "icon";
        temperatureWrapper.className = "temperature";
            temperature_degree_section_wrapper.className = "degree-section";
                temperature_degree_wrapper.className = "temperature-degree";
                temperature_symbol_wrapper.className = "temperature-symbol";
            temperature_description_wrapper.className = "temperature-description";

        //Set Content of Wrappers
        location_timezone_wrapper.innerText = this.location_city;
        iconWrapper.src = this.icon_id;

        temperature_degree_wrapper.innerText = this.temp_degree;
        temperature_symbol_wrapper.innerText = "F";
        temperature_description_wrapper.innerText = this.temp_descp;

        //Append wrappers to Main Wrapper
        wrapper.appendChild(locationWrapper);
            locationWrapper.appendChild(location_timezone_wrapper);
            locationWrapper.appendChild(iconWrapper);
        wrapper.appendChild(temperatureWrapper);
            temperatureWrapper.appendChild(temperature_degree_section_wrapper);
                temperature_degree_section_wrapper.appendChild(temperature_degree_wrapper);
                temperature_degree_section_wrapper.appendChild(temperature_symbol_wrapper);
            temperatureWrapper.appendChild(temperature_description_wrapper);
        
        let celsius = (this.temp_degree - 32) * (5 / 9);

        function changeDegree(){
            if(temperature_symbol_wrapper.innerText === "F"){
                temperature_symbol_wrapper.innerText = "C";
                temperature_degree_wrapper.innerText = celsius.toFixed(2);
            } else {
                temperature_symbol_wrapper.innerText = "F";
            }
        }

        //Clickable Temperature 
        temperature_degree_section_wrapper.addEventListener("click", () => changeDegree());
        
        return wrapper;

        
      },
      
    notificationReceived: function(notification, payload, sender) {
        switch(notification) {
            case "DOM_OBJECTS_CREATED":
              var timer = setInterval(()=>{
                this.updateDom()
                this.refreshWeather();
              }, 1000)
              break
          }
      },
      
    socketNotificationReceived: function(notification, payload) {},

    refreshWeather: function(){
        var url = "http://api.openweathermap.org/data/2.5/weather?q=" + this.city + "&units=" + this.units + "&appid=" + this.appID;
        
        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.location_city = data.name;
                this.temp_degree = data.main.temp;
                this.temp_descp = data.weather[0].description;
                this.icon_id = "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";


            })
    },

  })