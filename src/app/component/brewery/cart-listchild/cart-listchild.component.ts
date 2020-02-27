import { Component, OnInit, Input,Output ,EventEmitter} from '@angular/core';

@Component({
  selector: 'app-cart-listchild',
  templateUrl: './cart-listchild.component.html',
  styleUrls: ['./cart-listchild.component.css']
})
export class CartListchildComponent implements OnInit {

  @Input() productID:any
  @Input() cartId:any
  @Input() stock:any
  @Input() amount:any
  @Output() stockValueChange = new EventEmitter();
  updatestock:number=1
  constructor() { 
    
  }

  ngOnInit() {
    console.log(this.cartId)
  }

  increase()
  {
    this.stockValueChange.emit({id:this.productID,stock:this.stock,cartId:this.cartId,amount:this.amount});
  }
 
}
