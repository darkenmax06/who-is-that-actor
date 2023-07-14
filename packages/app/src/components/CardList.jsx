import Card from "./Card"
import "./anexos.css" 

function CardList ({list, title}) {

  if (!list) return "no hay anexos..."

  return (
    <section className="anexos">
      <h2> {title} </h2>
      <div className="container">
      {
        list.map((anexo) => 
        <Card 
        key={anexo.id}
        name={anexo.name}
        imgUri={anexo.imgUri}
        type={anexo.type}
        id={anexo.id}
         /> 
        )
      }
      </div>
    </section>
  )
}

export default CardList