import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-category-add',
  templateUrl: './product-category-add.component.html',
  styleUrls: ['./product-category-add.component.css']
})
export class ProductCategoryAddComponent implements OnInit {

  productCategory = new ProductCategory();
  productCategories:any;
  constructor(private productService: ProductService,
    private router: Router) { }

  ngOnInit(): void {
    this.listProductCategories();
  }

  addProductCategorys() {
    
    console.log(this.productCategory);

    this.productService.addProductCategory(this.productCategory).subscribe(
      data => {
        console.log("Response Recieved");
        console.log(data);
        alert("Product Category Sucessfully");
        //this.router.navigate(['/login']);
        this.listProductCategories();
      },
      error => {
        console.log("Exception Occured");
        //this.msg=error.error.message;
        console.log(error.error.message);

      });
  }

  listProductCategories() {

    this.productService.getProductCategories().subscribe(
      data => {
        console.log('Product Categories=' + JSON.stringify(data));
        this.productCategories = data;
      }
    );
  }


}
