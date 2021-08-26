var bored_clicked = false;
var myActivity = " ";

Module.register("MMM-Bored", {
    defaults: {},
    start: function () {
        console.log("MMM-Bored is starting...");
    },
    getStyles: function () {
        return ["myBored_styles.css"];
    },
    getDom: function() {
        //Main Wrapper
        var wrapper = document.createElement("div");

        //Sub Wrappers
        var bored_wrapper = document.createElement("div");
            var myButton_wrapper = document.createElement("button");
        var myResponse_wrapper = document.createElement("span");
        var botResponse_wrapper = document.createElement("span");

        //Class Names
        bored_wrapper.className = "bored";
            myButton_wrapper.className = "myButton";
        myResponse_wrapper.className = "myResponse";
        botResponse_wrapper.className = "botResponse";
        
        //Set Contents of Wrappers
        myButton_wrapper.innerText = "I'm Bored!";
        myResponse_wrapper.innerText = "Why don't you:";

        if (bored_clicked === false) {
            botResponse_wrapper.innerText = "...";
        } else {
            botResponse_wrapper.innerText = myActivity;
        }

        function grabActivity(){
            var url = "https://www.boredapi.com/api/activity?participants=1";
    
            fetch(url)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    myActivity = data.activity;
                })
    
            this.bored_clicked = true;
        }
        
        myButton_wrapper.addEventListener('click',  () => grabActivity());

        console.log(myActivity);

        //Append Sub Wrappers to Main Wrapper
        wrapper.appendChild(bored_wrapper);
            bored_wrapper.appendChild(myButton_wrapper);
        wrapper.appendChild(myResponse_wrapper);
        wrapper.appendChild(botResponse_wrapper);

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