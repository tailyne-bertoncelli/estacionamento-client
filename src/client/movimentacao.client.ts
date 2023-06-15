import { Movimentacao } from "@/model/movimentacao";
import axios, { AxiosInstance } from "axios";

export class MovimentacaoClient{
    private axiosClient: AxiosInstance;

    constructor(){
        this.axiosClient = axios.create({
            baseURL: 'http://localhost:3000/api/estacionamento',
            headers: { 'Content-Type' : 'application/json'}
        })
    }

    public async findById(id: number) : Promise<Movimentacao>{
        try{
            return (await this.axiosClient.get<Movimentacao>(`/${id}`)).data
        } catch (error:any){
            return Promise.reject(error.response)
        }
        
    }

    public async listAll(): Promise<Movimentacao[]> {
        try {
            return (await this.axiosClient.get<Movimentacao[]>('/lista')).data
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    public async cadastra(movimentacao: Movimentacao): Promise<void>{
        try{
            return (await this.axiosClient.post('/', movimentacao))
        } catch (error: any){
            return Promise.reject(error.response)
        }
    }

    public async altera(movimentacao: Movimentacao): Promise<void>{
        try{
            return (await this.axiosClient.put(`/${movimentacao.id}`, movimentacao)).data
        } catch (error: any){
            return Promise.reject(error.response)
        }
    }

    public async desativar(movimentacao: Movimentacao): Promise<void>{
        try{
            return (await this.axiosClient.put(`/desativar/${movimentacao.id}`)).data
        } catch (error: any){
            return Promise.reject(error.response)
        }
    }

    public async deleta(id: number): Promise<string>{
        try{
            return (await this.axiosClient.delete<string>(`/${id}`)).data
        } catch (error: any){
            return Promise.reject(error.response)
        }
    }
}