import {useEffect, useState} from 'react'
import { getMovie } from '../services/moviesServices'

export default function useMovie({id}) {
  const [movie,setMovie] = useState(null)
  const [error,setError] = useState(null)
  const [loading,setLoading] = useState(false)

  useEffect(()=>{
    setLoading(true)
    getMovie({id})
    .then(movie =>setMovie(movie))
    .catch((err) => setError(err))
    .finally(() => setLoading(false))
  },[id])

  return {movie,error,loading}
}