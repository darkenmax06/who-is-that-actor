import { useParams } from "react-router-dom"
import useMovie from "../hooks/useMovie"
import Info from "../components/Info"
import Anexos from "../components/Anexos"

function Movie  () {
  const {id } = useParams()
  const {movie,loading,error} = useMovie({id})

  if (loading) return "cargando..."
  if (error) return error

  console.log(movie)

  return (
    <section>
      {movie && 
      <>
      <Info {...movie} />
      <Anexos anexos={movie.actors} />
      </>}
    </section>
  )
}

export default Movie