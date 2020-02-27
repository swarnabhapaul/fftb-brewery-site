import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { CommonService } from '../../../service/common.service';

@Component({
  selector: 'app-ourstory-details',
  templateUrl: './ourstory-details.component.html',
  styleUrls: ['./ourstory-details.component.css']
})
export class OurstoryDetailsComponent implements OnInit {

  message: any;
  ourstoryData: any;
  user_slug:any;
  total_cart_amt:any;
  cartDetails:any;
  slug:any;

  constructor(private route: ActivatedRoute, private common: CommonService) { }

  ngOnInit() {
    this.user_slug = this.route.snapshot.url[0].path;
    this.slug = this.route.snapshot.paramMap.get('name');
    this.getOurStoryDetails();
  }

  getOurStoryDetails() {
    this.common.getOurStoryDetails(this.user_slug, this.slug).subscribe(
      res => {
        console.log('<>  ', res);
        if (res['status'] == true) {
          this.ourstoryData = res['data'][0];
        }
      }, err => {
        this.message = err['message'];
      }
    );
  }

}
