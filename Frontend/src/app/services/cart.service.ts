import { Injectable } from '@angular/core';
import { Cart } from '../shared/model/Cart';
import { BehaviorSubject, Observable } from 'rxjs';
import { Food } from '../shared/model/Food';
import { CartItem } from '../shared/model/CartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart:Cart =new Cart();
  private cartSubject:BehaviorSubject<Cart> =new BehaviorSubject(this.cart) //Using BehaviourSubject we will use Cart bcz when we subscribe we need initial values so we use behaviourSubject
  constructor() { }
  //Add To Cart
  addToCart(food:Food):void{
    let cartItem = this.cart.items.find(item => item.food.id === food.id)
    if(cartItem)
    return;

    this.cart.items.push(new CartItem(food))
    this.setCartToLocalstorage();
  }
  //remove Cart Item
  removeFromcart(foodId:string):void{
    this.cart.items = this.cart.items.filter(item => item.food.id!= foodId)
    this.setCartToLocalstorage();
  }

  //change Quantity
  chnageQuantity(foodId:string , quantity:number){
    let cartItem =this.cart.items.find(item =>item.food.id ==foodId);
    if(!cartItem)
    return;

    cartItem.quantity=quantity;
    cartItem.price = quantity*cartItem.food.price;
    this.setCartToLocalstorage();
  }
  //Clear Cart
  clearCart(){
    this.cart= new Cart();
    this.setCartToLocalstorage();
  }
  //get Cart Observable means Check Observable data
  getCartObservable():Observable<Cart>{
    return this.cartSubject.asObservable();
  }

  getCart(): Cart{
    return this.cartSubject.value;
    // Subject always give the Latest Values
  }
  //now set local storage data
  private setCartToLocalstorage():void{
    this.cart.totalPrice = this.cart.items.reduce((prevSum,currentItem) => prevSum + currentItem.price ,0);
    this.cart.totalcount=this.cart.items.reduce((prevSum , currentItem) => prevSum + currentItem.quantity ,0);


  const cartJson =JSON.stringify(this.cart);
  localStorage.setItem('Cart',cartJson);
  this.cartSubject.next(this.cart)
  }
  //Whenever set Local Storage data then also get data
  private getCartFromLocalStorage():Cart{
    const cartJson =localStorage.getItem('Cart');
    return cartJson?JSON.parse(cartJson):new Cart();
  }
}
