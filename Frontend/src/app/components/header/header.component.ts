import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/model/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  cartQuantity=0;
  user!:User;
  isAuth = false;
  private readonly unsubscribe$ = new Subject<boolean>();

  constructor(private cartService:CartService,private userService:UserService)  {  }

  ngOnInit(): void {
    this.cartService.getCartObservable().pipe().subscribe((newCart) => {
      this.cartQuantity = newCart.totalcount;
    })
    this.getUser();
  }

getUser()
{
  this.userService.userObservable.pipe(takeUntil(this.unsubscribe$)).subscribe((newUser) => {
    this.user = newUser;
    this.isAuth = this.user.email != undefined;
    console.log(this.isAuth);
  });

}
  logout(){
    this.userService.logout();
    this.cartService.clearCart();
  }

}
