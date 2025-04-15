import { Component, ElementRef, OnInit, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ServicesService } from '../service/main.service';
import { sharedservice } from '../../shared/service/shared.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule, NgbModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductComponent } from '../product/product.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RegisterationService } from '../../services/registeration.service';
import { SearchProductPipe } from "../../pipes/search-product.pipe";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbPaginationModule, NgbModule, ProductComponent, NgbToastModule, RouterOutlet, SearchProductPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  products: any[] = [];
  cat: any[] = [];
  CatId: number | null = 0;
  productCat: any = [];
  minPrice: number | null = null;
  maxPrice: number | null = null;
  public page = 1;
  public pageSize = 9; // Fixed page size
  number: number = 0;
  singlePrd: any = [];
  singelProduct: any = [];
  searchTerm: string = ''; // Initialize searchTerm as an empty string
  filteredProductsLength: number = 0; // Track the number of filtered products
  dynamicMaxSize: number = 5; // Default maxSize for pagination

  cartProducts: any[] = [];

  Toggle: boolean = true;
  @ViewChildren('element') elements!: QueryList<ElementRef>; // children elements
  toastMessage: string = '';
  showToast: boolean = false;

  constructor(
    public servProduct: ServicesService,
    private route: Router,
    private renderer: Renderer2,
    public serveNum: sharedservice,
    private _logging: RegisterationService
  ) {}

  removeClass() {
    this.elements.forEach((element) => {
      this.renderer.removeClass(element.nativeElement, 'activeLi');
    });
  }

  onCategorySelect(catId: number) {
    this.CatId = catId;
    this.servProduct.getProductByCatId(catId).subscribe((prd) => {
      this.products = prd;
      this.Toggle = true;
      this.updateFilteredProductsLength(); // Update filtered products length
    });
  }

  ngOnInit(): void {
    this.getAllProduct();

    this.servProduct.IsToggleCurrent.subscribe((toggle) => {
      this.Toggle = toggle;
    });

    this.servProduct.getCategories().subscribe((cat) => {
      this.cat = cat;
    });
  }

  getAllProduct() {
    this.servProduct.allProduct().subscribe(
      (prd) => {
        this.products = prd;
        this.filteredProductsLength = this.products.length; // Initialize filteredProductsLength
      },
      (error) => {
        alert('Error fetching products');
      }
    );
  }

  cheapPrice() {
    this.minPrice = 100;
    this.maxPrice = 1000;
    this.applyFilters();
  }

  ExpensivePrice() {
    this.minPrice = 70;
    this.maxPrice = 200;
    this.applyFilters();
  }

  applyFilters() {
    this.servProduct
      .getFilteredProducts(this.CatId!, this.minPrice!, this.maxPrice!)
      .subscribe((prd) => {
        this.products = prd;
        this.updateFilteredProductsLength(); // Update filtered products length
      });
  }


  sendToCart(e: any) {
    if (this._logging.userData.getValue() !== null) {
      if ("cart" in localStorage) {
        this.cartProducts = JSON.parse(localStorage.getItem("cart")!);
        const exist = this.cartProducts.find((item) => item.id == e.id);
        if (exist) {
          this.toastMessage = `This item is already added to the cart!`;
          this.showToast = true;

          setTimeout(() => {
            this.showToast = false;
          }, 3000);
          return;
        } else {
          this.cartProducts.push(e);
          localStorage.setItem("cart", JSON.stringify(this.cartProducts));
          this.serveNum.incrementNum();
        }
      } else {
        this.cartProducts.push(e);
        localStorage.setItem("cart", JSON.stringify(this.cartProducts));
        this.serveNum.incrementNum();
      }
    } else {
      this.toastMessage = `You should login first!`;
      this.showToast = true;

      setTimeout(() => {
        this.showToast = false;
      }, 3000);
    }
  }

  onPageChange(newPage: number) {
    this.page = newPage; // Update the current page
    this.scrollToTop();
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  updateFilteredProductsLength() {
    this.filteredProductsLength = this.products.filter((product) =>
      product.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    ).length;
  }

  onSearchTermChange() {
    this.updateFilteredProductsLength(); // Update the number of filtered products
    this.page = 1; // Reset to the first page when the search term changes
    this.dynamicMaxSize = this.searchTerm ? 3 : 5; // Show fewer pages after search
  }
}
