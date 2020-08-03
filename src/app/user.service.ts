import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {observable, Observable} from 'rxjs';
import {User} from './user'

@Injectable({
  providedIn: 'root'
})
//Get All Users
export class UserService {
  //#region Variables
  url='http://ec2-13-235-75-72.ap-south-1.compute.amazonaws.com/api/Users';
  //#endregion
 
 //#region Constructor
  constructor(private http:HttpClient) {}
  //#endregion
  
  //#region API Methods

  //Get all users
  getAllUser():Observable<User[]>{
    console.log("getAllUser: Begin");
    return this.http.get<User[]>(this.url);
  }

  //Get user by Id
  getUserById(userid:number):Observable<User>{
    return this.http.get<User>(this.url+'/'+userid);
  }

  //Create User
  createUser(user: User):Observable<User>{
    console.log("Create User: Begin");
    let httpHeaders = new HttpHeaders()
                        .set('Content-Type','application/json');
    let options={
      headers: httpHeaders
    }
    return this.http.post<User>(this.url,user,options);
  }

  //Update User
  updateUser(user: User):Observable<number>{
    console.log("Update User: Begin");
    let httpHeaders = new HttpHeaders()
                        .set('Content-Type','application/json');
    let options={
      headers: httpHeaders
    }
    console.log(user);
    return this.http.put<number>(this.url+'/'+user.Id,user,options);
  }

  //Delete User by Id
  deleteUserById(userid: number):Observable<number>
  {
    let httpHeaders = new HttpHeaders()
                        .set('Content-Type','application/json');
    return this.http.delete<number>(this.url+'/'+ userid);
  }
  //#endregion
}


