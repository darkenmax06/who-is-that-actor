import getDate from "../utils/getDate"
import "./info.css"

function Info  ({imgUri,name,description,date,recaudacion}) {

  getDate(date)
  return (
    <section className="movies__info" >

      <picture className="img__box">
        <img src={"/api/" + imgUri} alt={name} />
      </picture>

      <div className="text__box">
        <h2> {name} </h2>
        <p> {description} </p>

        <ul>
          <li>
            <span>Fecha de estreno: </span>
            {getDate(date)}
          </li>
          <li>
            <span>Recaudacion: </span>
            {recaudacion} de dolares
          </li>
        </ul>

      </div>
    </section>
  )
}

export default Info