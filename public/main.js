/* global HashRouter createElement */

const $view = document.querySelector('#view')

const router = new HashRouter($view)

const renderForm = () => {
  const $form = createElement('form', { id: 'form' }, [
    createElement('div', { class: 'col-1-2' }, [
      createElement('div', { class: 'row' }, [
        '-Artist-',
        createElement(
          'input',
          { type: 'text', class: 'artist', id: 'artist', name: 'artist' },
          []
        )
      ]),
      createElement('div', { class: 'row' }, [
        '-Title-',
        createElement(
          'input',
          { type: 'text', class: 'title', id: 'title', name: 'title' },
          []
        )
      ]),
      createElement('div', { class: 'row' }, [
        '-Media Condition-',
        createElement(
          'select',
          {
            class: 'mediaCondition',
            id: 'mediaCondition',
            name: 'mediaCondition'
          },
          [
            createElement('option', { value: 'SS' }, ['SS']),
            createElement('option', { value: 'NM' }, ['NM']),
            createElement('option', { value: 'VG+' }, ['VG+']),
            createElement('option', { value: 'VG' }, ['VG']),
            createElement('option', { value: 'VG-' }, ['VG-']),
            createElement('option', { value: 'G+' }, ['G+']),
            createElement('option', { value: 'G' }, ['G']),
            createElement('option', { value: 'F' }, ['F']),
            createElement('option', { value: 'P' }, ['P'])
          ]
        )
      ]),
      createElement('div', { class: 'row' }, [
        '-Cover Condition-',
        createElement(
          'select',
          {
            class: 'coverCondition',
            id: 'coverCondition',
            name: 'coverCondition'
          },
          [
            createElement('option', { value: 'SS' }, ['SS']),
            createElement('option', { value: 'NM' }, ['NM']),
            createElement('option', { value: 'VG+' }, ['VG+']),
            createElement('option', { value: 'VG' }, ['VG']),
            createElement('option', { value: 'VG-' }, ['VG-']),
            createElement('option', { value: 'G+' }, ['G+']),
            createElement('option', { value: 'G' }, ['G']),
            createElement('option', { value: 'F' }, ['F']),
            createElement('option', { value: 'P' }, ['P'])
          ]
        )
      ]),
      createElement('div', { class: 'row' }, [
        '-Format-',
        createElement(
          'select',
          { type: 'text', class: 'format', id: 'format', name: 'format' },
          [
            createElement('option', { value: 'LP' }, ['LP']),
            createElement('option', { value: 'EP' }, ['EP']),
            createElement('option', { value: '7"' }, ['7"'])
          ]
        )
      ]),
      createElement('div', { class: 'row' }, [
        '-Label-',
        createElement(
          'input',
          { type: 'text', class: 'label', id: 'label', name: 'label' },
          []
        )
      ]),
      createElement('div', { class: 'row' }, [
        '-Price(USD)-',
        createElement(
          'input',
          { type: 'text', class: 'price', id: 'price', name: 'price' },
          []
        )
      ])
    ]),
    createElement('div', { class: 'col-1-2' }, [
      createElement('div', { class: 'row' }, [
        '-Photos-',
        createElement(
          'input',
          {
            type: 'file',
            class: 'photo',
            id: 'photo',
            name: 'photo',
            accept: 'image/*'
          },
          []
        )
      ]),
      createElement('div', { class: 'row' }, [
        '-Your Phone#-',
        createElement(
          'input',
          { type: 'text', class: 'phone', id: 'phone', name: 'phone' },
          []
        )
      ]),
      createElement('div', { class: 'row' }, [
        '-Condition Comments-',
        createElement(
          'textarea',
          {
            type: 'text',
            class: 'comment',
            rows: '10',
            cols: '50',
            id: 'comment',
            name: 'comment'
          },
          []
        )
      ]),
      createElement(
        'input',
        { type: 'submit', class: 'submit', id: 'submit', name: 'submit' },
        ['SUBMIT']
      )
    ]),
    createElement('a', { class: 'close', href: '#lists' }, [])
  ])

  $form.addEventListener('submit', event => {
    event.preventDefault()
    const formData = new FormData(event.target)
    fetch('/inventory', {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(
        saved => console.log(saved, 'posted'),
        alert(
          'Thank you for submitting. You will receive a confirmation text message shortly.'
        )
      )
      .then((window.location.hash = '#lists'))
  })

  $sell.classList.add('hidden')
  $buy.classList.remove('hidden')
  return $form
}

const renderList = record => {
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

const renderListings = records => {
  const $listing = createElement('div', { class: 'list', id: 'listings' }, [])
  records.data
    .map(renderList)
    .slice()
    .reverse()
    .forEach($box => $listing.appendChild($box))
  return $listing
}

const renderDetail = record => {
  console.log(record)
  const $box = createElement('form', { id: 'sendMessage' }, [])
  const $detailBox = createElement('div', { class: 'col-2-3' }, [])
  const $detailBox1 = createElement('div', { class: 'col-2-2' }, [])
  const $close = createElement('a', { class: 'close' }, [])
  const $submit = createElement(
    'input',
    { type: 'submit', class: 'send', value: 'Send' },
    []
  )

  const $artist = document.createElement('li')
  const $title = document.createElement('li')
  const $condition = document.createElement('li')
  const $price = document.createElement('li')
  const $format = document.createElement('li')
  const $label = document.createElement('li')
  const $comment = document.createElement('li')
  const $img = document.createElement('img')
  const $name = document.createElement('input')
  const $contact = document.createElement('input')
  const $message = document.createElement('textarea')

  const setAttributes = (element, attributes) => {
    for (let key in attributes) {
      element.setAttribute(key, attributes[key])
    }
  }

  setAttributes($message, {
    type: 'text',
    class: 'buyerMessage',
    rows: '10',
    cols: '50',
    name: 'message',
    placeholder: 'Message to the seller'
  })
  setAttributes($name, {
    name: 'buyerName',
    class: 'name',
    placeholder: 'Your name'
  })
  setAttributes($contact, {
    name: 'contact',
    class: 'contact',
    placeholder: 'Your phone or email'
  })

  $artist.textContent = '-' + record.data.artist
  $title.textContent = '-' + record.data.title
  $condition.textContent =
    '-' +
    record.data.mediaCondition +
    '/' +
    record.data.coverCondition +
    '  (Media/Cover)'
  $price.textContent = '-' + record.data.price + 'USD'
  $format.textContent = '-' + record.data.format
  $label.textContent = '-' + record.data.label
  $comment.textContent =
    '\n' + 'Note: ' + '\n' + '\n' + '\u00A0' + record.data.comment

  $img.src = record.data.filename

  $detailBox.appendChild($img)
  $detailBox1.append($artist, $title, $label, $format, $condition, $price)
  if (record.data.comment !== undefined) {
    $detailBox1.appendChild($comment)
  }
  $detailBox1.append($name, $contact, $message, $submit)
  $detailBox1.appendChild($close)
  $box.append($detailBox, $detailBox1)
  $close.addEventListener('click', () => {
    window.location.hash = '#lists'
  })
  $buy.classList.add('hidden')
  $sell.classList.remove('hidden')

  $box.addEventListener('submit', event => {
    event.preventDefault()
    console.log(event)
    const formData = new FormData(event.target)
    formData.append('artist', record.data.artist)
    formData.append('title', record.data.title)
    formData.append('phone', record.data.phone)
    formData.append('message', 'message')
    formData.append('buyerName', 'name')
    formData.append('contact', 'contact')
    const data = {
      artist: formData.get('artist'),
      title: formData.get('title'),
      phone: formData.get('phone'),
      message: formData.get('message'),
      name: formData.get('buyerName'),
      contact: formData.get('contact')
    }
    const json = JSON.stringify(data)
    fetch('/message', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: json
    })
      .then(res => res.json())
      .then(
        saved => console.log(saved, 'posted'),
        alert('Your message has been sent. The seller will reply shortly.')
      )
    $box.reset()
  })

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
  return fetch('/inventory/').then(res => res.json())
}

function getRecord(params) {
  return fetch('/inventory/' + params.id).then(res => res.json())
}

function sendForm(params) {
  return fetch('/inventory').then(res => res.json())
}

const $sell = document.getElementById('sell')
const $buy = document.getElementById('buy')

$sell.addEventListener('click', () => {
  window.location.hash = '#form'
})

$buy.addEventListener('click', () => {
  window.location.hash = '#lists'
})
