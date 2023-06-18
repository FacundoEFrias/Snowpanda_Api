const { 
    Favorites,
    Reviews,
    Users,
    Products,
   } = require('../db')


   //const loadFavorites = require('../data/favorites.json');
   const loadReviews = require('../data/reviews.json');
   const loadUsers = require('../data/users.json');
   const loadProducts = require('../data/products.json')
   
  
   async function loadAllModelsInDB(){
    try{
      const emptyProducts = await Products.findAll({});
      if(!emptyProducts){
        await Products.bulkCreate(loadProducts);
      console.log('Products loaded ok to DB')
      }
      // await Favorites.bulkCreate(loadFavorites);
      // console.log('Favorites loaded ok to DB')
      await Users.bulkCreate(loadUsers);
      console.log('Users loaded ok to DB')

      await Reviews.bulkCreate(loadReviews);
      console.log('Reviews loaded ok to DB');
      await Products.bulkCreate(loadProducts);
      console.log('Products loaded ok to DB re-checked');
  
    } catch(error){
      console.log(error);
    }
    
  
  }
  
  module.exports = {
      loadAllModelsInDB
    }
  