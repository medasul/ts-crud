import type Car from '../types/car';
import type Model from '../types/model';
import type Brand from '../types/brand';

type CarsCollectionProps = {
  cars: Car[],
  brands: Brand[],
  models: Model[],
};

class CarsCollection {
 private props: CarsCollectionProps;

 //Sukurkite konstruktorių, kuris priimtų markes, mašinas ir modelius. Gautus duomenis išsaugokite objekte
  
 constructor(props: CarsCollectionProps) {
    this.props = props;
  }

}

export default CarsCollection;
