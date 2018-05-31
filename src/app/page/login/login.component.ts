import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig,  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition, } from '@angular/material';
  import { ApiService } from '../../services/api.service';
  import { DaoService } from '../../services/dao.service';



  @Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
  })
  export class LoginComponent implements OnInit {
    private address: string;
    private password: string;
    private isUserLogedIn : boolean;
    private captcha : string;
    public content: any;
    public favicon: {
      url: string
    }

    public particles: {
      style: object,
      width: number,
      height: number,
      params: object
    };

    constructor(private router: Router, public snackBar : MatSnackBar, private api: ApiService, private dao: DaoService){ 
      this.content = {
        title: "windforce"
      }
      this.favicon = {
        url: "assets/favicon_g.png"
      };
      this.particles = {
        style: {
          height: "100%"
        },
        width: 100,
        height: 100,
        params: {
          particles: {
            number: {
              value: 69,
              density: {
                enable: true,
                value_area: 800
              }
            },
            color: {
              value: '#8e93d7'
            },
            shape: {
              type: 'circle'
            },
            size: {
              value: 8
            },
            line_linked: {
              enable: true,
              distance: 128,
              color: "#8e93d7",
              opacity: 0.4,
              width: 1
            },
            move: {
              speed: 2
            }
          }
        }
      };
    }

    ngOnInit() {
      this.address = "";
      this.password = "";
    }

    resolved(captchaResponse: string) {
      this.captcha = captchaResponse;
      console.log(`Resolved captcha with response ${captchaResponse}:`);
    }

    login(){
    // if(this.username == "admin" && this.password == "password"){
    //   if(this.captcha != null){
    //     this.router.navigate(['./service']);
    //   } else {
    //     this.snackBar.open("Please go through robot verification",'Dismiss',{
    //       duration: 5000,
    //       extraClasses: ['error-message']
    //     });
    //   }
    // }else{
    //   this.snackBar.open("Username/Password is not valid",'Dismiss',{
    //     duration: 5000,
    //     extraClasses: ['error-message']
    //   });
    // }

    if(this.captcha != null){
      // this.api.sendRequest("RPC", -1, null, {
      //     "jsonrpc":"2.0",
      //     "method":"personal_unlockAccount",
      //     "params":[this.address, this.password, 100000000],
      //     "id":1
      //   }, (res) => {
      //     console.log(res);
      //     var url = null;
      //
      //     if (!res.result) {
      //       this.snackBar.open(res.error.message,'Dismiss',{
      //         duration: 5000,
      //         extraClasses: ['error-message']
      //       });
      //     } else {
      //       console.log(res.result);
      //       this.dao.setAccount(this.address, "", true);
      //       this.router.navigate(['./service']);
      //     }
      //   }, (err) => {
      //     console.log(err);
      //     this.snackBar.open(err,'Dismiss',{
      //       duration: 5000,
      //       extraClasses: ['error-message']
      //     });
      //   });
      // } else {
      //   this.snackBar.open("Please go through robot verification",'Dismiss',{
      //     duration: 5000,
      //     extraClasses: ['error-message']
      //   });
      // }
      this.dao.setAccount(this.address, "", true);
      this.router.navigate(['./service']);
    }
  }
}
