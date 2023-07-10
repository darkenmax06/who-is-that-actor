import { useEffect, useState } from "react"
import {search} from "../services/searchServices"
import ResultsList from "./ResultsList"

function SearchForm() {
  const [results,setResults] = useState(null)
  const [value,setValue] = useState("")

  useEffect(()=>{
    const interval = setTimeout(()=>{
      if (value){
      search({value})
      .then(res => setResults(res))
      }
    },1000)

    return ()=> clearTimeout(interval)
  },[value])


  return (
    <div>
      <form>
        <input
          type="text"
          value={value}
          placeholder="search movie or actor..."
          onChange={e => setValue(e.target.value)} />
      </form>
      <ResultsList results={results} />
    </div>
  )
}

export default SearchForm