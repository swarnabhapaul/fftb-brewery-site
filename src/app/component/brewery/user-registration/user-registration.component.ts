import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../service/common.service';
import { ActivatedRoute, UrlSegment } from '@angular/router';


@Component({
  selector: 'app-bewery-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})


export class UserRegistrationComponent implements OnInit {


  user_slug
  bannerData
  message
  constructor(private route: ActivatedRoute, private common: CommonService) { }

  ngOnInit() {
    this.user_slug = this.route.snapshot.url[0].path;

    this.getBannerById()
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

  submitValue(data) {

   
    let obj=data
    const val={
      ...obj,
      address:{
        // postCode,premisis,city
      }
    }
    console.log(val)
    this.common.register(val).subscribe(res => {

      console.log(res)
      alert(res["message"])

    },
      err => {
        console.log(err)
      }
    )
  }
}
