import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, map} from 'rxjs/operators';
import { AuthenticationService } from './authentication.service' 

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
  baseurl = 'https://coldchainsecurity.herokuapp.com'
  currentUser = this.authenticationService.currentUserValue;
  comercio = this.currentUser.rol === 'super' ? '0' : this.currentUser.id_comercio;

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }

  private handleError(error: any) {
    console.log(error);
    return throwError(error);
  }

  httpOptions = {
    headers: new HttpHeaders({
      'x-access-token': this.currentUser.token
    })
  }

  getInfo(){  
    return this.http.get(`${this.url}`);
  }

  getLocation(){
    return this.http.get(`${this.url}`);
  }

  // Users
  getUsers(): Observable<any> { 
    return this.http.get(this.url+'/'+this.currentUser.rol+'/'+this.comercio, this.httpOptions).pipe(
      tap(data => console.log(data)),
      catchError(this.handleError)
    );
  }

  addNewUser( usuario ){
     return this.http.post(this.url, usuario, this.httpOptions)
  }

  deleteUser( cedula ){
    return this.http.request('delete', this.url, { body: { "cedula": cedula }, headers: { 'x-access-token': this.currentUser.token } });
  }

  updateUser( usuario ){
    return this.http.put(this.url, usuario, this.httpOptions)
  }

  getUserbyId( cedula ): Observable<any>{
    return this.http.get<any>(this.url +'/'+ cedula, this.httpOptions)
  }

  getAllRoles() {
    return this.http.get(this.baseurl+'/rol/'+this.currentUser.rol, this.httpOptions)
  }

  getAllEmployeeSchedule() {
    return this.http.get(this.baseurl+'/horarioE', this.httpOptions)
  }

  // Trucks
  getTrucks() {
    console.log(this.urlTruck +'/'+ this.currentUser +'/'+ this.comercio)
    return this.http.get(this.urlTruck +'/'+ this.currentUser.rol +'/'+ this.comercio, this.httpOptions);
  }

  getTruckByPlate(plate): Observable<any>{
    return this.http.get<any>(this.urlTruck +'/'+ plate, this.httpOptions)
  }

  deleteTruck(plate){
    return this.http.request('delete', this.urlTruck, { body: { "placa": plate }, headers: {'x-access-token': this.currentUser.token} });
  }

  addNewTruck(truck) {
    return this.http.post(this.urlTruck, truck, this.httpOptions);
  }

  updateTruck(truck) {
    return this.http.put(this.urlTruck, truck, this.httpOptions);
  }

  // Warehouses 
  getWareHouses() {
    return this.http.get(this.urlWareH +'/'+ this.currentUser.rol +'/'+ this.comercio, this.httpOptions);
  }

  getWareHousesNames() {
    return this.http.get(this.baseurl +'/almacenes', this.httpOptions)
  }

  getWareHouseByName(name) {
    return this.http.request('get', this.urlWareH +'/'+ name, { headers: { 'x-access-token': this.currentUser.token}})
  }

  deleteWareHouse(name){
    return this.http.request('delete', this.urlWareH, { headers: { 'x-access-token': this.currentUser.token }, body: { "almacen": name } });
  }

  addNewWarehouse(warehouse) {
    return this.http.post(this.urlWareH, warehouse, this.httpOptions);
  }

  updateWareHouse(warehouse) {
    return this.http.put(this.urlWareH, warehouse, this.httpOptions);
  }

  // Companies
  getCompanies() {
    return this.http.request('get', this.baseurl +'/comercio/'+this.currentUser.rol+'/'+this.comercio, { headers: { 'x-access-token': this.currentUser.token}});
  }

  getCompaniesNames() {
    return this.http.request('get', this.baseurl +'/comercios', { headers: { 'x-access-token': this.currentUser.token}});
  }

  getCompaniesByID(){
    return this.http.request('get', this.baseurl+'/comercio/id/'+this.comercio, { headers: { 'x-access-token': this.currentUser.token}});
  }

  // Address
  getCountries() {
    return this.http.get(`https://coldchainsecurity.herokuapp.com/pais`, this.httpOptions);
  }
  getStateByCountry(pais): Observable<any>{
    return this.http.get<any>(this.urlState + '/'+ pais, this.httpOptions)
  }
}
