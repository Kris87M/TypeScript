interface StopwatchDom {
currentTime: HTMLDivElement;
startBtn: HTMLButtonElement;
stopBtn: HTMLButtonElement;
resetBtn: HTMLButtonElement;
[x: string]: HTMLElement
}

abstract class Stopwatch {

  protected currentTime: number = 0
  private timer: number | null = null
  protected dom = {} as StopwatchDom;

  constructor(element: HTMLDivElement) {
    this.getElements(element)
    this.initActions()
    this.renderTime()
  }

  private getElements(element: HTMLDivElement): void {
    this.dom.currentTime = element.querySelector('.stopwatch__current-time') as HTMLDivElement;
    this.dom.startBtn = element.querySelector('.stopwatch__start-btn') as HTMLButtonElement;
    this.dom.stopBtn = element.querySelector('.stopwatch__stop-btn') as HTMLButtonElement;
    this.dom.resetBtn = element.querySelector('.stopwatch__reset-btn') as HTMLButtonElement;
  }

  private initActions(): void {
    this.dom.startBtn.addEventListener('click', () => this.start());
    this.dom.stopBtn.addEventListener('click', () => this.stop());
    this.dom.resetBtn.addEventListener('click', () => this.reset());
  }

  protected formatTime(time: number): string {
    const pad0 = (num: number): string => (
      num < 10 ? `0${num}` : num.toString()
    );

    const mm: number = Math.floor(time / 60000);
    const ss: number = Math.floor((time - mm * 60000) / 1000);
    const ms: number = time - mm * 60000 - ss * 1000;
    return `${pad0(mm)}:${pad0(ss)}:${pad0(ms).substr(0, 2)}`;
  }

  protected renderTime(): void {
    this.dom.currentTime.innerHTML = this.formatTime(this.currentTime);
  }

  protected start(): void {
    if (this.timer === null) {
      this.timer = setInterval(() => this.step(), 100);
    }
  }

  protected step(): void {
    this.currentTime += 100;
    this.renderTime();
  }

  protected stop(): void {
    if (this.timer !== null) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  protected reset(): void {
    this.stop();
    this.currentTime = 0;
    this.renderTime();
  }
}

export default Stopwatch;
