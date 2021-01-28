const Sequelize = require('sequelize');
const sequelize = new Sequelize('workOutdb', 'postgres', 'password', {
    host: 'localhost',
    dialect: 'postgres'
});

sequelize.authenticate().then(
    function() {
        console.log('Connected to workOutdb postgress database');
    },
    function(err){
        console.log(err);
    }
);

module.exports = sequelize;