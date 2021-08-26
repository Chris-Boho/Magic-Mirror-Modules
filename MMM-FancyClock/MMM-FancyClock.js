Module.register("MMM-FancyClock", {
    defaults: {},
    start: function () {
        console.log("MMM-FancyClock is starting...");
    },
    getStyles: function () {
        return ["FancyClock_styles.css"];
    },
    getDom: function() {
        //Main Wrapper
        var wrapper = document.createElement("div");

        //Sub Wrappers
        var myBody_wrapper = document.createElement("div");
            var clock_wrapper = document.createElement("div");
                var heading_wrapper = document.createElement("h2");
                var time_wrapper = document.createElement("div");
                    var hour_div_wrapper = document.createElement("div");
                        var hour_num_wrapper = document.createElement("span");
                        var hour_text_wrapper = document.createElement("span");
                    var min_div_wrapper = document.createElement("div");
                        var min_num_wrapper = document.createElement("span");
                        var min_text_wrapper = document.createElement("span");
                    var sec_div_wrapper = document.createElement("div");
                        var sec_num_wrapper = document.createElement("span");
                        var sec_text_wrapper = document.createElement("span");

        //Set Attributes
        myBody_wrapper.className = "myBody";
            clock_wrapper.className = "clock";
            heading_wrapper.className = "heading";
            time_wrapper.className = "time";
                hour_div_wrapper.className = "time_div"
                    hour_num_wrapper.className = "time_span";
                    hour_text_wrapper.className = "time_span";
                min_div_wrapper.className = "time_div"
                    min_num_wrapper.className = "time_span";
                    min_text_wrapper.className = "time_span";
                sec_div_wrapper.className = "time_div"
                    sec_num_wrapper.className = "time_span";
                    sec_text_wrapper.className = "time_span";

        //Get Current Time
        var date = new Date();
            var h = date.getHours();    // 0 - 23
            var m = date.getMinutes();  // 0 - 59
            var s = date.getSeconds();  // 0 - 59
            var session = "AM";


            if(h == 0){
                h = 12;
            }
            if (h > 12) {
                h = h - 12;
                session = "PM";
            }

            //This  can be rewritten as the following...
            // if (h < 10) {
            //     h = "0" + h;
            // }
            // if (m < 10) {
            //     m = "0" + m;
            // }
            // if (s < 10) {
            //     s = "0" + s;
            // }

            h = (h < 10) ? "0" + h : h;
            m = (m < 10) ? "0" + m : m;
            s = (s < 10) ? "0" + s : s;

        //Set Content
        heading_wrapper.innerText = "The Time is Now";

        hour_num_wrapper.innerText = "h";
        hour_text_wrapper.innerText = "Hour";

        min_num_wrapper.innerText = "m";
        min_text_wrapper.innerText = "Minute";

        sec_num_wrapper.innerText = "s";
        sec_text_wrapper.innerText = "Second";

        //Append Sub Wrappers to Main Wrappers
        wrapper.appendChild(myBody_wrapper);
            myBody_wrapper.appendChild(clock_wrapper);
                clock_wrapper.appendChild(heading_wrapper);
                clock_wrapper.appendChild(time_wrapper);
                    time_wrapper.appendChild(hour_div_wrapper);
                        hour_div_wrapper.appendChild(hour_num_wrapper);
                        hour_div_wrapper.appendChild(hour_text_wrapper);
                    time_wrapper.appendChild(min_div_wrapper);
                        min_div_wrapper.appendChild(min_num_wrapper);
                        min_div_wrapper.appendChild(min_text_wrapper);
                    time_wrapper.appendChild(sec_div_wrapper);
                        sec_div_wrapper.appendChild(sec_num_wrapper);
                        sec_div_wrapper.appendChild(sec_text_wrapper);

        return wrapper;
    },
    notificationReceived: function(notification, payload, sender) {
        switch(notification) {
            case "DOM_OBJECTS_CREATED":
              var timer = setInterval(()=>{
                this.updateDom()
              }, 1000)
              break
          }
    },
    socketNotificationReceived: function() {},
  })
  