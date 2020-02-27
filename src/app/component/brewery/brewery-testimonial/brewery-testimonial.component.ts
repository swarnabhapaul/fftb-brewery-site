import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../service/common.service';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute, UrlSegment } from '@angular/router';


@Component({
  selector: 'app-brewery-testimonial',
  templateUrl: './brewery-testimonial.component.html',
  styleUrls: ['./brewery-testimonial.component.css']
})
export class BreweryTestimonialComponent implements OnInit { 

  user_slug:any = this.route.snapshot.url[0].path; 
  testimonialres:any;
  message:any;

  constructor(private route: ActivatedRoute,private common: CommonService) { }

  ngOnInit() {
    this.getTestimonialListBySubdomain();
  }

  getTestimonialListBySubdomain() {

    this.common.getTestimonialListBySubdomain(this.user_slug).subscribe(
      res => {
        console.log('testimonial>>>>> ',res);
        if (res['status'] == true) {
          this.testimonialres = res['data'];
        }else if (res['status'] == false) {
          this.message = res['message'];
        }

      }, err => {
        console.log(err);
        this.message = err['message'];
      }
    );
  }
}
