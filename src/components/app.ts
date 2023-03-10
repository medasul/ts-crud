import CarsCollection, { CarProps } from '../helpers/cars-collection';
import cars from '../data/cars';
import brands from '../data/brands';
import models from '../data/models';
import Table from './table';
import stringifyProps, { StringifyObjectProps } from '../helpers/stingify-object';
import CarJoined from '../types/car-joined';
import SelectField from './select-field';
import CarForm, { Values } from './car-form';

class App {
  // private htmlElement: HTMLElement

  private htmlElement: HTMLElement;

  // private carsCollection: CarsCollection;
  private carsCollection: CarsCollection;

  private selectedBrandId: null | string;

  private brandSelect: SelectField;

  private carTable: Table<StringifyObjectProps<CarJoined>>;

  private carForm: CarForm;

  private editedCarId: string | null;

  // Sukurkite konstruktorių, kuris :
  // priimtų selektorių ir pagal jį rastą elementą priskirtų į htmlElement savybę
  // sukurtų pradinį carsCollection objektą
  public constructor(selector: string) {
    const foundElement = document.querySelector<HTMLElement>(selector);
    if (foundElement === null) throw new Error(`Nerastas elementas su selektoriumi '${selector}'`);
    this.htmlElement = foundElement;
      this.editedCarId = null;
    this.selectedBrandId = null;
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
      onEdit: this.handleCarEdit,
      editedCarId: this.editedCarId,
    });

    this.brandSelect = new SelectField({
      labelText: 'Markė',
      options: [
        { title: 'Visi automobiliai', value: '-1' },
        ...brands.map(({ id, title }) => ({ title, value: id })),
      ],
      onChange: this.handleBrandChange,
    });
    //4-5
    const initialBrandId = brands[0].id;

    this.carForm = new CarForm({
      title: 'Sukurkite naują automobilį',
      submitBtnText: 'Sukurti',
      values: {
        brand: initialBrandId,
        model: models.filter((m) => m.brandId === initialBrandId)[0].id,
        price: '0',
        year: '2000',
      },
     
      isEdited: Boolean(this.editedCarId),
       onSubmit: this.handleCreateCar,
    });
  }



  private handleBrandChange = (brandId: string): void => {
    const brand = brands.find((b) => b.id === brandId);
    this.selectedBrandId = brand ? brandId : null;

    this.renderView();
    this.update();

  }

  private handleCarDelete = (carId: string): void => {
    this.carsCollection.deleteCarById(carId);

    this.renderView();
    this.update();
  }

   private handleCarEdit = (carId: string) => {
    if (this.editedCarId === carId) {
      this.editedCarId = null;
    } else {
      this.editedCarId = carId;
    }
    this.renderView();
    this.update();

  }

  private handleCreateCar = ({ brand, model, price, year }: Values): void => {
    const carProps: CarProps = {
      brandId: brand,
      modelId: model,
      price: Number(price),
      year: Number(year),
    };

    this.carsCollection.add(carProps);

    this.renderView();
    this.update();

  };

  //

  private handleUpdateCar = ({
    brand, model, price, year,
  }: Values): void => {
    if (this.editedCarId) {
      const carProps: CarProps = {
        brandId: brand,
        modelId: model,
        price: Number(price),
        year: Number(year),
      };


      this.carsCollection.update(this.editedCarId, carProps);
      this.editedCarId = null;
      this.renderView();
      this.update();


    }
  };

  private renderView = () => {
    const { selectedBrandId, carsCollection, editedCarId } = this;

    if (selectedBrandId === null) {
      this.carTable.updateProps({
        title: 'Visi automobiliai',
        rowsData: carsCollection.allCars.map(stringifyProps),
        editedCarId,
      });
    } else {
      const brand = brands.find((b) => b.id === selectedBrandId);
      if (brand === undefined) throw new Error('Pasirinkta neegzistuojanti markė');

      this.carTable.updateProps({
        title: `${brand.title} markės automobiliai`,
        rowsData: carsCollection.getByBrandId(selectedBrandId).map(stringifyProps),
        editedCarId,
      });
    }

    if (editedCarId) {
      const editedCar = cars.find((c) => c.id === editedCarId);
      if (!editedCar) {
        alert('Nėra rasta mašina kurią bandote redaguoti');
        return;
      }

      const model = models.find((m) => m.id === editedCar.modelId);

      if (!model) {
        alert('Nėra rasta mašina kurią bandote redaguoti');
        return;
      }

      this.carForm.updateProps({
        title: 'Atnaujinkite automobilį',
        submitBtnText: 'Atnaujinti',
        values: {
          brand: model.brandId,
          model: model.id,
          price: String(editedCar.price),
          year: String(editedCar.year),
        },
        isEdited: true,
        onSubmit: this.handleUpdateCar,
      });
    } else {
      const initialBrandId = brands[0].id;
      this.carForm.updateProps({
        title: 'Sukurkite naują automobilį',
        submitBtnText: 'Sukurti',
        values: {
          brand: initialBrandId,
          model: models.filter((m) => m.brandId === initialBrandId)[0].id,
          price: '',
          year: '',
        },
        isEdited: false,
        onSubmit: this.handleCreateCar,
      });
    }
  };

  public initialize = (): void => {
    const createContainer = document.createElement('div');
    createContainer.className = 'd-flex align-items-start';
    createContainer.append(
      this.carTable.htmlElement,
      this.carForm.htmlElement
      );

    const container = document.createElement('div');
    container.className = 'container my-4 d-flex flex-row gap-3';
    container.append(this.brandSelect.htmlElement, createContainer);

    this.htmlElement.append(container);
  };

  private update = (): void => {
    const { selectedBrandId, carsCollection, editedCarId } = this;

    if (selectedBrandId === null) {
      this.carTable.updateProps({
        title: 'Visi automobiliai',
        rowsData: carsCollection.allCars.map(stringifyProps),
        editedCarId, 
      });
    } else {
      const brand = brands.find(b => b.id === selectedBrandId);
      if (brand === undefined) throw new Error('Pasirinkta neegzistuojanti markė');

      this.carTable.updateProps({
        title: `${brand.title} markės automobiliai`,
        rowsData: carsCollection.getByBrandId(selectedBrandId).map(stringifyProps),
        editedCarId, 
      });
    }

    if (editedCarId) {
      const editedCar = cars.find((c) => c.id === editedCarId);
      if (!editedCar) {
        alert('Nėra rasta mašina kurią bandote redaguoti');
        return;
      }

      const model = models.find((m) => m.id === editedCar.modelId);

      if (!model) {
        alert('Nėra rasta mašina kurią bandote redaguoti');
        return;
      }

      this.carForm.updateProps({
        title: 'Redaguoti',
        submitBtnText: 'Update',
        values: {
          brand: model.brandId,
          model: model.id,
          price: String(editedCar.price),
          year: String(editedCar.year),
        },
        isEdited: true,
        onSubmit: this.handleUpdateCar,
      });
    } else {
      const initialBrandId = brands[0].id;
      this.carForm.updateProps({
        title: 'Sukurkite naują automobilį',
        submitBtnText: 'Sukurti',
        values: {
          brand: initialBrandId,
          model: models.filter((m) => m.brandId === initialBrandId)[0].id,
          price: '',
          year: '',
        },
        isEdited: false,
        onSubmit: this.handleCreateCar,
      });
    }

  }

}

export default App;
