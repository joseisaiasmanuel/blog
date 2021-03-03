const express= require("express");
const  app = express();
const bodyParser=require("body-parser");
const connection=require("./database/database");
const categoriesControllers= require("./categories/categoriesControllers");
const articlesControllers= require("./articles/ariclesControllers");
const Categorie = require("./categories/Categorie");
const Artcle= require("./articles/Artcle")
// difinir as nossas view engine para trabalhar com html
app.set('view engine','ejs');
// body-parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
// static
app.use(express.static('public'));

// database 
connection.authenticate()
.then(()=>{
  console.log("conexão feita com sucesso!")
}).catch((erro)=>{
  console.log(erro);
})
// para verificar a rotas que estão nos nossos controllers
app.use("/",categoriesControllers);
app.use("/",articlesControllers);

app.get("/",(req,res)=>{
    res.render("index");

});

app.listen(7070,()=>{
  console.log("servidor rodando com sucesso!");
})





