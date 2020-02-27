import { Injectable, ɵConsole,Component, OnInit } from '@angular/core';
import { ActivatedRoute, UrlSegment, Router } from '@angular/router';
import { CommonService } from './service/common.service';//'../../../service/common.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { element } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class AddtoCartBehaviourService {
  
  total_cart_amt
  cartDetails

  data = []
  usercartIds = []
  constructor(private route: ActivatedRoute, private common: CommonService) {

    // console.log('data>>',this.data)
    // console.log('usercartIds>>',this.usercartIds)
    // console.log('usercartIds.length>>',this.usercartIds.length)

   }

  subjectdata = new BehaviorSubject(this.data);
  cartIds = new BehaviorSubject(this.usercartIds);
  cartLength = new BehaviorSubject(this.usercartIds.length);


  AddtoCart(x: Object) {
    let ids = this.data.map((element) => {
      return element.product_id
    })

    if (!ids.includes(x["product_id"])) {
      this.data.push(x)
      this.subjectdata.next(this.data)
      this.usercartIds.push(x["product_id"])
      this.cartIds.next(this.usercartIds)
      this.cartLength.next(this.usercartIds.length)
      //console.log('------->',this.usercartIds.length)
      //this.cartLength.subscribe(x=> console.log(x))
    }
  }

  showCartId(): Observable<Array<any>> {
    return this.cartIds.asObservable();
  }

  updateCartId(datas) {
    this.usercartIds = datas
    this.cartIds.next(this.usercartIds)
    this.cartLength.next(this.usercartIds.length)
  }

  showCart(): Observable<Array<any>> {
    return this.subjectdata.asObservable();
  }

  updateCart(data) {
    this.data = data
    this.subjectdata.next(data)
    this.cartLength.next(this.usercartIds.length)
  }

  setCartIds(data) {
    let filteredIds = data.map((element) => { return element.product_id })
    this.cartIds.next(filteredIds)
    this.cartLength.next(this.usercartIds.length)
  }
  getCardIds() {
    return this.cartIds;
  }

  countCardIds() {
    return this.cartLength
  }


  

}
