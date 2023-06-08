import { AbstractEntity } from "./abstract-entity"

export class Condutor extends AbstractEntity{
    nome!: string
    cpf!: string
    telefone!: string
    tempoPagoHora!: number
    tempoDesconto!: number
}