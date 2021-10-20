import Control from '../common/control';
import { ITaskData } from '../types';

export class Task extends Control {
  taskName: Control<HTMLElement>;
  taskContent: Control<HTMLElement>;
  editBtn: Control<HTMLButtonElement>;
  deleteBtn: Control<HTMLButtonElement>;
  onEditClick: () => void;
  onDeleteClick: () => void;
  buttons: Control<HTMLElement>;

  constructor(paretNode: HTMLElement) {
    super(paretNode, 'div', 'task');
    this.taskName = new Control(this.node, 'div', 'task-name');
    this.taskContent = new Control(this.node, 'div', 'task-content');
    this.editBtn = new Control(this.node, 'button', 'edit-btn', 'Edit');
    this.deleteBtn = new Control(this.node, 'button', 'delete-btn', 'Delete');

    this.editBtn.node.onclick = () => this.onEditClick();
    this.deleteBtn.node.onclick = () => this.onDeleteClick();
  }

  update(item: ITaskData) {
    this.taskName.node.textContent = item.name;
    this.taskContent.node.textContent = item.content;
  }
}
