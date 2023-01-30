import TextField from './text-field';
import SelectField from './select-field';


type CarFormProps = {
    model: string,
    brand: string,
    price: string,
    year: string,
    onSubmit: (values: string) => void,
    submitBtnText: string
  }

  class CarForm {
    private props: CarFormProps;
    private brand: SelectField;
    private model: SelectField;
    private price: TextField;
    private years: TextField;
  
    private htmlFormHeader: HTMLHeadingElement;
    private htmlFieldsContainer: HTMLDivElement;
    private htmlsubmitBtnText: HTMLButtonElement;
  
    public htmlElement: HTMLFormElement;
  //3. constructor
  public constructor(props: CarFormProps) {
    this.props = props;

    this.htmlElement = document.createElement('form');
    this.htmlFieldsContainer = document.createElement('div');
    this.htmlFormHeader = document.createElement('h2');
    this.htmlsubmitBtnText = document.createElement('button');
 
  }
}

export default CarForm;