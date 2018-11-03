export interface Item {

    // apenas para ref ao index do array (facilita busca/comparação)
    id: number;

    nome: string;
    preco: number;
    dataFabricacao: Date;

    // quantidade representa (estoque, litros ou quilos)
    // varia de acordo com unidade de medida informada
    unidadeMedida: string;
    quantidade: string;

    // se perecível validade deve ser informada
    perecivel: boolean;
    dataValidade?: Date;
}
