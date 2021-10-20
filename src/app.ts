import Control from './common/control';
import { ITaskListData } from './types';
import { TaskList } from './components/TaskList';
import { Tools } from './components/Tools';
import { TaskForm } from './components/TaskForm';

const arr: ITaskListData = [
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

export class App extends Control {
  taskList: TaskList;
  tools: Tools;

  constructor(paretNode: HTMLElement) {
    super(paretNode);
    this.tools = new Tools(this.node);
    this.tools.onAddClick = () => {
      arr.push({
        name: 'TODO4',
        content: 'I todo4',
      });
      this.update(arr);
    };
    this.taskList = new TaskList(this.node);

    this.taskList.onEditClick = (index) => {
      const form = new TaskForm(this.node, arr[index]);
      form.onOk = (data) => {
        form.destroy();
        arr[index] = data;
        this.update(arr);
      };
      form.onCancel = () => form.destroy();
    };

    this.taskList.onDeleteClick = (index) => {
      arr.splice(index, 1);
      this.update(arr);
    };
    this.update(arr);
  }

  update(data: ITaskListData) {
    this.taskList.update(data);
  }
}
