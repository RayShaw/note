
let PieChat = function (selector, options) {
    let canvas = "string" === typeof selector ? document.querySelector(selector) : null;
    if (canvas === null) {
        return false;
    }

    let defaultOptions = {
        radius: 200,
        legendParms: {
            font: "24px Arial",
            x: 30,
            y: 30,
            margin: 50,
            width: 40,
            height: 24
        }
    }

    this.context = canvas.getContext("2d");
    this.width = canvas.getAttribute("width");
    this.height = canvas.getAttribute("height");
    this.options = Object.assign(defaultOptions, options);
}

PieChat.prototype.load = function (data) {
    data.forEach(function (element) {
        if (this.count) {
            this.count += element.value;
        } else {
            this.count = element.value;
        }

    }, this);
    this.data = data;
    return this;
}


// PieChat.prototype.load = function (data) {
//     data.forEach(item => this.count ? this.count += item.value : this.count = item.value);
//     this.data = data;
//     return this;

// }


PieChat.prototype.render = function () {
    let _generateLegend = (item, index) => {
        this.context.fillRect(
            this.options.legendParms.x,
            this.options.legendParms.y + index * this.options.legendParms.margin,
            this.options.legendParms.width,
            this.options.legendParms.height
        );


        this.context.font = this.options.legendParms.font;
        this.context.fillText(
            item.title,
            this.options.legendParms.y + this.options.legendParms.margin,
            (index + 1) * this.options.legendParms.margin
        )
    }

    let temparc = 0;
    this.data.forEach((item, index) => {
        item.color = `#${('00000' + (Math.random() * 0x1000000 << 0).toString(16)).substr(-6)}`;
        this.context.beginPath();
        this.context.moveTo(this.width / 2, this.height / 2);
        let startarc = temparc,
            endarc = startarc + (item.value / this.count) * Math.PI * 2;
        this.context.arc(
            this.width / 2,
            this.height / 2,
            this.options.radius,
            startarc,
            endarc,
            false
        )

        this.context.closePath();
        this.context.fillStyle = item.color;
        this.context.fill();
        temparc = endarc;
        if (this.options.legend) {
            _generateLegend(item, index);
        }
    })
    return this;
}


const data = [

    { title: "AAAA", value: 1024 },
    { title: "BBBB", value: 512 },
    { title: "CCCC", value: 256 },
    { title: "DDDD", value: 920 }
];

let pie = new PieChat(".pie-chat", { legend: true });
// console.log(pie.load(data));
pie.load(data).render();