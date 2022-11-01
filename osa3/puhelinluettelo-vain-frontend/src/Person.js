const Person = ({ name, number, id, handleDelete }) => {
  return (
    <div>
      <p style={{display: "inline-block"}}>{name} {number}</p>
      <button onClick={() => handleDelete(id)}>Delete</button>
    </div>
  )
}

export default Person