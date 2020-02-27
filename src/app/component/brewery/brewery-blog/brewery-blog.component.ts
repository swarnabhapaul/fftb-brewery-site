import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { CommonService } from '../../../service/common.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-brewery-blog',
  templateUrl: './brewery-blog.component.html',
  styleUrls: ['./brewery-blog.component.css']
})
export class BreweryBlogComponent implements OnInit {

  user_slug: any;
  blogres: any =''
  blogcount: any;
  url: any = environment.url;
  current_page: any;
  totalItem: any = 4;
  page: any = 1;
  message: any;
  bannerData: any = '';

  constructor(private route: ActivatedRoute, private common: CommonService) { }

  ngOnInit() {
    this.user_slug = this.route.snapshot.url[0].path;
    this.getBlogBySubdomain(this.user_slug, this.totalItem, this.page);
    this.getBannerById();
  }

  getBlogBySubdomain(user_slug, totalItem, page) {

    this.user_slug = user_slug;
    this.totalItem = totalItem;
    this.page = page;

    this.common.getBlogBySubdomain(this.user_slug, this.totalItem, this.page).subscribe(
      res => {
        if (res['status'] == true) {
          this.blogres = res['data'];
          this.blogcount = res['count'];
          this.current_page = res['current_page'];
        } else if (res['status'] == false) {
          //this.blogres = res['data'];
          //this.message = res['message'];
          this.page = '1';
          this.ngOnInit();
        }
      }, err => {
        //window.open('error/404', '_self');
      }
    );
  }

  preNextButton() {
    if (this.page < 1) {
      this.page = '1';
    } else {
      this.page = parseInt(this.page) + 1;
    }
    this.getBlogBySubdomain(this.user_slug, this.totalItem, this.page);

  }

  getBannerById() {
    this.common.getBannerDetailsBySubdomain(this.user_slug, 'blog').subscribe(
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

}
