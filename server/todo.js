class TodoService {
  constructor() {
    this.requests = {
      create: this.create.bind(this),
      update: this.update.bind(this),
      delete: this.delete.bind(this),
      list: this.list.bind(this),
    };

    this.todoList = [
      {
        name: 'TODO1',
        content: 'I todo1',
      },
      {
        name: 'TODO2',
        content: 'I todo2',
      },
      {
        name: 'TODO3',
        content: 'I todo3',
      },
    ];
  }

  create(props) {
    this.todoList.push({ name: props.name, content: props.content });
    return {};
  }
  update(props) {
    this.todoList[props.index] = { name: props.name, content: props.content };
    return {};
  }
  delete(props) {
    this.todoList.splice(props.index, 1);
    return {};
  }
  list(props) {
    return this.todoList;
  }
}

module.exports = {
  TodoService,
};
