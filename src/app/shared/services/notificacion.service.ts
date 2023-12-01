import { Injectable } from '@angular/core';
import axios, { AxiosResponse } from 'axios';
import { ResponseService } from '../model/ResponseService';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {

  constructor() { }
  metodo = 'https://localhost:7033/api/Notificacion';
  
  private registrarNotificacion(data:any): Promise<AxiosResponse<any>> {

    return axios.post(this.metodo, data, {
      headers: {
        // tslint:disable-next-line: object-literal-key-quotes
        'Accept': 'application/json',
        // tslint:disable-next-line: object-literal-key-quotes
        'Content-Type': 'application/json',
      },
    });
  }

  async registraNotificacion(data:any):Promise<ResponseService> {
    try {
      const resp= await this.registrarNotificacion(data);
      console.log('registraNotificacion - registro correctamente ', 'registraNotificacion', `Response:${JSON.stringify(resp.data, null, 2)}`, 'INFO');
  
      return {coderror :0,descerror:'OK', data: resp.data};
    } catch (error) {
      console.log('registraNotificacion  PROBLEMA en la api', 'registraNotificacion', `Response: ${(error.response !== undefined && error.response.data !== undefined ? JSON.stringify(error.response.data, null, 2) : error.toString())}`, 'DEBUG');
        return {coderror :-10,descerror:'Ocurrio una excepcion'};
    }
  }
}
