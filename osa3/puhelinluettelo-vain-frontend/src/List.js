import Person from "./Person"

const List = (props) => {
  return (
    <>
      <h2>Numbers</h2>
      <div>
        {props.persons
          .filter(person => person.name.toLowerCase().includes(props.searchTerm.toLowerCase()))
          .map(person => 
            <Person 
              key={person.name}
              name={person.name} 
              number={person.number} 
              id={person.id}
              handleDelete={props.handleDelete}
            />
          )
        }
      </div>
    </>
  )
}

export default List