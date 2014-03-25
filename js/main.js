var Polaroid = function(imgSrc) {
    return this.init(imgSrc);
};

Polaroid.prototype = {
    clickHandler: function(elem) {
        console.log(elem);
    },

    init: function(imgSrc) {
        var div = document.createElement('div');
        var img = document.createElement('img');

        img.setAttribute('src', imgSrc);
        div.setAttribute('class', 'polaroid');
        div.addEventListener('click', this.clickHandler.bind(this, div));
        div.appendChild(img);

        return div;
    }
};

var p = new Polaroid("https://ssl.gstatic.com/gb/images/v1_800b6037.png");
document.body.appendChild(p);