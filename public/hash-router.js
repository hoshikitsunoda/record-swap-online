/* global queryString */
/* eslint-disable no-unused-vars */

class HashRouter {
  constructor($view) {
    this.$view = $view
    this.handlers = {}
    this.isListening = false
  }
  when(hash, handler) {
    this.handlers[hash] = handler
  }
  push(hash, params) {
    const newHash = hash + queryString.stringify(params)
    window.location.hash = newHash
  }
  match(hash) {
    const [ path, query = '' ] = hash.slice(1).split('?')
    const params = queryString.parse(query)
    const handler = this.handlers[path]
    if (!handler) return
    const promise = handler.resolve(params)
    promise
      .then(resolved => {
        const $rendered = handler.render(resolved)
        this.$view.innerHTML = ''
        this.$view.appendChild($rendered)
      })
  }
  listen() {
    if (this.isListening) return
    window.addEventListener('hashchange', () => {
      this.match(window.location.hash)
    })
    this.isListening = true
    window.dispatchEvent(new Event('hashchange'))
  }
}
