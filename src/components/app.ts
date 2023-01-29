import CarsCollection from '../helpers/cars-collection';
import cars from '../data/cars';
import brands from '../data/brands';
import models from '../data/models';
import Table from './table';
import stringifyProps from '../helpers/stingify-object';

class App {
  // private htmlElement: HTMLElement

  private htmlElement: HTMLElement;

  // private carsCollection: CarsCollection;
  private carsCollection: CarsCollection;

// Sukurkite konstruktorių, kuris :
// priimtų selektorių ir pagal jį rastą elementą priskirtų į htmlElement savybę
// sukurtų pradinį carsCollection objektą
  constructor(selector: string) {
    const foundElement = document.querySelector<HTMLElement>(selector);
    this.carsCollection = new CarsCollection({ cars, brands, models });
    if (foundElement === null) throw new Error(`Nerastas elementas su selektoriumi '${selector}'`);

    this.htmlElement = foundElement;
  }

  // Sukurkite metodą initialize, kuriame būtų atliekami komponento atvaizdavimo veiksmai
  initialize = (): void => {
    const tableCars = new Table({
      title: 'Visi automobiliai',
      columns: {
        id: 'ID',
        brand: 'Markė',
        model: 'Modelis',
        year: 'Metai',
        price: 'Kaina',
      },
      rowsData: this.carsCollection.allCars.map(stringifyProps),
    });

    const container = document.createElement('div');
    container.className = 'container my-5 ';
    container.appendChild(tableCars.htmlElement);

    this.htmlElement.append(container);
  };
}

export default App;
