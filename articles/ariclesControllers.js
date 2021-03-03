const express=require("express");
const router= express.Router();
const Categorie= require("../categories/Categorie")
const Artcle = require("./Artcle");
const  slugify = require("slugify")

router.get("/admin/articles",(req,res)=>{
    Artcle.findAll({
        include:[{model:Categorie}]
    }).then((articles)=>{
        res.render("admin/articles/index",{articles:articles}) 

    })
});

router.get("/admin/articles/new",(req,res)=>{
    Categorie.findAll().then(categories=>{
        res.render("admin/articles/new",{categories:categories})
    }) 
})
// salvar
router.post("/artcles/save", (req,res)=>{
 var titulo = req.body.titulo;
 var body = req.body.body;
 var category = req.body.category;

 Artcle.create({
    titulo:titulo,
     body:body,
     slug: slugify(titulo),
     category:category,
     categoryId:category
 }).then(()=>{
    res.redirect("/admin/articles")
 })

});




module.exports=router;