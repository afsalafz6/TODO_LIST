import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  api: string = environment.api;

  constructor(private _http: HttpClient) { }

  create(route: any, data: any) {
    console.log('inside create service in route',route);  
    console.log('create in common service',data);
    return this._http.post(this.api + route + '/create', data)
      .pipe(map((response: any) => {
        return response;
      }));
  }

    /**************** list  ***********************/
    list(route: any): any {
      return this._http.post(this.api + route + '/list', {})
        .pipe(map((response: any) => {
          return response;
        }));
    }

     /**************** Status  ***********************/
    updateStatus(route: any, id:any, status:any ): any {
      return this._http.put(this.api + route + '/updateStatus/' + id, {status})
        .pipe(map((response: any) => {
          return response;
        }));
    }

      /**************** delete ***********************/
    delete(route: any, id: any) {
      return this._http.delete(this.api + route + '/delete/' + id ,{})
        .pipe(map((response: any) => {
         return response;
       }));
    }

      /**************** Get  ***********************/
    getDetails(route: any, id: any) {
      return this._http.get(this.api + route + '/getDetails/' + id, {})
       .pipe(map((response: any) => {
         return response;
      }));
    }

      /**************** Update  ***********************/
  update(route: any, id: any, data: any) {
    return this._http.put(this.api + route + '/update/' + id, {data})
      .pipe(map((response: any) => {
        return response;
      }));
  }
  
}
