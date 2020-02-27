import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ng5SliderModule } from 'ng5-slider';
import { RouterModule, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgFlashMessagesModule } from 'ng-flash-messages';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './component/main/home/home.component';

import { BreweryHomeComponent } from './component/brewery/brewery-home/brewery-home.component';
import { BreweryAboutUsComponent } from './component/brewery/brewery-about-us/brewery-about-us.component';
import { BreweryBlogComponent } from './component/brewery/brewery-blog/brewery-blog.component';
import { BreweryContactUsComponent } from './component/brewery/brewery-contact-us/brewery-contact-us.component';
import { BreweryOurStoryComponent } from './component/brewery/brewery-our-story/brewery-our-story.component';
import { BreweryShopComponent } from './component/brewery/brewery-shop/brewery-shop.component';
import { BreweryHeaderComponent } from './component/brewery/brewery-header/brewery-header.component';
import { BreweryFooterComponent } from './component/brewery/brewery-footer/brewery-footer.component';
import { NotFoundComponent } from './component/common/not-found/not-found.component';
import { UserNotFoundComponent } from './component/common/user-not-found/user-not-found.component';
import { AboutUsComponent } from './component/main/about-us/about-us.component';
import { BreweryBlogSingleComponent } from './component/brewery/brewery-blog-single/brewery-blog-single.component';
import { BreweryCheckoutComponent } from './component/brewery/brewery-checkout/brewery-checkout.component';
import { ContactUsComponent } from './component/main/contact-us/contact-us.component';
import { BreweryTestimonialComponent } from './component/brewery/brewery-testimonial/brewery-testimonial.component';
import { ProductDetailsComponent } from './component/brewery/product-details/product-details.component';
import { CartDetailsComponent } from './component/brewery/cart-details/cart-details.component';
import { ProcessDetailsComponent } from './component/brewery/process-details/process-details.component';
import { OurstoryDetailsComponent } from './component/brewery/ourstory-details/ourstory-details.component';
import { WhatWeLearnedSoFarComponent } from './component/brewery/what-we-learned-so-far/what-we-learned-so-far.component';
import { UserRegistrationComponent } from './component/brewery/user-registration/user-registration.component';
import { CartListchildComponent } from './component/brewery/cart-listchild/cart-listchild.component';
import { BreweryRegistrationComponent } from './component/main/brewery-registration/brewery-registration.component';
import { ProceedtopayComponent } from './component/brewery/proceedtopay/proceedtopay.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BreweryHomeComponent,
    BreweryAboutUsComponent,
    BreweryBlogComponent,
    BreweryContactUsComponent,
    BreweryOurStoryComponent,
    BreweryShopComponent,
    BreweryHeaderComponent,
    BreweryFooterComponent,
    NotFoundComponent,
    UserNotFoundComponent,
    AboutUsComponent,
    BreweryBlogSingleComponent,
    BreweryCheckoutComponent,
    ContactUsComponent,
    BreweryTestimonialComponent,
    ProductDetailsComponent,
    CartDetailsComponent,
    ProcessDetailsComponent,
    OurstoryDetailsComponent,
    WhatWeLearnedSoFarComponent,
    BreweryRegistrationComponent,
    UserRegistrationComponent,
    CartListchildComponent,
    ProceedtopayComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    Ng5SliderModule,
    NgFlashMessagesModule,
    RouterModule.forRoot([
      {
        path: 'error/404',
        component: NotFoundComponent
      }, {
        path: 'error/user-not-found',
        component: NotFoundComponent
      }, {
        path: 'about-us',
        component: AboutUsComponent
      }, {
        path: 'contact-us',
        component: ContactUsComponent
      },
      {
        path: 'brewery-registration',
        component: BreweryRegistrationComponent
      },
      {
        path: ':name',
        component: BreweryHomeComponent
      },
      {
        path: ':name/about-us',
        component: BreweryAboutUsComponent
      },
      {
        path: ':name/blog',
        component: BreweryBlogComponent
      },
      {
        path: ':name/blog/:name',
        component: BreweryBlogSingleComponent
      },
      {
        path: ':name/our-story',
        component: BreweryOurStoryComponent
      },
      {
        path: ':name/product-details/:name',
        component: ProductDetailsComponent
      },
      {
        path: ':name/process-details/:name',
        component: ProcessDetailsComponent
      },
      {
        path: ':name/ourstory-details/:name',
        component: OurstoryDetailsComponent
      },
      {
        path: ':name/what-we-learned-so-far/:name',
        component: WhatWeLearnedSoFarComponent
      },
      {
        path: ':name/shop',
        component: BreweryShopComponent
      },
      {
        path: ':name/cart-details',
        component: CartDetailsComponent
      },
      {
        path: ':name/checkout',
        component: BreweryCheckoutComponent
      },
      {
        path: ':name/contact-us',
        component: BreweryContactUsComponent
      },
      {
        path: ':name/register',
        component: UserRegistrationComponent
      },
      {
        path: ':name/proceedtopay',
        component: ProceedtopayComponent
      },

      {
        path: '',//**
        component: HomeComponent
      }
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
