window.onload = init

function init() {

    var addButton = document.getElementById("add_button");
    addButton.onclick = createSticky;

    var clearButton = document.getElementById("clear_button");
    clearButton.onclick = clearStickyNotes;

    var stickiesArray = getStickiesArray()

    var stickies = document.getElementById("stickies");
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < stickiesArray.length; i++) {
        var key = stickiesArray[i]
        var value = JSON.parse(localStorage[key]);
        addStickyToDOM(key, value, fragment)
    }

    stickies.appendChild(fragment);

}

function addStickyToDOM(key, stickyObj, fragment) {
    // var stickies = document.getElementById("stickies")
    var sticky = document.createElement("li")
    sticky.setAttribute("id", key)

    sticky.style.backgroundColor = stickyObj.color;
    var span = document.createElement("span")
    span.setAttribute("class", "sticky")

    span.innerHTML = stickyObj.value
    sticky.appendChild(span)
    fragment.appendChild(sticky)

    sticky.onclick = deleteSticky;
}

function createSticky() {

    var value = document.getElementById("note_text").value
    var colorObj = document.getElementById("note_color");
    var color = colorObj[colorObj.selectedIndex].value;
    var key = new Date().getTime()

    var stickyObj = {
        value: value,
        color: color
    }

    var stickiesArray = getStickiesArray()
    localStorage.setItem(key, JSON.stringify(stickyObj))
    stickiesArray.push(key)
    localStorage.setItem("stickiesArray", JSON.stringify(stickiesArray))

    var stickies = document.getElementById("stickies")
    var fragment = document.createDocumentFragment();

    addStickyToDOM(key, stickyObj, fragment);
    stickies.appendChild(fragment);
}

function getStickiesArray() {
    var stickiesArray = localStorage.getItem("stickiesArray")
    if (!stickiesArray) {
        stickiesArray = []
        localStorage.setItem("stickiesArray", stickiesArray)

    } else {
        stickiesArray = JSON.parse(stickiesArray)
    }

    return stickiesArray

}

function deleteSticky(e) {
    var key = e.target.id;
    if (e.target.tagName.toLowerCase() == "span") {
        alert(key)
        key = e.target.parentNode.id;
    }
    var stickiesArray = getStickiesArray();
    if (stickiesArray) {
        for (var i = 0; i < stickiesArray.length; i++) {
            if (key == stickiesArray[i]) {
                stickiesArray.splice(i, 1);
            }
        }
        localStorage.removeItem(key);
        localStorage.setItem("stickiesArray", JSON.stringify(stickiesArray));
        removeStickyFromDOM(key);
    }
}

function removeStickyFromDOM(key) {
    var sticky = document.getElementById(key);
    sticky.parentNode.removeChild(sticky);
}

function clearStickyNotes() {
    localStorage.clear();
    var stickyList = document.getElementById("stickies");
    var stickies = stickyList.childNodes;
    for (var i = stickies.length - 1; i >= 0; i--) {
        stickyList.removeChild(stickies[i]);
    }
}

