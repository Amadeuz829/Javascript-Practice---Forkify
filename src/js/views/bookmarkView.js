import View from "./view.js";
import previewView from "./previewView.js";

class BookMarkView extends View {
    _parentEl = document.querySelector('.bookmarks__list')
    _errorMsj = "No bookmarks yet. Find a nice recipe and bookmark it :)"

    _generateMarkup() {
        return this._data.map(bookmark => previewView.render(bookmark, false)).join("")
    }

    addHandlerInitBooking(handler) {
        window.addEventListener('load', handler)
    }


}

export default new BookMarkView();