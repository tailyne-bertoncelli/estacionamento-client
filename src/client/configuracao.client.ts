import { Configuracao } from "@/model/configuracao";
import axios, {AxiosInstance} from "axios";

export class ConfiguracaoClient{
    private axiosClient: AxiosInstance;

    constructor(){
        this.axiosClient = axios.create({
            baseURL: 'http://localhost:3000/api/estacionamento',
            headers: { 'Content-Type' : 'application/json'}
        })
    }

    public async findById(id: number) : Promise<Configuracao>{
        try{
            return (await this.axiosClient.get<Configuracao>(`/${id}`)).data
        } catch (error:any){
            return Promise.reject(error.response)
        }
        
    }

    public async listAll(): Promise<Configuracao[]> {
        try {
            return (await this.axiosClient.get<Configuracao[]>('/lista')).data
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    public async cadastra(configuracao: Configuracao): Promise<void>{
        try{
            return (await this.axiosClient.post('/', configuracao))
        } catch (error: any){
            return Promise.reject(error.response)
        }
    }

    public async altera(configuracao: Configuracao): Promise<void>{
        try{
            return (await this.axiosClient.put(`/${configuracao.id}`, configuracao)).data
        } catch (error: any){
            return Promise.reject(error.response)
        }
    }

    public async desativar(configuracao: Configuracao): Promise<void>{
        try{
            return (await this.axiosClient.put(`/desativar/${configuracao.id}`)).data
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