require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST , DB_PORT , DB_NAME
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/snowpanda`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
// RAILWAYS CONEXION
/*const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});*/
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => {
  if (typeof model === 'function') {
    model(sequelize);
  }
});
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { 
  Products,
  Bills,
  Favorites,
  Reviews,
  Users,
 } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);

//La tabla "Products" podría estar relacionada con la tabla "Users" 
//mediante una relación de muchos a muchos, donde los usuarios pueden 
//tener muchos productos y cada producto puede ser utilizado por muchos usuarios. 

// Relación de muchos a muchos entre Users y Products
Users.belongsToMany(Products,{through: "UserProducts"})
Products.belongsToMany(Users, {through: "UserProducts"})

// Relación de uno a muchos entre Users y Bills
Users.hasMany(Bills)
Bills.belongsTo(Users)//{as: "Comprador", foreignKey: "idUser"}

// Relación de uno a muchos entre Users y Reviews
Users.hasMany(Reviews)
Reviews.belongsTo(Users)

// Relación de muchos a muchos entre Users y Favorites
Users.belongsToMany(Favorites, { through: 'UserFavorite' });
Favorites.belongsToMany(Users, { through: 'UserFavorite' });






module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
 
