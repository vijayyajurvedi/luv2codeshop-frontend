import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ImageModel } from '../../common/ImageModel'
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.css']
})
export class ImageUploaderComponent implements OnInit {

  private base_url= environment.apiUrl;
  constructor(private httpClient: HttpClient,
    private router: Router
    ) { }

  ngOnInit(): void {

    this.getImages();
  }

  title = 'ImageUploaderFrontEnd';

  public selectedFile;
  public event1;
  imgURL: any;
  receivedImageData: any;
  base64Data: any;
  convertedImage: any;
  filesize: any

  imagesrecieved: any;

  public onFileChanged(event) {

    this.selectedFile = event.target.files[0];

    var name = event.target.files[0].name;
    var type = event.target.files[0].type;
    var size = event.target.files[0].size;
    this.filesize=size;

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


  // This part is for uploading
  onUpload() {

if(this.filesize/1024 <= 1000)
{
    const uploadData = new FormData();
    uploadData.append('myFile', this.selectedFile, this.selectedFile.name);


    this.httpClient.post( this.base_url+'/check/upload', uploadData)
      .subscribe(
        res => {
          console.log(res);
          this.receivedImageData = res;
          this.base64Data = this.receivedImageData.pic;
          this.convertedImage = 'data:image/jpeg;base64,' + this.base64Data;
        },
        err => console.log('Error Occured duringng saving: ' + err)
      );

      this.getImages();
      }
      else
      {
        alert("File Size Is bigger than 1000kb and it will not uploaded");
        this.router.navigateByUrl('/imageupload');
      }
    
  }

  getImages() {
    this.httpClient.get(this.base_url+'/check/getimages')
      .subscribe(
        res => {

          this.imagesrecieved = res;
          this.imagesrecieved.pic = res;
          console.log(this.imagesrecieved);
        },
        err => console.log('Error Occured during retreiving Images: ' + err)
      );


  }

}
