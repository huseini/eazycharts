window.onready = ready();

function ready() {
    var cs, max = 0,
        h, w, barlen, margin = 15,
        barhtml = '',
        yaxispointss = '',
        chartpaddingy = 20,
        chartpaddingx = 30;
    cs = document.querySelectorAll('.charts');
    cs.forEach(function (c) {
        barhtml = '';
        yaxispointss = '';
        max = 0;
        chartstyle(c);
        var ins;
        ins = c.getElementsByTagName("input");
        ins = Array.from(ins);
        barlen = ins.length;

        ins.forEach(function (i, ind) {
            var inval = i.value;
            maxvalue(inval);
        })
        ins.forEach(function (i, ind) {
            var inval = i.value;
            var innam = i.getAttribute('name');
            barhtml += createbars(inval, innam, ind);
        })

        addHTML(c);
    })

    function chartstyle(c) {
        w = c.getAttribute('width');
        h = c.getAttribute('height');
        c.removeAttribute('width');
        c.removeAttribute('height');
        c.style.width = w + "px";
        c.style.height = h + "px";
        c.style.paddingLeft = chartpaddingx + "px";
    }

    function maxvalue(v) {
        if (max < Number(v)) {
            max = v;
        }
    }

    function createbars(barv, barnme, i) {
        var bar = document.createElement('div');
        bar.className = "chart-bar";
        // width minus chart padding (only left padding was applied)
        // then minus left margin of first bar and right margin of last bar
        // then minus all the spaces between columns (margin in between)
        // then we will get width of total bars divide it by number of total bars we need
        var barwidth = ((w - chartpaddingx) - (((barlen - 1) * margin) + (margin * 2))) / barlen;
        bar.style.width = barwidth + "px";
        // find bar height percentage relative to highest value
        var barperc = ((barv * 100) / max);
        // find bar height in pixels according to height of bound and keeping relative percentage
        bar.style.height = (barperc * (h - (margin * 2))) / 100 + "px";
        // applying random color to each bar
        // reduce number from 255 to reduce some saturation
        bar.style.backgroundColor = `rgb(${Math.floor(Math.random() * 150)}, 160, 210)`;
        bar.style.left = margin + (barwidth * i) + (i * margin) + "px";
        yaxispoints(barv, bar.style.height);
        xaxispoints(barnme, bar.style.left);
        bar.style.marginRight = margin + "px";
        bar.setAttribute('title', barnme + " = " + barv);
        return bar.outerHTML;
    }

    function createBound() {
        var bound = document.createElement('div');
        bound.className = "bound";
        bound.style.width = w - chartpaddingx + "px";
        bound.style.height = h - chartpaddingy + "px";
        bound.innerText = "chart will be here soon";
        return bound.outerHTML;
    }

    function addHTML(c) {
        c.innerHTML = createBound();
        c.querySelector('.bound').innerHTML = barhtml + yaxispointss;
    }

    function yaxispoints(inp, heightt) {
        var point = document.createElement('span');
        point.className = "yaxispoint";
        point.innerText = inp;
        point.style.bottom = heightt;
        point.style.left = "-30px";
        point.style.position = "absolute";
        point.style.fontSize = "14px";
        yaxispointss += point.outerHTML;
    }

    function xaxispoints(inp, left) {
        var point = document.createElement('span');
        point.className = "xaxispoint";
        point.innerText = inp;
        point.style.bottom = "-30px";
        point.style.left = left;
        point.style.position = "absolute";
        point.style.fontSize = "12px";
        yaxispointss += point.outerHTML;
    }
}