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

/*

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

fetch('/inventory', {
  method: 'GET',
  headers: { 'content-type': 'application/json' }
})
  .then((res) => res.json())
  .then((result) => {
    const $record = renderRecord(result[2])
    const $image = showImage(result[2])
    document.querySelector('.container').append($record, $image)
  })

// function to render record detail. (for issue-5)

function renderRecord(record) {
  const $record = document.createElement('div')
  const $artist = document.createElement('h3')
  const $title = document.createElement('h4')
  const $condition = document.createElement('h4')
  const $format = document.createElement('h4')
  const $label = document.createElement('h4')
  const $price = document.createElement('h4')

  $artist.textContent = record.artist
  $title.textContent = record.title
  $condition.textContent = record.mediaCondition + '/' + record.coverCondition
  $format.textContent = record.format
  $label.textContent = record.label
  $price.textContent = record.price + ' USD'

  $record.append($artist, $title, $condition, $format, $label, $price)

  return $record
}

*/

// function to show listings
const renderPhotos = () => {
  const $photo =
    createElement('div', { class: 'container', id: 'listings' }, [])
  return $photo
}

document.body.appendChild(renderPhotos())

function showImage(record) {
  const $box = createElement('div', { class: 'col-1-3' }, [])
  const $img = document.createElement('img')
  const $artist = document.createElement('li')
  const $condition = document.createElement('li')
  const $price = document.createElement('li')

  $img.src = record.filename
  $artist.textContent = record.artist + '/' + record.title
  $condition.textContent = record.mediaCondition + '/' + record.coverCondition
  $price.textContent = record.price + 'USD'

  $box.appendChild($img)
  $box.addEventListener('mouseover', () => {
    $box.appendChild($artist)
    $box.appendChild($condition)
    $box.appendChild($price)
  })
  $box.addEventListener('mouseleave', () => {
    $box.removeChild($artist)
    $box.removeChild($condition)
    $box.removeChild($price)
  })
  return $box
}

const $list = document.getElementById('listings')

fetch('/inventory', {
  method: 'GET',
  headers: { 'content-type': 'application/json' }
})
  .then((res) => res.json())
  .then((result) => {
    result.forEach(obj => {
      $list.appendChild(showImage(obj))
    })
  })
