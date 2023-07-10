import uri from "../utils/uri"

function Card  ({imgUri,name}) {
  return (
    <article>
      <img src={uri + imgUri} alt={name} />
      <h3> {name} </h3>
    </article>
  )
}

export default Card