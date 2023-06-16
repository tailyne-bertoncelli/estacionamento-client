import { AbstractEntity } from "./abstract-entity"
import { Condutor } from "./condutor"
import { Veiculo } from "./veiculo"

export class Movimentacao extends AbstractEntity{
    veiculo!: Veiculo
    condutor!: Condutor
    entrada!: Date
    saida!: Date
    tempoHoras!: number
    tempoMinutos!: number
    tempoDesconto!: number
    tempoMulta!: number
    valorDesconto!: number
    valorMulta!: number
    valorTotal!: number
    valorHora!: number
    valorHoraMulta!: number 

    constructor (){
        super();
        this.veiculo = new Veiculo;
        this.condutor = new Condutor;
    }
}

