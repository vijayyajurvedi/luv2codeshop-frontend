import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/common/user';
import { RegistrationService } from 'src/app/services/registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  msg:any;
  user = new User();

  constructor(private service: RegistrationService,
    private router: Router) { }

  ngOnInit(): void {
  }

  registerUser()
  {
    this.service.registerUserFromRemote(this.user).subscribe(

      data => {
        console.log("Response Recieved");
       
        this.msg="Registration Sucessfull";
        this.router.navigate(['/login']);
      },
      
      
      error => {console.log("Exception Occured");
       
      
      this.msg=error.error.message;
       console.log(error.error.message );
      
    }

    );

  }

}
