import Content from "./Content"
import Header from "./Header"
import TotalExercises from "./TotalExercises"

const Course = ({ course }) => {

  const getNumberOfExercises = () => {
    let numberOfExercises = 0;
    for (let part of course.parts) numberOfExercises += part.exercises;
    return numberOfExercises;
  }

  return (
    <>
      <Header name={course.name}/>
      <Content course={course} />
      <TotalExercises numberOfExercises={getNumberOfExercises()} />
    </>
  )
}

export default Course