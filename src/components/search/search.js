import { useState } from "react"
import { AsyncPaginate } from "react-select-async-paginate"
import { GEO_API_URL, geoApiOptions } from '../../api'


const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);
  const [show, setShow]= useState(true);

  const loadOptions = (inputValue) => {
    return fetch(`${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`, geoApiOptions)
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.countryCode}`,
            };
          }),
        };
      });
  }

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  }

  return ( <>
    <div className="search" onClick={()=>setShow(false)}>
    <AsyncPaginate
      placeholder="Search for City Here..."
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    /></div>
    {
      show?<div className="open-title"><h1>Weather</h1></div>:null
    }
    </>
  )
}


export default Search;