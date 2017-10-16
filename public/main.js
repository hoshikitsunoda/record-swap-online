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
      createElement('form', { class: 'form hidden', id: 'form' }, [
        createElement('div', { class: 'col-1-2' }, [createElement('div', { class: 'row' }, [ '-Artist-',
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
        ])
        ]),
        createElement('div', { class: 'col-1-2' }, [createElement('div', { class: 'row' }, [ '-Photos-',
          createElement('input', { type: 'file', class: 'photo', id: 'photo', name: 'photo', accept: 'image/*' }, [])
        ]),
        createElement('div', { class: 'row' }, ['-Your Phone#-',
          createElement('input', { type: 'text', class: 'phone', id: 'phone', name: 'phone' }, [])
        ]),
        createElement('div', { class: 'row' }, ['-Condition Comments-',
          createElement('textarea', { type: 'text', class: 'comment', rows: '10', cols: '50', id: 'comment', name: 'comment' }, [])
        ]),
        createElement('input', { type: 'submit', class: 'submit', id: 'submit', name: 'submit' }, ['SUBMIT'])
        ])
      ])

  $form.addEventListener('submit', event => {
    event.preventDefault()
    const formData = new FormData(event.target)
    fetch('/inventory', {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(saved => console.log(saved, 'posted'), alert('Thank you for submitting. You will receive a confirmation text message shortly.'))
      .then(window.location.reload(true))
  })
  return $form
}

document.body.appendChild(renderForm())

/*

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

const listImageBox = () => {
  const $photo =
    createElement('div', { class: 'container hidden' }, [
      createElement('div', { class: 'list', id: 'listings' }, [])
    ])
  return $photo
}

document.body.appendChild(listImageBox())

const recordDetail = () => {
  const $detailBox =
    createElement('div', { class: 'container' }, [
      createElement('div', { class: 'list', id: 'detail' }, [])
    ])
  return $detailBox
}

document.body.appendChild(recordDetail())

const renderListings = (record) => {
  const $box = createElement('div', { class: 'col-1-3' }, [])
  const $img = document.createElement('img')
  const $artist = document.createElement('li')
  const $title = document.createElement('li')
  const $condition = document.createElement('li')
  const $price = document.createElement('li')
  const $format = document.createElement('li')
  const $label = document.createElement('li')
  const $comment = document.createElement('li')

  $img.src = record.filename
  $artist.textContent = record.artist
  $title.textContent = record.title
  $condition.textContent = record.mediaCondition + '/' + record.coverCondition
  $price.textContent = record.price + 'USD'
  $format.textContent = record.format
  $label.textContent = record.label
  $comment.textContent = record.comment

  $box.appendChild($img)
  $box.addEventListener('mouseover', () => {
    $box.appendChild($artist)
    $box.appendChild($title)
    $box.appendChild($condition)
    $box.appendChild($price)
  })
  $box.addEventListener('mouseleave', () => {
    $box.removeChild($artist)
    $box.removeChild($title)
    $box.removeChild($condition)
    $box.removeChild($price)
  })
  return $box
}

const renderRecordDetail = (record) => {
  const $detailBox2 = createElement('div', { class: 'col-1-2' }, [])

  const $artist = document.createElement('li')
  const $title = document.createElement('li')
  const $condition = document.createElement('li')
  const $price = document.createElement('li')
  const $format = document.createElement('li')
  const $label = document.createElement('li')
  const $comment = document.createElement('li')

  $artist.textContent = record.artist
  $title.textContent = record.title
  $condition.textContent = record.mediaCondition + '/' + record.coverCondition
  $price.textContent = record.price + 'USD'
  $format.textContent = record.format
  $label.textContent = record.label
  $comment.textContent = record.comment

  $detailBox2.append($artist, $title, $condition, $price, $format, $label, $comment)
  return $detailBox2
}

const renderBigImage = (record) => {
  const $detailBox1 = createElement('div', { class: 'col-1-2' }, [])

  const $img = document.createElement('img')

  $img.src = record.filename

  $detailBox1.appendChild($img)
  return $detailBox1
}

const $list = document.getElementById('listings')
const $form = document.getElementById('form')
const $detail = document.getElementById('detail')

fetch('/inventory', {
  method: 'GET',
  headers: { 'content-type': 'application/json' }
})
  .then((res) => res.json())
  .then((result) => {
    result
      .slice()
      .reverse()
      .forEach(obj => {
        $list.appendChild(renderListings(obj))
      })
  })

fetch('/inventory', {
  method: 'GET',
  headers: { 'content-type': 'application/json' }
})
  .then((res) => res.json())
  .then((result) => {
    result
      .slice()
      .reverse()
      .forEach(obj => {
        $detail.appendChild(renderBigImage(obj))
        $detail.appendChild(renderRecordDetail(obj))
      })
  })

const $sell = document.getElementById('sell')
const $buy = document.getElementById('buy')

$sell.addEventListener('click', () => {
  $list.classList.toggle('hidden')
  $form.classList.toggle('hidden')
  $buy.classList.toggle('hidden')
  $sell.classList.toggle('hidden')
})

$buy.addEventListener('click', () => {
  window.location.reload(true)
  $list.classList.toggle('hidden')
  $form.classList.toggle('hidden')
  $buy.classList.toggle('hidden')
  $sell.classList.toggle('hidden')
})
