import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../common/product';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';
import { environment } from 'src/environments/environment';
import { ImageModel } from '../common/ImageModel';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  private bases_url = environment.apiUrl;

  private baseUrl = this.bases_url + '/api/products';

  private categoryUrl = this.bases_url + '/api/product-category';

  private imagebynameUrl = this.bases_url + "/api/imageModels/search/findByImagenameContaining?name=";

  constructor(private httpClient: HttpClient) { }

  getProduct(theProductId: number): Observable<Product> {

    // need to build URL based on product id
    const productUrl = `${this.baseUrl}/${theProductId}`;

    return this.httpClient.get<Product>(productUrl);
  }

  addProduct(product: Product): Observable<any> {
    // need to build URL based on product id
    const productUrl = this.baseUrl;
    return this.httpClient.post(productUrl, product);

  }

  getImageByName(selectedFile: any): Observable<ImageModel[]> {
     
    return this.httpClient.get<GetResponseImageModel>(this.imagebynameUrl   + selectedFile).pipe(
      map(response => response._embedded.imageModel)
    );
  }

  addProductCategory(productCategory: ProductCategory): Observable<any> {
    return this.httpClient.post(this.categoryUrl, productCategory);
  }
  getProductListPaginate(thePage: number,
    thePageSize: number,
    theCategoryId: number): Observable<GetResponseProducts> {

    // need to build URL based on category id, page and size 
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
      + `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }


  getProductList(theCategoryId: number): Observable<Product[]> {

    // need to build URL based on category id 
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    return this.getProducts(searchUrl);
  }

  searchProducts(theKeyword: string): Observable<Product[]> {

    // need to build URL based on the keyword 
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;

    return this.getProducts(searchUrl);
  }

  searchProductsPaginate(thePage: number,
    thePageSize: number,
    theKeyword: string): Observable<GetResponseProducts> {

    // need to build URL based on keyword, page and size 
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`
      + `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }



  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(map(response => response._embedded.products));
  }

  getProductCategories(): Observable<ProductCategory[]> {

    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }

}

interface GetResponseProducts {
  _embedded: {
    products: Product[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}

interface GetResponseImageModel {
  _embedded: {
    imageModel: ImageModel[];
  }
}