import View from "./view.js";
import icons from 'url:../../img/icons.svg';


class _btnAddRecipeView extends View {
    _parentEl = document.querySelector(".upload");

    _btnAddRecipe = document.querySelector(".nav__btn--add-recipe");
    _overLay = document.querySelector(".overlay");
    _btnClose = document.querySelector(".btn--close-modal");
    _window = document.querySelector(".add-recipe-window");

    _massage = "Successfully Uploaded :)"

    constructor() {
        super();
        this.addHandlerShowWindow();
    }

    toggleWindow() {
        const htmlForm = `
    
            <div class="upload__column">
                <h3 class="upload__heading">Recipe data</h3>
                <label>Title</label>
                <input value="TEST1235" required name="title" type="text" />
                <label>URL</label>
                <input value="TEST1235" required name="sourceUrl" type="text" />
                <label>Image URL</label>
                <input value="TEST1235" required name="image" type="text" />
                <label>Publisher</label>
                <input value="TEST1235" required name="publisher" type="text" />
                <label>Prep time</label>
                <input value="23" required name="cookingTime" type="number" />
                <label>Servings</label>
                <input value="23" required name="servings" type="number" />
            </div>

            <div class="upload__column">
                <h3 class="upload__heading">Ingredients</h3>
                <label>Ingredient 1</label>
                <input value="0.5,kg,Rice" type="text" required name="ingredient-1"
                placeholder="Format: 'Quantity,Unit,Description'" />
                <label>Ingredient 2</label>
                <input value="1,,Avocado" type="text" name="ingredient-2" placeholder="Format: 'Quantity,Unit,Description'" />
                <label>Ingredient 3</label>
                <input value=",,salt" type="text" name="ingredient-3" placeholder="Format: 'Quantity,Unit,Description'" />
                <label>Ingredient 4</label>
                <input type="text" name="ingredient-4" placeholder="Format: 'Quantity,Unit,Description'" />
                <label>Ingredient 5</label>
                <input type="text" name="ingredient-5" placeholder="Format: 'Quantity,Unit,Description'" />
                <label>Ingredient 6</label>
                <input type="text" name="ingredient-6" placeholder="Format: 'Quantity,Unit,Description'" />
            </div>

            <button class="btn upload__btn">
                <svg>
                <use href="${icons}#icon-upload-cloud"></use>
                </svg>
                <span>Upload</span>
            </button>

        `;
        // debugger;
        this._overLay.classList.toggle("hidden");
        this._window.classList.toggle("hidden");

        if (!this._window.classList.contains("hidden")) {
            this._clear()
            this._parentEl.insertAdjacentHTML('afterbegin', htmlForm)
        }
    }

    addHandlerShowWindow() {
        //Show Window
        this._btnAddRecipe.addEventListener('click', this.toggleWindow.bind(this))

        //Close Window
        this._btnClose.addEventListener('click', this.toggleWindow.bind(this))
    }

    addHandlerSubmitForm(handler) {
        this._parentEl.addEventListener('submit', function (e) {
            e.preventDefault()
            const data = [... new FormData(this)]
            const dataObjet = Object.fromEntries(data)
            handler(dataObjet)
        })
    }


}

export default new _btnAddRecipeView()