import { Component, OnInit ,ViewChild} from '@angular/core';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { CommonService } from '../../../service/common.service';
import { environment } from '../../../../environments/environment';
import Swal from 'sweetalert2';
import { DomSanitizer } from '@angular/platform-browser';

declare let $: any;

@Component({
  selector: 'app-brewery-contact-us',
  templateUrl: './brewery-contact-us.component.html',
  styleUrls: ['./brewery-contact-us.component.css']
})



export class BreweryContactUsComponent implements OnInit {

  user_slug: any;
  message: any;
  bannerData: any = '';
  formData:any = '';
  templatedriven:any;
  contactPage:any = '';
  iframe:string;

  constructor(private route: ActivatedRoute, private common: CommonService, public sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.user_slug = this.route.snapshot.url[0].path;
    this.getBannerById();
    this.getContactPage();
  }

  getBannerById() {
    this.common.getBannerDetailsBySubdomain(this.user_slug, 'contact-us').subscribe(
      res => {
        //console.log('<>  ', res);
        if (res['status'] == true) {
          this.bannerData = res['data'];
        }
      }, err => {
        this.message = err['message'];
      }
    );
  }

  getContactPage() {
    this.common.getContactDetailsBySubdomain(this.user_slug).subscribe(
      res => {
        console.log('>>>>>>>>>>>', res);
        if (res['status'] == true) {
          this.contactPage = res['data'][0];
        }
      }, err => {
        this.message = err['message'];
      }
    );
  }

  onClickSubmit(data) {

    let formData  = new FormData();
    formData.append('name', data.your_name);
    formData.append('email',data.your_email);
    formData.append('subject',data.subject);
    formData.append('message',data.message);
    this.common.addContact(this.user_slug, formData).subscribe(
      res => {
        console.log('<form>  ', res);
        if (res['status'] == true) {
          this.formData = res['data'];
          Swal.fire({
            //position: 'top-end',
            icon: 'success',
            title:'Thank you for contact with us.',
            showConfirmButton: false,
            timer: 1500
          });
          $('#your_name').val();
          $('#your_email').val();
          $('#subject').val();
          $('#message').val();
        }
      }, err => {
        this.message = err['message'];
      }
    );
    
  }

}
