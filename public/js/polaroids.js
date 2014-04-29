var Polaroid = function(imgSrc) {
    return this.init(imgSrc);
};

Polaroid.prototype = {
	randomRotation: function() {
		// return random int between -25 and +25
		return Math.floor(Math.random() * 50) - 25;
	},

	randomPosition: function() {
		return {
			top: Math.floor(Math.random() * window.innerHeight),
			left: Math.floor(Math.random() * window.innerWidth)
		};
	},
	
	setActive: function(elem) {
		// Add the class active and remove it from all other polaroids
		var activePolaroids = document.getElementsByClassName('polaroid active');
		for(var i=0; i<activePolaroids.length; i++) {
			var newClass = activePolaroids[i].getAttribute('class').replace(/\active\b/,'');
			activePolaroids[i].setAttribute('class', newClass);
		}
        var currentClass = elem.getAttribute('class');
		elem.setAttribute('class', currentClass + ' active');
	},

    clickHandler: function(elem) {
		this.setActive(elem);
    },

    init: function(imgSrc) {
        var div = document.createElement('div');
        var img = document.createElement('img');
		var rp = this.randomPosition();
		var rr = this.randomRotation();

        img.setAttribute('src', imgSrc);
        div.setAttribute('class', 'polaroid');
		div.style.top = rp.top + 'px';
		div.style.left = rp.left + 'px';
		div.style.transform = 'rotate(' + rr + 'deg)';
        div.addEventListener('click', this.clickHandler.bind(this, div));
		div.setActive = this.setActive;
        div.appendChild(img);

        return div;
    }
};




var Polaroids = function(className) {
    return this.init(className);
};

Polaroids.prototype = {
	init: function(className) {
		var activePolaroids = document.getElementsByClassName(className);
		var map = document.getElementById('map');
		for(var i=activePolaroids.length; i>0; i--) {
			var p = new Polaroid(activePolaroids[i-1].src);
			map.appendChild(p);
		}
    },
	
	nextPolaroid: function() {
		var activePolaroid = document.getElementsByClassName('polaroid active')[0];
		if(activePolaroid === undefined) {
			activePolaroid = document.getElementsByClassName('polaroid')[0];
			if(activePolaroid === undefined) return false;
		}
		if(activePolaroid.nextSibling.getAttribute !== undefined
			&& activePolaroid.nextSibling.getAttribute('class') !== null
			&& activePolaroid.nextSibling.getAttribute('class').match(/\polaroid\b/)) {
			activePolaroid.setActive(activePolaroid.nextSibling);
		}
	},
	
	prevPolaroid: function() {
		var activePolaroid = document.getElementsByClassName('polaroid active')[0];
		if(activePolaroid === undefined) {
			var polaroidsLength = document.getElementsByClassName('polaroid').length-1;
			activePolaroid = document.getElementsByClassName('polaroid')[polaroidsLength];
			if(activePolaroid === undefined) return false;
		}
		if(activePolaroid.previousSibling.getAttribute !== undefined
			&& activePolaroid.previousSibling.getAttribute('class') !== null
			&& activePolaroid.previousSibling.getAttribute('class').match(/\polaroid\b/)) {
			activePolaroid.setActive(activePolaroid.previousSibling);
		}
	}
};