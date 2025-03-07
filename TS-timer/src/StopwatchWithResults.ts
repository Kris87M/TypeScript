import Stopwatch from './Stopwatch.js'

class StopwatchWithResults extends Stopwatch {

  private results: string[] = [];

  constructor(element: HTMLDivElement) {
    super(element)
    this.prepareElements(element)
    this.prepareActions()
  }

  private prepareElements(element: HTMLDivElement) {
    this.dom.resultsList = element.querySelector('.stopwatch__results ul') as HTMLUListElement;
    this.dom.addToListBtn = element.querySelector('.stopwatch__add-to-list-btn') as HTMLButtonElement;
    this.dom.resetListBtn = element.querySelector('.stopwatch__reset-list-btn') as HTMLButtonElement;
  }

  private prepareActions(): void {
    this.dom.addToListBtn.addEventListener('click', () => this.addToList());
    this.dom.resetListBtn.addEventListener('click', () => this.resetList());
  }

  private renderList(): void {
    let html: string = '';
    this.dom.resultsList.innerHTML = '';
    for (const time of this.results) {
      html += `<li>${time}</li>`;
    }
    this.dom.resultsList.innerHTML = html;
  }

  private addToList(): void {
    this.results.push(this.formatTime(this.currentTime));
    this.renderList();
  }

  private resetList(): void {
    this.results = [];
    this.renderList();
    this.dom.resultsList.innerHTML = '<li><p>No results :(</p></li>'
  }

}

export default StopwatchWithResults;
