import Variacoes from "./Variacoes";

export default class Tenis {
    codigointernos?: number;
    descricoes?: string;
    detalhamentos?: string;
    precos?: number;
    fabricantes?: number;
    cores?: string;
    cor?: string;
    tamanhos?: number;
    ean?: number;
    descricao?: string;
    detalhamento?: string;
    preco?: number;
    fabricante?: string;
    msg?: string;
    codigointerno?: number;
    variacoes?: Variacoes[];
    // editingRows: [],
    // products: null,
    variacao?: Variacoes;


    constructor(item?: Tenis) {
        this.codigointernos = item?.codigointernos;
        this.descricoes = item?.descricoes;
        this.detalhamentos = item?.detalhamentos;
        this.precos = item?.precos;
        this.fabricantes = item?.fabricantes;
        this.cores = item?.cores;
        this.cor = item?.cor;
        this.tamanhos = item?.tamanhos;
        this.ean = item?.ean;
        this.descricao = item?.descricao;
        this.detalhamento = item?.detalhamento;
        this.preco = item?.preco;
        this.fabricante = item?.fabricante;
        this.msg = item?.msg;
        this.codigointerno = item?.codigointerno;
        this.variacao = item?.variacao;
        this.variacoes = item?.variacoes;
    }

}