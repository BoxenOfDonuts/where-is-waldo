import { useContext, useEffect, useState } from "react";
import { FirebaseContext, withFirebase } from "./components/Firebase";
import { useScoreListener } from "./hooks/ScoreListener";

function TodoList({ todos, isLoadingTodos }) {

  return (
    <div>
      {todos.map(todo => <TodoItem key={todo.id} todo={todo} />)}
    </div>
  );
}


const TodoItem = ({todo}) => <li>{todo}</li>


const withTodosNull = (Component) => (props) => 
  !props.todos
      ? null
      : <Component {...props} />

const withLoadingIndicator = (Component) => (props) =>
    props.isLoadingTodos
      ? <div><p>Loading todos ...</p></div>
      : <Component { ...props } />

const withTodosEmpty = (Component) => (props) =>
      !props.todos.length
        ? <div><p>You have no Todos.</p></div>
        : <Component { ...props } />

const TodoListOne = withTodosEmpty(TodoList);
const TodoListTwo = withTodosNull(TodoListOne);
const TodoListThree = withLoadingIndicator(TodoListTwo);


const Button = ({firebase, fn, children}) => {
  if (!fn) {
    fn = () => console.log(firebase.getUserId())
  }

  return <button onClick={fn} >{children}</button>
}

const BasePageTwo = ({firebase}) => {
  return (
    <div>
      {firebase}
    </div>
  );
}

const PageTwo = withFirebase(BasePageTwo);

const Test = () => {
  const firebase = useContext(FirebaseContext);
  // const [ highScores, setScores ] = useState([])
  const [ scores ] = useScoreListener(firebase);

  const updateScores = () => {
    firebase.updateHighScores('Winnie', 899)
  }

  // const scoreListener = () => {
  //   return firebase.scores.onSnapshot((snapshot) => {
  //     snapshot.docChanges().forEach(change => {
  //       const scoreData = change.doc.data();
  //       const {name, score, timestamp} = scoreData;
  //       setScores(prevState => [...prevState, {name, score, timestamp}])
  //     })
  //   })
  // }

  useEffect(() => {
    firebase.signIn();
    // const listener = scoreListener();
    // return () => {
    //   console.log('unmounted')
    //   listener()
    // }
  },[])

  return (
    <div>
      <Button firebase={firebase}>
        Get Id
      </Button>
      <Button
        firebase={firebase}
        fn={updateScores}
      >
        Update Score
      </Button>
      <ul>
        {scores.map(value => {
          return <li key={value.id}>{value.name + ' ' + value.score}</li>
        })}
      </ul>
    </div>
  );

}


export default Test;