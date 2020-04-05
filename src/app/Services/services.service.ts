import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  url = 'https://coldchainsecurity.herokuapp.com/usuario';
  urlTruck = 'https://coldchainsecurity.herokuapp.com/unidad';
  urlTruckBP = 'https://coldchainsecurity.herokuapp.com/unidadPlaca';
  urlWareH = 'https://coldchainsecurity.herokuapp.com/almacen';
  urlWareHBN = 'https://coldchainsecurity.herokuapp.com/almacenNombre';
  urlState = 'https://coldchainsecurity.herokuapp.com/estado';
  

  constructor(private http: HttpClient) { }

  getInfo(){  
    return this.http.get(`${this.url}`);
  }

  getLocation(){
    return this.http.get(`${this.url}`);
  }

  // Users
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

  getUserbyId( cedula ): Observable<any>{
    return this.http.get<any>(this.url + '/'+ cedula)
  }

  // Trucks
  getTrucks() {
    return this.http.get(`${this.urlTruck}`);
  }

  getTruckByPlate(plate): Observable<any>{
    return this.http.get<any>(this.urlTruck + '/'+ plate)
  }

  deleteTruck(plate){
    return this.http.request('delete', this.urlTruck, { body: { "placa": plate } });
  }

  addNewTruck(truck) {
    return this.http.post(this.urlTruck, truck);
  }

  updateTruck(truck) {
    return this.http.put(this.urlTruck, truck);
  }

  // Warehouses 
  getWareHouses() {
    return this.http.get(`${this.urlWareH}`);
  }
  getWareHouseByName(name): Observable<any>{
    return this.http.get<any>(this.urlWareH + '/'+ name)
  }

  deleteWareHouse(name){
    return this.http.request('delete', this.urlWareH, { body: { "almacen": name } });
  }

  addNewWarehouse(warehouse) {
    return this.http.post(this.urlWareH, warehouse);
  }

  updateWareHouse(warehouse) {
    return this.http.put(this.urlWareH, warehouse);
  }

  getCountries() {
    return this.http.get(`https://coldchainsecurity.herokuapp.com/pais`);
  }
  getStateByCountry(pais): Observable<any>{
    return this.http.get<any>(this.urlState + '/'+ pais)
  }
}
