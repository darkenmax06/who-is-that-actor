import { NavLink } from "react-router-dom"
// import uri from "../utils/uri"
import "./card.css"


function Card  ({imgUri,name,type,id}) {

  const goTo = type === "actor"
  ?"/actor/" + id
  :"/movie/" + id

  return (
    <NavLink to={goTo} id="card" >
      <article className="card" >
        <img src={"/api/" + imgUri} alt={name} />
        <h3 className="name" > {name} </h3>
    </article>
    </NavLink>
  )
}

export default Card