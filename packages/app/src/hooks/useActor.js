import {useEffect, useState} from 'react'

export default function useActor({id}) {
  const [actor,setActor] = useState(null)
  const [loading,setLoading] = useState(true)
  const [error,setError] = useState(null)

  useEffect(()=>{
    if (!id) return 

  },[id])

  return {
    actor,
    loading,
    error
  }
}