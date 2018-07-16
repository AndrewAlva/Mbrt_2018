var canvas, context;

var PI2 = Math.PI*2;

var maxWidth = window.innerWidth,   
     maxHeight = window.innerHeight;

var halfWidth = maxWidth /2,
     halfHeight = maxHeight / 2;

var mouse = {
    x: halfWidth,
    y: halfHeight
};

var point = {
    x: mouse.x,
    y: mouse.y,
    cof: 0.1,
    radius: 2,
    width: 4,
    color: "black",
    alpha: 1,
    hover: false,
    update: function() {
        this.x += (mouse.x - this.x) * this.cof;
        this.y += (mouse.y - this.y) * this.cof;
        this.draw();
    },
    draw: function() {
        context.beginPath();
        context.globalAlpha= this.alpha;
        context.fillStyle= this.color;
        context.lineWidth= this.width;
        context.font = "14px Suisse-Light";
        context.fillText("ABOUT", 702, 64);
        context.arc(this.x, this.y, this.radius, 0, PI2, false);
        context.stroke();
        context.closePath();
    },
    shrink: function(){
        TweenLite.to(this, 0.15, {
            ease: Power1.easeOut,
            radius: 2,
            width: 4,
            alpha: 1
        });
        point.hover = true;
    },
    grow: function(){
        TweenLite.to(this, 0.15, {
            ease: Power1.easeOut,
            radius: 50,
            width: 1,
            alpha: 0.5
        });
        point.hover = false;
    }
};

function init() {
    canvas = document.getElementById('noise-canvas');
    context = canvas.getContext('2d');
    window.addEventListener("resize", function() {
        onResizeWindow();
    }, false);

    document.body.addEventListener("click", function(event) {
        // 
    });
    $('a').hover(function(){point.grow()}, function(){point.shrink()});
    window.addEventListener("mousemove", function(event) {
        mouse = {
            x: event.clientX,
            y: event.clientY
        };
    });
    onResizeWindow();
}

function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    context.clearRect(0, 0, maxWidth, maxHeight);
    point.update();
}


function onResizeWindow() {
    maxWidth = window.innerWidth;
    maxHeight = window.innerHeight;
    halfWidth = maxWidth /2;
    halfHeight = maxHeight / 2;
    canvas.width = maxWidth;
    canvas.height = maxHeight;
}
init();
animate();