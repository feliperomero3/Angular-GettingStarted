import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-detail.component.html'
})
export class ProductDetailComponent implements OnInit {
  pageTitle = 'Product Detail';
  product: IProduct;
  errorMessage: void;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService) {
  }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.pageTitle += `: ${id}`;
    this.getProduct(id);
  }

  getProduct(id: number): void {
    this.productService.getProduct(id).subscribe({
      next: product => this.product = product,
      error: err => this.errorMessage = err
    });
  }

  onBack(): void {
    this.router.navigate(['/products']);
  }

}
