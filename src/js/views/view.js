import icons from 'url:../../img/icons.svg';

export default class View {

  _parentEl;
  _errorMsj;
  _massage;

  _clear() {
    this._parentEl.innerHTML = ""
  }

  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length <= 0)) return this.renderErrorMsj()

    this._data = data
    const markup = this._generateMarkup()
    if (!render) return markup
    this._clear();

    this._parentEl.insertAdjacentHTML('afterbegin', markup)
  }

  updateView(data) {

    this._data = data

    const newMarkup = this._generateMarkup()

    const newDom = document.createRange().createContextualFragment(newMarkup)
    const newElements = Array.from(newDom.querySelectorAll('*'))

    const currElements = Array.from(this._parentEl.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const currEl = currElements[i];

      //Update Context
      if (!newEl.isEqualNode(currEl) && newEl.firstChild?.nodeValue.trim() !== "") {
        console.log(currEl)
        console.log(this._data)
        currEl.textContent = newEl.textContent;
      }

      //Update Atributes
      if (!newEl.isEqualNode(currEl)) {
        Array.from(newEl.attributes).forEach(attr => {
          currEl.setAttribute(attr.name, attr.value)
        })
      }
    })
  }

  renderSpinner() {
    const html = `<div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>`
    this._parentEl.insertAdjacentHTML('afterbegin', html);
  }

  renderErrorMsj(msj = this._errorMsj) {

    const html = `
      <div class="error">
              <div>
                <svg>
                  <use href="${icons}#icon-alert-triangle"></use>
                </svg>
              </div>
              <p>${msj}</p>
      </div>`

    this._clear()
    this._parentEl.insertAdjacentHTML('afterbegin', html)

  }

  renderMsj(msj = this._massage) {

    const html = `
      <div class="message">
        <div>
          <svg>
            <use href="${icons}g#icon-smile"></use>
          </svg>
        </div>
        <p>${msj}</p>
      </div>`

    this._clear()
    this._parentEl.insertAdjacentHTML('afterbegin', html)

  }
}