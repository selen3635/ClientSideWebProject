
// register service worker

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(function(registration) {
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function(err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}

//Check the platform
(function(){
    window.mobilecheck = function() {
        var check = false;
        (function(a){if(/(android|bb\d+|meego). +mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
        return check;
    };
    var head = document.getElementsByTagName('head')[0];
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    // if the user is using mobile
    if(window.mobilecheck()) {
        link.href = 'css/mobile1.css';
    }
    // if the user is using pc
    else {
        link.href = 'css/pc.css';
    }
    head.appendChild(link);
})();


var config = null;

// create a XML Http Request
function createXHR() {
    try {return new XMLHttpRequest(); } catch(e) {}
    try {return new ActiveXObject("Msxml2.XMLHTTP.6.0"); } catch(e) {}
    try {return new ActiveXObject("Msxml2.XMLHTTP.3.0"); } catch(e) {}
    try {return new ActiveXObject("Msxml2.XMLHTTP"); } catch(e) {}
    try {return new ActiveXObject("Microsoft.XMLHTTP"); } catch(e) {}

    alert("XMLHttpRequest not supported");
    return null;
}

// send a http request
function sendRequest(url) {
    var xhr = createXHR();

    if(xhr) {
        xhr.open("GET",url,true);
        // set the time out interval
        xhr.timeout = 2000;  // milliseconds
        xhr.onreadystatechange = function() {handleResponse(xhr)};
        xhr.ontimeout = function(e) {
          errorPop("Connection Timeout, Please Try it again!");
        };
        xhr.send(null);
    }
}

// handel xml http request response
function handleResponse(xhr) {
    if(xhr.readyState === 4 && xhr.status === 200) {
        if(config === null) {
            try {
                // parse needed information
                config = JSON.parse(xhr.responseText);
                var t = document.getElementById("item");
                img = t.content.querySelector("div.imgWrapper");
                sound = t.content.querySelector("source");
                tbody = document.getElementById("mbody");
                var clone;
                // add images and sounds
                for (i = 0; i < config.config1.length; i++) {
                    img.style.backgroundImage = "url('"+config.config1[i].img+"')";
                    sound.src = config.config1[i].sound;

                    clone = document.importNode(t.content, true);
                    tbody.appendChild(clone);
                }
            }
            // if the file does not parse successfully
            catch(e) {
                errorPop("System Error: parsing ");
            }

        }
    }
    // if it is 404 status
    else if(xhr.status === 404) {
        errorPop("SoundBoard Can't be Loaded, Please Try it later!");
    }
    // if it is 500 status
    else if(xhr.status === 500) {
        errorPop("Oops! Server is down!");
    }

}

sendRequest("config.json");

// play the sound or pause the sound if the botton is pressed
function playSound(soundBtn) {
    var sound;
    var icon;

    sound = soundBtn.querySelector("audio");
    icon = soundBtn.querySelector("img.icons");

    // play the sound if it paused
    if(sound.paused) {
        sound.play();
        icon.src = "picture/ic_pause_black_24dp_2x.png";
    }
    // pause the sound if it played
    else {
        sound.pause();
        icon.src = "picture/ic_play_circle_outline_black_24dp_2x.png";
    }

    // set the icon back if the sound is over
    sound.onended = function() {
        icon.src = "picture/ic_play_circle_outline_black_24dp_2x.png";
    }

}

// change theme according to users' selection
function changeThemes(selector) {
    var myImg = document.querySelector("main");
    var soundB = document.querySelector("div#panel-heading");
    var nav = document.querySelector("div.navWrapper");
    var login = document.querySelector("li>a");
    var line = document.querySelector("div.heading");
    var border = document.querySelectorAll("div.imgWrapper");
    var textL = document.querySelectorAll("label.compactLabel");
    var compactB = document.querySelectorAll("div.compactUnit");

    // if the theme is white theme
    if(selector.value === "White"){
        // set the background to white
        document.body.style.backgroundColor = "white";
        document.body.style.backgroundImage = "none";
        myImg.style.backgroundImage = "none";
        // set the sound board title to blue
        soundB.style.backgroundImage = "linear-gradient(to bottom, #337ab7 0%, #2e6da4 100%)";
        soundB.style.color = "#fff";
        soundB.style.backgroundColor = "#337ab7";
        // set the navigation bar to black
        nav.style.backgroundImage = "linear-gradient(to bottom, #3c3c3c 0%, #222 100%)";
        login.style.color = "#b77033";
        // set the sound board border to blue
        line.style.borderBottomColor = "#337ab7";
        for (i = 0; i <border.length; i++) {
            border[i].style.borderColor = "#337ab7";
            textL[i].style.color = "#337ab7";
            if (compactB[0])
                compactB[i].style.borderColor = "#2aabd2";
        }
    }
    // if the theme is spongebob theme
    else if(selector.value === "SpongeTheme"){
        // set the background to sponge bob picture
        document.body.style.backgroundImage = "url(picture/sbbg.jpg)";
        document.body.style.backgroundSize = "100%";
        myImg.style.backgroundImage = "none";
        // set tht sound board title to light blue
        soundB.style.backgroundImage = "linear-gradient(to bottom, #05a7ff 0%, #44bdff 100%)";
        soundB.style.color = "#a94442";
        soundB.style.backgroundColor = "#f2dede";
        // set the navigation bar to dark blue
        nav.style.backgroundImage = "linear-gradient(to bottom, #003451 0%, #005687 100%)";
        login.style.color = "#ffd300";
        // set the sound board border to light blue
        line.style.borderBottomColor = "#05a7ff";
        for (i = 0; i <border.length; i++) {
            border[i].style.borderColor = "#05a7ff";
            textL[i].style.color = "#05a7ff";
            if (compactB[0])
                compactB[i].style.borderColor = "#05ffb0";
        }
    }
    // if the theme is simpsons image
    else{
        // set the background to simpsons image
        myImg.style.backgroundImage = "url(picture/bg.png)";
        myImg.style.backgroundSize = "50%";
        document.body.style.backgroundImage = "none";
        // set the sound board title to pink
        soundB.style.backgroundImage = "linear-gradient(to bottom, #ff0055 0%, #ff206a 100%)";
        soundB.style.color = "#31708f";
        soundB.style.backgroundColor = "#d9edf7";
        // set the navigation bar to orange red
        nav.style.backgroundImage = "linear-gradient(to bottom, #ff5500 0%, #ff6a20 100%)";
        login.style.color = "#0000ff";
        // set the sound board border to pink
        line.style.borderBottomColor = "#ff0055";
        for (i = 0; i <border.length; i++) {
            //border[i].style.borderColor = "#ff0055";
            textL[i].style.color = "#ff0055";
            if (compactB[0])
                compactB[i].style.borderColor = "#ffbfd5";
        }
    }
}

// change the style of the content of the sound board
function changeStyle(selector) {
    var input = document.querySelector("input");
    var imgDiv = document.getElementsByClassName("imgWrapper");
    sound = document.querySelectorAll("div.imgWrapper * source");

    // if it is simpsons style
    if(selector.value === "HW2") {
        for (i = 0; i < config.config1.length; i++) {
            // update simpsons image
            if(input.checked) {
                imgDiv[i].style.backgroundImage = "url('"+config.config1[i].img+"')";
            }
            // update simpsons sound
            sound[i].src = config.config1[i].sound;
            sound[i].parentNode.load();
        }
    }
    // if it is sponge bob style
    else {
        for (i = 0; i < config.config2.length; i++) {
            // update sponge bob images
            if(input.checked) {
                imgDiv[i].style.backgroundImage = "url('"+config.config2[i].img+"')";
            }
            // update sponge bob sound
            sound[i].src = config.config2[i].sound;
            sound[i].parentNode.load();
        }
    }

}

// change the view to compact view
function changeFormat(switcher) {
    var input, imgDiv, selector, unitWrapper;
    selector = document.querySelector("select");
    input = switcher.querySelector("input");
    var wrapper = document.getElementById("mbody");
    imgDiv = document.getElementsByClassName("imgWrapper");
    unitWrapper = document.getElementsByClassName("unitWrapper");
    var icon = document.getElementsByClassName("icons");
    var label = document.getElementsByClassName("compactLabel");

    // if it is compact view
    if(!input.checked) {
        wrapper.classList.add("compactWrapper");
        // not shown background images and make it look compact
        for(i = 0; i < imgDiv.length; i++) {
            imgDiv[i].style.backgroundImage = "none";
            imgDiv[i].classList.add("compact");
            icon[i].classList.add("compactIcon");
            unitWrapper[i].classList.add("compactUnit");
            label[i].innerHTML = "Sound " + (i+1) + "\n";
        }
    }
    // if it is rich view
    else {
        wrapper.classList.remove("compactWrapper");
        // if it is simpsons style
        if(selector.value === "HW2") {
            for (i = 0; i < config.config1.length; i++) {
                // add the images  back accordingly
                imgDiv[i].classList.remove("compact");
                icon[i].classList.remove("compactIcon");
                unitWrapper[i].classList.remove("compactUnit");
                label[i].innerHTML = "";
                imgDiv[i].style.backgroundImage = "url('"+config.config1[i].img+"')";
            }
        }
        // if it is sponge bob style
        else {
            for (i = 0; i < config.config2.length; i++) {
                // add the images back accordingly
                imgDiv[i].classList.remove("compact");
                icon[i].classList.remove("compactIcon");
                unitWrapper[i].classList.remove("compactUnit");
                label[i].innerHTML = "";
                imgDiv[i].style.backgroundImage = "url('"+config.config2[i].img+"')";
            }
        }

    }

}

// show offline bar at the top of the page
window.addEventListener('offline', function(e) {
    var head = document.querySelector('div.navWrapper');
    var not = document.createElement('div');
    // display the offline bar
    not.innerHTML = "Currently Offline";
    not.id = "offline";
    not.style.backgroundColor = "yellow";
    head.insertBefore(not, head.firstChild);
}, false);

// remove the offline bar if the internet is connected
window.addEventListener('online', function(e) {
    var not = document.querySelector('#offline');
    if(not) {
        not.remove();
    }
}, false);

window.onclick = function(event) {
    if (event.target.className === 'modal') {
        event.target.style.display = "none";
    }
};

function closeTag(event){
    var span = document.querySelector('.modal');
    span.style.display = "none";
}

function errorPop(error) {
    var span = document.querySelector('.modal');
    var p = document.querySelector('#error');
    span.style.display = "block";
    p.innerHTML = error;
}




