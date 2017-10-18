/* eslint-disable no-unused-vars */

const queryString = {
  parse: (query) => {
    if (query === '' || query === '?') {
      return {}
    }
    const sliced = query.slice(1)
    const keyValStrings = sliced.split('&')
    const pairs = []
    keyValStrings.forEach(keyVal => {
      const splitPair = keyVal.split('=')
      pairs.push(splitPair)
    })
    const params = {}
    pairs.forEach(pair => {
      params[pair[0]] = pair[1]
    })
    return params
  },
  stringify: (params) => {
    const pairs = []
    for (const key in params) {
      pairs.push([key, params[key]])
    }
    const string = pairs.map(function (pair) {
      return pair.join('=')
    }).join('&')
    if (string) {
      return '?' + string
    }
    else {
      return string
    }
  }
}
