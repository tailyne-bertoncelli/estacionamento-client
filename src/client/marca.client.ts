import { Marca } from "@/model/marca";
import axios, { AxiosInstance } from "axios";

export class MarcaClient{
    private axiosClient: AxiosInstance;

    constructor(){
        this.axiosClient = axios.create({
            baseURL: 'http://localhost:3000/api/estacionamento',
            headers: { 'Content-Type' : 'application/json'}
        })
    }

    public async findById(id: number) : Promise<Marca>{
        try{
            return (await this.axiosClient.get<Marca>(`/${id}`)).data
        } catch (error:any){
            return Promise.reject(error.response)
        }
        
    }

    public async listAll(): Promise<Marca[]> {
        try {
            return (await this.axiosClient.get<Marca[]>('/lista')).data
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    public async cadastra(marca: Marca): Promise<void>{
        try{
            return (await this.axiosClient.post('/', marca))
        } catch (error: any){
            return Promise.reject(error.response)
        }
    }

    public async altera(marca: Marca): Promise<void>{
        try{
            return (await this.axiosClient.put(`/${marca.id}`, marca)).data
        } catch (error: any){
            return Promise.reject(error.response)
        }
    }

    public async desativar(marca: Marca): Promise<void>{
        try{
            return (await this.axiosClient.put(`/desativar/${marca.id}`)).data
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