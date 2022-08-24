export default class Variacoes {
    cor?: string;
    tamanho?: string;
    preco?: number;

    constructor(item?: Variacoes) {
        this.cor = item?.cor;
        this.tamanho = item?.tamanho;
        this.preco = item?.preco;
    }
}