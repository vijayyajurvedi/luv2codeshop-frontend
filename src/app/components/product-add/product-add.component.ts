import { HttpClient } from '@angular/common/http';
import { THIS_EXPR, ThrowStmt } from '@angular/compiler/src/output/output_ast';
import { stringify } from '@angular/compiler/src/util';
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

  private base_url = environment.apiUrl;
  images: any;

  constructor(private productService: ProductService,
    private router: Router,
    private httpClient: HttpClient) { }

  ngOnInit(): void {

    this.listProductCategories();

  }

  public selectedFile;
  filesize: any = 0;
  imgURL: any;
  receivedImageData: any;
  base64Data: any;
  convertedImage: any;
  imageurlposted: String;
  imagesrecieved: any;


  response: any;

  public onFileChanged(event) {

    this.selectedFile = event.target.files[0];

    var name = event.target.files[0].name;
    var type = event.target.files[0].type;
    var size = event.target.files[0].size;
    this.filesize = size;

    console.log('Name: ' + name + "\n" +
      'Type: ' + type + "\n" +
      'Size: ' + Math.round(size / 1024) + " KB");

    // Below part is used to display the selected image
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event2) => {
      this.imgURL = reader.result;
    };

  }

  addProducts(): any {

    let isImageuploaded: boolean = false;
    if (this.filesize / 1024 <= 100000 && this.filesize > 0) {
      const uploadData = new FormData();
      uploadData.append('file', this.selectedFile, this.selectedFile.name);


      //Upload Image 
      this.httpClient.post(this.base_url + '/upload', uploadData).subscribe(
        res => {
          console.log("Image Uploaded Message:" + res['message']);
        }
        , error => {
          console.log("Error Occoured for Upload Image");
          //this.msg=error.error.message;
          console.log(error.error.message);
          alert(error.error.message);
          this.router.navigate(['/product/add']);
        }
      );
      const cat = this.product.category;

      this.product.imageUrl = this.base_url + "/file/" + this.selectedFile.name;
      this.product.category = this.base_url + "/api/product-category/" + cat;
      console.log(this.product);
      // alert(this.product);
      //Give Post Call For Product

      //  {  

      //   "name":"Books",
      //   "sku":"C++SKU",
      //   "description":"The new C++11 standard allows programmers to express ideas more clearly, simply, and directly",
      //   "unitPrice":50,
      //   "unitsInStock":100,
      //   "category":"http://localhost:8080/api/product-category/1",
      //   "imagename":"http://localhost:8080/api/imageModels/1"
      // }

      //Save Product
      this.productService.addProduct(this.product).subscribe(
        data => {
          console.log("Response Recieved");
          console.log(data);
          alert("Product Added Sucessfully");
          this.router.navigate(['/product/add']);
        },
        error => {
          console.log("Exception Occured");
          //this.msg=error.error.message;
          console.log(error.error.message);

        });



      // this.getImages();
    }
    else if (this.filesize > 1000) {
      alert("File Size Is bigger than 1000kb and it will not uploaded");
      this.router.navigateByUrl('/product/add');
    }
    else {
      alert("Product Image is Mandatory");
    }

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
