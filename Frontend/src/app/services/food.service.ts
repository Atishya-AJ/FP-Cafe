import { Injectable } from '@angular/core';
// import { sample_foods } from 'src/data';
import { Food } from '../shared/model/Food';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FOODS_BY_ID_URL, FOODS_BY_SEARCH_URL, FOODS_URL } from '../shared/constants/url';


@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private httpClient:HttpClient ) { }
  getAll():Observable<Food[]>{   //to return the sample data
    return this.httpClient.get<Food[]>(FOODS_URL)    //now data of Sample food will be shown where we want .In whichever compoment we will call this data will be shown. So we will call it in home component.
  }
  //Search Food
  getAllFoodBySearchTerm(searchTerm:string){
    return this.httpClient.get<Food[]>(FOODS_BY_SEARCH_URL + searchTerm)
  }
  //get Food by ID
  getFoodById(foodId:string):Observable<Food>{
    return this.httpClient.get<Food>(FOODS_BY_ID_URL + foodId)
  }
}
