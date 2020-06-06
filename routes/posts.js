const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const axios = require('axios');
const https = require('https')

router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json());

router.get('/',(req,res)=>{

    var posts = [];
    var newPosts = [];
    if(req.query){
        if(req.query.tags == null){
            res.status(404);
            res.json({"error": "Tag parameter is required"});
        }
        var taglist = req.query.tags.split(',');
        var sortBy = req.query.sortBy || id;
        var direction = req.query.direction || asc;

        console.log(taglist+"\n"+sortBy+"\n"+direction);
        
        function compare(a,b){
            if(direction=="asc"){
                if(a.sortBy < b.sortBy){
                    return 1;
                }
                else if(a.sortBy > b.sortBy){
                    return -1;
                }
            }
            else if(direction=="desc"){
                if(a.sortBy > b.sortBy){
                    return 1;
                }
                else if(a.sortBy < b.sortBy){
                    return -1;
                }
            }
            return 0;
        }

        taglist.forEach((tag,i)=>{
            let url = `https://hatchways.io/api/assessment/blog/posts?tag=${tag}`;

            axios.get(url).then(response=>{
                
                console.log("URL is :" + url);
                
                newPosts = response.data ? response.data.posts : [];
                posts.push.apply(posts,newPosts);
                
                console.log(posts);
                
                if(i==taglist.length - 1){
                    jsonObject = posts.map(JSON.stringify);
                    uniqueSet = new Set(jsonObject);
                    posts = Array.from(uniqueSet).map(JSON.parse);
                    console.log(sortBy + " , " +direction)
                    if(direction == "desc"){
                        posts.sort((a,b)=>b.sortBy - a.sortBy)
                    }else{
                        posts.sort((a,b)=>a.sortBy - b.sortBy)
                    }
                    //posts.sort(compare)
                    res.status(200).json({"posts":posts});
                }
            });
        })
   } 
   
   
    

});

module.exports = router;