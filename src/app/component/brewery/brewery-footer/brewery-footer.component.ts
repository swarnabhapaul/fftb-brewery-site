import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, UrlSegment, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder } from '@angular/forms';
import { CommonService } from '../../../service/common.service';
import { environment } from '../../../../environments/environment';
import { NgFlashMessageService } from 'ng-flash-messages';

@Component({
  selector: 'app-brewery-footer',
  templateUrl: './brewery-footer.component.html',
  styleUrls: ['./brewery-footer.component.css']
})
export class BreweryFooterComponent implements OnInit {
  user_slug: any = ''
  newsletterForm
  message
  flag:any
  contactPage:any = ''
  loginmessage:any
  cartDetails: any = ''
  show:any
  profileName:any

  constructor(
    private ngFlashMessageService: NgFlashMessageService, 
    private route: ActivatedRoute, 
    private common: CommonService,
    private fb: FormBuilder,
    private router: Router) { 
      
    }

  ngOnInit() {
    this.user_slug  = this.route.snapshot.url[0].path;
    this.getContactPage();
    this.newsletterForm =  this.fb.group({
      subscribe_email: ['']
    });
    if (localStorage.getItem('loggedInUser')) {
			this.show = true
			this.profileName = JSON.parse(localStorage.getItem('loggedInUser')).profile.firstName
			//this.cartListByUserId(this.localdata.id)
		}
  }

  register()
  {
    console.log("register")
  }

  onSubmit() {
    let formData  = new FormData();
    formData.append('subscribe_email', this.newsletterForm.value.subscribe_email);
    this.common.addSubscribe(this.user_slug,formData).subscribe(
      res => {
        if (res['status'] == true) {
          this.message = res['message'];
          this.flag = 'success';
        }else if (res['status'] == false) {
          this.message = res['message'];
          this.flag = 'danger';
        }
        this.ngFlashMessageService.showFlashMessage({
          messages: [this.message], 
          // Whether the flash can be dismissed by the user defaults to false
          dismissible: true, 
          // Time after which the flash disappears defaults to 2000ms
          timeout: 2000,
          // Type of flash message, it defaults to info and success, warning, danger types can also be used
          type: this.flag
        });
      }, err => {
        console.log(err);
      }
    );
  }

  getContactPage() {
    this.common.getContactDetailsBySubdomain(this.user_slug).subscribe(
      res => {
        if (res['status'] == true) {
          this.contactPage = res['data'][0];
        }
      }, err => {
        this.message = err['message'];
      }
    );
  }


  login() {
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
                  //this.common.addCartBulk(this.user_slug, res["data"].id, JSON.stringify(this.cartDetails)).subscribe(response => {
                  //   this.ngOnInit()
                  //},
                  // error => {
                  //   console.log('error but redirect',error);
                  //   this.ngOnInit()
                  // })
                  this.ngOnInit()
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
      this.ngOnInit()
    }
  }

}
