import { useParams } from "react-router-dom"
import useMovie from "../hooks/useMovie"
import Info from "../components/Info"
import CardList from "../components/CardList"

function Movie  () {
  const {id } = useParams()
  const {movie,loading,error} = useMovie({id})

  if (loading) return "cargando..."
  if (error) return error

  if (movie == null) return null
//cambiar estos estilos
  const styles ={
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }
  return (
    <section style={styles} >
      <Info {...movie} />
      <CardList list={movie.actors} title={"Actores"}/>
    </section>
  )
}

export default Movie