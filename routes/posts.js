const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json());

var posts = {}
router.get('',(req,res)=>{
    console.log(req);
    const tags = req.body.tags;
    tags.forEach((tag,index)=>{
        
    })
    const sortBy = req.body.sortBy ;
    const direction = req.body.direction;

});

module.exports = router;