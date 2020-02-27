import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { CommonService } from '../../../service/common.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-brewery-blog-single',
  templateUrl: './brewery-blog-single.component.html',
  styleUrls: ['./brewery-blog-single.component.css']
})
export class BreweryBlogSingleComponent implements OnInit {

  user_slug:any;
  blog_slug:any;
  blogdetails:any;

  constructor(private route: ActivatedRoute, private common:CommonService) { }

  ngOnInit() {
    this.user_slug  = this.route.snapshot.url[0].path;
    this.blog_slug  = this.route.snapshot.url[2].path;
    console.log(this.blog_slug);
    this.getBlogDetailsBySubdomain();
  }

  getBlogDetailsBySubdomain(){
    this.common.getBlogDetailsBySubdomain(this.user_slug,this.blog_slug).subscribe(
      res =>{
        console.log("=======res=======>",res);
        if(res['status'] == true){
          this.blogdetails = res['data'][0];
        }
      }, err => {
        window.open('error/404', '_self');
      }
    );
  }

}
