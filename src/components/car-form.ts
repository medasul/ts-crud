import TextField from './text-field';
import SelectField from './select-field';
import brands from '../data/brands';
import models from '../data/models';

export type Values = {
    brand: string,
    model: string,
    price: string,
    year: string,
};

export type CarFormProps = {
    values: Values,
    title: string,
    onSubmit: (values: Values) => void,
    submitBtnText: string
}

export type Fields = {
    brand: SelectField,
    model: SelectField,
    price: TextField,
    year: TextField,
};

class CarForm {
    private props: CarFormProps;
    private brand: SelectField;
    private model: SelectField;
    private price: TextField;
    private years: TextField;
    private fields: Fields;

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

        this.brand = new SelectField({
            name: 'brand',
            labelText: 'Car brand',
            options: brands.map(({ id, title }) => ({ title, value: id })),
          });
          this.model = new SelectField({
            name: 'model',
            labelText: 'Car Model',
            options: models.map(({ id, title }) => ({ title, value: id })),
          });
          this.price = new TextField({
            name: 'price',
            labelText: 'Car Price',
          });
          this.years = new TextField({
            name: 'year',
            labelText: 'Car Year',
          }),
          this.initialize();
          this.renderView();
    }

    private handleSubmit = (e: SubmitEvent) => {
        e.preventDefault();
    
        const { onSubmit } = this.props;
    
        const formData = new FormData(this.htmlElement);
    
        const brand = formData.get('brand') as string | null;
        const model = formData.get('model') as string | null;
        const price = formData.get('price') as string | null;
        const year = formData.get('year') as string | null;
    
        if (!(brand && price && model && year)) {
          alert('neteisingi duomenys');
          return;
        }
    
        const formValues: Values = {
          brand,
          model,
          price,
          year,
        };
    
        onSubmit(formValues);
      };

    private initialize = (): void => {
        this.htmlFormHeader.className = 'h3 text-center';
    
        const fieldsArr = Object.values(this.fields);
        this.htmlFieldsContainer.className = 'd-flex flex-column gap-2';
        this.htmlFieldsContainer.append(...fieldsArr.map((field) => field.htmlElement));
    
        this.htmlsubmitBtnText.className = 'btn btn-primary';
    
        this.htmlElement.className = 'card d-flex flex-column gap-3 p-3';
        this.htmlElement.append(
          this.htmlFormHeader,
          this.htmlFieldsContainer,
          this.htmlsubmitBtnText,
        );}

        private renderView = (): void => {
            const { title, values, submitBtnText } = this.props;
        
            this.htmlFormHeader.innerHTML = title;
        
            this.htmlsubmitBtnText.innerHTML = submitBtnText;
        
            const valuesKeyValueArr = Object.entries(values) as [keyof Values, string][];
            valuesKeyValueArr.forEach(([fieldName, fieldValue]) => {
              const field = this.fields[fieldName];
              field.updateProps({
                value: fieldValue,
              });
            });
        
            this.htmlElement.addEventListener('submit', this.handleSubmit);
          };
        
          public updateProps = (newProps: Partial<CarFormProps>): void => {
            this.props = {
              ...this.props,
              ...newProps,
            };
        
            this.renderView();
          };
      };


export default CarForm;