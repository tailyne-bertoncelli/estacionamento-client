import { Movimentacao } from "@/model/movimentacao";
import axios, { AxiosInstance } from "axios";

export class MovimentacaoClient{
    private axiosClient: AxiosInstance;

    constructor(){
        this.axiosClient = axios.create({
            baseURL: 'http://localhost:8080/api/movimentacao',
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
            return (await this.axiosClient.get<Movimentacao[]>(`/lista-movimentacao`)).data
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    public async finalizadas(): Promise<Movimentacao[]>{
        try{
            return (await this.axiosClient.get<Movimentacao[]>(`/movimentacoes-finalizadas`)).data
        } catch (error:any){
            return Promise.reject(error.response)
        }
    }

    public async cadastra(movimentacao: Movimentacao): Promise<string>{
        try{
            return (await this.axiosClient.post<string>(``, movimentacao)).data
        } catch (error: any){
            return Promise.reject(error.response)
        }
    }

    public async altera(id: number, movimentacao: Movimentacao): Promise<string>{
        try{
            return (await this.axiosClient.put(`/${id}`, movimentacao)).data
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

export default new MovimentacaoClient();