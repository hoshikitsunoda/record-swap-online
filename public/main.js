/* global HashRouter createElement */

const $view = document.querySelector('#view')

const router = new HashRouter($view)

const renderForm = () => {
  const $form =
      createElement('form', { id: 'form' }, [
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
      .then(window.location.hash = '#lists')
  })

  $sell.classList.add('hidden')
  $buy.classList.remove('hidden')
  return $form
}

const renderList = (record) => {
  const $box = createElement('div', { class: 'col-1-3' }, [])
  const $img = document.createElement('img')
  const $artist = document.createElement('li')
  const $title = document.createElement('li')
  const $condition = document.createElement('li')
  const $price = document.createElement('li')

  $img.src = record.filename
  $artist.textContent = record.artist
  $title.textContent = record.title
  $condition.textContent = record.mediaCondition + '/' + record.coverCondition
  $price.textContent = record.price + 'USD'

  $img.setAttribute('data-id', record._id)
  $img.setAttribute('class', 'image')
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
  $box.addEventListener('click', event => {
    const $image = event.target.closest('.image')
    if (!$image) return
    router.push('item', { _id: $image.getAttribute('data-id') })
  })
  $buy.classList.add('hidden')
  $sell.classList.remove('hidden')
  return $box
}

const renderListings = (records) => {
  const $listing = createElement('div', { class: 'list', id: 'listings' }, [])
  records
    .map(renderList)
    .slice()
    .reverse()
    .forEach($box => $listing.appendChild($box))
  return $listing
}

const renderDetail = (record) => {
  const $box = createElement('div', {}, [])
  const $detailBox = createElement('div', { class: 'col-2-3' }, [])
  const $detailBox1 = createElement('div', { class: 'col-2-2' }, [])
  const $goBack = createElement('button', { class: 'goback', id: 'goback' }, ['Go Back'])

  const $artist = document.createElement('li')
  const $title = document.createElement('li')
  const $condition = document.createElement('li')
  const $price = document.createElement('li')
  const $format = document.createElement('li')
  const $label = document.createElement('li')
  const $comment = document.createElement('li')
  const $img = document.createElement('img')
  $img.classList.add('big')

  $artist.textContent = record.artist
  $title.textContent = record.title
  $condition.textContent = record.mediaCondition + '/' + record.coverCondition + '  (Media/Cover)'
  $price.textContent = record.price + 'USD'
  $format.textContent = record.format
  $label.textContent = record.label
  $comment.textContent = 'Condition Comment: ' + '\n' + record.comment

  $img.src = record.filename

  $detailBox.appendChild($img)
  $detailBox1.append($artist, $title, $condition, $price, $format, $label, $goBack)
  if (record.comment !== undefined) {
    $detailBox1.appendChild($comment)
  }
  $goBack.addEventListener('click', () => {
    window.location.hash = '#lists'
  })
  $box.append($detailBox, $detailBox1)
  $buy.classList.add('hidden')
  $sell.classList.remove('hidden')
  return $box
}

router.when('', {
  resolve: getList,
  render: renderListings
})

router.when('lists', {
  resolve: getList,
  render: renderListings
})

router.when('item', {
  resolve: getRecord,
  render: renderDetail
})

router.when('form', {
  resolve: sendForm,
  render: renderForm
})

router.listen()

function getList(params) {
  return fetch('/inventory/')
    .then(res => res.json())
}

function getRecord(params) {
  return fetch('/inventory/' + params.id)
    .then(res => res.json())
}

function sendForm(params) {
  return fetch('/inventory')
    .then(res => res.json())
}

const $sell = document.getElementById('sell')
const $buy = document.getElementById('buy')

$sell.addEventListener('click', () => {
  window.location.hash = '#form'
})

$buy.addEventListener('click', () => {
  window.location.hash = '#lists'
})
