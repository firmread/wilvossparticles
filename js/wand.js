var mouseDetected = false,
touchDetected = false,
wandDiv,
textP,
tempX = 0,
tempY = 0,
oldTempX,
oldTempY,
spatter,
down,
fade,
useGPU,
dark,
makeSlow,
blurry,
sticky,
stream,
showPrefs,
mix,
mixTimer,
isStain,
count = 1,
useDrift,
colorIndex = 0,
speed = 1,
sizeFactor = 1,
bgdIndex = 0,
spreadFactor = 1,
timerTick,
tickIndex = 0,
showOptions,
backgroundDiv,
bgdColors = ["0.0", "0.3", "0.7"],
transtionType = WhichTransitionEvent(),
freeCanvases = new Array(),
iOS = (navigator.userAgent.match(/(iPhone|iPod)/i) ? true: false),
presets = GetById('presets'),
keyCommands = GetById('keyCommands'),
toggleCommands = GetById('toggleCommands'),     
header = GetById('header'),
elementCount = 0,
currentPreset = "";

if(iOS){
 header.className="iOSHeader"; 
}

function Create(a) {
    if (a == "canvas") {
        elementCount++;
    }
    return document.createElement(a)
}
function GetById(a) {
    return document.getElementById(a)
}
function GetMouseXY(a) {
    if (!mouseDetected && !touchDetected) {
        StartMagic();
    }
    tempX = a.clientX;
    tempY = a.clientY;
    if (tempX < 0) tempX = 0;
    if (tempY < 0) tempY = 0;
    return mouseDetected = true;
}
function touchMove(event) {
    event.preventDefault();
    trackTouch(event);
}
function touchStart(event) {
    trackTouch(event);
}
function trackTouch(event) {
    if (!mouseDetected && !touchDetected) {
        StartMagic();
    }
    tempX = event.touches[0].pageX;
    tempY = event.touches[0].pageY;
    if (tempX < 0) tempX = 0;
    if (tempY < 0) tempY = 0;
    return touchDetected = true;

}
function AddCss(a) {
    var b = Create("style");
    b.type = "text/css";
    if (b.styleSheet) b.styleSheet.cssText = a;
    else b.appendChild(document.createTextNode(a));
    document.getElementsByTagName("head")[0].appendChild(b)
}
function UpdateLayout() {
    if (tickIndex >= 17) {
        DisplayParticle();
        tickIndex = 0;
    }
    tickIndex++;
}
function FlipOptions() {
    showOptions = !showOptions;
    if (showOptions)
    keyCommands.style.display = "block";
    else
    keyCommands.style.display = "none";

}
function StartMagic() {
    wandDiv = Create("div");
    wandDiv.style.width = "100%";
    wandDiv.style.height = window.innerHeight + "px";
    wandDiv.id = "wandDiv";
    wandDiv.style.msUserSelect = "none";
    wandDiv.style.position = "absolute";
    wandDiv.style.top = "0px";
    wandDiv.style.left = "0px";
    wandDiv.style.zIndex = "0";
		wandDiv.style.msTouchAction="none";
		wandDiv.style.pointerEvents = "none";
    wandDiv.style.userSelect = "none";
		wandDiv.style.msUserSelect = "none";
    document.body.insertBefore(wandDiv, document.body.firstChild);
    AddCss(".particle {position: absolute; background-size: 100%;background-repeat: no-repeat;-webkit-backface-visibility: hidden;}");
            
    document.onkeyup = function(a) {
        a = window.event || a;
        switch (a.keyCode) {
        case 27:
            FlipOptions();
        case 49:
            sizeFactor = 0;
            BumpSize();
            break;
        case 50:
            sizeFactor = 1;
            BumpSize();
            break;
        case 51:
            sizeFactor = 2;
            BumpSize();
            break;
        case 52:
            sizeFactor = 3;
            BumpSize();
            break;
        case 53:
            sizeFactor = 4;
            BumpSize();
            break;
        case 54:
            sizeFactor = 5;
            BumpSize();
            break;
        case 55:
            sizeFactor = 6;
            BumpSize();
            break;
        case 56:
            sizeFactor = 7;
            BumpSize();
            break;
        case 57:
            sizeFactor = 8;
            BumpSize();
            break;
        case 58:
            sizeFactor = 9;
            BumpSize();
            break;
        case 48:
            sizeFactor = 10;
            BumpSize();
            break;
        case 66:
            FlipBlur();
            break;
        case 67:
            CycleColor();
            break;
        case 68:
            FlipDirection();
            break;
        case 71:
            //FlipGPU();
            break;
        case 72:
            FlipSmoke();
            break;
        case 76:
            DarkenBackground();
            break;
        case 80:
            BumpSpread();
            break;
        case 82:
            FlipSpatter();
            break;
        case 83:
            FlipStream();
            break;
        case 87:
            FlipSlowMotion()
        }
    };
    //
    FlipSpatter();
    FlipStream();
    CycleColor();
    FlipDirection();
    FlipGPU();
    sticky = false;
    sizeFactor = 1;
    BumpSize()
    //    UsePreset("spore");
    var timerTick = window.setInterval(DisplayParticle, 5);
}
function AdjustDrift() {
    var drift = Math.floor(Math.random() * 180 / (12 - sizeFactor));
    var mod = Math.round(Math.random());
    if (mod > 0) drift = -drift;
    return drift;
}
function FlipGPU() {
    useGPU = !useGPU;
}
function FlipSlowMotion() {
    makeSlow = !makeSlow;
    speed = makeSlow ? 3: 1
}
function FlipSticky() {
    sticky = !sticky;
}
function FlipBlur() {
    blurry = !blurry;
}
function FlipDirection() {
    down = !down;
}
function FlipStream() {
    stream = !stream;
}
function FlipSpatter() {
    spatter = !spatter
}
function CycleColor() {
    colorIndex++;
    mixTimer != null && window.clearTimeout(mixTimer);
    switch (colorIndex) {
    case 0:
        mix = dark = false;
        break;
    case 1:
        dark = true;
        mix = false;
        break;
    case 2:
        mix = true;
        mixTimer = window.setInterval(FlipSmoke, 50);
        colorIndex = -1;
    }
}
function FlipSmoke() {
    dark = !dark;
}
function Flipmix() {
    mix = !mix;
}
function BumpSize() {
    if (sizeFactor == 11) sizeFactor = 0;
    sizeFactor++;
}
function BumpSpread() {
    if (spatter) {
        if (spreadFactor >= 40) spreadFactor = -4;
        spreadFactor += 5;
    }
}
var showCommands = false;

function ToggleCommands() {
    showCommands = !showCommands;
    presets.style.display = showCommands ? "none": "block";
    keyCommands.style.display = showCommands ? "block": "none";
    toggleCommands.innerHTML = showCommands ? "&larr; PRESETS": "COMMANDS &rarr;";

}
function DarkenBackground() {
    if (bgdIndex == bgdColors.length - 1) bgdIndex = -1;
    bgdIndex++;
    wandDiv.style.background = "rgba(0,0,0,+" + bgdColors[bgdIndex] + ")";
}
function WhichTransitionEvent() {
    var a,
    b = Create("fakeelement"),
    d = {
        transition: "transitionend",
        WebkitTransition: "webkitTransitionEnd"
    };
    for (a in d) if (b.style[a] !== undefined) return d[a];
}
function UsePreset(a) {
    spatter = fade = isStain = false;
    useDrift = true;
    if (currentPreset.className == "on")
    currentPreset.className = "off";
    currentPreset = GetById(a);
    currentPreset.className = "on";
    switch (a) {
    case "spore":
        sizeFactor = colorIndex = 0;
        down = false;
        useDrift = false;
        spatter = stream = makeSlow = blurry = true;
        bgdIndex = 2;
        spreadFactor = 39;
        break;
    case "airbubbles":
        colorIndex = -1;
        down = false;
        spatter = stream = makeSlow = blurry = true;
        sizeFactor = 0;
        bgdIndex = 1;
        spreadFactor = 20;
        break;
    case "pollution":
        down = false;
        spatter = stream = makeSlow = blurry = true;
        sizeFactor = 4;
        colorIndex = 1;
        bgdIndex = 0;
        spreadFactor = -4;
        useDrift = false;
        break;
    case "cigarette":
        colorIndex = -1;
        down = false;
        fade = stream = makeSlow = blurry = true;
        bgdIndex = 0;
        sizeFactor = 1;
        useDrift = false;
        spreadFactor = -4;
        break;
    case "steam":
        colorIndex = -1;
        down = false;
        fade = spatter = stream = makeSlow = blurry = true;
        sizeFactor = 3;
        bgdIndex = 0;
        useDrift = false;
        spreadFactor = -4;
        break;
    case "sludge":
        colorIndex = 0;
        stream = makeSlow = blurry = down = true;
        useDrift = false;
        sizeFactor = 6;
        bgdIndex = -1;
        spreadFactor = -4;
        break;
    case "waterfall":
        colorIndex = -1;
        stream = blurry = down = true;
        spatter = makeSlow = false;
        sizeFactor = 4;
        useDrift = false;
        bgdIndex = 1;
        spreadFactor = -4;
        break;
    case "trachea":
        colorIndex = 1;
        stream = down = makeSlow = true;
        blurry = spatter = false;
        sizeFactor = 2;
        bgdIndex = -1;
        spreadFactor = 0;
        break;
    case "snow":
        colorIndex = -1;
        spatter = stream = makeSlow = blurry = down = true;
        useDrift = false;
        sizeFactor = 0;
        bgdIndex = 1;
        spreadFactor = 39;
        break;
    case "champagne":
        colorIndex = -1;
        makeSlow = blurry = down = false;
        spatter = stream = true;
        sizeFactor = 0;
        bgdIndex = 1;
        fade = 1;
        spreadFactor = 4;
        break;
    case "stain":
        fade = 1;
        colorIndex = 0;
        spatter = stream = makeSlow = down = false;
        isStain = blurry = true;
        sizeFactor = 3;
        bgdIndex = 2;
        spreadFactor = -1;
    }
    useDrift = !useDrift;
    down = !down;
    blurry = !blurry;
    makeSlow = !makeSlow;
    stream = !stream;
    spatter = !spatter;
    FlipDirection();
    FlipSpatter();
    FlipSlowMotion();
    FlipStream();
    FlipBlur();
    CycleColor();
    DarkenBackground();
    BumpSize();
    BumpSpread();
}
function DisplayParticle() {
    if ((mouseDetected || touchDetected) && (stream || oldTempX != tempX && oldTempY != tempY)) {
        var element = freeCanvases.length > 0 ? freeCanvases.pop() : Create("canvas");
        if (!element.hasBeenAdded) {
            wandDiv.appendChild(element);
        }
        element.construct = new
        function() {
            var b = 5 * sizeFactor * sizeFactor + Math.floor(Math.random() * 10 * sizeFactor),
            d,
            e = b / 2,
            f = dark ? "0,0,0": "255,255,255",
            g = dark ? ".55": ".65",
            k = blurry ? "0": g;
            element.width = element.height = b;
            element.className = "particle";
            if (element.getContext) context = element.getContext("2d");
            gradient = context.createRadialGradient(e, e, 0, e, e, e);
            gradient.addColorStop(0, "rgba(" + f + "," + g + ")");
            gradient.addColorStop(1, "rgba(" + f + "," + k + ")");
            context.fillStyle = gradient;
            context.beginPath();
            context.arc(e, e, b / 2, 0, Math.PI * 2, true);
            context.closePath();
            context.fill();
            oldTempX = tempX;
            oldTempY = tempY;
            //d = 0.2;
            d = 0.25 + Math.random() * 0.25;
            f = e = 0;
            if (spatter) e = Math.floor(Math.random() * 20 * sizeFactor * spreadFactor);
            if (spatter) f = Math.floor(Math.random() * 20 * sizeFactor * spreadFactor);
            element.style.opacity = d.toFixed(2);
            element.style.left = tempX - element.offsetWidth / 2 + e - 50 + "px";
            element.style.top = tempY - element.offsetHeight / 2 + f + "px";

            var h,
            removeTimeOut,
            MoveMe = function() {
                var c = "all " + parseInt(speed) + "s ease-in 0s";
                element.style.webkitTransition = element.style.transition = c;
                var driftAmount = 0;
                if (useDrift) {
                    driftAmount = AdjustDrift();
                }
                if (fade) {
                    element.style.opacity = 0;
                }
                if (useGPU) {
                    c = !down ? -element.offsetTop - element.offsetHeight - 2 + "px": wandDiv.offsetHeight - element.offsetTop - element.offsetHeight / 2 + 2 + "px";
                    element.style.webkitTransform = element.style.transform = "translate(" + driftAmount + "px," + c + ")";
                } else {
                    c = !down ? -element.offsetHeight - b - 2 + "px": wandDiv.offsetHeight - element.offsetHeight / 2 + 2 + "px";
                    element.style.top = c;
                    element.style.left = element.offsetLeft + driftAmount + "px";
                }
                window.clearTimeout(h);
                window.setTimeout(DissolveMe, parseInt(speed) * 1000);

            },
            DissolveMe = function() {
                var c = sticky ? down ? "all " + parseInt(speed) + "s ease-out 1.5s": "all " + parseInt(speed) + "s ease-out 0s": "opacity" + parseInt(speed) + "s ease-in " + parseInt(speed) / 2;
                element.style.webkitTransition = element.style.transition = c;
                element.style.opacity = 0;
                var interval = sticky ? 1.5 + parseInt(speed) : parseInt(speed);
                window.setTimeout(RemoveMe, interval * 1000);
            },
            RemoveMe = function() {
                element.style.webkitTransition = element.style.transition = "none";
                element.style.webkitTransform = element.style.transform = "none";
                if (element.getContext) context = element.getContext("2d");
                context.clearRect(0, 0, 0, 0);
                element.construct = null;
                element.hasBeenAdded = true;
                freeCanvases.push(element);
            };
            h = isStain ? window.setTimeout(MoveMe, 5E3) : window.setTimeout(MoveMe, 1);
        };
    }
}
function reOrient() {
    var wandDiv = GetById('wandDiv');
    wandDiv.style.height = window.innerHeight + "px";
}
window.addEventListener('orientationchange', reOrient, false);
window.addEventListener("touchmove", touchMove, false);
window.addEventListener("touchstart", touchStart, false);
window.onmousemove = GetMouseXY;