import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../shared/model/User';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { HttpClient } from '@angular/common/http';
import { USER_LOGIN_URL, USER_REGISTER_URL } from '../shared/constants/url';
import { ToastrService } from 'ngx-toastr';
import { IUserRegister } from '../shared/interfaces/IUserRegister';
import { Router } from '@angular/router';

const USER_KEY='';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  setUser(user: IUserRegister) {

    throw new Error('Method not implemented.');
  }


  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
  public userObservable:Observable<User>
  constructor(private http:HttpClient, private toastrService:ToastrService , private router : Router) {
    this.userObservable=this.userSubject.asObservable();
  }

  public get currentUser():User{
    return this.userSubject.value;
  }

  login(userLogin:IUserLogin):Observable<User>{
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
      next: (user) => {

        this.setUserToLocalStorage(user.currUser);

        this.toastrService.success(`Welcome to Fresh Pallete Cafe ${user.currUser.name}!`,
          `Login Successful !`);

      },
      error: (errorResponse) => {
        this.toastrService.error(errorResponse.error, `Login Failed !`);
      }
    }));

  }

  register(userRegister:IUserRegister): Observable<User>{
    return this.http.post<User>(USER_REGISTER_URL,userRegister).pipe(
      tap({
        next:(user) => {
          console.log("regis",user);
          this.setUserToLocalStorage(user.currUser);
          this.userSubject.next(user.dbUser);
          this.toastrService.success(
            `Welcome to the Fresh Palette Cafe ${user.dbUser.name}`,
            'Register Successful'
          )

        },
        error: (errorResponse) =>{
          this.toastrService.error(errorResponse.error,
            'Register Failed');
        }
      })
    )

  }

  logout(){
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);

    this.router.navigate(['/login']);
  }

  private setUserToLocalStorage(user:User){
    localStorage.setItem(USER_KEY,JSON.stringify(user));
  }
  private getUserFromLocalStorage(): User {
    const userJson = localStorage.getItem(USER_KEY);
    if (userJson !== null) {
      try {
        return JSON.parse(userJson) as User;
      } catch (error) {
        console.error('Error parsing user JSON:', error);
        return new User();
      }
    }
    return new User();
  }

}
