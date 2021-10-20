import Control from '../common/control';
import { ITaskListData } from '../types';
import { Task } from './Task';

export class TaskList extends Control {
  tasks: Task[];
  onEditClick: (index: number) => void;
  onDeleteClick: (index: number) => void;

  constructor(paretNode: HTMLElement) {
    super(paretNode, 'div', 'task-list');
    this.tasks = [];
  }

  update(data: ITaskListData) {
    data.forEach((item, index) => {
      if (this.tasks[index]) {
        this.tasks[index].update(item);
      } else {
        const task = new Task(this.node);
        task.onEditClick = () => this.onEditClick(index);
        task.onDeleteClick = () => this.onDeleteClick(index);
        task.update(item);
        this.tasks.push(task);
      }
    });

    const taskLength = this.tasks.length;

    for (let i = taskLength - 1; i >= data.length; i--) {
      const task = this.tasks.pop();
      task.destroy();
    }
  }
}
