var Babbler = require('../src/atropa-Babbler.js');

try {
    Object.keys(Babbler).forEach(
        function (prop) {
            if(!atropa[prop]) {
                atropa[prop] = Babbler[prop];
            }
        }
    );
} catch (ignore) {
    atropa = require('../src/atropa-Babbler.js');
}

Object.keys(Babbler.data).filter(
    function (prop) {
        return prop !== 'requirements';
    }
).forEach(
    function (prop) {
        atropa.data[prop] = Babbler.data[prop];
    }
);
