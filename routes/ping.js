const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json());

router.get('/',(req,res)=>{
    res.body = {
        "success":"true",
        "status":"OK"
    }
    res.render(res.body);
});

module.exports = router;