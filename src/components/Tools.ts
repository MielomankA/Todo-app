import Control from '../common/control';

export class Tools extends Control {
  addbutton: Control<HTMLButtonElement>;
  onAddClick: () => void;
  title: Control<HTMLElement>;

  constructor(paretNode: HTMLElement) {
    super(paretNode, 'div', 'head-content');
    this.title = new Control(this.node, 'div', 'title-text', 'Add your TODO');
    this.addbutton = new Control(this.node, 'button', 'add', 'Add TODO');

    this.addbutton.node.onclick = () => this.onAddClick();
  }
}
