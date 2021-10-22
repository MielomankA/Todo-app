import './animation.css';
import Control from '../../common/control';

export class Animation extends Control {
  animBtn: Control<HTMLButtonElement>;
  counterBtn: Control<HTMLElement>;
  animateStarted: boolean;
  timerHandler: any;
  onFinish: () => void;

  constructor(parentNode: HTMLElement) {
    super(parentNode);

    this.animBtn = new Control(this.node, 'button', 'animation-btn', 'Start');
    this.counterBtn = new Control(
      this.node,
      'div',
      'animation-counter animation-counter-hidden',
      '0'
    );

    this.animBtn.node.onclick = async () => {
      await this.animate();
      await this.animateCounter();
      await this.animateNumbers();
      await this.animateCountHidden();
      this.onFinish();

      // this.animate()
      //   .then(() => {
      //     return this.animateCounter();
      //   })
      //   .then(() => {
      //     return this.animateNumbers();
      //   })
      //   .then(() => {
      //     return this.animateCountHidden();
      //   })
      //   .then(() => {
      //     return this.onFinish();
      //   });
    };
    this.animateStarted = false;
    this.timerHandler = null;
  }

  animate() {
    return new Promise((resolve) => {
      this.animBtn.node.ontransitionend = () => {
        this.animBtn.node.ontransitionend = null;
        resolve(null);
        // this.animateCounter();
      };

      this.animBtn.node.classList.add('animation-btn-hidden');
    });
  }

  animateCounter() {
    return new Promise((resolve) => {
      this.counterBtn.node.ontransitionend = () => {
        this.counterBtn.node.ontransitionend = null;
        // this.animateNumbers();
        resolve(null);
      };
      this.counterBtn.node.classList.remove('animation-counter-hidden');
      this.counterBtn.node.textContent = (0).toString();
    });
  }

  async animateNumbers() {
    // return new Promise((resolve) => {
    //   const animateNumber = (value: number, callback: () => void) => {
    //     this.timerHandler = setTimeout(() => {
    //       console.log(value);
    //       this.counterBtn.node.textContent = value.toString();
    //       callback();
    //     }, 100);
    //   };

    //   let value = 0;
    //   this.counterBtn.node.textContent = value.toString();
    //   const animateAll = () => {
    //     value++;

    //     if (value < 20) {
    //       animateNumber(value, animateAll);
    //     } else {
    //       resolve(null);
    //       // this.animateCountHidden();
    //       // this.animBtn.node.classList.remove('animation-btn-hidden');
    //       // this.timerHandler = null;
    //       this.animateStarted = false;
    //     }
    //   };

    //   this.animateStarted = true;
    //   animateAll();
    // });

    let value = 0;

    for (let i = 0; i < 20; i++) {
      await this.delay(100);

      value++;
      this.counterBtn.node.textContent = value.toString();

      // setTimeout(() => {
      // value++;
      // this.counterBtn.node.textContent = value.toString();

      //   if (value === 20) {
      //     this.animateCountHidden();
      //     this.animBtn.node.classList.remove('animation-btn-hidden');
      //   }
      // }, 100 * i);
    }
  }

  animateCountHidden() {
    return new Promise((resolve) => {
      this.counterBtn.node.ontransitionend = () => {
        this.counterBtn.node.ontransitionend = null;
        resolve(null);
        // this.onFinish();
      };
      this.counterBtn.node.classList.add('animation-counter-hidden');
    });
  }

  destroy() {
    if (this.timerHandler !== null) {
      clearTimeout(this.timerHandler);
    }
    this.animateStarted = false;
    super.destroy();
  }

  delay(time: number) {
    return new Promise((resolve) => {
      this.timerHandler = setTimeout(() => {
        resolve(null);
      }, time);
    });
  }
}
