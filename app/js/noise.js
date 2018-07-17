var canvas, context, maskedCanvas, maskedContext;
var nav1, nav2, nav3, nav4;

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
    radius: 2,
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
        TweenLite.to(this, 0.35, {
            ease: Power4.easeOut,
            radius: 2,
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

var Navs = {
    array: [
        nav1 = {
            id: document.getElementById("work-drawing"),
            str: "WORK",
            x: 0,
            y: 0
        },
        nav2 = {
            id: document.getElementById("skills-drawing"),
            str: "SKILLS",
            x: 0,
            y: 0
        },
        nav3 = {
            id: document.getElementById("about-drawing"),
            str: "ABOUT",
            x: 0,
            y: 0
        },
        nav4 = {
            id: document.getElementById("hire-drawing"),
            str: "HIRE US",
            x: 0,
            y: 0
        }
        // nav5 = {},
        // nav6 = {},
        // nav7 = {}
    ],

    fontSize: 14,
    fontFamily: "'Suisse-Light', Sans-Serif",
    lineHeight: 1.2,
    fillStyle: "black",
    getPosition: function(){
        this.array.forEach(function(el) {
            var _bounding = el.id.getBoundingClientRect();
            el.x = _bounding.left;
            el.y = _bounding.top;
        });
    },
    update: function() {
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

        // maskedContext.fillStyle = "white";
        // maskedContext.fillRect(0,0, maxWidth, maxHeight);
        this.array.forEach(function(el) {
            maskedContext.font = Navs.fontSize + "px " + Navs.fontFamily;
            maskedContext.fillStyle = Navs.fillStyle;
            maskedContext.fillText(el.str, el.x, el.y + (Navs.fontSize * 0.965));
        });
        context.drawImage(maskedCanvas, 0, 0);
    }
};



function init() {
    canvas = document.getElementById('noise-canvas');
    context = canvas.getContext('2d');
    maskedCanvas = document.createElement('canvas');
    maskedContext = maskedCanvas.getContext('2d');

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
    maskedContext.clearRect(0, 0, maxWidth, maxHeight);

    Point.update();
    Navs.update();
}


function onResizeWindow() {
    maxWidth = window.innerWidth;
    maxHeight = window.innerHeight;
    halfWidth = maxWidth /2;
    halfHeight = maxHeight / 2;

    canvas.width = maxWidth;
    canvas.height = maxHeight;
    maskedCanvas.width = maxWidth;
    maskedCanvas.height = maxHeight;

    Navs.getPosition();
}
init();
animate();

$(window).on("load", function() {
   onResizeWindow(); 
});