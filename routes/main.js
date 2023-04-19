__path = process.cwd()

var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.json({ developer: '@Xorizn', mess: 'Take a look at this readme link https://github.com/Xorizn/xorizn-apis#readme' })
})
module.exports = router
