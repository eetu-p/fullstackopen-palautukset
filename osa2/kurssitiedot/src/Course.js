import Content from "./Content"
import Header from "./Header"
import TotalExercises from "./TotalExercises"

const Course = ({ course }) => {

  return (
    <>
      <Header name={course.name}/>
      <Content course={course} />
      <TotalExercises numberOfExercises={course.parts.reduce((total, part) => total + part.exercises, 0)} />
    </>
  )
}

export default Course