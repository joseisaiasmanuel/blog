const Sequelize= require("sequelize");
const connection=require("../database/database")
const Categorie= require("../categories/Categorie")

const Artcle = connection.define('articles',{
    titulo:{
        type:Sequelize.STRING,
        allowNull:false

    },
    slug:{
        type:Sequelize.STRING,
        allowNull:false

    },

    body:{
        type:Sequelize.TEXT,
        allowNull:false

    }
})
Artcle.belongsTo(Categorie);
Categorie.hasMany(Artcle);
module.exports=Artcle;

