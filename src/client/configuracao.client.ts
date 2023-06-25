import { Configuracao } from "@/model/configuracao";
import axios, {AxiosInstance} from "axios";

export class ConfiguracaoClient{
    private axiosClient: AxiosInstance;

    constructor(){
        this.axiosClient = axios.create({
            baseURL: 'http://localhost:8080/api/configuracao',
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
            return (await this.axiosClient.get<Configuracao[]>(`/lista-configuracoes`)).data
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    public async cadastra(configuracao: Configuracao): Promise<string>{
        try{
            return (await this.axiosClient.post<string>(``, configuracao)).data
        } catch (error: any){
            return Promise.reject(error.response)
        }
    }

    public async altera(id: number, configuracao: Configuracao): Promise<string>{
        try{
            return (await this.axiosClient.put<string>(`/${id}`, configuracao)).data
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

}

export default new ConfiguracaoClient();