import Course from "./Course";
import Header from "./Header";

const Curriculum = ({ courses }) => (
  <>
    <Header text="Curriculum" />
    {courses.map(course => <Course course={course} key={course.id} />)}
  </>
)

export default Curriculum