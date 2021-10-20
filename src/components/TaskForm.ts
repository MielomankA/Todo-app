import Control from '../common/control';
import { ITaskData } from '../types';

export class TaskForm extends Control {
  nameInput: Control<HTMLInputElement>;
  contentInput: Control<HTMLTextAreaElement>;
  okBtn: Control<HTMLButtonElement>;
  cancelBtn: Control<HTMLButtonElement>;
  onOk: (data: ITaskData) => void;
  onCancel: () => void;

  constructor(paretNode: HTMLElement, initialData: ITaskData) {
    super(paretNode, 'div', 'task-form');
    this.nameInput = new Control(this.node, 'input', 'input-form');
    this.contentInput = new Control(this.node, 'textarea', 'form-textarea');
    this.okBtn = new Control(this.node, 'button', 'ok-btn', 'Ok');
    this.cancelBtn = new Control(this.node, 'button', 'cancel-btn', 'Cancel');
    this.nameInput.node.value = initialData.name;
    this.contentInput.node.value = initialData.content;

    this.okBtn.node.onclick = () =>
      this.onOk({
        name: this.nameInput.node.value,
        content: this.contentInput.node.value,
      });
    this.cancelBtn.node.onclick = () => this.onCancel();
  }
}
