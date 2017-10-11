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
    createElement('form', { class: 'container' }, [
      createElement('div', { class: 'row' }, [ '-Artist-',
        createElement('input', { type: 'text', class: 'artist', id: 'artist', name: 'artist' }, [])
      ]),
      createElement('div', { class: 'row' }, [ '-Title-',
        createElement('input', { type: 'text', class: 'title', id: 'title', name: 'title' }, [])
      ]),
      createElement('div', { class: 'row' }, [ '-Media Condition-',
        createElement('select', { class: 'mediaCondition', id: 'mediaCondition', name: 'mediaCondition' }, [
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
      createElement('div', { class: 'row' }, [ '-Cover Condition-',
        createElement('select', { class: 'coverCondition', id: 'coverCondition', name: 'coverCondition' }, [
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
      createElement('div', { class: 'row' }, [ '-Format-',
        createElement('select', { type: 'text', class: 'format', id: 'format', name: 'format' }, [
          createElement('option', { value: 'LP' }, ['LP']),
          createElement('option', { value: 'EP' }, ['EP']),
          createElement('option', { value: '7"' }, ['7"'])
        ])
      ]),
      createElement('div', { class: 'row' }, [ '-Label-',
        createElement('input', { type: 'text', class: 'label', id: 'label', name: 'label' }, [])
      ]),
      createElement('div', { class: 'row' }, [ '-Price(USD)-',
        createElement('input', { type: 'text', class: 'price', id: 'price', name: 'price' }, [])
      ]),
      createElement('div', { class: 'row' }, [ '-Photos-',
        createElement('input', { type: 'file', class: 'photo', id: 'photo', name: 'photo', accept: 'image/*' }, [])
      ]),
      createElement('input', { type: 'submit', class: 'submit', id: 'submit', name: 'submit' }, ['SUBMIT'])
    ])

  $form.addEventListener('submit', event => {
    event.preventDefault()
    const formData = new FormData(event.target)
    fetch('/inventory', {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(saved => console.log(saved, 'posted'))
  })
  return $form
}

document.body.appendChild(renderForm())
