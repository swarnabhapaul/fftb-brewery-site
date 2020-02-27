import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { CommonService } from '../../../service/common.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-brewery-registration',
  templateUrl: './brewery-registration.component.html',
  styleUrls: ['./brewery-registration.component.css']
})
export class BreweryRegistrationComponent implements OnInit {

  
  user_slug:any;
  bannerData:any;
  message:any;
  status:any;
  loader:number=0
  constructor(private route: ActivatedRoute, private common: CommonService) { }

  ngOnInit() {
    this.user_slug = this.route.snapshot.url[0].path;
  }
  submitValue(data) {

    this.loader=1
    console.log(data)
    const val={
      "email": data.email,
      "name":data.breweryname,
      "password": (data.password)!=undefined? data.password:"",
      "contactperson":data.contactperson
      // "name": name,
      // "company": data.company,
      // "vat": data.vat,
      // "address": {
      //   "premisis": data.premisis,
      //   "postCode": data.postCode,
      //   "city": data.city
      // },
      // "description": data.description,
      // "remember": true
    }
    console.log(val)
    this.common.breweryregister(val).subscribe(res => {

      console.log(res)
      
      //alert(res["message"])
      if (res['status'] == true) {
        this.loader=0
        this.status = "success"
      } else if (res['status'] == false) {
        this.loader=0
        this.status = "error"
      }
      this.message = res["message"]

      alert(this.message);

      // Swal.fire({
      //   //position: 'top-end',
      //   icon: this.status,
      //   title:this.message,
      //   showConfirmButton: false,
      //   timer: 1500
      // });

    },
      err => {
        console.log(err)
      }
    )
  }

}
