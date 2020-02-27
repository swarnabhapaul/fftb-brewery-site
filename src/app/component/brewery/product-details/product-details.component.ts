import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { CommonService } from '../../../service/common.service';
import { AddtoCartBehaviourService } from "../../../addto-cart-behaviour.service";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  message: any
  bannerData: any
  user_slug: any
  slug: any
  total_cart_amt: any
  cartDetails: any
  productData: any
  productallData: any
  featuredres: any
  productres: any
  buttonText: any

  constructor(
    private route: ActivatedRoute,
    private common: CommonService,
    private cartBehaviour: AddtoCartBehaviourService) { }

  ngOnInit() {
    this.user_slug = this.route.snapshot.url[0].path
    this.slug = this.route.snapshot.paramMap.get('name')
    this.getBannerById()
    this.getOurProductDetails()
  }

  getBannerById() {
    this.common.getBannerDetailsBySubdomain(this.user_slug, 'shop').subscribe(
      res => {
        console.log('<>  ', res)
        if (res['status'] == true) {
          this.bannerData = res['data']
        }
      }, err => {
        this.message = err['message']
      }
    );
  }

  getOurProductDetails() {
    this.common.getOurProductDetails(this.user_slug, this.slug).subscribe(
      res => {
        if (res['status'] == true) {
          this.productallData = res['data']
          ///////////////////////////////////
          this.productallData.forEach((value, i) => {
            this.cartBehaviour.showCartId().subscribe((element) => {
              if (element.includes(value.id) == true) {
                this.buttonText = "Added"
              } else {
                this.buttonText = "Add To Cart"
              }
              this.productallData[i]["buttonText"] = this.buttonText
            })
          })
          this.productData = this.productallData[0]
          /////////////////////////////////////
        }
      }, err => {
        this.message = err['message']
      }
    );
  }


  addToCart(product) {
    if (!localStorage.getItem('loggedInUser')) {
      product["stock"] = 1
      this.cartBehaviour.showCart().subscribe((element) => { })
      this.cartBehaviour.AddtoCart(
        {
          "product_id": product.id,
          "amount": product.price,
          "product_count": "1",
          "product_name": product.name,
          "unit_price": product.price
        }
      )
    }
    else {
      let data = JSON.parse(localStorage.getItem("loggedInUser"))
      var formData = new FormData();
      formData.append('product_id', product.id)
      formData.append('subdomain', this.user_slug)
      formData.append('amount', product.price)
      formData.append('product_count', "1")
      formData.append('user_id', data.id)
      formData.append('unit_price', product.price)

      this.common.addCart(this.user_slug, formData).subscribe(
        res => {
          if (res['status'] == true) {
            this.featuredres = res['data']
          } else if (res['status'] == false) {
            this.productres = res['data']
            this.message = res['message']
          }
          this.ngOnInit()
        }, err => {
          console.log("=======err=======>", err)
        }
      );
    }
  }
}
