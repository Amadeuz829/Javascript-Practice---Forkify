import { async } from "regenerator-runtime";
import { KEY, URL_API } from "./config.js";
import { GetJson, SendJson } from "./helpers.js";
import { QUERY_RESULTS_PER_PAGE } from "./config.js";
import recipeView from "./views/recipeView.js";



export const state = {

    recipe: {},
    query: "",
    queryResult: [],
    queryResultPerPag: QUERY_RESULTS_PER_PAGE,
    currPageResult: 1,
    booked: [],
    isBooked: false,
};

const createRecipeData = function (data) {
    let { recipe } = data.data;
    // console.log(recipe)
    return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        sourceUrl: recipe.source_url,
        image: recipe.image_url,
        cookingTime: recipe.cooking_time,
        ingredients: recipe.ingredients,
        servings: recipe.servings,
        ...(recipe.key && { key: recipe.key })
    };
}

export const loadRecipe = async function (id) {

    try {
        const data = await GetJson(id)

        state.recipe = createRecipeData(data);

        if (state.booked.some(book => book.id === id)) {
            state.recipe.isBooked = true;
        } else {
            state.recipe.isBooked = false;
        }

    } catch (err) {
        throw err
    }
}

export const loadQuery = async function (query) {
    try {
        state.query = query
        const { data } = await GetJson(`?search=${query}`);

        //Renaming image key
        data.recipes.forEach(recipe => {
            recipe.image = recipe.image_url
            delete recipe.image_url;
        });

        state.queryResult = data.recipes


    } catch (err) {
        throw err
    }
}

export const decreaseServing = function () {
    state.recipe.servings--
}

export const servingUpdate = function (newServing) {
    // newQt = oldQT * newServing / oldserving
    state.recipe.ingredients.forEach(ingredient => {
        ingredient.quantity = (ingredient.quantity * newServing) / state.recipe.servings
    });
    state.recipe.servings = newServing;

}

const updateLocalStorage = function () {
    localStorage.setItem('BookMark', JSON.stringify(state.booked))
}

export const init = function () {
    const storage = localStorage.getItem('BookMark')
    if (!storage) return
    state.booked = JSON.parse(storage)
}

export const addBook = function () {
    state.recipe.isBooked = true
    state.booked.push(state.recipe)
    updateLocalStorage()
}

export const deleteBook = function (id) {
    state.recipe.isBooked = false
    const index = state.booked.findIndex(book => book.id === id)
    state.booked.splice(index, 1)
    updateLocalStorage()
}

export const getSearchResultsPage = function (page = 1) {
    state.currPageResult = page;
    const start = (page - 1) * state.queryResultPerPag;
    const end = page * state.queryResultPerPag;
    return state.queryResult.slice(start, end)
}

export const createRecipe = async function (data) {
    //Format for Submit
    try {
        const ingredients = Object.entries(data).filter(value => value[0].startsWith("ingredient") && value[1] !== "").map(ingredient => {
            const recipeArr = ingredient[1].split(",")

            if (recipeArr.length !== 3) throw new Error("Formato de ingredientes incorrecto")

            const [quantity, unit, description] = recipeArr
            return { quantity: +quantity ? quantity : null, unit: unit ? unit : null, description }
        })

        console.log(state.recipe)
        const recipe = {
            id: "123",
            cookingTime: data.cookingTime,
            title: data.title,
            publisher: data.publisher,
            source_url: data.sourceUrl,
            cooking_time: data.cookingTime,
            ingredients: ingredients,
            servings: data.servings,
            image_url: data.image_url,
            key: KEY
        }
        // const response = await SendJson(`${URL_API}?key=${KEY}`, recipe)
        // state.recipe = createRecipeData(data);
        state.recipe = recipe;
        console.log(data)
        return addBook(state.recipe)
    }
    catch (error) {
        throw error
    }
};

const clearBook = function () {
    localStorage.clear()
}
init()
// clearBook()

// title: recipe.title,
// publisher: recipe.publisher,
// sourceUrl: recipe.source_url,
// image: recipe.image_url,
// cookingTime: recipe.cooking_time,
// ingredients: recipe.ingredients,
// servings: recipe.servings