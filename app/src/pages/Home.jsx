import { useEffect, useState } from "react"
import SearchForm from "../components/SearchForm"
import "./home.css"
import { getMovies } from "../services/moviesServices"
import CardList from "../components/CardList"

function Home() {
  const [movies,setMovies] = useState(null)

  useEffect(()=>{
    getMovies({page: 0, limit: 10})
    .then(res => {
      setMovies(res)
    })
    .catch(err=> console.log(err))
  },[])

  return (
    <section className="home" >
      <h1>Who is that actress?</h1>
      <SearchForm/>
      <CardList list={movies} title="Peliculas mas taquilleras" />
    </section>
  )
}

export default Home