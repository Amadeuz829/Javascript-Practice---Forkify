import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js'
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import addRecipeView from './views/addRecipeView.js';
import { TIMEOUT_MODAL_SEC } from './config.js'
import { wait } from './helpers.js';

import 'core-js';
import 'regenerator-runtime/runtime'
import bookmarkView from './views/bookmarkView.js';

// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io

if (module.hot) {
  module.hot.accept();
}

async function controlRecipes() {
  try {

    const id = window.location.hash.slice(1)
    if (!id) return
    recipeView.renderSpinner()

    console.log(model.state)
    //Load Recipe
    await model.loadRecipe(id)
    // console.log(model.state)

    resultsView.updateView(model.getSearchResultsPage())
    // console.log(resultsView._data)

    bookmarkView.updateView(model.state.booked)


    const { recipe } = model.state

    //Render Recipe
    recipeView.render(recipe);



  } catch (err) {
    recipeView.renderErrorMsj(err)
    console.error(err)
  }
};

async function controlSearch(searchField) {
  const query = searchView.getQuery()
  await model.loadQuery(query);

  //Render Querry Results
  // resultsView.render(model.state.queryResult)
  resultsView.render(model.getSearchResultsPage())

  //Render Pagination
  paginationView.render(model.state)

}

async function controlPagination(btn) {
  resultsView.render(model.getSearchResultsPage(+btn.dataset.goto))
  paginationView.render(model.state)
}

async function controlServing(ServingToUpdate) {
  if (ServingToUpdate < 1) return

  model.servingUpdate(ServingToUpdate)

  // recipeView.render(model.state.recipe);
  recipeView.updateView(model.state.recipe);
}
// controlRecipes();

async function controlBook() {
  //add  or delete book
  if (!model.state.recipe.isBooked) model.addBook();
  else model.deleteBook(model.state.recipe.id);

  //update book
  bookmarkView.render(model.state.booked)
  recipeView.updateView(model.state.recipe)
}


async function initControBook() {
  //render bookview
  bookmarkView.render(model.state.booked)

}
async function submitForm(data) {
  try {
    addRecipeView.renderSpinner();
    //render bookview

    await model.createRecipe(data);

    addRecipeView.renderMsj();

    //close modal
    await wait(TIMEOUT_MODAL_SEC)
    addRecipeView.toggleWindow()

    //Render new Recipe
    recipeView.render(model.state.recipe);
    //render Bookmark
    bookmarkView.render(model.state.booked)
    //Update Hash
    window.history.pushState(null, "", model.state.recipe.key)
  }
  catch (err) {
    addRecipeView.renderErrorMsj(err)
    await wait(TIMEOUT_MODAL_SEC)
    addRecipeView.toggleWindow()
  }

}


function init() {
  addRecipeView.addHandlerSubmitForm(submitForm)
  bookmarkView.addHandlerInitBooking(initControBook)
  searchView.addHandlerSearch(controlSearch)
  paginationView.addHandlerPagination(controlPagination)
  recipeView.addHandlerRender(controlRecipes)
  recipeView.addHandlerServing(controlServing)
  recipeView.addHandlerBooking(controlBook)
}

init()
