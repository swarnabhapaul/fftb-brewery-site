import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { CommonService } from '../../../service/common.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-brewery-our-story',
  templateUrl: './brewery-our-story.component.html',
  styleUrls: ['./brewery-our-story.component.css']
})
export class BreweryOurStoryComponent implements OnInit {

  user_slug:any;
  message: any;
  bannerData: any = '';
  processData:any = '';
  underBannerData:any = '';
  whatWeLearnedSoFarData:any = "";

  constructor(private route: ActivatedRoute, private common: CommonService) { }

  ngOnInit() {
    this.user_slug  = this.route.snapshot.url[0].path;
    this.getBannerById();
    this.getProcessDetails();
    this.getUnderBannerDetails();
    this.getWhatWeLearnedSoFarDetails();
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

  getUnderBannerDetails() {
    this.common.getOurStoryUnderBannerDetailsBySubdomain('4').subscribe(
      underBannerres => {
        //console.log('<<<underBannerres>>>  ', underBannerres);
        if (underBannerres['status'] == true) {
          this.underBannerData = underBannerres['data'];
        }
      }, err => {
        this.message = err['message'];
      }
    );
  }

  getProcessDetails() {
    this.common.getProcessDetailsBySubdomain(this.user_slug,2).subscribe(
      processres => {
        //console.log('<<<processres>>>  ', processres);
        if (processres['status'] == true) {
          this.processData = processres['data'];
        }
      }, err => {
        this.message = err['message'];
      }
    );
  }

  getWhatWeLearnedSoFarDetails(){
    this.common.getWhatWeLearnedSoFarDetails(this.user_slug).subscribe(
      whatWeLearnedSoFarres => {
        console.log('<<<whatWeLearnedSoFarres>>>  ', whatWeLearnedSoFarres);
        if (whatWeLearnedSoFarres['status'] == true) {
          this.whatWeLearnedSoFarData = whatWeLearnedSoFarres['data'];
        }
      }, err => {
        this.message = err['message'];
      }
    );
  }

}
