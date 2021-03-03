const express=require("express");
const router= express.Router();
const Categorie=require("./Categorie");
const slugify = require("slugify");



router.get("/admin/categories/new",(req,res)=>{

    res.render("admin/categories/new");

})
router.post("/categories/save",(req,res)=>{
    // receber os dados do formulario
    var title =req.body.title;
   if(title != undefined){
    Categorie.create(
        {titulo:title,
    slug:slugify(title)
        }
    ).then(()=>{
        res.redirect("/admin/category")
    })
   }else{
       res.redirect("/admin/categories/new");
   }
})

router.get("/admin/category",(req,res)=>{
    Categorie.findAll().then( categorias =>{
        res.render("admin/categories/index",{categorias:categorias})
    })
})

router.post("/category/delete",(req,res)=>{
    var id= req.body.id;
    if (id!=undefined){
        if(!isNaN(id)){
        Categorie.destroy({
            where:{
                id:id
            }
        }).then(()=>{
            res.redirect("/admin/category")
        })   

        }else{
            res.redirect("/admin/category") 
        }

    }else{
        res.redirect("/admin/category")
    }


})

router.get("/admin/category/edicao/:id",(req,res) => {
 var id = req.params.id;
 if(isNaN(id)){
    res.redirect("/admin/category")
 }
 // findByPk para pesquisar por id rapido 
 Categorie.findByPk(id).then((categoria)=>{
     if (categoria != undefined){
     res.render("admin/categories/edit",{categoria:categoria})
     }else{
         res.redirect("/admin/category")
     }

 }).catch(erro=>{
    res.redirect("/admin/category")
 })


});

router.post("/category/update",(req,res)=>{
var id = req.body.id
var title=req.body.title
Categorie.update({titulo:title, slug:slugify(title)},{
    where:{
        id:id
    }
}).then(()=>{
res.redirect("/admin/category");

})

})

module.exports=router;