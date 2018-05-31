import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DaoService } from '../../services/dao.service';
import { ApiService } from '../../services/api.service';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  constructor(private router: Router, private api: ApiService, private dao: DaoService, public snackBar : MatSnackBar) { }

  ngOnInit() {
  }

  goToService(){
    this.router.navigate(['./service']);
  }
  logout(){
    this.api.sendRequest("RPC", -1, null, {
        "jsonrpc":"2.0",
        "method":"personal_lockAccount",
        "params":[this.dao.getAccount().address],
        "id":1
      }, (res) => {
        console.log(res);
        var url = null;

        if (!res.result) {
          this.snackBar.open(res.error.message,'Dismiss',{
            duration: 5000,
            //extraClasses: ['error-message']
          });
        } else {
          console.log(res.result);
          this.dao.setAccount(null, null, false);
          this.router.navigate(['']);
        }
      }, (err) => {
        console.log(err);
        this.snackBar.open(err,'Dismiss',{
          duration: 5000,
          //extraClasses: ['error-message']
        });
    });
  }
}
