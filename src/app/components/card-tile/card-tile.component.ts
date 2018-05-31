// https://github.com/sheikalthaf/ngx-carousel
import { Component, OnInit, Input} from '@angular/core';
import { NgxCarousel } from '../../interfaces/ngx-carousel';
import { Contract } from '../../interfaces/contract';
import { ContractTemplate } from '../../interfaces/contract-template';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NewContractDialogComponent } from '../new-contract-dialog/new-contract-dialog.component';

@Component({
  selector: 'app-card-tile',
  templateUrl: './card-tile.component.html',
  styleUrls: ['./card-tile.component.css']
})
export class CardTileComponent implements OnInit {
  @Input() public title: string;
  @Input() public templatesOrContracts: Array<any>;
  public completedContracts : Array<Contract>;
  public goingContracts : Array<Contract>;
  public failedContracts : Array<Contract>;
  public templates : Array<ContractTemplate>

  public carouselTile: NgxCarousel;
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.carouselTile = {
      grid: {xs: 2, sm: 2, md: 2, lg: 2, all: 0},
      slide: 1,
      speed: 600,
      animation: 'lazy',
      point: {
        visible: true
      },
      load: 2,
      touch: true,
      easing: 'ease'
    }

    switch(this.title){
      case "Existing Maintainance Contract Template" : {
        this.templates = this.templatesOrContracts[0];
        // console.log(this.templates);
        break;
      }
      case "Browse Maintainance Contract Template" : {
        this.templates = this.templatesOrContracts[0];
        // console.log(this.templates);
        break;
      }
      case "Maintainance Contract": {
        this.goingContracts = this.templatesOrContracts[0];
        // console.log(this.goingContracts);
        break;
      }
      case "Completed Maintainance Contract": {
        this.completedContracts = this.templatesOrContracts[0];
        // console.log(this.completedContracts);
        break;
      }
      case "Failed Maintainance Contract" : {
        this.failedContracts = this.templatesOrContracts[0];
        // console.log(this.failedContracts);
        break;
      }
    }
    console.log(this.title);

  }

  public carouselTileLoad(evt: any) {
    // const len = this.templates.length;
    // // if (len <= 30) {
    //   // for (let i = len; i < len + 1; i++) {
    //   //   this.carouselTileItems.push(i);
    //   // }
    // // }
  }
}
