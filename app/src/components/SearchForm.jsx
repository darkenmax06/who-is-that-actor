import useSearch from "../hooks/useSearch"
import ResultsList from "./ResultsList"
import "./searchForm.css"
import { Search, X } from "lucide-react"

function SearchForm() {
  const {value, setValue, results, reset} = useSearch()

  const changeIcons = value.length > 0 
  ? <span className="x"onClick={reset}><X/></span>
  : <Search strokeWidth={3} /> 

  return (
    <div className="search" >
      <form onSubmit={e => e.preventDefault()} >
        <input
          id="search"
          type="text"
          value={value}
          placeholder="search movie or actor..."
          onChange={e => setValue(e.target.value)} />
          { changeIcons }
      </form>
      <div className="results">
        <ResultsList results={results} />
      </div>
    </div>
  )
}

export default SearchForm