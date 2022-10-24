const List = (props) => (
  <>
    <h2>Numbers</h2>
    <div>
      {props.persons
        .filter(person => person.name.toLowerCase().includes(props.searchTerm.toLowerCase()))
        .map(person => <p key={person.name}>{person.name} {person.number}</p>)
      }
    </div>
  </>
)

export default List