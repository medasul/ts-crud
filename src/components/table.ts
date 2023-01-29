import countObjectProperties from '../helpers/count-object-properties';

// ./components/table.ts
// Sukurkite tipą TableProps:
// Sukurkite konstruktorių, kuris:
// Sukurtite metodą initialize, kuriame: 

// ---------------

// Sukurkite tipą TableProps:
// title: string
// columns: Type
// rowsData: Type[]

type RowData = {
  id: string,
  [key: string]: string,
};

export type TableProps<Type> = {
  title: string,
  columns: Type,
  rowsData: Type[],
};

class Table<Type extends RowData> {

  // Sukurkite savybes
// public htmlElement: HTMLTableElement;
// private props: TableProps;
// private tbody: HTMLTableSectionElement;
// private thead: HTMLTableSectionElement;

  public htmlElement: HTMLTableElement;
  private props: TableProps<Type>;
  private tbody: HTMLTableSectionElement;
  private thead: HTMLTableSectionElement;


 // Sukurkite konstruktorių, kuris:
// sukurtų pradinius htmlElement, thead ir tbody elementus iškviestų metodą initialize
  
public constructor(props: TableProps<Type>) {
    this.props = props;
    this.checkColumnsCompatability();

    this.htmlElement = document.createElement('table');
    this.thead = document.createElement('thead');
    this.tbody = document.createElement('tbody');

    this.initialize();
  }

  private checkColumnsCompatability = (): void => {
    const { rowsData, columns } = this.props;

    if (this.props.rowsData.length === 0) return;
    const columnCount = countObjectProperties(columns);

    const columnsCompatableWithRowsData = rowsData.every((row) => {
      const rowCellsCount = countObjectProperties(row);

      return rowCellsCount === columnCount;
    });

    if (!columnsCompatableWithRowsData) {
      throw new Error('Nesutampa lentelės stulpelių skaičius su eilučių stulpelių skaičiumi');
    }
  };

  private initializeHead = (): void => {
    const { title, columns } = this.props;

    const headersArray = Object.values(columns);
    const headersRowHtmlString = headersArray.map((header) => `<th>${header}</th>`).join('');

    this.thead.innerHTML = `
      <tr>
        <th colspan="${headersArray.length}" class="text-center h3">${title}</th>
      </tr>
      <tr>${headersRowHtmlString}</tr>
    `;
  };

  private initializeBody = (): void => {
    const { rowsData, columns } = this.props;

    this.tbody.innerHTML = '';
    const rowsHtmlElements = rowsData
      .map((rowData) => {
        const rowHtmlElement = document.createElement('tr');

        const cellsHtmlString = Object.keys(columns)
          .map((key) => `<td>${rowData[key]}</td>`)
          .join(' ');

        rowHtmlElement.innerHTML = cellsHtmlString;

        return rowHtmlElement;
      });

    this.tbody.append(...rowsHtmlElements);
  };

  // Sukurtite metodą initialize, kuriame:
// atliktumete lentelės antraštės atvaizdavimą
// atliktumetė lentelės duomenų eilučių atvaizdavimą
// apjungtumėte elementus
  private initialize = (): void => {
    this.initializeHead();
    this.initializeBody();

    this.htmlElement.className = 'table table-striped table-bordered border-grey p-3 table-dark table-sm';
    this.htmlElement.append(
      this.thead,
      this.tbody,
    );
  };
}

export default Table;
