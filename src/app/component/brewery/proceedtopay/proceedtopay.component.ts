import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { CommonService } from '../../../service/common.service';
import { environment } from '../../../../environments/environment';
import Swal from 'sweetalert2';
import * as braintree from 'braintree-web';


// import { CreditCardValidator } from 'angular-cc-library';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-proceedtopay',
  templateUrl: './proceedtopay.component.html',
  styleUrls: ['./proceedtopay.component.css']
})
export class ProceedtopayComponent implements OnInit {

  user_slug: any
  message: any
  bannerData: any = ''
  proceedTopay: any
  expirationDate: any
  form: FormGroup
  loggedInUser: any
  initialdata: any = {
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    price: ''
  }
  chekout_token: any
  loggedInUserId:any
  cardyearlist:any = []

  constructor(
    private route: ActivatedRoute,
    private common: CommonService,
    private _fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    this.loggedInUserId = this.loggedInUser.id
    console.log(this.loggedInUserId)
    this.initialdata.firstName = this.loggedInUser.profile.firstName
    this.initialdata.lastName = this.loggedInUser.profile.lastName
    this.initialdata.phone = this.loggedInUser.profile.phone
    this.initialdata.email = this.loggedInUser.email
    // ---------------------
    this.initialdata.address = this.loggedInUser.address
    this.initialdata.price = localStorage.getItem('total')
    this.user_slug = this.route.snapshot.url[0].path;
    this.getBannerById();

    
    this.getYearList();

  }

  getYearList(){
    var d = new Date();
    var year = d.getFullYear();
    for(var i = 1; i<11 ; i++){
      var newyear = year +i
      this.cardyearlist.push(newyear)
    }
  }

  getBannerById() {
    this.common.getBannerDetailsBySubdomain(this.user_slug, 'shop').subscribe(
      res => {
        console.log('<banner>  ', res);
        if (res['status'] == true) {
          this.bannerData = res['data'];
        }
      }, err => {
        this.message = err['message'];
      }
    );
  }

  insertformData(data) {
    let formData = new FormData();
    formData.append('firstName', data.firstName)
    formData.append('lastName', data.lastName)
    formData.append('email', data.email)
    formData.append('phone', data.phone)
    formData.append('amount', data.amount)
    formData.append('company', 'FFTB')
    formData.append('premisis', data.premisis)
    formData.append('city', data.city)
    formData.append('postCode', data.postCode)
    formData.append('user_Id', this.loggedInUserId )
    this.common.addCheckout(formData).subscribe(
      res => {
        console.log('<checkout>  ', res);
        this.proceedTopay = res['data'];
        if(res['status'] == true){
          Swal.fire({
          icon: 'success',
          title: 'Thank you for payment, your transaction id is '+ res["transaction_id"],
          showConfirmButton: false,
          //timer: 5000
        });
        }else{
          Swal.fire({
            icon: 'error',
            title: res['message'],
            showConfirmButton: false,
            timer: 5000
          });
        }
        
      }, err => {
        Swal.fire({
          icon: 'error',
          title: 'Opps, Somthing wrong , your payment is not successfully done.',
          showConfirmButton: false,
          timer: 5000
        });
      }
    );
  }


  // onClickSubmit(postData){
  //   var createClient = require('braintree-web/client').create;
  //   createClient({
  //     authorization: "sandbox_g42y39zw_348pk9cgf3bgyw2b"
  //   }, function (createErr, clientInstance) {
  //     var form = document.getElementById('my-form-id');
  //     var data = {
  //       clientdetails:{
  //         firstName: postData.firstName,
  //         lastName: postData.lastName,
  //         email: postData.email,
  //         phone: postData.phone,

  //       },
  //       amount: postData.amount,
  //       creditCard: {
  //         number: postData.cardNo,
  //         cvv: postData.cvv,
  //         expirationDate: postData.cc_exp_mo+'/'+postData.cc_exp_yr,
  //         // billingAddress: {
  //         //   postalCode: postData.cardNo,
  //         // },
  //         options: {
  //           validate: true
  //         }
  //       }
  //     };
  //     console.log('data>>>>>>>>>>',data)
  //     // Warning: For a merchant to be eligible for the easiest level of PCI compliance (SAQ A),
  //     // payment fields cannot be hosted on your checkout page.
  //     // For an alternative to the following, use Hosted Fields.
  //     clientInstance.request({
  //       endpoint: 'payment_methods/credit_cards',
  //       method: 'post',
  //       data: data
  //     }, function (requestErr, response) {
  //       // More detailed example of handling API errors: https://codepen.io/braintree/pen/MbwjdM
  //       if (requestErr) { throw new Error(requestErr); }
  //       console.log('response>>>>>>>>>>',response)
  //       console.log('Got nonce:', response.creditCards[0].nonce);
  //     });
  //   });
  // }


  // onClickSubmit(data) {


  //   this.common.getCardToken().subscribe(
  //     res => {
  //       this.chekout_token = res['chekout_token']
  //       if (res['status'] == true) {

  //         braintree.client.create({
  //           authorization: res['chekout_token'],
  //         }).then(function (instance) {
  //           var datax = {
  //             creditCard: {
  //               number: data.cardNo,
  //               cvv: data.cvv,
  //               expirationDate: data.cc_exp_mo + '/' + data.cc_exp_yr,
  //               billingAddress: {
  //                 postalCode: data.postCode
  //               },
  //               options: {
  //                 validate: false
  //               }
  //             }
  //           };
  //           instance.request({
  //             endpoint: 'payment_methods/credit_cards',
  //             method: 'post',
  //             data: datax
  //           }, function (requestErr, response) {
  //             // More detailed example of handling API errors: https://codepen.io/braintree/pen/MbwjdM
  //             if (requestErr) { throw new Error(requestErr); }
  //             console.log('Got nonce:', response['creditCards']);
  //             // ================================= Next api fire =================

  //             //if (response['creditCards']) {
  //             let formData = new FormData();
  //             formData.append('firstName', data.firstName)
  //             formData.append('lastName', data.lastName)
  //             formData.append('email', data.email)
  //             formData.append('phone', data.phone)
  //             formData.append('amount', data.amount)
  //             formData.append('company', '')
  //             formData.append('premisis', data.premisis)
  //             formData.append('city', data.city)
  //             formData.append('postCode', data.postCode)
  //             formData.append('cardResponce', response)
  //             this.insertformData(formData)

  //             //}


  //             // =================================
  //           });
  //         });
  //       }
  //     }, err => {
  //       this.message = err['message'];
  //     }
  //   );

  //   // this.expirationDate = data.cc_exp_mo +'/'+ data.cc_exp_yr
  //   // //console.log('=======================',data)
  //   // let formData = new FormData();
  //   // formData.append('firstName', data.firstName)
  //   // formData.append('lastName', data.lastName)
  //   // formData.append('email', data.email)
  //   // formData.append('phone', data.phone)
  //   // formData.append('amount', data.amount)
  //   // formData.append('company', '')
  //   // console.log(formData)

  //   // this.common.addCheckout(formData).subscribe(
  //   //    res => {
  //   //      console.log('<checkout>  ', res);
  //   //      //if (res['status'] == true) {
  //   //        this.proceedTopay = res['data'];
  //   //        Swal.fire({
  //   //          //position: 'top-end',
  //   //          icon: 'success',
  //   //          title: 'Thank you for buying , Your payment successfully done.',
  //   //          showConfirmButton: false,
  //   //          timer: 5000
  //   //        });
  //   //      //}
  //   //    }, err => {
  //   //      //this.message = err['message'];
  //   //      Swal.fire({
  //   //        //position: 'top-end',
  //   //        icon: 'error',
  //   //        title: 'Opps, Somthing wrong , your payment is not successfully done.',
  //   //        showConfirmButton: false,
  //   //        timer: 5000
  //   //      });
  //   //    }
  //   // );

  // }



}