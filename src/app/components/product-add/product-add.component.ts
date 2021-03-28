import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  product = new Product();
  productCategories: any;

  private base_url= environment.apiUrl;
   
  constructor(private productService: ProductService,
    private router: Router) { }

  ngOnInit(): void {

    this.listProductCategories();

  }


  listProductCategories() {

    this.productService.getProductCategories().subscribe(
      data => {
        console.log('Product Categories=' + JSON.stringify(data));
        this.productCategories = data;
      }
    );
  }

  addProducts() {
    this.product.category = this.base_url+"/api/product-category/" + this.product.category,
    console.log(this.product);

    this.productService.addProduct(this.product).subscribe(
      data => {
        console.log("Response Recieved");
        console.log(data);
        alert("Product Added Sucessfully");
        this.router.navigate(['/login']);
      },
      error => {
        console.log("Exception Occured");
        //this.msg=error.error.message;
        console.log(error.error.message);

      });
  }


}
