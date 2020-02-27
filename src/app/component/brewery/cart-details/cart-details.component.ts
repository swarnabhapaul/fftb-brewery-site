import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, UrlSegment, Router } from '@angular/router';
import { CommonService } from '../../../service/common.service';
import { environment } from '../../../../environments/environment';
import Swal from 'sweetalert2';
import { AddtoCartBehaviourService } from "../../../addto-cart-behaviour.service";


@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

  message: any;
  bannerData: any;
  user_slug: any;
  total_cart_amt: any;
  cartDetails: any;
  data: any
  quantity: number
  sumTotal: number
  constructor(private route: ActivatedRoute, private common: CommonService, private cartBehaviour: AddtoCartBehaviourService, private router: Router) {
    this.quantity = 1
    this.sumTotal = 0
  }

  ngOnInit() {
    this.user_slug = this.route.snapshot.url[0].path;
    this.data = JSON.parse(localStorage.getItem("loggedInUser"))

    if (this.data) {
      this.cartListByUserId(this.data.id);
    }
    else {
      this.cartBehaviourData()
    }

    this.getBannerById();

  }

  cartBehaviourData() {
    this.data = this.cartBehaviour.showCart();
    this.data.subscribe(x => {
      this.cartDetails = x
      //console.log(this.cartDetails)
      this.calculateSum()
    })
  }
  calculateSum() {
    this.sumTotal = 0
    if (this.cartDetails.length !== 0) {
      this.cartDetails.forEach((element) => {
        this.sumTotal += parseInt(element.product_count) * parseFloat(element.unit_price)
      })
    }
  }

  getdata(data) {

    console.log(data)
    this.cartDetails.map((element, i) => {
      if (element["product_id"] == data.id) {
        this.cartDetails[i]["product_count"] = data.stock
        this.cartDetails[i]["amount"] = parseInt(data.stock) * parseFloat(element.unit_price)


        if (this.data !== undefined) {
          this.common.updateCart(data.cartId, {
            "amount": parseInt(data.stock) * parseFloat(element.unit_price),
            "product_count": data.stock,
            "user_id": this.data.id,
            "unit_price":element.unit_price
          }).subscribe(response => {
            console.log(response)
          },
            error => {
              console.log(error)
            })
        }

      }

    })
    this.calculateSum()

  }
  cartListByUserId(userId) {
    var newAddedIds: any = [];
    this.common.getCartDetails(this.user_slug, userId).subscribe(
      res => {
        if (res['status'] == true) {
          this.cartDetails = res['data'];
          this.cartDetails.forEach(element => {
            newAddedIds.push(element['product_id']);
            this.calculateSum()
          });
          localStorage.setItem("addedProductId", newAddedIds);
          this.total_cart_amt = res['total_cart_amt'];
        } else if (res['status'] == false) {
          this.message = res['message'];
        }
      }, err => {
        console.log("=======err=======>", err);
        this.message = err['message'];
      }
    );
  }

  getBannerById() {
    this.common.getBannerDetailsBySubdomain(this.user_slug, 'shop').subscribe(
      res => {
        console.log('<>  ', res);
        if (res['status'] == true) {
          this.bannerData = res['data'];
        }
      }, err => {
        this.message = err['message'];
      }
    );
  }



  deleteCartById(id, cartId) {

    console.log(cartId)
    console.log(id)
    if (cartId !== undefined) {
      this.common.deleteCartById(cartId).subscribe(
        res => {
          if (res['status'] == true) {
            this.message = res['message'];
          } else if (res['status'] == false) {
            this.message = res['message'];
          }
          this.ngOnInit();
          this.calculateSum();
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
      console.log(updatedArray)

      this.cartBehaviour.updateCart(updatedArray)
      this.calculateSum()
    }


  }

  checkout() {
    console.log("checkout")

    if (!localStorage.getItem('loggedInUser')) {
      Swal.mixin({
        input: 'text',
        confirmButtonText: 'Next &rarr;',
        showCancelButton: true,
        progressSteps: ['1', '2']
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
              console.log(token)

              this.common.getLoginUser(token).subscribe(
                res => {
                  console.log(res)
                  localStorage.setItem("loggedInUser", JSON.stringify(res["data"]))

                  //-----------------AddtoCart Data-------------------------//

                  this.common.addCartBulk(this.user_slug, res["data"].id, JSON.stringify(this.cartDetails)).subscribe(response => {
                    console.log(response)
                    this.router.navigate(['/', this.user_slug, 'checkout']);
                  },
                    error => {
                      console.log(error);
                    })


                  // this.router.navigate(['/', this.user_slug, 'checkout'])
                  // this.router.navigateByUrl("/"+)
                },
                err => {
                  console.log(err)
                }
              )

            },
            err => {
              console.log(err)
            }
          )


        }
      })

    }
    else {

      //-----------------AddtoCart Data-------------------------//
      this.router.navigate(['/', this.user_slug, 'checkout'])
      //   let data = JSON.parse(localStorage.getItem("loggedInUser"))
      //   console.log(data)
      //   var formData = new FormData();
      //   formData.append('product_id', id);
      //   formData.append('subdomain', this.user_slug);
      //   //formData.append('brewery_id', '2');
      //   formData.append('amount', price);
      //   formData.append('product_count', count);
      //   formData.append('user_id', data.id);

      //   this.common.addCart(this.user_slug, formData).subscribe(
      //     res => {
      //       console.log('addToCart  > ', res);
      //       if (res['status'] == true) {
      //         this.featuredres = res['data'];
      //       } else if (res['status'] == false) {
      //         this.productres = res['data'];
      //         this.message = res['message'];
      //       }

      //       this.ngOnInit();
      //     }, err => {
      //       console.log("=======err=======>", err);
      //     }
      //   );
      // }
    }
  }
  // deleteCartById(cartId) {
  //   this.common.deleteCartById(cartId).subscribe(
  //     res => {
  //       if (res['status'] == true) {
  //         this.message = res['message'];
  //       } else if (res['status'] == false) {
  //         this.message = res['message'];
  //       }
  //       this.ngOnInit();
  //     }, err => {
  //       this.message = err['message'];
  //     }
  //   );
  // }

}
