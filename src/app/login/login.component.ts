import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  authorisesuccess: boolean = false;
  authorisefail: boolean = false;
  response: string;
  constructor(private loginService: LoginService) { } 

  ngOnInit(): void {
  }

  ShowHide(){
    if (this.response == "success")
    {
      this.authorisefail = false;
      this.authorisesuccess = true;
    }
    else
    {
      this.authorisesuccess = false;
      this.authorisefail = true;
    }
  }

  SubmitClick() {
    console.log(this.username);
    console.log(this.password);
    this.loginService.Login(this.username, this.password).subscribe( data => { this.response = data; this.ShowHide(); } );
  }
}
