// criar a conexão com sequilize

const Sequelize = require("sequelize")
const connection= new Sequelize('guiapress','root','199724',{
    host:'localhost',
    dialect:'mysql',
    timezone:"+01:00"

});

module.exports=connection;