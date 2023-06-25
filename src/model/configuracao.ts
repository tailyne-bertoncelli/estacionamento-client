import { AbstractEntity } from "./abstract-entity"

export class Configuracao extends AbstractEntity{
    valorHora!: number
    valorMinutoMulta!: number
    inicioExpediente!: Date
    fimExpediente!: Date
    tempoParaDesconto!: Date
    tempoDeDesconto!: Date
    gerarDesconto!: boolean
    vagasCarro!: number
    vagasMoto!: number
    vagasVan!: number
}