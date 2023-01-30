import type Car from '../types/car';
import type Model from '../types/model';
import type Brand from '../types/brand';
import type CarJoined from '../types/car-joined';

const randomizedID = (): string => String(Math.floor(Math.random() * 256));

export type CarProps = {
  brandId: string;
  modelId: string;
  price: number;
  year: number;
};

type CarsCollectionProps = {
  cars: Car[],
  brands: Brand[],
  models: Model[],
};

class CarsCollection {
 private props: CarsCollectionProps;

 // Sukurkite konstruktorių, kuris priimtų markes, mašinas ir modelius.
 constructor(props: CarsCollectionProps) {
    this.props = props;
  }

  // Sukurkite privatų metodą joinCar kuris apjungtų vieną mašiną

  private joinCar = ({ modelId, ...car }: Car) => {
    const { brands, models } = this.props;
    const carModel = models.find((model) => model.id === modelId);
    const carBrand = brands.find((brand) => brand.id === carModel?.brandId);

    return {
      ...car,
      brand: (carBrand && carBrand.title) ?? 'unknown',
      model: (carModel && carModel.title) ?? 'unknown',
    };
  };

  // Sukurkite metodą, kurį iškvietus gautumėte visas apjungtas mašinas.

  public get allCars(): CarJoined[] {
    return this.props.cars.map(this.joinCar);
  }

  // CarCollection klasėje sukurkite metodą getByBrandId, kuris pasirinktų mašinas pagal markės id

  public getByBrandId = (brandId: string): CarJoined[] => {
    const { cars, models } = this.props;
    const brandModelsId = models.filter((model) => model.brandId === brandId)
    .map((model) => model.id);
    const brandCars = cars.filter((car) => brandModelsId.includes(car.modelId)).map(this.joinCar);

    return brandCars;
}; 

public deleteCarById = (carId: string): void => {
  this.props.cars = this.props.cars.filter((car) => car.id !== carId);
};

public add = ({ modelId, brandId, ...carProps }: CarProps): void => {
  const { models, brands, cars } = this.props;
  const model = models.find((m) => m.id === modelId);
  const brand = brands.find((b) => b.id === brandId);

  if (!model || !brand) {
    throw new Error('Neteisingi duomenys');
  }

  const newCar: Car = { id: randomizedID(), ...carProps, modelId };

  cars.push(newCar);
};

public update = (carId: string, { brandId, modelId, ...props }: CarProps) => {
  const { cars, models, brands } = this.props;

  const updatedCarIndex = cars.findIndex((c) => c.id === carId);
  if (updatedCarIndex === -1) {
    throw new Error(`Error: car does not exist with given ID: '${carId}'`);
  }

  const model = models.find((m) => m.id === modelId);
  if (!model) {
    throw new Error(`Error: car model does not exist with given ID: '${modelId}'`);
  }

  const brand = brands.find((b) => b.id === brandId);
  if (!brand) {
    throw new Error(`Error: car brand does not exist with given ID: '${brandId}'`);
  }

  const updatedCar: Car = {
    ...cars[updatedCarIndex],
    ...props,
    modelId,
  };

  this.props.cars.splice(updatedCarIndex, 1, updatedCar);
};

}

export default CarsCollection;
