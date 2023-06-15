import { Condutor } from "@/model/condutor";
import axios, { AxiosInstance } from "axios";

export class CondutorClient{
    private axiosClient: AxiosInstance;

    constructor(){
        this.axiosClient = axios.create({
            baseURL: 'http://localhost:3000/api/estacionamento',
            headers: { 'Content-Type' : 'application/json'}
        })
    }

    public async findById(id: number) : Promise<Condutor>{
        try{
            return (await this.axiosClient.get<Condutor>(`/${id}`)).data
        } catch (error:any){
            return Promise.reject(error.response)
        }
        
    }

    public async listAll(): Promise<Condutor[]> {
        try {
            return (await this.axiosClient.get<Condutor[]>('/lista')).data
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    public async cadastra(condutor: Condutor): Promise<void>{
        try{
            return (await this.axiosClient.post('/', condutor))
        } catch (error: any){
            return Promise.reject(error.response)
        }
    }

    public async altera(condutor: Condutor): Promise<void>{
        try{
            return (await this.axiosClient.put(`/${condutor.id}`, condutor)).data
        } catch (error: any){
            return Promise.reject(error.response)
        }
    }

    public async desativar(condutor: Condutor): Promise<void>{
        try{
            return (await this.axiosClient.put(`/desativar/${condutor.id}`)).data
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