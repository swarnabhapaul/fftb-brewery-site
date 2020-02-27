import { Injectable } from '@angular/core';
//import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  public backend_url: String = environment.url;
  url: any;
  headers: any = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private _http: HttpClient) { }

  getCardToken(): Observable<Object> {
    return this._http.get(this.backend_url + "process-to-pay-token");
  }

  /**
   * Method to get user exists
   * 
   * @param user_slug,page string
   * 
   * @return Observable
   */
  getUserExists(user_slug: string, page: string): Observable<Object> {
    this.url = this.backend_url + 'page-exists/' + user_slug + '/' + page;
    return this._http.get(this.url);
  }

  checkTokenExpierOrNot(token: string): Observable<Object> {
    this.url = this.backend_url + 'ckeck-token-status?token=' + token;
    return this._http.get(this.url);
  }

  register(data) {
    this.url = this.backend_url + 'users'
    return this._http.post(this.url, data, this.headers);
  }
  login(values: Object): Observable<Object> {
    this.url = this.backend_url + 'users/login';
    return this._http.post(this.url, values, this.headers);
  }
  getLoginUser(headData): Observable<Object> {

    this.url = this.backend_url + '/users';
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': headData });
    return this._http.get(this.url, { headers: headers });
  }
  /**
   * Method to get user exists
   * 
   * @param user_slug
   * @param isFeatured
   * @param sortType
   * @param rangeTo
   * @param rangeForm
   * 
   * @return Observable
   */
  getProductBySubdomain(user_slug: string, isFeatured: any, sortType: string, rangeTo: any, rangeForm: any, totalItems: any, page: any): Observable<Object> {
    this.url = this.backend_url + 'brewery-product2/' + user_slug + "/" + isFeatured + "/" + sortType + "/" + rangeTo + "/" + rangeForm + "/" + totalItems + "?page=" + page;
    return this._http.get(this.url);
  }

  /**
   * Method to get blog details
   * 
   * @param user_slug
   * 
   * @return Observable
   */
  getBlogBySubdomain(user_slug: string, totalItems: any, page: any): Observable<Object> {

    this.url = this.backend_url + 'brewery-blog/' + user_slug + "/" + totalItems + "?page=" + page;
    return this._http.get(this.url);
  }

  /**
   * Method to get blog details
   * 
   * @param user_slug
   * @param blog_slug
   * 
   * @return Observable
   */
  getBlogDetailsBySubdomain(user_slug: string, blog_slug: string): Observable<Object> {

    this.url = this.backend_url + user_slug + '/blog/' + blog_slug;
    return this._http.get(this.url);
  }

  /**
   * Method to get Testimonial details
   * 
   * @param user_slug
   * 
   * @return Observable
   */
  getTestimonialListBySubdomain(user_slug: string): Observable<Object> {

    this.url = this.backend_url + 'testimonial-list/' + user_slug;
    return this._http.get(this.url);
  }

  /**
   * Method to insert subscribe
   * 
   * @param values
   * 
   * @return Observable
   */
  addSubscribe(user_slug: string, values: Object) {
    return this._http.post(this.backend_url + 'create-subscribe/' + user_slug, values, this.headers);
  }


  // updateProductStatus (productId:number, status:boolean) {
  //   return this.http.put (this.BACKEND_URL + '/brewery/products/'+productId+'/status', JSON.stringify ({status:status}), this.jwt()).map((response: Response) => response.json());
  // }

  // deleteBrewery (password:string) {
  //   return this.http.delete (this.BACKEND_URL + '/brewery', this.jwt({password:password})).map((response: Response) => response.json());
  // }


  /**
 * Method to add product in cart
 * 
 * @param values
 * 
 * @return Observable
 */
  addCart(user_slug: string, values: Object) {
    return this._http.post(this.backend_url + 'cart-add/' + user_slug, values, this.headers);
  }

  addCartBulk(user_slug: string, user_id: string, product_array) {
    return this._http.post(this.backend_url + 'add-bulk-item-to-cart/' + user_slug, { user_id, product_array }, this.headers);
  }

  updateCart(cartid, value) {
    return this._http.post(this.backend_url + 'update_cart_item_by_id/' + cartid, value, this.headers);
  }

  /**
* Method to get cart details
* 
* @param values
* 
* @return Observable
*/
  getCartDetails(subdomain: string, user_id: string): Observable<Object> {
    this.url = this.backend_url + 'cart-list/' + subdomain + '/' + user_id;
    return this._http.get(this.url);
  }

  addcartPageWise(subdomain, pageflag): Observable<Object> {
    this.url = this.backend_url + 'pagewise-product/' + subdomain + '/' + pageflag;
    return this._http.get(this.url);
  }

  /**
* Method to get cart details
* 
* @param values
* 
* @return Observable
*/
  deleteCartById(cartId: string): Observable<Object> {
    this.url = this.backend_url + '/delete_cart_item/' + cartId;
    return this._http.get(this.url);
  }


  /**
* Method to get banner details
* 
* @param subdomain
* @param type
* 
* @return Observable
*/
  getBannerDetailsBySubdomain(subdomain: string, type: string): Observable<Object> {
    this.url = this.backend_url + '/banner/' + subdomain + '/' + type;
    return this._http.get(this.url);
  }


  /**
* Method to get team details
* 
* @param subdomain
* 
* @return Observable
*/
  getOurTeamDetailsBySubdomain(subdomain: string): Observable<Object> {
    this.url = this.backend_url + '/our-team/' + subdomain;
    return this._http.get(this.url);
  }

  /**
* Method to get process details
* 
* @param subdomain
* @param pageType
* 
* @return Observable
*/
  getProcessDetailsBySubdomain(subdomain: string, pageType: number): Observable<Object> {
    this.url = this.backend_url + '/process/' + subdomain + '/' + pageType;
    return this._http.get(this.url);
  }


  /**
* Method to get process details
* 
* @param subdomain
* @param pageType
* 
* @return Observable
*/
  getOurStoryUnderBannerDetailsBySubdomain(subdomain: string): Observable<Object> {
    this.url = this.backend_url + '/ourstory/' + subdomain;
    return this._http.get(this.url);
  }


  /**
   * Method to add form in contact page
   * 
   * @param values
   * 
   * @return Observable
   */
  addContact(user_slug: string, values: Object) {
    return this._http.post(this.backend_url + 'create-contact/' + user_slug, values, this.headers);
  }


  /**
  * Method to get contact details
  * 
  * @param subdomain
  * 
  * @return Observable
  */
  getContactDetailsBySubdomain(subdomain: string): Observable<Object> {
    this.url = this.backend_url + '/contact-cms/' + subdomain;
    return this._http.get(this.url);
  }

  /**
  * Method to get process details
  * 
  * @param subdomain
  * @param pageType
  * 
  * @return Observable
  */
  getAboutDetailsBySubdomain(subdomain: string, section: number): Observable<Object> {
    this.url = this.backend_url + '/about-cms/' + subdomain + '/' + section;
    return this._http.get(this.url);
  }


  /**
  * Method to get passion details
  * 
  * @param subdomain
  * 
  * @return Observable
  */
  getOurPassionDetails(subdomain: string): Observable<Object> {
    this.url = this.backend_url + 'our-passion-list/' + subdomain;
    return this._http.get(this.url);
  }


  /**
 * Method to get process details
 * 
 * @param subdomain
 * @param slug
 * 
 * @return Observable
 */
  getProcessDetails(subdomain: string, slug: string): Observable<Object> {
    this.url = this.backend_url + 'process-detail/' + subdomain + '/' + slug;
    return this._http.get(this.url);
  }

  /**
 * Method to get ourstory details
 * 
 * @param subdomain
 * @param slug
 * 
 * @return Observable
 */
  getOurStoryDetails(subdomain: string, slug: string): Observable<Object> {
    this.url = this.backend_url + 'ourstory-detail/' + subdomain + '/' + slug;
    return this._http.get(this.url);
  }

  /**
* Method to get our product details
* 
* @param subdomain
* @param slug
* 
* @return Observable
*/
  getOurProductDetails(subdomain: string, slug: string): Observable<Object> {
    this.url = this.backend_url + 'single-product/' + subdomain + '/' + slug;
    return this._http.get(this.url);
  }


  /**
* Method to get What we learned so far
* 
* @param subdomain
* 
* @return Observable
*/
  getWhatWeLearnedSoFarDetails(subdomain: string): Observable<Object> {
    this.url = this.backend_url + 'what-we-learned-list/' + subdomain;
    return this._http.get(this.url);
  }

  /**
* Method to get What we learned so far by slug
* 
* @param subdomain
* @param slug
* 
* @return Observable
*/
  getWhatWeLearnedSoFarDetailsBySlug(subdomain: string, slug: string): Observable<Object> {
    this.url = this.backend_url + 'what-we-learned-detail/' + subdomain + '/' + slug;
    return this._http.get(this.url);
  }

  /**
 * Method to brewery registration
 * 
 * @param values
 * 
 * @return Observable
 */
  breweryregister(values: Object) {
    return this._http.post(this.backend_url + 'users/brewery', values, this.headers);
  }
  /**
* Method to get Home third section details
* 
* @param subdomain
* 
* @return Observable
*/
  getHomeThirdSectionBySubdomain(subdomain: string): Observable<Object> {
    this.url = this.backend_url + '/home-cms-list/' + subdomain;
    return this._http.get(this.url);
  }


  /**
  * Method to insert checkout
  * 
  * @param values
  * 
  * @return Observable
  */
  addCheckout(values: Object) {
    return this._http.post(this.backend_url + 'checkout', values, this.headers);
  }

  /**
* Method to check Product Added Or Not
* 
* @param userId
* @param productId
*
* @return Observable
*/
  checkProductAddedOrNot(userId: number, productId: number): Observable<Object> {
    this.url = this.backend_url + 'product-exist-check/' + userId + '/' + productId;
    return this._http.get(this.url);
  }



  /**
   * Method to get cart count by id
   * 
   * @param user_id
   * 
   * @return Observable
   */
  getCartCountById(user_id: number): Observable<Object> {

    this.url = this.backend_url + 'user-cart-check/' + user_id;
    return this._http.get(this.url);
  }

}
