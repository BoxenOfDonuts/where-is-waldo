
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

const Test = () => {

  return (
    <TodoListThree todos={['hide', 'seek']} />
  );

}


export default Test;