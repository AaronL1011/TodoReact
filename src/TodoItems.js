import React from 'react';

class TodoItems extends React.Component {
  constructor(props) {
    super(props);

    this.createTasks = this.createTasks.bind(this);

    this.state = {
      isCompleted: false
    };
  }

  delete(key) {
    this.props.delete(key);
  }

  changeStyle = (e) => {
    if (e.target.style.color !== 'grey') {
      e.target.style.color = 'grey';
      e.target.style.textDecoration = 'line-through';
    } else {
      e.target.style.color = 'black';
      e.target.style.textDecoration = 'none';
    }
  };

  createTasks(item) {
    return (
      <li
        className='todo-item'
        key={item.key}
        onDoubleClick={() => this.delete(item.key)}
        onClick={(e) => {
          this.changeStyle(e);
        }}
      >
        {item.text}
      </li>
    );
  }

  render() {
    let todoEntries = this.props.todos;
    let listItems = todoEntries.map(this.createTasks);

    return <ul className='todo-list'>{listItems}</ul>;
  }
}

export default TodoItems;
