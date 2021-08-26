var is_drawing = false;
var myX = 0;
var myY = 0;

Module.register("MMM-Canvas", {
    defaults: {},
    start: function () {
        console.log("MMM-Canvas is starting...");
    },
    getStyles: function () {
        return ["canvas_styles.css"];
    },
    getDom: function() {
        //Main Wrapper
        var wrapper = document.createElement("div");

        //Sub Wrapper 
        var myArea_wrapper = document.createElement("div");
            var field_wrapper = document.createElement("div");
                var canvas_wrapper = document.createElement("canvas");
                var tools_wrapper = document.createElement("div");
                    var undo_wrapper = document.createElement("button");
                    var clear_wrapper = document.createElement("button");

                    var red_wrapper = document.createElement("div");
                    var blue_wrapper = document.createElement("div");
                    var green_wrapper = document.createElement("div");
                    var yellow_wrapper = document.createElement("div");

                    var colorInput_wrapper = document.createElement("input");
                    var rangeInput_wrapper = document.createElement("input");

        //Set Attributes
        myArea_wrapper.className = "myArea";
            field_wrapper.className = "field";
                canvas_wrapper.id = "canvas";
                tools_wrapper.className = "tools";
                    undo_wrapper.className = "button";
                    undo_wrapper.type = "button";

                    clear_wrapper.className = "button";
                    clear_wrapper.type = "button";

                    red_wrapper.className = "color-field";
                    red_wrapper.style.backgroundColor = "red";

                    blue_wrapper.className = "color-field";
                    blue_wrapper.style.backgroundColor = "blue";

                    green_wrapper.className = "color-field";
                    green_wrapper.style.background = "green";

                    yellow_wrapper.className = "color-field";
                    yellow_wrapper.style.backgroundColor = "yellow";
                    
                    colorInput_wrapper.className = "color-picker";
                    colorInput_wrapper.type = "color";

                    rangeInput_wrapper.className = "pen-range";
                    rangeInput_wrapper.type = "range";
                    rangeInput_wrapper.min = "1";
                    rangeInput_wrapper.max = "100";
        
        //Set Wrapper content
        undo_wrapper.innerText = "Undo";
        clear_wrapper.innerText = "Clear";

        red_wrapper.innerText = "red";
        blue_wrapper.innerText = "blue";
        green_wrapper.innerText = "green"; 
        yellow_wrapper.innerText = "yellow";

        //Canvas - Color -- white in this case
        const context = canvas_wrapper.getContext("2d");
        context.fillStyle = "white";
        context.fillRect(0,0, canvas_wrapper.width, canvas_wrapper.height);

        //Pen Attributes
        // let draw_color = "blue";
        // let draw_width = "2";
        

        //Canvas Touch
        // canvas_wrapper.addEventListener("touchstart", start, false);
        // canvas_wrapper.addEventListener("touchmove", draw, false);

        //Canvas Mouse
        canvas_wrapper.addEventListener("mousedown", e => {
            myX = e.offsetX;
            myY = e.offsetY;
            is_drawing = true
        });

        canvas_wrapper.addEventListener("mousemove", e => {
            if (is_drawing === true) {
                drawLine(context, myX, myY, e.offsetX, e.offsetY);
                myX = e.offsetX;
                myY = e.offsetY;
            }
        });

        window.addEventListener("mouseup", e => {
            if (is_drawing === true) {
                drawLine(context, myX, myY, e.offsetX, e.offsetY);
                myX = 0;
                myY = 0;
                is_drawing = false;
            }
        });

        function drawLine(context, x1, y1, x2, y2) {
            context.beginPath();
            context.strokeStyle = 'black';
            context.lineWidth = 1;
            context.moveTo(x1, y1);
            context.lineTo(x2, y2);
            context.stroke();
            context.closePath();
        }

        // function start(event){
        //     console.log("START FUNCTION");
        //     is_drawing = true;
        //     context.beginPath();
        //     context.moveTo(event.clientX - canvas_wrapper.offsetLeft, event.clientY - canvas_wrapper.offsetTop);
        //     event.preventDefault();
        // }

        // function draw(event){
        //     console.log("DRAW FUNCTION");
        //     if (is_drawing) {
        //         context.lineTo(event.clientX - canvas_wrapper.offsetLeft, event.clientY - canvas_wrapper.offsetTop);
        //         context.strokeStyle = draw_color;
        //         context.lineWidth = draw_width;
        //         context.lineCap = "round";
        //         context.lineJoin = "round";
        //         context.stroke();
        //         console.log("IS DRAWING");
        //     }
        // }
        
        //Append Sub Wrappers to Main Wrapper
        wrapper.appendChild(myArea_wrapper);
            myArea_wrapper.appendChild(field_wrapper);
                field_wrapper.appendChild(canvas_wrapper);
                field_wrapper.appendChild(tools_wrapper);
                    tools_wrapper.appendChild(undo_wrapper);
                    tools_wrapper.appendChild(clear_wrapper);
                    tools_wrapper.appendChild(red_wrapper);
                    tools_wrapper.appendChild(blue_wrapper);
                    tools_wrapper.appendChild(green_wrapper);
                    tools_wrapper.appendChild(yellow_wrapper);
                    tools_wrapper.appendChild(colorInput_wrapper);
                    tools_wrapper.appendChild(rangeInput_wrapper);

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