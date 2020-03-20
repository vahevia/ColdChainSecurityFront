import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  url = 'https://coldchainsecurity.herokuapp.com/usuario';
  url2 = 'https://coldchainsecurity.herokuapp.com/usuarioID';
  urlTruck = 'https://coldchainsecurity.herokuapp.com/unidad';
  urlTruckBP = 'https://coldchainsecurity.herokuapp.com/unidadPlaca';
  urlWareH = 'https://coldchainsecurity.herokuapp.com/almacen';
  urlWareHBN = 'https://coldchainsecurity.herokuapp.com/almacenNombre';
  

  constructor(private http: HttpClient) { }

  getInfo(){  
    return this.http.get(`${this.url}`);
  }

  getLocation(){
    return this.http.get(`${this.url}`);
  }

  getUsers(){  
    return this.http.get(`${this.url}`);
    
  }

  addNewUser( usuario ){
     return this.http.post(this.url, usuario)
  }

  deleteUser( cedula ){
    return this.http.request('delete', this.url, { body: { "cedula": cedula } });
  }

  updateUser( usuario ){
    return this.http.put(this.url, usuario)
  }

  getUserbyId( cedula ){
    return this.http.request('get', this.url2, { body: { "cedula": cedula } })
  }

  getTrucks() {
    return this.http.get(`${this.urlTruck}`);
  }

  getTruckByPlate(plate) {
    return this.http.request('get', this.urlTruckBP, { body: { "placa": plate } })
  }

  getWareHouses() {
    return this.http.get(`${this.urlWareH}`);
  }
  getWareHouseByName(name) {
    return this.http.request('get', this.urlWareHBN, { body: { "nombre": name } })
  }
}
