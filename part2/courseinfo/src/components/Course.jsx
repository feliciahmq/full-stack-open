const Header = (props) => {
  return (
    <div>
      <h2>{props.name}</h2>
    </div>
  )
};

const Content = (props) => {
  console.log(props);
  return (
    <div>
      {props.parts.map((part) => (
        <p key={part.id}>
          {part.name} {part.exercises}
        </p>
      ))}
    </div>
  )
};

const Total = (props) => {
  console.log(props);
  const total = props.parts.reduce((sum, part) => sum + part.exercises, 0);
  return (
    <div>
      <b>total of {total} exercises</b>
    </div>
  )
};

const Course = (props) => {
  return (
    <div>
      <Header name={props.course.name}/>
      <Content parts={props.course.parts} />
      <Total parts={props.course.parts} />
    </div>
  )
};

export default Course;