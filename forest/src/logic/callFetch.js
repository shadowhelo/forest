const callFetch = (query, options, callback, history) =>
  fetch(`http://localhost:3001/${history ? 'history':'api'}`,{
    method: 'POST',
    body: JSON.stringify({
      query,
      options
    }),
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  })
  .then(async response => {
    const json = await response.json()
    callback(json)
  })

export default callFetch
