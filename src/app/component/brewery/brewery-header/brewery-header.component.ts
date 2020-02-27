import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { CommonService } from '../../../service/common.service';
//import * as Rx from "rxjs";
import { DomSanitizer } from '@angular/platform-browser';
import { AddtoCartBehaviourService } from "../../../addto-cart-behaviour.service";
import { BehaviorSubject, Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-brewery-header',
	templateUrl: './brewery-header.component.html',
	styleUrls: ['./brewery-header.component.css']
})
export class BreweryHeaderComponent implements OnInit {
	user_slug: any
	page: any = "home"
	result: any
	contactDetails: any = ""
	show: boolean = false
	cartcount: any
	user_id: number
	admin_review_status: any
	token: any
	websitetype: string
	localdata: any = JSON.parse(localStorage.getItem("loggedInUser"))

	cartDetails
	message
	profileName

	constructor(
		private route: ActivatedRoute,
		private common: CommonService,
		public sanitizer: DomSanitizer,
		private cartBehaviour: AddtoCartBehaviourService,
	) { }

	ngOnInit() {

		this.checkcartstatus()
		this.user_slug = this.route.snapshot.url[0].path;
		if (this.route.snapshot.url.length == 1) {
			this.page = "home";
		} else if (this.route.snapshot.url.length > 1) {
			this.page = this.route.snapshot.url[1].path;
		}
		if (this.page !== "error") {
			this.getPageExists(this.page);
		}
		this.getContactPage();

		if (localStorage.getItem('loggedInUser')) {
			this.show = true
			this.profileName = JSON.parse(localStorage.getItem('loggedInUser')).profile.firstName
			//this.cartListByUserId(this.localdata.id)
		}

		this.route.queryParams.subscribe(params => {
			this.token = params.token
			if (this.token) {
				localStorage.setItem('token', this.token)
			}
		})

	}

	logout(){
		if (localStorage.getItem('loggedInUser')) {
			localStorage.removeItem('loggedInUser')
			localStorage.removeItem('addedProductId')
			localStorage.removeItem('total')
			this.show = false
			this.ngOnInit()
		}
	}

	// cartListByUserId(userId) {
	// 	var newAddedIds: any = [];
	// 	this.common.getCartDetails(this.user_slug, userId).subscribe(
	// 		res => {
	// 			if (res['status'] == true) {
	// 				this.cartDetails = res['data'];
	// 				this.cartDetails.forEach(element => {
	// 					newAddedIds.push(element['product_id']);
	// 				});
	// 				localStorage.setItem("addedProductId", newAddedIds);
	// 			}
	// 		}, err => {
	// 			console.log("=======err=======>", err);
	// 			//this.message = err['message'];
	// 		}
	// 	);
	// }

	checkcartstatus() {
		if (!localStorage.getItem('loggedInUser')) {
			this.cartBehaviour.countCardIds().subscribe((element) => {
				this.cartcount = element
			})
		} else {
			this.common.getCartCountById(this.localdata.id).subscribe(
				res => {
					if (res['status'] == true) {
						this.cartcount = res['data']
					}
				}, err => {
					console.log("=======err=======>", err);
				}
			);
		}
	}

	getPageExists(page) {

		this.common.getUserExists(this.user_slug, page).subscribe(
			res => {
				console.log(res)

				console.log("<=========", res['message'], "===============>");
				if (res['status'] == false) {
					if (this.page != "checkout") {
						window.open('/', '_self');
					}
				} else if (res['status'] == true) {
					this.websitetype = res['website_type']

					if (this.websitetype == "0") {
						window.open('/', '_self');
					}
					this.admin_review_status = res['admin_review_status']
					if ((this.admin_review_status == 0)) {
						var getToken = localStorage.getItem('token')
						console.log(getToken)

						if (getToken == null) {
							window.open('/', '_self');
						}
						this.common.checkTokenExpierOrNot(getToken).subscribe(res => {
							if (res['status'] == true) {
								if (res['token_status'] === 1) {
									console.log("<==============", res['message'], "============>");
								}
							} else if (res['status'] == false) {
								Swal.fire({
									icon: 'error',
									title: 'Oops! Session out',
									showConfirmButton: false,
									allowOutsideClick: false
								});
							}
						}, err => {
							// window.location.href = 'error/404', '_self';
							console.log(err)
						})
					}
				}

			}, err => {
				console.log("=======err=======>", err);
				// window.open('error/404', '_self');
			}
		);

	}

	getContactPage() {
		this.common.getContactDetailsBySubdomain(this.user_slug).subscribe(
			res => {
				if (res['status'] == true) {
					this.contactDetails = res['data'][0];
				}
			}, err => {
				console.log(err);
			}
		);
	}


}
