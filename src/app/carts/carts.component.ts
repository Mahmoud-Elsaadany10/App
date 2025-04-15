import { Component } from '@angular/core';
import { sharedservice } from '../shared/service/shared.service';
import { CartService } from './service/cart.service';
import { ServicesService } from '../main/service/main.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-carts',
  standalone: true,
  imports: [CommonModule , RouterModule , FormsModule],
  templateUrl: './carts.component.html',
  styleUrl: './carts.component.css'
})
export class CartsComponent {
  cartProducts : any[] =[]
  lenght : any = 0
  quantity : number =1
  selectedId : number =0
  totalprice : number =0
  item: any;
  pricePrd : number = 0
  totalOrderPrice : number = 0
  quant : number = 1
  number : number =0

  constructor(private serveCart : CartService ,
    public servNum :sharedservice ,
    private sendServic :ServicesService
  ){}

  ngOnInit(): void {
    this.getPrdCart()

  }
  /////////// important ///////////
  getPrdCart(){
    if("cart" in localStorage){
      this.cartProducts =JSON.parse( localStorage.getItem("cart")!)
  }
  /////////// important ///////////

  this.calculateTotalOrderPrice()


}
increment() {
  this.servNum.incrementNum();
}

decrement() {
  this.servNum.decrementNum();
}

clearAll(){
  localStorage.clear()
}


  plusNum(){
    this.quantity +=1
    this.calculateTotalOrderPrice()
    localStorage.setItem("cart", JSON.stringify(this.cartProducts));
  }


  minusNum() {
    if(this.quantity > 1){
      this.quantity -=1
      this.calculateTotalOrderPrice()
      localStorage.setItem("cart", JSON.stringify(this.cartProducts));
    }

  }


getTotalPrice(product: any): number {
  this.pricePrd = product.price * this.quantity
  return this.pricePrd ;
}

// Calculate the total order price for all products
  calculateTotalOrderPrice() {
  this.totalOrderPrice = 0;
  this.cartProducts.forEach((prd)=>{
    this.totalOrderPrice += prd.price * this.quantity
    localStorage.setItem("cart", JSON.stringify(this.cartProducts));
  })
  }

  detectChang(){
    this.calculateTotalOrderPrice()
  }

  RemovePrd(itemId : number){
    let index = this.cartProducts.indexOf(itemId)
    this.cartProducts.splice(index,1)
    this.calculateTotalOrderPrice()
    localStorage.setItem("cart", JSON.stringify(this.cartProducts));
  }

  sendToApi(){
    let products = this.cartProducts.map((i)=>{
    return  {product_id : i.id  } // send only product id
    })
    // let product = this.cartProducts
    let model ={
      date : new Date() ,
      userId : 5 ,
      products :products
    }
    console.log(model)
    this.sendServic.postData(model).subscribe((res)=>{
      res = model
    })
  }


}



