var canvas, context, buffer, buffer_ctx;

var PI2 = Math.PI*2;

var maxWidth = window.innerWidth,   
     maxHeight = window.innerHeight;

var halfWidth = maxWidth /2,
     halfHeight = maxHeight / 2;

var mouse = {
    x: halfWidth,
    y: halfHeight
};

var Point = {
    x: mouse.x,
    y: mouse.y,
    cof: 0.15,
    radius: 200,
    width: 4,
    color: "rgba(0,0,0,1)",
    alpha: 1,
    hover: false,
    update: function() {
        this.x += (mouse.x - this.x) * this.cof;
        this.y += (mouse.y - this.y) * this.cof;
    },
    fill: function() {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, PI2);
        context.fillStyle = "black";
        context.fill();
        context.globalCompositeOperation = "source-in";
    },
    stroke: function(){
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, PI2);
        context.strokeStyle = this.color;
        context.lineWidth = this.width;
        context.stroke();
    },
    shrink: function(){
        TweenLite.to(this, 1, {
            ease: Power3.easeOut,
            radius: 200,
            width: 4,
            color: "rgba(0,0,0,1)"
        });
        Point.hover = true;
    },
    grow: function(){
        TweenLite.to(this, 1, {
            ease: Power3.easeOut,
            radius: 30,
            width: 1,
            color: "rgba(0,0,0,0.2)"
        });
        Point.hover = false;
    }
};

var Text = {
    el: document.getElementById("masked-title"),
    fontSize: 14,
    fontFamily: "'Suisse-Light', Sans-Serif",
    str: "WORK",
    x: 100,
    y: 100,
    lineHeight: 1.2,
    fillStyle: "black",
    update: function() {
        var _bounding = this.el.getBoundingClientRect();
        this.x = _bounding.left;
        this.y = _bounding.top;
        this.draw();
    },
    draw: function() {
        context.save();
        this.mask();
        context.restore();
        Point.stroke();
    },
    mask: function(){
        Point.fill();
        context.font = this.fontSize + "px " + this.fontFamily;
        context.fillStyle = this.fillStyle;
        context.fillText(this.str, this.x, this.y + (this.fontSize));
        // context.drawImage(buffer_ctx, 0, 0, canvas.width, canvas.height);
    }
};

function init() {
    canvas = document.getElementById('noise-canvas');
    context = canvas.getContext('2d');

    buffer = document.createElement("canvas");
    buffer_ctx = buffer.getContext("2d");

    window.addEventListener("resize", function() {
        onResizeWindow();
    }, false);

    document.body.addEventListener("click", function(event) {
        // 
    });

    $('a').hover(function(){Point.grow()}, function(){Point.shrink()});
    
    window.addEventListener("mousemove", function(event) {
        mouse = {
            x: event.clientX,
            y: event.clientY
        };
    }, false);
    onResizeWindow();
}

function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    context.clearRect(0, 0, maxWidth, maxHeight);
    Point.update();
    Text.update();
}


function onResizeWindow() {
    maxWidth = window.innerWidth;
    maxHeight = window.innerHeight;
    halfWidth = maxWidth /2;
    halfHeight = maxHeight / 2;
    canvas.width = maxWidth;
    canvas.height = maxHeight;
    buffer.width = maxWidth;
    buffer.height = maxHeight;
}
init();
animate();