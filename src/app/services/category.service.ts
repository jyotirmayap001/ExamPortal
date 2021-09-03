import { Injectable } from '@angular/core';
import {  HttpClient } from '@angular/common/http';
import baseurl from './helper';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }


public categories(){

  return this.http.get(`${baseurl}/category/getAllCategory`);
}

public addCategory(data:any){


  return this.http.post(`${baseurl}/category/addCategory`,data);
}

}
