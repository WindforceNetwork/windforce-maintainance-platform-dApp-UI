import { Component, OnInit, Input} from '@angular/core';
import { ContractTemplate } from '../../interfaces/contract-template';
import { NewContractDialogComponent } from '../new-contract-dialog/new-contract-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-card-template',
  templateUrl: './card-template.component.html',
  styleUrls: ['./card-template.component.css'],
  entryComponents: [NewContractDialogComponent]
})
export class CardTemplateComponent implements OnInit {
  @Input() public template : ContractTemplate;
  public conditions : Array<string>;
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    // console.log(this.template);
    this.conditions = this.template[0].conditions;
  }

  private goToRequestMaintainance = function () {
      let self = this;

      let dialogRef = this.dialog.open(NewContractDialogComponent, {
        width: '700px',
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');

        //Reset root view for toast
        console.log(self.vcr);
        // self.toastr.setRootViewContainerRef(self.vcr);
      });
  }
}
