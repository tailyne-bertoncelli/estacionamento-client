import {Modelo} from '@/model/modelo';
import axios, {AxiosInstance} from 'axios';

export class ModeloClient{
    private axiosClient: AxiosInstance;

    constructor(){
        this.axiosClient = axios.create({
            baseURL: 'http://localhost:3000/api/estacionamento',
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
            return (await this.axiosClient.get<Modelo[]>('/lista')).data
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    public async cadastra(modelo: Modelo): Promise<void>{
        try{
            return (await this.axiosClient.post('/', modelo))
        } catch (error: any){
            return Promise.reject(error.response)
        }
    }

    public async altera(modelo: Modelo): Promise<void>{
        try{
            return (await this.axiosClient.put(`/${modelo.id}`, modelo)).data
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