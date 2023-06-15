import { Veiculo } from "@/model/veiculo";
import axios, {AxiosInstance} from 'axios';

export class VeiculoClient{
    private axiosClient: AxiosInstance;

    constructor(){
        this.axiosClient = axios.create({
            baseURL: 'http://localhost:3000/api/estacionamento',
            headers: { 'Content-Type' : 'application/json'}
        })
    }

    public async findById(id: number) : Promise<Veiculo>{
        try{
            return (await this.axiosClient.get<Veiculo>(`/${id}`)).data
        } catch (error:any){
            return Promise.reject(error.response)
        }
        
    }

    public async listAll(): Promise<Veiculo[]> {
        try {
            return (await this.axiosClient.get<Veiculo[]>('/lista')).data
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    public async cadastra(veiculo: Veiculo): Promise<void>{
        try{
            return (await this.axiosClient.post('/', veiculo))
        } catch (error: any){
            return Promise.reject(error.response)
        }
    }

    public async altera(veiculo: Veiculo): Promise<void>{
        try{
            return (await this.axiosClient.put(`/${veiculo.id}`, veiculo)).data
        } catch (error: any){
            return Promise.reject(error.response)
        }
    }

    public async desativar(veiculo: Veiculo): Promise<void>{
        try{
            return (await this.axiosClient.put(`/desativar/${veiculo.id}`)).data
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