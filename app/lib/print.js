function print() {
    if (process.env["LOG"]) {
        console.log(...arguments);
    }
}

function error() {
    if (process.env["ERROR"]) {
        console.log(...arguments);
    }
}

function debug() {
    if (process.env.DEBUG) {
        console.log(...arguments);
    }
}

module.exports = {
    print: print,
    error: error,
    debug: debug
};