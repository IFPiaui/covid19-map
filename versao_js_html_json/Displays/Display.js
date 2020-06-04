////////////// DISPLAY ////////////////
class Display {
    constructor(id) {
        this.id = id;
    }

    init(value) {
        document.getElementById(this.id).innerHTML = '<p class=\'m-0 texto-display\'>' + value + '</p>';
    }
}

export { Display };