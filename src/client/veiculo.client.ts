import { Veiculo } from "@/model/veiculo";
import axios, {AxiosInstance} from 'axios';

export class VeiculoClient{
    private axiosClient: AxiosInstance;

    constructor(){
        this.axiosClient = axios.create({
            baseURL: 'http://localhost:8080/api/veiculo',
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
            return (await this.axiosClient.get<Veiculo[]>(`/lista-veiculo`)).data
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    public async cadastra(veiculo: Veiculo): Promise<string>{
        try{
            return (await this.axiosClient.post<string>(``, veiculo)).data
        } catch (error: any){
            return Promise.reject(error.response)
        }
    }

    public async altera(id: number, veiculo: Veiculo): Promise<string>{
        try{
            return (await this.axiosClient.put<string>(`/${id}`, veiculo)).data
        } catch (error: any){
            return Promise.reject(error.response)
        }
    }

    public async desativar(id: number): Promise<Veiculo>{
        try{
            return (await this.axiosClient.put(`/desativar/${id}`)).data
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

export default new VeiculoClient();