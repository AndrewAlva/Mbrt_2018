var canvas, context, maskedCanvas, maskedContext, noiseCanvas, noiseContext;

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
    },
    implode: function(){
        TweenLite.to(this, 0.5, {
            ease: Power2.easeOut,
            radius: 0,
            width: 0,
            color: "rgba(255,255,255,1)"
        });
        Point.hover = true;
    }
};

var Navs = {
    htmlObjs: [],
    array: [],
    fontSize: 14,
    fontSizeSmall: 11,
    fontFamily: "'Suisse-Light', Sans-Serif",
    lineHeight: 1.2,
    fillStyle: "black",
    init: function(){
        this.getHtmlObjs();
        this.createNavs();
    },
    getHtmlObjs: function(){
        this.htmlObjs = $('.jsDrawing');
    },
    createNavs: function(){
        for (var i = 0; i < this.htmlObjs.length; i++) {
            Navs.array.push({id: document.getElementById( $(this.htmlObjs[i]).attr('id') ), str: $(this.htmlObjs[i]).attr('draw'), x: 0, y: 0});
        };
    },

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
        this.array.forEach(function(el,i) {
            maskedContext.fillStyle = Navs.fillStyle;

            if(i < 4){
                maskedContext.font = Navs.fontSize + "px " + Navs.fontFamily;
                maskedContext.fillText(el.str, el.x, el.y + (Navs.fontSize * 0.965));
            } else {
                maskedContext.font = Navs.fontSizeSmall + "px " + Navs.fontFamily;
                maskedContext.fillText(el.str, el.x, el.y + (Navs.fontSizeSmall));

                maskedContext.fillStyle = "#06111a";
                maskedContext.fillRect((maxWidth - 14), (el.y + 6), 14, 1);
            }
        });
        context.drawImage(maskedCanvas, 0, 0);
    }
};


// Noise effect
    var noise = {
        noiseData: [],
        frame: 0,

        create: function(){
            var idata = noiseContext.createImageData(maxWidth, maxHeight);
            var buffer32 = new Uint32Array(idata.data.buffer);
            var len = buffer32.length;

            for (var i = 0; i < len; i++) {
                if(Math.random() < 0.25) {
                    buffer32[i] = 0x09000000; /* Set random dots of noise gray, approx 1 out of 4 */
                    // buffer32[i] = 0xff0000ff; /* Set random dots of noise red, approx 1 out of 4 */
                }
            };

            this.noiseData.push(idata);
        },

        paintNoise: function(){
            if (this.frame === 5){
                this.frame = 0;
            } else {
                this.frame++;
            }

            noiseContext.putImageData(this.noiseData[this.frame], 0, 0);
        },

        setup: function(){
            for (var i = 0; i < 10; i++) {
                this.create();
            };
        }
    }


function init() {
    // Masking effect canvases
    canvas = document.getElementById('mask-canvas');
    context = canvas.getContext('2d');
    maskedCanvas = document.createElement('canvas');
    maskedContext = maskedCanvas.getContext('2d');

    // Noise canvas
    noiseCanvas = document.getElementById('noise-canvas');
    noiseContext = noiseCanvas.getContext('2d');

    Navs.init();
    noise.setup();

    window.addEventListener("resize", function() {
        onResizeWindow();
    }, false);

    document.body.addEventListener("click", function(event) {
        // 
    });

    $('.mainNavButtons, .navBar, .arrow, .rrssIcon').hover(function(){Point.grow()}, function(){Point.shrink()});
    $('#topLeftLogo, .visitWebsite, #mbrt-form-submit, .button, .simple-link, .discrete-link, .footer a').hover(function(){Point.implode()}, function(){Point.shrink()});
    
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

    noise.paintNoise(noise.frame);

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
    noiseCanvas.width = maxWidth;
    noiseCanvas.height = maxHeight;

    Navs.getPosition();
}

init();
animate();

$(window).on("load", function() {
   onResizeWindow(); 
});