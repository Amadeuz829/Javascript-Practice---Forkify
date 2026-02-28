
import View from './view.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
    _parentEl = document.querySelector('.pagination')

    addHandlerPagination(controlPagination) {
        this._parentEl.addEventListener('click', function (e) {

            const btn = e.target.closest('.btn--inline')
            if (!btn) return
            console.log("Klk")
            controlPagination(btn)
        })
    }
    _markupNext(numPag) {
        return `
                <button data-goTo=${numPag + 1} class="btn--inline pagination__btn--next">
                    <span>Page ${numPag + 1}</span>
                    <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                    </svg>
                </button>
        `
    }

    _markupPrev(numPag) {
        return `
                <button data-goTo=${numPag - 1} class="btn--inline pagination__btn--prev">
                    <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                    </svg>
                    <span>Page ${numPag - 1}</span>
                </button>
            `
    }

    _generateMarkup() {

        const currPage = this._data.currPageResult;
        const numPages = Math.ceil(this._data.queryResult.length / this._data.queryResultPerPag)

        //First Page But More Foward
        if (currPage === 1 && numPages > 1) {
            return this._markupNext(currPage)
        }

        //Last Page
        if (currPage === numPages && numPages !== 1) {
            return this._markupPrev(currPage)
        }

        //Middle page
        if (currPage < numPages) {
            return `${this._markupNext(currPage)} ${this._markupPrev(currPage)}`
        }

        //First Page but no more Foward
        if (currPage === 1 && numPages === 1) {
            return ``
        }
    }

};

export default new PaginationView();