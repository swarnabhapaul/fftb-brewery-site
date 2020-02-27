import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { CommonService } from '../../../service/common.service';

@Component({
  selector: 'app-what-we-learned-so-far',
  templateUrl: './what-we-learned-so-far.component.html',
  styleUrls: ['./what-we-learned-so-far.component.css']
})
export class WhatWeLearnedSoFarComponent implements OnInit {

  message: any;
  bannerData: any;
  user_slug:any;
  slug:any;
  whatwelearnedsofarData:any;

  constructor(private route: ActivatedRoute, private common: CommonService) { }

  ngOnInit() {
    this.user_slug = this.route.snapshot.url[0].path
    this.slug = this.route.snapshot.paramMap.get('name')
    this.getBannerById()
    this.getOurProductDetails()
  }

  getBannerById() {
    this.common.getBannerDetailsBySubdomain(this.user_slug, 'our-story').subscribe(
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

  getOurProductDetails(){
    this.common.getWhatWeLearnedSoFarDetailsBySlug(this.user_slug, this.slug).subscribe(
      res => {
        console.log('<>  ', res);
        if (res['status'] == true) {
          this.whatwelearnedsofarData = res['data'][0];
        }
      }, err => {
        this.message = err['message'];
      }
    );
  }
}
