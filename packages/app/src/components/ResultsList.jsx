import { NavLink } from "react-router-dom"
import "./listItem.css"

function ListItem({ id, imgUri, name, type }) {

  const goTo = type === "actor"
  ?"/actors/" + id
  :"/movies/" + id

  return (
    <li className="list__item" >
      <NavLink to={goTo}>
        <img src={"/api/" + imgUri} alt={name} />
        <h4 className="name" > {name} </h4>
      </NavLink>
    </li>
  )
}


function ResultsList({results}) {

  if (results?.length === 0) return <div> <h2>no se han encontrado resultados... </h2> </div>
  else if (results == null) return null

  return (
    <ul className="results__container" > {
      results?.map(result => <ListItem
        key={result.id}
        id={result.id}
        imgUri={result.imgUri}
        name={result.name}
        type={result.type} />)
    } </ul>
  )
}

export default ResultsList