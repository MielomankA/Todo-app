import Control from './common/control';
import { ITaskListData } from './types';
import { TaskList } from './components/TaskList';
import { Tools } from './components/Tools';
import { TaskForm } from './components/TaskForm';
import { TodoModel } from './todoModel';

export class App extends Control {
  taskList: TaskList;
  tools: Tools;
  model: TodoModel;

  constructor(paretNode: HTMLElement, model: TodoModel) {
    super(paretNode);

    this.model = model;
    this.update = this.update.bind(this);

    model.onUpdateTodoList.add(this.update);

    this.tools = new Tools(this.node);
    this.tools.onAddClick = () => {
      model
        .create({
          name: 'Your TODO name',
          content: 'Your TODO content',
        })
        .then((_) => this.update(model.todoList));
    };

    this.taskList = new TaskList(this.node);

    this.taskList.onEditClick = (index) => {
      const form = new TaskForm(this.node, model.todoList[index]);

      form.onOk = (data) => {
        form.destroy();
        model
          .update({ index: index, ...data })
          .then((_) => this.update(model.todoList));
      };

      form.onCancel = () => form.destroy();
    };

    this.taskList.onDeleteClick = (index) => {
      model.delete({ index: index }).then((_) => this.update(model.todoList));
    };
  }

  update(data: ITaskListData) {
    this.taskList.update(data);
  }

  destroy() {
    this.model.onUpdateTodoList.remove(this.update);
    super.destroy();
  }
}
