import { HttpClient } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImageModel } from 'src/app/common/ImageModel';
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

    if (this.filesize / 1024 <= 1000 && this.filesize > 0) {
      const uploadData = new FormData();
      uploadData.append('myFile', this.selectedFile, this.selectedFile.name);
      //uploadData.append('model',   JSON.stringify(this.product));
      //console.log(uploadData.get('myFile'));

      this.httpClient.post(this.base_url + '/check/upload', uploadData)
        .subscribe(
          res => {
            console.log(res);

            

            this.receivedImageData = res;
            this.base64Data = this.receivedImageData.pic;
            this.convertedImage = 'data:image/jpeg;base64,' + this.base64Data;
            //Saving Product Model
            this.product.imagename = this.base_url+"/api/imageModels/" + res["id"];
            this.product.category = this.base_url + "/api/product-category/" + this.product.category;
            console.log(this.product);
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

            //return res;
          },
          err => console.log('Error Occured duringng saving: ' + err.message)
        );

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
