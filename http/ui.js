function WeatherInCity() {
  const [text, setText] = React.useState('')
  const [result, setResult] = React.useState('')

  const onsubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3000/', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      body: JSON.stringify(text)
    }).then((response) => response.json()).then((data) => {
      setResult(data.current.temperature);
      setText('')
    })
  }

  const onchange = (e) => {
    setText(e.target.value)
  }

  return (
    React.createElement(
      'form',
      { onSubmit: onsubmit },
      React.createElement('label', { children: 'Write city name'}),
      React.createElement('input', { type: 'text', onChange: onchange }),
      React.createElement('div', {children: result})
    )
  )
}

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(React.createElement(WeatherInCity));