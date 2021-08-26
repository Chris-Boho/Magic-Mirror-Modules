Module.register("MMM-Hide",{
    defaults: {},
    start: function () {
        console.log("MMM-Hide is starting...");
    },
	getStyles: function() {
		return ["hide_styles.css"];
	},
	
	getDom: function() {
        //Main Wrapper
		var wrapper = document.createElement("div");
		
        //Sub Wrappers
        var button = document.createElement("div");
		var text = document.createElement("span");
		var overlay = document.createElement("div");
		var hidden = true;
		
        //Class Names
		//overlay.className = "paint-it-black";
		button.className = "hide-toggle";
        text.className = "button-text";

        //Set Content of Wrappers
		text.innerHTML = "Hide";
        overlay.style.zIndex = "99";
        overlay.style.position = "fixed";
        overlay.style.top = "-2000px";
        overlay.style.bottom = "0px";
        overlay.style.right = "0px";
        overlay.style.left = "-1500px";
        overlay.style.width = "4000px";
        overlay.style.height = "3000px";
        overlay.style.opacity = "0.0";
        overlay.style.backgroundColor = "red";

        function hide_modules(){
            if (hidden == true) {
                
                overlay.style.opacity = "0.0";
                text.innerHTML = "Show";
                hidden = false;
            } else {
                
                overlay.style.opacity = "1.0";
                text.innerHTML = "Hide";
                hidden = true;
            }
        }

        button.addEventListener('click', () => hide_modules());
		
        //Append Sub Wrappers to Main Wrapper
        wrapper.appendChild(button);
            button.appendChild(text);
		wrapper.appendChild(overlay);

		return wrapper;
	}
});