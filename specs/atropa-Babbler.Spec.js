var atropa = require('../src/atropa-Babbler.js');
var fs = require('fs');
var path = require('path');
var specPath = path.resolve(__dirname, '../browser/tests/atropa-Babbler.test.js');
var specCode = fs.readFileSync(specPath, "utf8");
eval(specCode);
