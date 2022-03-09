uiInit();
$('randomize').addEventListener('click', () => {
    init();
    updateUI();
});

$('hide').addEventListener('click', (e) => {
    let currVis = $('uiBody').style.display;
    $('uiBody').style.display = currVis == 'none' ? 'block' : 'none';
});

$('download').addEventListener('click', function (e) {
    const date = new Date();
    const link = document.createElement('a');
    link.download = `${date.getFullYear()}.${date.getMonth()}.${date.getDay()}_bloom.png`;
    link.href = canvas.toDataURL();
    link.click();
    link.delete;
});
$('fullRender').addEventListener('click', () => {
    setup();
    draw(S.points);
})
$('loopRender').addEventListener('click', (e) => {
    if (S.looping) {
        clearInterval(S.looping);
        S.looping = null;
        e.target.innerHTML = 'Loop render';
        $('fullRender').style.visibility = 'visible';
    } else {
        setup();
        S.looping = setInterval(() => { draw(S.ppf) });
        e.target.innerHTML = 'Stop looping';
        $('fullRender').style.visibility = 'hidden';
    }
});

function $(id) { return document.getElementById(id); }
function updateSetting(id, value) {
    $(id).value = value;
    if ($(id).previousElementSibling.nodeName == 'DIV') {
        $(id).previousElementSibling.innerHTML = Number.isInteger(value) ? value : value.toFixed(2);
    }
}
function updateUI() {
    updateSetting('width', S.width);
    updateSetting('height', S.height);
    // updateSetting('')
    updateSetting('endIFS', IFSs.findIndex(e => e == S.endIFS));
    paletteUI();
}
//adding IFS options
function uiInit() {
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
    paletteUI();
    dragElement($('ui'));
}

function paletteUI() {
    if ($('paletteColors').firstChild) {
        while ($('paletteColors').firstChild) {
            $('paletteColors').removeChild($('paletteColors').firstChild);
        }
    }

    for (let c of S.palette.colors) {
        var clr = document.createElement("div");
        clr.innerHTML = '_';
        clr.style.backgroundColor = c;
        clr.style.flexGrow = 1;
        $('paletteColors').appendChild(clr);
    }
}

//draggable ui
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