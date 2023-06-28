import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/model/Food';

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.scss']
})
export class FoodPageComponent implements OnInit{
  food!:Food;   //Variable food with data type Food
origins: any;
  constructor(activatedRoute:ActivatedRoute, private api:FoodService , private cartService:CartService ,private router:Router){
    activatedRoute.params.subscribe((params)=>{
      if(params.id)
      api.getFoodById(params.id).subscribe(serverFood =>{
        this.food = serverFood;
      })
    })

  }
  ngOnInit(): void {

  }
  //Add to Cart
  addToCart(){
    this.cartService.addToCart(this.food);
    this.router.navigateByUrl('/cart-page')
  }
}
