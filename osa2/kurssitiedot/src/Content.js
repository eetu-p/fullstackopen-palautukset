import Part from "./Part"

const Content = ({ course }) => (
  <>
    {course.parts.map(part => <Part part={part} key={part.id} />)}
  </>
)

export default Content