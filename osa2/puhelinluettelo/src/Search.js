const Search = (props) => (
  <div>
    <h2>Search</h2>
    Filter names: <input
                    value={props.searchTerm}
                    onChange={event => props.setSearchTerm(event.target.value)} 
                  />
  </div>
)

export default Search