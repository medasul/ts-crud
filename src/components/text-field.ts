//1
 export type TextFieldProps = {
    labelText: string,
    name: string,
    value?: string,
  };
  
class TextField {
    private static instanceCounter = 0;
  
    private htmlLabelElement: HTMLLabelElement;
  
    private htmlInputElement: HTMLInputElement;
  
    public htmlElement: HTMLDivElement;
  
    private static get id() {
      return `${this.name}-${this.instanceCounter}`;
    }
  
    private props: TextFieldProps;
  
    public constructor(props: TextFieldProps) {
      this.props = props;
      TextField.instanceCounter += 1;
      this.htmlElement = document.createElement('div');
      this.htmlLabelElement = document.createElement('label');
      this.htmlInputElement = document.createElement('input');
  
      this.initialize();
      this.renderView();
    }
  
    //3.1
    private initialize = (): void => {
      const inputId = `input-${TextField.id}`;
  
      this.htmlLabelElement.setAttribute('for', inputId);
      this.htmlLabelElement.className = 'form-label';
  
      this.htmlInputElement.id = inputId;
      this.htmlInputElement.className = 'form-control';
      this.htmlInputElement.type = 'text';
  
      this.htmlElement.append(
        this.htmlLabelElement,
        this.htmlInputElement,
      );
    };
  
    //3.2
    private renderView = (): void => {
      const { name, labelText, value } = this.props;
  
      this.htmlLabelElement.innerHTML = labelText;
      this.htmlInputElement.name = name;
      if (value) {
        this.htmlInputElement.value = value;
      }
    };
  
    //3.3
    public updateProps = (newProps: Partial<TextFieldProps>): void => {
      this.props = {
        ...this.props,
        ...newProps,
      };
  
      this.renderView();
    };
  }
  
  export default TextField;