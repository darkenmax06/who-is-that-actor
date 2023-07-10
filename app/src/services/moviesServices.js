const URI = "http://localhost:3000/movie"

function getMovie ({id}){
  return fetch(URI+"/id/"+id)
  .then(async res=> {
    const json = await res.json()
    if (!res.ok) throw json.error
    return json
  })
  .then(res => res)
}

export {
  getMovie
}