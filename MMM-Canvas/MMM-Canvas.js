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
                    var erase_wrapper = document.createElement("button");
                    var clear_wrapper = document.createElement("button");

                    var red_wrapper = document.createElement("div");
                    var blue_wrapper = document.createElement("div");
                    var green_wrapper = document.createElement("div");
                    var yellow_wrapper = document.createElement("div");

                    var input_wrapper = document.createElement("div");

                        var colorInput_wrapper = document.createElement("input");
                        var rangeInput_wrapper = document.createElement("input");

        //Set Attributes
        myArea_wrapper.className = "myArea";
            field_wrapper.className = "field";
                canvas_wrapper.id = "canvas";
                tools_wrapper.className = "tools";
                    erase_wrapper.className = "button";
                    erase_wrapper.type = "button";

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
                    
                    input_wrapper.className = "inputs";

                        colorInput_wrapper.className = "color-picker";
                        colorInput_wrapper.type = "color";

                        rangeInput_wrapper.className = "pen-range";
                        rangeInput_wrapper.type = "range";
                        rangeInput_wrapper.min = "1";
                        rangeInput_wrapper.max = "100";
        
        //Pen Attributes
        let draw_color = "black";
        let draw_width = "2";

        //Set Wrapper content
        erase_wrapper.innerText = "Erase";
        clear_wrapper.innerText = "Clear";
        rangeInput_wrapper.value = "2";

        //Color-Picker Buttons
        clear_wrapper.addEventListener("click", () => clear_canvas());
        erase_wrapper.addEventListener("click", () => erase_brush());

        red_wrapper.addEventListener("click", () => changeColor(red_wrapper));
        blue_wrapper.addEventListener("click", () => changeColor(blue_wrapper));
        green_wrapper.addEventListener("click", () => changeColor(green_wrapper));
        yellow_wrapper.addEventListener("click", () => changeColor(yellow_wrapper));

        colorInput_wrapper.addEventListener("input", () => changeColor(colorInput_wrapper));
        rangeInput_wrapper.addEventListener("input", () => changeDrawWidth());

        function changeColor(element){
            draw_color = element.style.backgroundColor;

            if (element == colorInput_wrapper) {
                draw_color = colorInput_wrapper.value;
            }
        }

        function changeDrawWidth(){
            draw_width = rangeInput_wrapper.value;
        }

        function clear_canvas(){
            context.fillStyle = "white";
            context.clearRect(0,0, canvas_wrapper.width, canvas_wrapper.height);
            context.fillRect(0,0, canvas_wrapper.width, canvas_wrapper.height);
        }

        function erase_brush(){
            draw_color = "white";
        }

        //Canvas - Attributes
        canvas_wrapper.setAttribute('width', '525');
        canvas_wrapper.setAttribute('height', '400');

        const context = canvas_wrapper.getContext("2d");
        context.fillStyle = "white";
        context.fillRect(0,0, canvas_wrapper.width, canvas_wrapper.height);

        

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
            context.strokeStyle = draw_color;
            context.lineWidth = draw_width;
            context.lineCap = "round";
            context.lineJoin = "round";
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
                    tools_wrapper.appendChild(erase_wrapper);
                    tools_wrapper.appendChild(clear_wrapper);
                    tools_wrapper.appendChild(red_wrapper);
                    tools_wrapper.appendChild(blue_wrapper);
                    tools_wrapper.appendChild(green_wrapper);
                    tools_wrapper.appendChild(yellow_wrapper);
                    tools_wrapper.appendChild(input_wrapper);
                        input_wrapper.appendChild(colorInput_wrapper);
                        input_wrapper.appendChild(rangeInput_wrapper);

        return wrapper;


    },
    notificationReceived: function(notification, payload, sender) {
        // switch(notification) {
        //     case "DOM_OBJECTS_CREATED":
        //       var timer = setInterval(()=>{
        //         this.updateDom()
        //       }, 1000)
        //       break
        //   }
    },
    socketNotificationReceived: function() {},
  })