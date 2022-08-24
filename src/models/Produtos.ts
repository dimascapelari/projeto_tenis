import Variacoes from './Variacoes';

export default class Produtos {
    id?: number;
    detalhe?: string;
    ean?: number;
    codIn?: number;
    desc?: string;
    fabric?: string;
    variacoes?: Variacoes[];


    constructor(item?: Produtos) {
        this.id = item?.id;
        this.detalhe = item?.detalhe;
        this.ean = item?.ean;
        this.codIn = item?.codIn;
        this.desc = item?.desc;
        this.fabric = item?.fabric;
        this.variacoes = item?.variacoes;
    }
}
