import { Component, OnInit} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { NewTemplateDialogComponent } from '../../components/new-template-dialog/new-template-dialog.component';

//establised contracts and contract templates
import { NgxCarousel } from '../../interfaces/ngx-carousel';
import { Contract } from '../../interfaces/contract';
import { ContractTemplate } from '../../interfaces/contract-template';
import { ContractsService } from '../../contracts.service';


@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {
  private services : string[] = new Array("maintainance","other");
  private service : string;
  private test : string = "test";
  private currentPage: string = "maintainance";
  private favicon: {
    url: string
  };


  //contract carousell
  private carouselTile: NgxCarousel;  
  public completedContracts : Array<Contract>;
  public goingContracts : Array<Contract>;
  public failedContracts : Array<Contract>;
  public templates: Array<ContractTemplate>;

  //wallet data
  private transaction: Array<any> = [];
  private balance: number;
  private address: string;

  constructor(private dialog: MatDialog, private contract: ContractsService) { 
    this.favicon = {
      url : "../../../assets/favicon_g.png"
    };


    //contract carousell
    this.carouselTile = {
      grid: {xs: 1, sm: 2, md: 3, lg: 3, all: 0},
      slide: 1,
      speed: 600,
      animation: 'lazy',
      point: {
        visible: true
      },
      load: 2,
      touch: true,
      easing: 'ease'
    };
    //test data
    this.templates = [
      {
      provider: "Viatick",
      providerId : "0x76022391ef82DdAF831edC7d32eC0D26213D4fC3",
      name: "Vending Machine Maintainance",
      details: "Rated are fixed per machine per month",
      conditions: ["1 WIND per unit per 30 days"]
      },
      {
      provider: "Viatick",
      providerId : "0x76022391ef82DdAF831edC7d32eC0D26213D4fC3",
      name: "Bicycle Lock Maitainance",
      details: "Battery replacement, software and hardware check",
      conditions: ["0.5 WIND per call"]
      },
      {
      provider: "Viatick",
      providerId : "0x76022391ef82DdAF831edC7d32eC0D26213D4fC3",
      name: "Bicycle Lock Maitainance",
      details: "Battery replacement, software and hardware check",
      conditions: ["0.5 WIND per call"]
      },
      
    ];

    this.completedContracts= [
    ]

    this.goingContracts = [
      {
        contractId : "0x76022391efbc22Dd155...",
        type: "Bicycle Lock Maintainance",
        provider: "Viatick",
        consumer : "Consumer 3",
        details: "Called at 10/3/2018 16:00",
        cost: 0.5,
        contractPeriod: null,
        imageUrl: "imageURL3",
        status: "ongoing"
      }
    ]

    this.failedContracts= [
    ]

    this.contract.getAccount().then(acc => {
      this.address = acc;
      
      this.balance = this.contract.getAccountBalance(acc).c[0]/1000;
      console.log(this.contract.getAccountTransactions(acc));
    });
    




  }

  ngOnInit() {
      console.log(this.service);
      console.log(this.currentPage);
  }

  

  switchPage (page: string) {
    this.currentPage = page;
  }
  createNewTemplate() {
      let self = this;

      let dialogRef = this.dialog.open(NewTemplateDialogComponent, {
        width: '600px',
      });

      dialogRef.afterClosed().subscribe(result => {
      });
  }

  //carousell input function
  public carouselTileLoad(evt: any) {
    // const len = this.templates.length;
    // // if (len <= 30) {
    //   // for (let i = len; i < len + 1; i++) {
    //   //   this.carouselTileItems.push(i);
    //   // }
    // // }
  }




}
