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

  initActions(): void {
    this.dom.startBtn.addEventListener('click', () => this.start());
    this.dom.stopBtn.addEventListener('click', () => this.stop());
    this.dom.resetBtn.addEventListener('click', () => this.reset());
    /*
    Funkcja ta powinna nadać buttonom z buttonów stopwatch__actions odpowiednie nasłuchiwacze na event click.
    Kliknięcie na każdy z buttonów powinno uruchamiać odpowiednie funkcje.

    Start -> start()
    Stop -> stop()
    Reset -> reset()

    Aby dostać się do tych elementów, wykorzystaj referencję przygotowane wcześniej w funkcji this.getElements.
    */
  }

  formatTime(time) {
    /*
    Funkcja ta powinna przyjmować czas w milisekundach a następnie zwracać go w formacie mm:ss:ms (np. 02:23:12).
    */
  }

  renderTime() {
    /*
    Funkcja ta powinna renderować w stopwatch__current-time zawartość obiektu this.currentTime.
    Oczywiście wcześniej należy sformatować czas przy użyciu funkcji this.formatTime.
    */
  }

  start() {
    console.log('start')
    /*
    Funkcja ta powinna wystartować interwał, który będzie wykonywał się co milisekundę.
    Powinien on każdorazowo włączać funkcję this.step

    Dla wygody przypisz ten interwał do this.timer
    */
  }

  step() {
    /*
    Funkcja ta powinna zwiększać liczbę sekund w this.currentTime o jeden, a następnie uruchamiać metodę
    renderującą aktualny czas w HTML-u (this.renderTime).
    */
  }

  stop() {
    console.log('stop')
    /*
    Funkcja ta powinna zatrzymywać interval przypisany do this.timer.
    */
  }

  reset() {
    console.log('reset')
    /*
    Ta funkcja powinna resetować czas zapisany w this.currentTime, a więć zmieniać jego wartość na zero.
    Naturalnie powinno to wiązać się również z przerenderowaniem HTML-a (this.renderTime).
    */
  }

}

export default Stopwatch
