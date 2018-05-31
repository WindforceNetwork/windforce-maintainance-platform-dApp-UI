import { Component, OnInit } from '@angular/core';
import { Contract } from '../../interfaces/contract';
import { ContractTemplate } from '../../interfaces/contract-template';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NewTemplateDialogComponent } from '../../components/new-template-dialog/new-template-dialog.component';


@Component({
  selector: 'app-maintainance',
  templateUrl: './maintainance.component.html',
  styleUrls: ['./maintainance.component.scss']
})

export class MaintainanceComponent implements OnInit {
  public completedContracts : Array<Contract>;
  public goingContracts : Array<Contract>;
  public failedContracts : Array<Contract>;
  public templates: Array<ContractTemplate>;
  private contractsList : boolean;
  private newTemplateShow: boolean;

  constructor(private router: Router, public dialog: MatDialog) {
    this.contractsList = true;
    this.newTemplateShow = false;
  }

  ngOnInit() {
    this.templates = [
      //template 1
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
      //template 2
      // {
      //   name: "Template Name 2",
      //   templateId: "0x76022391ef82DdAF831edC7d32eC0D26213D4fC3",
      //   details: "details of template 2",
      //   conditions: ["1.5 VIF per call"]
      // },
      // //template 3
      // {
      //   name: "Template Name 3",
      //   templateId: "0x76022391ef82DdAF831edC7d32eC0D26213D4fC3",
      //   details: "details of template 3",
      //   conditions: ["2 VIF per call"]
      // }
    ]

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

    // setTimeout(() => {
    //   this.goingContracts.unshift({
    //     contractId : "0x76022391ef82DdAF8...",
    //     type: "Vending Machine Maintainance",
    //     provider: "Viatick",
    //     consumer : "Consumer 3",
    //     details: "60 unit, 13/3/2018 - 13/3/2019",
    //     cost: 720,
    //     contractPeriod: null,
    //     imageUrl: "imageURL3",
    //     status: "pending"
    //   });
    // }, 15000);

    this.failedContracts= [
    ]
  }

  goToRequestMaintainance(){
    // this.router.navigate(['./contract']);
    this.contractsList = false;
  }

  goToMaintainanceTemplate(){
    this.contractsList = false;
    this.newTemplateShow = true;
  }

  createNewTemplate() {
      let self = this;

      let dialogRef = this.dialog.open(NewTemplateDialogComponent, {
        width: '600px',
      });

      dialogRef.afterClosed().subscribe(result => {
      });
  }
}
