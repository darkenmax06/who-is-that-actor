import { useEffect, useState } from "react"
import {search} from "../services/searchServices"

export default function useSearch() {
  const [results,setResults] = useState(null)
  const [value,setValue] = useState("")

  useEffect(()=>{
    const interval = setTimeout(()=>{
      if (value){
      search({value})
      .then(res => setResults(res))
      }else {setResults(null)}
    },1000)

    return ()=> clearTimeout(interval)
  },[value])

  const reset = ()=>{
    setResults(null)
    setValue("")
  }

  return {
    results,
    setValue,
    value,
    reset
  }
}