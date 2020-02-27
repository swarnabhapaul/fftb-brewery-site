import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { CommonService } from '../../../service/common.service';

@Component({
  selector: 'app-process-details',
  templateUrl: './process-details.component.html',
  styleUrls: ['./process-details.component.css']
})
export class ProcessDetailsComponent implements OnInit {

  message: any;
  processData: any;
  user_slug:any;
  total_cart_amt:any;
  cartDetails:any;
  slug:any;

  constructor(private route: ActivatedRoute, private common: CommonService) { }

  ngOnInit() {
    this.user_slug = this.route.snapshot.url[0].path;
    this.slug = this.route.snapshot.paramMap.get('name');
    this.getProcessDetails();
  }

  getProcessDetails() {
    this.common.getProcessDetails(this.user_slug, this.slug).subscribe(
      res => {
        console.log('<>  ', res);
        if (res['status'] == true) {
          this.processData = res['data'][0];
        }
      }, err => {
        this.message = err['message'];
      }
    );
  }



}
