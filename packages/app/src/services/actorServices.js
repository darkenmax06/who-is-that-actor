const URI = "/api/actors/"

function getActorById ({id}){
  return fetch(URI + id )
}