/*
 * Heavliy stripped down version of SpryMap
 * candrews.net/blog/2010/10/introducing-sprymap
 */
function Map(id) {    
    var self = this;
	
    self.map = document.getElementById(id);
    self.scrollTime = 500;
    self.mousePosition = {x: 0, y: 0};
    self.mouseLocations = [];
    self.velocity = {x:0 , y: 0};
    self.mouseDown = false;
    self.timerId = -1;
    self.timerCount = 0;
	self.map.style.left = "0px";
	self.map.style.top = "0px";


    var OnScrollTimer = function () {
        if(self.mouseDown) {
            self.mouseLocations.unshift({x: self.mousePosition.x,
										y: self.mousePosition.y});
            
            // Make sure that we're only keeping track of the last 10 mouse clicks (just for efficiency)
            if(self.mouseLocations.length > 10)
                self.mouseLocations.pop();
        } else {
            var totalTics = self.scrollTime / 20;

            var fractionRemaining = (totalTics - self.timerCount) / totalTics;
            
            var xVelocity = self.velocity.x * fractionRemaining;
            var yVelocity = self.velocity.y * fractionRemaining;
            
            self.map.style.left = (-xVelocity + parseInt(self.map.style.left, 10)) + "px",
            self.map.style.top = (-yVelocity + parseInt(self.map.style.top, 10)) + "px";

            // Only scroll for 20 calls of this function
            if(self.timerCount == totalTics) {
                clearInterval(self.timerId);
                self.timerId = -1
            }

            ++self.timerCount;
        }
    };
	
	
    document.onmousemove = function (b) {
		if(self.mouseDown) {
			var e = b.clientX - self.mousePosition.x + parseInt(self.map.style.left, 10),
				d = b.clientY - self.mousePosition.y + parseInt(self.map.style.top, 10);
				
			self.map.style.left = e + "px";
			self.map.style.top = d + "px";
			
			self.mousePosition.x = b.clientX;
			self.mousePosition.y = b.clientY
		}
    };
	
	
    document.onmousedown = function (e) {
        self.mouseDown = true;
		
        self.mousePosition.x = e.clientX;
        self.mousePosition.y = e.clientY;
		
		self.timerCount = 0;
		if(self.timerId != 0) {
			clearInterval(self.timerId);
			self.timerId = 0;
		}
		self.timerId = setInterval(OnScrollTimer, 20);
        
        e.preventDefault();
    };
	
	
    document.onmouseup = function () {
        if(self.mouseDown) {            
            self.mouseDown = false;
            
            if(self.mouseLocations.length > 0) {
                var clickCount = self.mouseLocations.length;
                self.velocity.x = (self.mouseLocations[clickCount - 1].x - self.mouseLocations[0].x) / clickCount;
                self.velocity.y = (self.mouseLocations[clickCount - 1].y - self.mouseLocations[0].y) / clickCount;
                self.mouseLocations.length = 0;
            }
        }
    };
};

