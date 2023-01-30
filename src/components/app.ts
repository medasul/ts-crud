import CarsCollection from '../helpers/cars-collection';
import cars from '../data/cars';
import brands from '../data/brands';
import models from '../data/models';
import Table from './table';
import stringifyProps, { StringifyObjectProps } from '../helpers/stingify-object';
import CarJoined from '../types/car-joined';
import SelectField from './select-field';

class App {
  // private htmlElement: HTMLElement

  private htmlElement: HTMLElement;

  // private carsCollection: CarsCollection;
  private carsCollection: CarsCollection;

  private selectedBrandId: null | string;

  private brandSelect: SelectField;

  private carTable: Table<StringifyObjectProps<CarJoined>>;

// Sukurkite konstruktorių, kuris :
// priimtų selektorių ir pagal jį rastą elementą priskirtų į htmlElement savybę
// sukurtų pradinį carsCollection objektą
 public constructor(selector: string) {
    const foundElement = document.querySelector<HTMLElement>(selector);
    if (foundElement === null) throw new Error(`Nerastas elementas su selektoriumi '${selector}'`);
      this.htmlElement = foundElement;

    this.carsCollection = new CarsCollection({ cars, brands, models });

  
  this.carTable = new Table({
      title: 'Visi automobiliai',
      columns: {
        id: 'ID',
        brand: 'Markė',
        model: 'Modelis',
        year: 'Metai',
        price: 'Kaina',
      },
      rowsData: this.carsCollection.allCars.map(stringifyProps),
      onDelete: this.handleCarDelete,
    });

    this.brandSelect = new SelectField({
      labelText: 'Markė',
      options: brands.map(({ id, title }) => ({ title, value: id })),
      onChange: this.handleBrandChange
    });

    this.selectedBrandId = null;
  }

  private handleBrandChange = (brandId: string): void  => {
    this.selectedBrandId = brandId;

    this.update();
  }

  private handleCarDelete = (carId: string): void => {
    this.carsCollection.deleteCarById(carId);
  
    this.update();
  }
  
  public initialize = (): void => {
    const container = document.createElement('div');
    container.className = 'container my-4 d-flex  flex-column gap-3';
    container.append(
      this.brandSelect.htmlElement,
      this.carTable.htmlElement
    );

    this.htmlElement.append(container);
  };

  private update = (): void => {
    const { selectedBrandId, carsCollection } = this;

    if (selectedBrandId === null) {
      this.carTable.updateProps({
        title: 'Visi automobiliai',
        rowsData: carsCollection.allCars.map(stringifyProps),
      });
    } else {
      const brand = brands.find(b => b.id === selectedBrandId);
      if (brand === undefined) throw new Error('Pasirinkta neegzistuojanti markė');

      this.carTable.updateProps({
        title: `${brand.title} markės automobiliai`,
        rowsData: carsCollection.getByBrandId(selectedBrandId).map(stringifyProps),
      });
    }
  }

}

export default App;
