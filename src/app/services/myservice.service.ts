import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class MyserviceService {


  private baseUrl:string = "http://localhost:3000"
  
  constructor(private http : HttpClient) { }


// ------------------------------post data service-----------------------------------------------------
  postData(url : string, data : any, queryParams = {}){
    let fullUrl = this.baseUrl + url;
    let options = { headers : { "Accept" : "application/json" }, params: queryParams}

    return this.http.post(fullUrl,data,options);
  }

// ------------------------------get data service-----------------------------------------------------
  getData(url : string, queryParams = {} ){
    let fullUrl = this.baseUrl + url;
    let options = { headers : {"Accept" : "application/json" }, params : queryParams}

    return this.http.get(fullUrl,options);
  }

// -----------------------------put data service-------------------------------------------------------  

  putData(url : string, data : any, queryParams = {} ){
    let fullUrl = this.baseUrl + url;
    let options = {headers : {"Accept":"application/json" }, params: queryParams}

    return this.http.put(fullUrl, data, options);
  }

// -----------------------------patch data service-------------------------------------------------------  

  patchData(url : string, data : any, queryParams = {} ){
    let fullUrl = this.baseUrl + url;
    let options = {headers : {"Accept":"application/json" }, params: queryParams}

    return this.http.patch(fullUrl, data, options);
  }


// -----------------------------Delete data service-------------------------------------------------------  

  deleteData(url : string, queryParams = {} ){
    let fullUrl = this.baseUrl + url;
    let options = { headers : {"Accept" : "application/json" }, params: queryParams}

    return this.http.delete(fullUrl, options);
  }

}


