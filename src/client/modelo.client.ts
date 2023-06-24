import {Modelo} from '@/model/modelo';
import axios, {AxiosInstance} from 'axios';

export class ModeloClient{
    private axiosClient: AxiosInstance;

    constructor(){
        this.axiosClient = axios.create({
            baseURL: 'http://localhost:8080/api/modelo',
            headers: { 'Content-Type' : 'application/json'}
        })
    }

    public async findById(id: number) : Promise<Modelo>{
        try{
            return (await this.axiosClient.get<Modelo>(`/${id}`)).data
        } catch (error:any){
            return Promise.reject(error.response)
        }
        
    }

    public async listAll(): Promise<Modelo[]> {
        try {
            return (await this.axiosClient.get<Modelo[]>(`/lista-modelo`)).data
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    public async cadastra(modelo: Modelo): Promise<string>{
        try{
            return (await this.axiosClient.post<string>(``, modelo)).data
        } catch (error: any){
            return Promise.reject(error.response)
        }
    }

    public async altera(id: number, modelo: Modelo): Promise<string>{
        try{
            return (await this.axiosClient.put<string>(`/${id}`, modelo)).data
        } catch (error: any){
            return Promise.reject(error.response)
        }
    }

    public async desativar(modelo: Modelo): Promise<void>{
        try{
            return (await this.axiosClient.put(`/desativar/${modelo.id}`)).data
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

export default new ModeloClient();