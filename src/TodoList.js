import React from 'react';
import TodoItems from './TodoItems';

class TodoList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: []
    };

    this.addTodoItem = this.addTodoItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  // componentDidMount() {
  //   const savedTodos = localStorage.getItem('savedState');
  //   if (savedTodos) {
  //     this.setState({
  //       todos: savedTodos
  //     });
  //   }
  // }

  deleteItem(key) {
    let filteredItems = this.state.todos.filter(function (item) {
      return item.key !== key;
    });

    this.setState({
      todos: filteredItems
    });
  }

  addTodoItem(text) {
    if (this._inputElement.value !== '') {
      let newTask = {
        text: this._inputElement.value,
        key: Date.now()
      };

      this.setState({
        todos: [...this.state.todos, newTask]
      });

      this._inputElement.value = '';
    }

    text.preventDefault();
  }

  componentDidMount() {
    let savedTodos = JSON.parse(localStorage.getItem('savedState'));
    if (savedTodos) {
      console.log('Called Saved State');
      this.setState({
        todos: savedTodos
      });
    }
  }

  componentDidUpdate() {
    console.log(this.state.todos);
    localStorage.setItem('savedState', JSON.stringify(this.state.todos));
  }
  render() {
    return (
      <div className='main-content'>
        <div className='input'>
          <form onSubmit={this.addTodoItem}>
            <input
              className='input-field'
              type='text'
              placeholder='Enter your task'
              ref={(text) => (this._inputElement = text)}
            ></input>
          </form>
          <p className='tiny-text'>
            Click to complete. Double-click to delete.
          </p>
        </div>
        <div className='todos'>
          <TodoItems todos={this.state.todos} delete={this.deleteItem} />
        </div>
      </div>
    );
  }
}

export default TodoList;
