function $(id) { return document.getElementById(id); }
function updateSetting(id, value) {
    $(id).value = value;
    $(id).previousElementSibling.value = Number.isInteger(value) ? value : value.toFixed(2);
}



$('hide').addEventListener('click', (e) => {
    let currVis = $('uiBody').style.display;
    $('uiBody').style.display = currVis == 'none' ? 'block' : 'none';
});

//adding IFS options
for (let i = 0; i < IFSs.length; i++) {
    var opt = document.createElement("option");
    opt.value = i;
    opt.innerHTML = IFSs[i].name;
    $('startIFS').appendChild(opt);
}

for (let i = 0; i < IFSs.length; i++) {
    var opt = document.createElement("option");
    opt.value = i;
    opt.innerHTML = IFSs[i].name;
    $('endIFS').appendChild(opt);
}

for (let i = 0; i < finalVariationFunctions.length; i++) {
    var opt = document.createElement("option");
    opt.value = i;
    opt.innerHTML = finalVariationFunctions[i].name;
    $('endTransform').appendChild(opt);
}

for (let i = 0; i < S.palette.colors.length; i++) {
    var clr = document.createElement("div");
    clr.innerHTML = '_';
    clr.style.backgroundColor = S.palette.colors[i];
    clr.style.flexGrow = 1;
    $('paletteColors').appendChild(clr);
}

//draggable ui
dragElement($('ui'));
function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if ($(elmnt.id + "header")) {
        $(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}