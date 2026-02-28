import View from './view';

class SearchView extends View {

    _parentEl = document.querySelector('.search');
    _searchField = document.querySelector('.search__field');

    getQuery() {
        const query = this._searchField.value;
        this._clear()
        return query
    }

    addHandlerSearch(controHandler) {
        this._parentEl.addEventListener('submit', function (e) {
            e.preventDefault();
            controHandler();
        })
    }



    _clear() {
        this._searchField.value = ""
    }

}

export default new SearchView();