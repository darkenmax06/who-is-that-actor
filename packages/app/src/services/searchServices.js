const URI = "/api/searchs/"

const search = ({value:query}) =>{
  const options = {
    method: "POST",
    body: JSON.stringify({query}),
    headers: {"content-type": "application/json"}
  }

  return fetch(URI,options)
  .then(async(res) => {
    const json = await res.json()
    if (!res.ok) throw json.error
    return json
  })
  .then(res => res)
}


export {
  search
}