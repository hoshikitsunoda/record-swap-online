const createElement = (tagName, attributes, children) => {
  const $element = document.createElement(tagName)
  for (let key in attributes) {
    $element.setAttribute(key, attributes[key])
  }
  children.forEach(child => {
    child instanceof Node
      ? $element.appendChild(child)
      : $element.appendChild(document.createTextNode(child))
  })
  return $element
}

const renderForm = () => {
  const $form =
    createElement('div', { class: 'container' }, [
      createElement('div', { class: 'row' }, [ 'Artist:',
        createElement('input', { class: 'artist' }, [])
      ]),
      createElement('div', { class: 'row' }, [ 'Title:',
        createElement('input', { class: 'title' }, [])
      ]),
      createElement('div', { class: 'row' }, [ 'Vinyl Condition:',
        createElement('select', { name: 'vinylCondition' }, [
          createElement('option', { value: 'SS' }, ['SS']),
          createElement('option', { value: 'NM' }, ['NM']),
          createElement('option', { value: 'VG+' }, ['VG+']),
          createElement('option', { value: 'VG' }, ['VG']),
          createElement('option', { value: 'VG-' }, ['VG-']),
          createElement('option', { value: 'G+' }, ['G+']),
          createElement('option', { value: 'G' }, ['G']),
          createElement('option', { value: 'F' }, ['F']),
          createElement('option', { value: 'P' }, ['P'])
        ])
      ]),
      createElement('div', { class: 'row' }, [ 'Cover Condition:',
        createElement('select', { name: 'coverCondition' }, [
          createElement('option', { value: 'SS' }, ['SS']),
          createElement('option', { value: 'NM' }, ['NM']),
          createElement('option', { value: 'VG+' }, ['VG+']),
          createElement('option', { value: 'VG' }, ['VG']),
          createElement('option', { value: 'VG-' }, ['VG-']),
          createElement('option', { value: 'G+' }, ['G+']),
          createElement('option', { value: 'G' }, ['G']),
          createElement('option', { value: 'F' }, ['F']),
          createElement('option', { value: 'P' }, ['P'])
        ])
      ]),
      createElement('div', { class: 'row' }, [ 'Format:',
        createElement('select', { class: 'Format' }, [
          createElement('option', { value: 'LP' }, ['LP']),
          createElement('option', { value: 'EP' }, ['EP']),
          createElement('option', { value: '7"' }, ['7"'])
        ])
      ]),
      createElement('div', { class: 'row' }, [ 'Year:',
        createElement('input', { class: 'year' }, [])
      ]),
      createElement('div', { class: 'row' }, [ 'Label:',
        createElement('input', { class: 'label' }, [])
      ]),
      createElement('button', { type: 'submit', class: 'submit' }, ['SUBMIT'])
    ])
  return $form
}

document.body.appendChild(renderForm())
