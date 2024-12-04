const Header = (props) => {
  return (
    <div>
      <h1>{props.course.name}</h1>
    </div>
  )
}

const Content = (props) => {
  console.log(props);
  return (
    <div>
      {props.parts.map((part) => (
        <p key={part.id}>
          {part.name} {part.exercise}
        </p>
      ))}
    </div>
  )
}

const Total = (props) => {
  console.log(props);
  return (
    <div>
      <p>Number of exercises {props.parts[0].exercise + props.parts[1].exercise + props.parts[2].exercise}</p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        id: 1,
        name: 'Fundamentals of React',
        exercise: 10,
      }, 
      {
        id: 2,
        name: 'Using props to pass data',
        exercise: 7,
      },
      {
        id: 3,
        name: 'State of a component',
        exercise: 14,
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App