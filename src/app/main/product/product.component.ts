import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductDetailsComponent } from "../product-details/product-details.component";
import { ServicesService } from '../service/main.service';
import { ActivatedRoute } from '@angular/router';
import { RegisterationService } from '../../services/registeration.service';
import { StarRatingComponent } from "../../shared/star-rating/star-rating.component";

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [FormsModule, CommonModule, NgbToastModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  @Input() data: any = {};
  @Output() sendToCart = new EventEmitter();
  islogging : boolean =false

  showToast: boolean = false;
  toastMessage: string = '';
  product: any = {}; // Store the selected product

  constructor(private serveprd: ServicesService,
     private modalService: NgbModal,
    private route: ActivatedRoute,
  private _logging :RegisterationService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!isNaN(id) && id > 0) {
      this.serveprd.getSingleProduct(id).subscribe(
        (prd) => {
          console.log("Product Data:", prd); // Debugging
          if (prd) {
            this.product = prd;
          } else {
            console.error('Product not found.');
          }
        },
        (error) => {
          console.error('Error fetching product:', error);
        }
      );
    }
  }

  sendData() {
    this._logging.userData.subscribe({
      next:()=>{
        if(this._logging.userData.getValue() !== null){
          this.sendToCart.emit(this.data);
          this.toastMessage = `${this.data.title} added to cart!`;
          this.showToast = true;

          setTimeout(() => {
            this.showToast = false;
          }, 3000);
          this.islogging =true
        }else{
          this.toastMessage = `you should login first!`;
          this.showToast = true;

          setTimeout(() => {
            this.showToast = false;
          }, 3000);

        }
      }
    })

  }

  openModal(productData: any) {
    const modalRef = this.modalService.open(ProductDetailsComponent, { size: 'lg', centered: true });
    modalRef.componentInstance.product = productData;
  }
}
