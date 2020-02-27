import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, UrlSegment, Router } from '@angular/router';
import { CommonService } from '../../../service/common.service';
import { environment } from '../../../../environments/environment';
import { NgForm } from '@angular/forms';
import { Options } from 'ng5-slider';
import Swal from 'sweetalert2';
import { element } from 'protractor';
import { AddtoCartBehaviourService } from "../../../addto-cart-behaviour.service";
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-brewery-shop',
  templateUrl: './brewery-shop.component.html',
  styleUrls: ['./brewery-shop.component.css']
})
export class BreweryShopComponent implements OnInit {

  AddedToCartIds = []
  user_slug: any
  isFeatured: any = 0
  sortType: string = "DESC"
  rangeTo: any = 0
  rangeForm: any = 3
  productres: any = ''
  productcount: any = ''
  featuredres: any
  val: any = '3'
  total: any
  page: any = '1'
  first_page_url: any
  next_page_url: any
  current_page: any
  sliderValue = 0
  pageCount: any
  staticValue: any = 1
  message: any
  client_secret: 'gAV9mQiP60cnrZT0UKX9F9R0deY4wd8ZRtg8435H'
  client_id: '2'
  grant_type: 'password'

  cartValue: any
  cartDetails: any = ''
  total_cart_amt: any
  bannerData: any = ''
  show: any = { visibility: 'show' }
  hide: any = { visibility: 'hidden' }
  value: number = 100
  highValue: number = 900
  options: Options = {
    floor: 0,
    ceil: 1000,
    step: 100,
    showTicks: true
  };
  status: boolean = true
  sumTotal: number
  Added: 'Added'
  data: any
  buttonText: any
  newProductList: any = []

  errorUsername: any = ""
  loginmessage: any = ""


  constructor(
    private route: ActivatedRoute,
    private common: CommonService,
    private cartBehaviour: AddtoCartBehaviourService,
    private router: Router) { }


  ngOnInit() {
    this.pageCount = localStorage.getItem('pageCount');
    this.user_slug = this.route.snapshot.url[0].path;
    this.getProductBySubdomain(this.sortType, this.rangeTo, this.rangeForm, this.val, this.page);
    this.isFeaturedCheck();
    this.getBannerById();
    if (localStorage.getItem('loggedInUser')) {
      let data = JSON.parse(localStorage.getItem("loggedInUser"))
      this.cartListByUserId(data.id);
    }
    else {
      this.cartBehaviourData();
    }
  }

  cartBehaviourData() {
    this.data = this.cartBehaviour.showCart();
    this.data.subscribe(x => {
      this.cartDetails = x
      this.calculateSum()
    })
  }

  getBannerById() {
    this.common.getBannerDetailsBySubdomain(this.user_slug, 'shop').subscribe(
      res => {

        if (res['status'] == true) {
          this.bannerData = res['data'];
        }
      }, err => {
        this.message = err['message'];
      }
    );
  }

  disableButton() {
    this.status = this.AddedToCartIds.includes(this.productres[0].id)

  }

  getProductBySubdomain(sorttype, rangeTo, rangeForm, val, page) {

    this.common.getProductBySubdomain(this.user_slug, -1, sorttype, rangeTo, rangeForm, val, page).subscribe(
      res => {
        if (res['status'] == true) {
          this.productres = res['data'];
          this.disableButton();
          this.productcount = res['count'];
          this.total = res['total_product_count'];
          ///////////////////////////////////
          this.productres.forEach((value, i) => {
            this.cartBehaviour.showCartId().subscribe((element) => {
              if (element.includes(value.id) == true) {
                this.buttonText = "Added"
              } else {
                this.buttonText = "Add To Cart"
              }
              this.productres[i]["buttonText"] = this.buttonText
            })
          })
          /////////////////////////////////////
        } else if (res['status'] == false) {
          this.page = 1
          this.getProductBySubdomain(this.sortType, this.rangeTo, this.rangeForm, this.val, this.page);
        }
      }, err => {

        window.open('error/404', '_self');
      }
    );
  }

  isFeaturedCheck() {
    // Is Featured data
    this.common.getProductBySubdomain(this.user_slug, 1, this.sortType, this.rangeTo, this.rangeForm, 1, 1).subscribe(
      res => {


        if (res['status'] == true) {
          this.featuredres = res['data'];
        } else if (res['status'] == false) {
          this.productres = res['data'];
          this.message = res['message'];
        }
      }, err => {

      }
    );
  }

  sliderEvent(value, highValue) {
    this.rangeTo = value;
    this.rangeForm = highValue;
    this.getProductBySubdomain(this.sortType, this.rangeTo, this.rangeForm, this.val, 1);
  }

  preNextButton(sorttype, rangeTo, rangeForm, val, pagetype) {

    this.val = val;
    this.sortType = sorttype;
    this.rangeTo = rangeTo;
    this.rangeForm = rangeForm;

    if (pagetype == 'next') {
      this.page = parseInt(this.page) + 1;
      if (this.page > this.total) {
        this.page = '1';
      }
    } else if (pagetype == 'pre') {
      if (this.page <= 1) {
        this.page = '1';
      } else {
        this.page = parseInt(this.page) - 1;
      }
    }
    //alert(this.page + "--" + this.total)
    this.getProductBySubdomain(this.sortType, this.rangeTo, this.rangeForm, this.val, this.page);
  }

  lowTohigh(sorttype) {
    this.sortType = sorttype;
    this.getProductBySubdomain(this.sortType, this.rangeTo, this.rangeForm, this.val, this.page);
  }

  calculateSum() {
    this.sumTotal = 0
    if (this.cartDetails.length !== 0) {
      this.cartDetails.forEach((element) => {
        this.sumTotal += parseInt(element.product_count) * parseFloat(element.unit_price)
      })
    }
    else {
      this.sumTotal = 0
    }

  }

  addToCart(product) {
    if (!localStorage.getItem('loggedInUser')) {
      product["stock"] = 1
      this.cartBehaviour.showCart().subscribe((element) => {
        //console.log((element))
        // this.cartBehaviour.updateCart(data)
      })
      this.cartBehaviour.AddtoCart({ "product_id": product.id, "amount": product.price, "product_count": "1", "product_name": product.name, "unit_price": product.price })
      this.calculateSum()
      this.AddedToCartIds.push(product.id)
      this.disableButton();
    }
    else {
      let data = JSON.parse(localStorage.getItem("loggedInUser"))
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
          //.log('addToCart  > ', res);
          if (res['status'] == true) {
            this.featuredres = res['data'];
            console.log(this.featuredres);
            this.AddedToCartIds.push(product.id)
            this.calculateSum()
          } else if (res['status'] == false) {
            this.productres = res['data'];
            this.message = res['message'];
            Swal.fire({
              title: this.message,
              timer: 1500,
              showClass: {
                popup: 'animated fadeInDown faster'
              },
              hideClass: {
                popup: 'animated fadeOutUp faster'
              }
            })
          }

          this.ngOnInit();
        }, err => {
          console.log("=======err=======>", err);
        }
      );
    }
  }

  checkout() {
    //////////////// Get Dynamic Url //////////////
    var url = location.href
    var to = url.lastIndexOf('/')
    to = to == -1 ? url.length : to + 1
    url = url.substring(0, to)
    url = url + 'register'
    ////////////////////////////////////////////////
    if (!localStorage.getItem('loggedInUser')) {
      Swal.mixin({
        input: 'text',
        confirmButtonText: 'Next &rarr;',
        showCancelButton: true,
        progressSteps: ['1', '2'],
        footer: '<a href="' + url + '">If not logggin user</a>'
      }).queue([
        {
          title: 'Login',
          text: 'Enter Username'
        },
        {
          // title: 'Login',
          text: 'Enter Password',
          input: 'password',
          confirmButtonText: 'Submit',
        },
      ]).then((result) => {
        if (result.value) {
          console.log('success', result.value)

          let loginvalues = {
            username: result.value[0],
            password: result.value[1],
            client_id: "2",
            client_secret: "gAV9mQiP60cnrZT0UKX9F9R0deY4wd8ZRtg8435H",
            grant_type: "password",
            role: "customer"
          }
          this.common.login(loginvalues).subscribe(
            res => {
              let token = res['data']['token_type'] + " " + res['data']['access_token']
              this.common.getLoginUser(token).subscribe(
                res => {
                  localStorage.setItem("loggedInUser", JSON.stringify(res["data"]))
                  //-----------------AddtoCart Data-------------------------//
                  this.common.addCartBulk(this.user_slug, res["data"].id, JSON.stringify(this.cartDetails)).subscribe(response => {
                    this.router.navigate(['/', this.user_slug, 'checkout']);
                  },
                  error => {
                    console.log('error but redirect',error);
                    this.router.navigate(['/', this.user_slug, 'checkout']);
                  })
                },err => {
                  console.log('err>>>>>>>>>>>>>>>>>>', err)
                }
              )
            },
            err => {
              if (err['error']['errors']) {
                if (err['error']['message'] == "invalid_credentials") {
                  this.loginmessage = 'Invalid credentials, please try again.'
                } else if (err['error']['message'] == "parameter errors") {
                  this.loginmessage = 'The username must be a valid email address.'
                } else {
                  this.loginmessage = 'Somthing wrong, please try again.'
                }
              }
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: this.loginmessage
              })
            }
          )
        }
      })

    }
    else {
      this.router.navigate(['/', this.user_slug, 'checkout']);
    }
  }

  cartListByUserId(userId) {
    var newAddedIds: any = [];
    this.common.getCartDetails(this.user_slug, userId).subscribe(
      res => {
        if (res['status'] == true) {
          this.cartDetails = res['data'];
          this.calculateSum()
          this.cartBehaviour.setCartIds(this.cartDetails)
          localStorage.setItem("addedProductId", newAddedIds);
          this.total_cart_amt = res['total_cart_amt'];
        }
      }, err => {
        this.message = err['message'];
      }
    );
  }

  deleteCartById(id, cartId) {
    if (cartId !== undefined) {
      this.common.deleteCartById(cartId).subscribe(
        res => {
          if (res['status'] == true) {
            this.message = res['message'];
          } else if (res['status'] == false) {
            this.message = res['message'];
          }
          this.calculateSum();
          this.ngOnInit();
        }, err => {
          this.message = err['message'];
        }
      );
    }
    else {
      let updatedArray = this.cartDetails.filter((element) => {
        if (element["product_id"] !== id) {
          return element
        }
      })
      let returnelementArray = this.cartDetails.filter((element) => {
        if (element["product_id"] !== id) {
          return element
        }
      }).map(filterele => filterele.product_id)
      this.cartBehaviour.updateCartId(returnelementArray)
      this.cartBehaviour.updateCart(updatedArray)
      this.getProductBySubdomain(this.sortType, this.rangeTo, this.rangeForm, this.val, this.page)
      this.calculateSum()

    }
  }



}