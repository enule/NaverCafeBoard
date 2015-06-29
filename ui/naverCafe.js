function hideElementById(id) {
    var element = document.getElementById(id);
    if (element)
        element.style.display = 'none';
}
function hideElementByClass(className) {
    var tags = document.getElementsByClassName(className);

    for (var i = 0; i < tags.length; ++i) {
        var element = tags[i];
        element.style.display = 'none';
    }
}

function hideTopArea() {
    var element = document.getElementById("hd");
    if (element) {
        var prev;
        while ((prev = element.previousSibling)) {
            element = prev;
            if (typeof (element.tagName) != "undefined") {
                element.style.display = "none";
            }
        }
    }
}

hideElementById("hd");
hideElementById("ch");
hideElementByClass("post_nav");
hideElementByClass("post_ext4");
hideElementByClass("spi");
hideElementByClass("u_ft");
hideElementById("mobileSmartBanner");
hideElementById("mobileGuestBanner");
hideTopArea();
