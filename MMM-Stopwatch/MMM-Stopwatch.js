var currentTimer = 0;
var interval = 0;
var lastUpdateTime = new Date().getTime;
var clicked = false;

Module.register("MMM-Stopwatch", {
    defaults: {},
    start: function () {
        console.log("MMM-Stopwatch is starting...");
    },
    getStyles: function () {
        return ["stopwatch_styles.css"];
    },
    getDom: function() {
        //Main Wrapper
        var wrapper = document.createElement("div");

        //Sub Wrappers
        var stopwatch_wrapper = document.createElement("div");
            var controls_wrapper = document.createElement("div");
                var start_wrapper = document.createElement("button")
                var stop_wrapper = document.createElement("button")
                var reset_wrapper = document.createElement("button");
            var display_wrapper = document.createElement("div");
                var minutes_wrapper = document.createElement("span");
                var seconds_wrapper = document.createElement("span");
                var centiseconds_wrapper = document.createElement("span");
            
        //Class Names
        stopwatch_wrapper.className = "stopwatch";
            controls_wrapper.className = "controls";
                start_wrapper.className = "start";
                stop_wrapper.className = "stop";
                reset_wrapper.className = "reset";
            display_wrapper.className = "display";
                minutes_wrapper.className = "minutes";
                seconds_wrapper.className = "seconds";
                centiseconds_wrapper.className = "centiseconds";
            
        //Set Content of Wrappers
        start_wrapper.innerText = "Start";
        stop_wrapper.innerText = "Stop";
        reset_wrapper.innerText = "Reset";

        if (clicked == false) {
            minutes_wrapper.innerText = "00";
            seconds_wrapper.innerText = "00";
            centiseconds_wrapper.innerText = "00";
        } else {
            update();
        }
        
        //Append sub wrappers to main wrapper
        wrapper.appendChild(stopwatch_wrapper);
            stopwatch_wrapper.appendChild(controls_wrapper);
                controls_wrapper.appendChild(start_wrapper);
                controls_wrapper.appendChild(stop_wrapper);
                controls_wrapper.appendChild(reset_wrapper);
            stopwatch_wrapper.appendChild(display_wrapper);
                display_wrapper.appendChild(minutes_wrapper);
                display_wrapper.appendChild(seconds_wrapper);
                display_wrapper.appendChild(centiseconds_wrapper);

        console.log("getDom done...");

        //Stopwatch 
        var ss = document.getElementsByClassName('stopwatch');

        [].forEach.call(ss, function (s){
            
            start_wrapper.addEventListener('click', startTimer);
            stop_wrapper.addEventListener('click', stopTimer);
            reset_wrapper.addEventListener('click', resetTimer);

            console.log("CurrentTimer = " + currentTimer);

            function pad(n){
                return ('00' + n).substr(-2);
            }

            function update(){
                var now = new Date().getTime();
                var dt = now - lastUpdateTime;

                currentTimer += dt;

                var time = new Date(currentTimer);

                minutes_wrapper.innerText = pad(time.getMinutes());
                seconds_wrapper.innerText = pad(time.getSeconds());
                centiseconds_wrapper.innerText = pad(Math.floor(time.getMilliseconds() / 10));

                lastUpdateTime = now;
            }

            function startTimer(){
                if(!interval){
                    lastUpdateTime = new Date().getTime();
                    interval = setInterval(update, 1);
                }
                
                clicked = true;
            }

            function stopTimer(){
                clearInterval(interval);
                interval = 0;

                clicked = true;
            }

            function resetTimer(){
                stopTimer();
                currentTimer = 0;

                minutes_wrapper.innerText = seconds_wrapper.innerText = centiseconds_wrapper.innerText = pad(0);

                clicked = true;
            }
        })

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