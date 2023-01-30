import type Car from '../types/car';
import type Model from '../types/model';
import type Brand from '../types/brand';
import type CarJoined from '../types/car-joined';

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
}

export default CarsCollection;
