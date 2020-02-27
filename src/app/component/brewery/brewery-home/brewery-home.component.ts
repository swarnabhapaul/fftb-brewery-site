import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { CommonService } from '../../../service/common.service';
import { environment } from '../../../../environments/environment';
import { AddtoCartBehaviourService } from "../../../addto-cart-behaviour.service";

@Component({
  selector: 'app-brewery-home',
  templateUrl: './brewery-home.component.html',
  styleUrls: ['./brewery-home.component.css']
})
export class BreweryHomeComponent implements OnInit {


  user_slug: any;
  message: any;
  bannerData: any = '';
  passionData: any = '';
  status
  ProductId:any
  homethirdsectionData:any = ''
  homethirdsection2Data:any = ''
  pagewiseProductData:any = ''
  buttonText: any

  constructor(
    private route: ActivatedRoute,
    private common: CommonService,
    private cartBehaviour: AddtoCartBehaviourService
  ) { }

  ngOnInit() {
    this.user_slug = this.route.snapshot.url[0].path;
    this.getBannerById();
    this.getOurPassionDetails();
    this.pagewiseProduct()
    this.getHomeThirdSectionBySubdomain()
    let data = JSON.parse(localStorage.getItem("loggedInUser"))
    if (data) {
      this.getuserCart(data.id)
    }

  }
  pagewiseProduct() {
    this.common.addcartPageWise(this.user_slug, 2).subscribe(
      res => {
        this.pagewiseProductData = res["data"]
        this.ProductId = this.pagewiseProductData[0].id
        
        ///////////////////////////////////
        this.pagewiseProductData.forEach((value, i) => {

          this.cartBehaviour.showCartId().subscribe((element) => {
            if (element.includes(value.id) == true) {
              this.buttonText = "Added"
            } else {
              this.buttonText = "Add To Cart"
            }
            this.pagewiseProductData[i]["buttonText"] = this.buttonText
          })

        })
        /////////////////////////////////////
      }
    );
  }

  getuserCart(userid) {

    this.common.getCartDetails(this.user_slug, userid).subscribe(
      res => {
        //console.log('cartListByUserId > ', res["data"]);
        this.status = res["data"].map((x) => {
          return x.product_id
        }).includes(this.ProductId)
        //console.log(this.status)

      }, err => {

        this.message = err['message'];
      }
    );

  }

  getBannerById() {
    this.common.getBannerDetailsBySubdomain(this.user_slug, 'home').subscribe(
      res => {
        //console.log('<banner>  ', res);
        if (res['status'] == true) {
          this.bannerData = res['data'];
        }
      }, err => {
        this.message = err['message'];
      }
    );
  }

  getOurPassionDetails() {
    this.common.getOurPassionDetails(this.user_slug).subscribe(
      res => {
        //console.log('< passion >  ', res);
        if (res['status'] == true) {
          this.passionData = res['data'];
        }
      }, err => {
        this.message = err['message'];
      }
    );
  }
  addtoCart(product) {

    if (!localStorage.getItem('loggedInUser')) {
      product["stock"] = 1

      //console.log(product)
      this.cartBehaviour.showCart().subscribe((element) => {
        //console.log(',,,,,,,,,,,,,,,,,,,,')
        //console.log(element)
        // this.cartBehaviour.updateCart(data)
      })
      this.cartBehaviour.AddtoCart(
        {
          "product_id": product.id,
          "amount": product.price,
          "product_count": "1",
          "product_name": product.name,
          "unit_price": product.price
        })

      /////////////////////////
      // let data = JSON.parse(localStorage.getItem("loggedInUser"))
      // console.log('--------------------->',data)
      // this.common.checkProductAddedOrNot(data.id,product.id).subscribe(
      //   res => {
      //     console.log('< checkProductAddedOrNot >  ', res);
      //     // if (res['status'] == true) {
      //     //   this.passionData = res['data'];
      //     // }
      //   }, err => {
      //     this.message = err['message'];
      //   }
      // );
      /////////////////////////
      // this.AddedToCartIds.push(product.id)
      // this.disableButton();
    }
    else {
      let data = JSON.parse(localStorage.getItem("loggedInUser"))
      //console.log(data)
      var formData = new FormData();
      formData.append('product_id', product.id)
      formData.append('subdomain', this.user_slug)
      //formData.append('brewery_id', '2');
      formData.append('amount', product.price)
      formData.append('product_count', "1")
      formData.append('user_id', data.id)
      formData.append('unit_price', product.price)


      this.common.addCart(this.user_slug, formData).subscribe(
        res => {
          //console.log('addToCart  > ', res);
          if (res['status'] == true) {
            // this.featuredres = res['data'];
            // this.AddedToCartIds.push(product.id)
          } else if (res['status'] == false) {
            // this.productres = res['data'];
            // this.message = res['message'];
          }

          this.ngOnInit();
        }, err => {
          console.log("=======err=======>", err);
        }
      );
    }

  }

  getHomeThirdSectionBySubdomain() {
    this.common.getHomeThirdSectionBySubdomain(this.user_slug).subscribe(
      res => {
        console.log('<HomeThirdSection>  ', res['data']);
        if (res['status'] == true) {
          this.homethirdsectionData = res['data'][0];
          this.homethirdsection2Data = res['data'][1];
        }
      }, err => {
        this.message = err['message'];
      }
    );
  }

}
