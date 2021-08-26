var isDrawing = false;
var x = 0;
var y = 0;

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
        var canvas_wrapper = document.createElement("canvas");

        //Set Attributes
        canvas_wrapper.id = "myPics";
        
        const context = canvas_wrapper.getContext('2d');

        function getCursorPosition(canvas, event) {
            const rect = canvas.getBoundingClientRect()
            const x = event.clientX - rect.left
            const y = event.clientY - rect.top
            console.log("x: " + x + " y: " + y)
            context.fillRect(x,y,1,1);
            
        }
        
        
        canvas_wrapper.addEventListener('mousedown', function(e) {
            getCursorPosition(canvas_wrapper, e)
        })

        // Add the event listeners for mousedown, mousemove, and mouseup
        // canvas_wrapper.addEventListener('mousedown', e => {
        //     x = e.offsetX;
        //     y = e.offsetY;
        //     isDrawing = true;
        // });
        
        // canvas_wrapper.addEventListener('mousemove', e => {
        //     if (isDrawing === true) {
        //     drawLine(context, x, y, e.offsetX, e.offsetY);
        //     x = e.offsetX;
        //     y = e.offsetY;
        //     }
        // });
        
        // window.addEventListener('mouseup', e => {
        //     if (isDrawing === true) {
        //     drawLine(context, x, y, e.offsetX, e.offsetY);
        //     x = 0;
        //     y = 0;
        //     isDrawing = false;
        //     }
        // });
        
        // function drawLine(context, x1, y1, x2, y2) {
        //     context.beginPath();
        //     context.strokeStyle = 'black';
        //     context.lineWidth = 1;
        //     context.moveTo(x1, y1);
        //     context.lineTo(x2, y2);
        //     context.stroke();
        //     context.closePath();
        // }

        //Append Sub Wrappers to Main Wrapper
        wrapper.appendChild(canvas_wrapper);

        return wrapper;
    },
    notificationReceived: function() {},
    socketNotificationReceived: function() {},
  })