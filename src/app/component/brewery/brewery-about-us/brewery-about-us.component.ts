import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { CommonService } from '../../../service/common.service';
import { environment } from '../../../../environments/environment';
import Swal from 'sweetalert2';
import { AddtoCartBehaviourService } from "../../../addto-cart-behaviour.service";

@Component({
  selector: 'app-brewery-about-us',
  templateUrl: './brewery-about-us.component.html',
  styleUrls: ['./brewery-about-us.component.css']
})
export class BreweryAboutUsComponent implements OnInit {

  user_slug: any;
  message: any;
  bannerData: any = '';
  teamData: any = '';
  processData: any = '';
  aboutSec: any = '';
  aboutThird: any;
  pagewiseProductData: any
  featuredres
  productres
  status
  ProductId
  buttonText:any

  constructor(private route: ActivatedRoute, private common: CommonService,private cartBehaviour: AddtoCartBehaviourService) { }

  ngOnInit() {
    this.user_slug = this.route.snapshot.url[0].path;
    this.getBannerById();
    this.getTeamDetails();
    this.getProcessDetails();
    this.getAbout2DetailsBySubdomain();
    this.getAbout3DetailsBySubdomain();
    this.pagewiseProduct();
    let data = JSON.parse(localStorage.getItem("loggedInUser"))
    if (data) {
      this.getuserCart(data.id)
    }


  }

  getuserCart(userid) {
    this.common.getCartDetails(this.user_slug, userid).subscribe(
      res => {
        //console.log('cartListByUserId > ', res["data"]);
        this.status=res["data"].map((x)=>{
          return x.product_id
        }).includes(this.ProductId)
      }, err => {
        this.message = err['message'];
      }
    );
  }

  pagewiseProduct() {
    this.common.addcartPageWise(this.user_slug, 2).subscribe(
      res => {
        this.pagewiseProductData = res["data"]
        this.ProductId=this.pagewiseProductData[0].id
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

  addtoCart(product) {
    console.log("hithit")
    if (!localStorage.getItem('loggedInUser')) {
      product["stock"] = 1

      console.log(product)
      this.cartBehaviour.showCart().subscribe((element) => {
        console.log((element))

        // this.cartBehaviour.updateCart(data)

      })
      this.cartBehaviour.AddtoCart({"product_id":product.id,"amount":product.price,"product_count":"1","product_name":product.name,"unit_price":product.price})
      
      // this.AddedToCartIds.push(product.id)
      // this.disableButton();
    }
    else {
      let data = JSON.parse(localStorage.getItem("loggedInUser"))
      console.log(data)
      var formData = new FormData();
      formData.append('product_id', product.id);
      formData.append('subdomain', this.user_slug);
      //formData.append('brewery_id', '2');
      formData.append('amount', product.price);
      formData.append('product_count', "1");
      formData.append('user_id', data.id);
      formData.append('unit_price', product.price);

      this.common.addCart(this.user_slug, formData).subscribe(
        res => {
          console.log('addToCart  > ', res);
          if (res['status'] == true) {
            this.featuredres = res['data'];
          } else if (res['status'] == false) {
            this.productres = res['data'];
            this.message = res['message'];
          }

          this.ngOnInit();
        }, err => {
          console.log("=======err=======>", err);
        }
      );
    }
  }

  getBannerById() {
    this.common.getBannerDetailsBySubdomain(this.user_slug, 'about-us').subscribe(
      res => {
        console.log('<<<bannerres>>>  ', res);
        if (res['status'] == true) {
          this.bannerData = res['data'];
        }
      }, err => {
        this.message = err['message'];
      }
    );
  }

  getTeamDetails() {
    this.common.getOurTeamDetailsBySubdomain(this.user_slug).subscribe(
      teamres => {
        console.log('<<<teamres>>>  ', teamres);
        if (teamres['status'] == true) {
          this.teamData = teamres['data'];
        }
      }, err => {
        this.message = err['message'];
      }
    );
  }

  getProcessDetails() {
    this.common.getProcessDetailsBySubdomain(this.user_slug, 1).subscribe(
      processres => {
        console.log('<<<processres>>>  ', processres);
        if (processres['status'] == true) {
          this.processData = processres['data'];
        }
      }, err => {
        this.message = err['message'];
      }
    );
  }

  getAbout2DetailsBySubdomain() {
    this.common.getAboutDetailsBySubdomain(this.user_slug, 2).subscribe(
      aboutSec => {
        console.log('<<< about section 2 >>>  ', aboutSec);
        if (aboutSec['status'] == true) {
          this.aboutSec = aboutSec['data'][0];
        }
      }, err => {
        this.message = err['message'];
      }
    );
  }

  getAbout3DetailsBySubdomain() {
    this.common.getAboutDetailsBySubdomain(this.user_slug, 3).subscribe(
      aboutThird => {
        console.log('<<< about section 3 >>>', aboutThird);
        if (aboutThird['status'] == true) {
          this.aboutThird = aboutThird['data'];
        }
      }, err => {
        this.message = err['message'];
      }
    );
  }

}
