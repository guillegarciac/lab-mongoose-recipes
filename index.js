const mongoose = require('mongoose');
const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';
mongoose.set('strictQuery', true);
// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');



// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    //Recipe.create() is the same as declaring const newRecipe
    const newRecipe = Recipe.create({
      title: "spaguetti with pesto", level: "Easy Peasy", ingridients: ["pasta", "pesto", "cheese"], cuisine: "Italian", dishType: "main_course", duration: "15", creator: "Luca Barilla", created: 'Thu Dec 20 1900 09:00:59 GMT+0000'
    })
    return newRecipe;
  })
  //.then(createdRecipe => console.log(createdRecipe))
  .then(() => {
    return Recipe.deleteMany()
  })
  .then(() => {
    return Recipe.insertMany(data)
  })
  .then(createdRecipes => console.log(createdRecipes))
  //Not sure how to console.log only the title of each recipe
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
