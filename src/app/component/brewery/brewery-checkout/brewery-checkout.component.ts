import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, UrlSegment, Router } from '@angular/router';
import { CommonService } from '../../../service/common.service';

@Component({
  selector: 'app-brewery-checkout',
  templateUrl: './brewery-checkout.component.html',
  styleUrls: ['./brewery-checkout.component.css']
})
export class BreweryCheckoutComponent implements OnInit {

  user_slug: any
  cartDetails: any
  subtotal: any
  flag: number = 0
  classdisabled:any = "hide"
  classdisabledhide:any = "show"

  constructor(private route: ActivatedRoute, private common: CommonService, private router: Router) {
    this.subtotal = 0
  }

  ngOnInit() {
    this.user_slug = this.route.snapshot.url[0].path;
    let data = JSON.parse(localStorage.getItem("loggedInUser"))
    console.log(data)
    if (data !== undefined) {
      console.log("----------------------")
      this.cartListByUserId(data.id)
    }
  }
  
  cartListByUserId(userId) {
    var newAddedIds: any = [];
    this.common.getCartDetails(this.user_slug, userId).subscribe(
      res => {
        if (res['status'] == true) {
          this.cartDetails = res['data'];

          console.log(this.cartDetails)
          localStorage.setItem("addedProductId", newAddedIds);
          this.subTotal();
          // this.total_cart_amt = res['total_cart_amt'];
        } else if (res['status'] == false) {
          // this.message = res['message'];
        }
      }, err => {
        console.log("=======err=======>", err);
        // this.message = err['message'];
      }
    );
  }

  subTotal() {
    this.cartDetails.forEach(element => {
      this.subtotal += parseFloat(element.amount)
      localStorage.setItem('total', this.subtotal);
    });
  }
  proceedtopay() {
    this.router.navigate(['/', this.user_slug, 'proceedtopay'])
  }

  checkTermsConditions() {
    //alert(this.flag)
    if (this.flag == 1) {
      this.flag = 0
      this.classdisabledhide = "show"
      this.classdisabled = "hide"
    } else if (this.flag == 0) {
      this.flag = 1
      this.classdisabledhide = "hide"
      this.classdisabled = "show"
    }

  }


}
