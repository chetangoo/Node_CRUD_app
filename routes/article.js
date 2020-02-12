const express = require("express");
const router = express.Router();
let Article = require("../models/article");



// Defining the get route for different url
router.get('/add',(req,res) => {
    res.render('add_article',{
        title : 'Add Article'
    });
});

// getting a particulat article
router.get('/:id',(req,res) =>{
    Article.findById(req.params.id, (error,article) => {
        res.render('article',{
            article:article
        });
    });
});

// Submitting the request
router.post('/add',(req,res) => {
    let article = new Article();

    article.title = req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;

    article.save((error) => {
        if(error){
            console.log(error);
            return;
        }else{
            req.flash('success','Submission Successful');
            res.redirect('/');
        }
    });
});


router.get('/edit/:id', (req,res) =>{
    Article.findById(req.params.id , (error,article) =>{
        res.render('edit_article',{
            title:'Edit Article',
            article:article
        });
    });
});

router.post('/edit/:id',(req, res) =>{
    let article = {};
    article.title = req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;
  
    let query = {_id:req.params.id}
  
    Article.update(article, query, (err) => {
      if(err){
        console.log(err);
        return;
      } else {
        req.flash('success','Submission Successful');
        return res.redirect('/');
      }
    });
  });

router.delete('/:id', (req,res)=>{
    let query = {_id : req.params.id}

    Article.deleteOne(query,(err) => {
        if(err){
            console.log(err);
        }
        res.send('Success');
    });
});



// Defining the route for not exixtent url
router.get('*',(req,res) =>{
    res.send("Ooops route does not exist");
});

module.exports = router;