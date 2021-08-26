Module.register("MMM-SimpleClock", {
    defaults: {},
    start: function () {},

    getStyles: function () {
        return ["myclock_styles.css"];
    },

    getDom: function() {
        var element = document.createElement("div");
        element.className = "clock";

        function showTime(){
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

            var time = h + ":" + m + ":" + s + " " + session;

            element.innerHTML = time;
            //element.innerText = time;

        }

        showTime();


        return element;
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