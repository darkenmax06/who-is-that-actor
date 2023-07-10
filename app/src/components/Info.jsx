const uri = "http://localhost:3000/"

function Info  ({imgUri,name,description,date}) {
  return (
    <section>
      <picture className="img__box">
        <img src={uri+ imgUri} alt={name} />
      </picture>
      <div className="text__box">
        <h2> {name} </h2>
        <p> {description} </p>
        <span>fecha de estreno: {date} </span>
      </div>
    </section>
  )
}

export default Info