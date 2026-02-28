import View from "./view.js";
import previewView from "./previewView.js";

class ResultsView extends View {
  _parentEl = document.querySelector('.results')
  _errorMsj = "Results View Not found"

  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join("")
  }


}

export default new ResultsView();