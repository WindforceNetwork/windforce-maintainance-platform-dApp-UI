import {Component, Inject, ViewContainerRef, HostListener} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { ApiService } from '../../services/api.service';
import { DaoService } from '../../services/dao.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

const ASSET_SOURCES = ['','XDP','LegacyRawCat','MSProduct','BigCat','Skype']
const SERIAL_NUMBER_FORMATS = [
  {
    name: '14 Numeric',
    id: '1FDCE297-19D1-425C-83E8-3F99709BF14D'
  },
  {
    name: 'General 19 Numeric',
    id: 'F068FC4B-3D45-42DC-AF2D-2E669DB5A19C'
  },
  {
    name: 'Blackhawk 19 numeric',
    id: 'D1F14F02-E4B7-4A9A-9AD8-E5A62987519D'
  },
  {
    name: 'No Serial Number format',
    id: '7473D2BD-21ED-4D76-A8C1-FBAA5D990000'
  }
]

@Component({
  selector: 'app-new-contract-dialog',
  templateUrl: './new-contract-dialog.component.html',
  styleUrls: ['./new-contract-dialog.component.css']
})
export class NewContractDialogComponent {
  assetIdFormControl = new FormControl('', [
      Validators.required
    ]);

  assetSourceFormControl = new FormControl('', [
      // Validators.required
    ]);

    quantityFormControl = new FormControl('', [
      Validators.required
    ]);

    serialNumberFormatFormControl = new FormControl('', [
      Validators.required
    ]);

    tokenStateFormControl = new FormControl('', [
    ]);

    onBehalfFormControl = new FormControl('', [
    ]);

    channelSKUFormControl = new FormControl('', [
    ]);

    partIdFormControl = new FormControl('', [
    ]);

    campaignIdFormControl = new FormControl('', [
    ]);

    matcher = new MyErrorStateMatcher();

    assetSources = ASSET_SOURCES;
    serialNumberFormats = SERIAL_NUMBER_FORMATS;

    newRequest = {
      quantity: 1,
      region: 'Singapore',
      serialNumberFormatId: '',
      assetId: '',
      assetSource: '',
      tokenState: 'Inactive',
      channelSKU: '',
      partId: '',
      campaignId: '',
      orderingOnBehalfForPartnerIdentifier: '',
      date: '',
      status: 'requesting',
      referenceId: '',
      clientRequestId: '',
      recurrence: 1
    };

    isRequesting = false;

    constructor(
      public dialogRef: MatDialogRef<NewContractDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any, vcr: ViewContainerRef, private api: ApiService,
      private dao: DaoService, public snackBar : MatSnackBar) {
      // this.toastr.setRootViewContainerRef(vcr);
    }

    onNoClick(): void {
      this.dialogRef.close();
    }

    sendRequest(): void {
      this.isRequesting = false;

      // if (this.newRequest.channelSKU && this.newRequest.channelSKU != '') {
      //   this.newRequest.tokenState = 'Inactive';
      // }

      // Auto-capitalize asset Id and channel channelSKU
      this.newRequest.assetId = this.newRequest.assetId.toUpperCase();
      this.newRequest.channelSKU = this.newRequest.channelSKU.toUpperCase();

      this.dialogRef.close();

      this.snackBar.open("Contract requested successfully. Please wait until service provider accepted or rejected the contract.",'Dismiss',{
        duration: 5000,
      });

      // this.api.sendRequest("TokenSupplyChainRequest", null, null, {
      //   request: this.newRequest,
      //   code: this.dao.getAccount().code
      // }, (res) => {

//         console.log("res", res);
//
//         if (res.status == 0) {
//           this.isRequesting = false;
//
// Test Test Test, [28.02.18 06:36]
// if (res.message) {
//             this.toastr.error(res.message, 'Error!', {toastLife: 5000});
//           } else {
//             this.toastr.error('Unexpected error occured', 'Error!', {toastLife: 5000});
//           }
//         } else {
//           let requestSuccessToast = this.toastr.info('Request sent. Please hang on...', null, {toastLife: 9000});
//
//           setTimeout(() => {
//             // this.getRequestStatus(res.data.requestReferenceId, res.data.clientRequestId);
//             this.dialogRef.close();
//           }, 1000);
//         }
//       }, (err) => {
//         console.log(err);
//         this.toastr.error(err.message, 'Error!', {toastLife: 5000});
//       },'');
    }

    getRequestStatus(referenceId: string, clientRequestId: string): void {
      let input = {
        referenceId: referenceId,
        clientRequestId: clientRequestId
      }

      console.log('input', input);

    //   this.api.sendRequest("TokenSupplyChainRequestStatus", null, null, input, (res) => {
    //     if (res.status == 0) {
    //       if (res.message) {
    //         console.log('res.message', res.message);
    //         this.toastr.error(res.message.reason, 'Error!', {toastLife: 5000});
    //       } else {
    //         this.toastr.error('Unexpected error occured', 'Error!', {toastLife: 5000});
    //       }
    //   } else {
    //     if (res.data.statusId == 500) {
    //       this.toastr.error('Error ' + res.data.errors[0].errorCode + ': ' + res.data.errors[0].errorMessage, 'Error!', {toastLife: 5000});
    //     } else if (res.data.statusId == 200 || res.data.statusId == 100) {
    //       this.toastr.info('Request still in processed of being fulfilled. Please hang on..', 'Checking Status', {toastLife: 9000});
    //
    //       setTimeout(() => {
    //         this.getRequestStatus(referenceId, clientRequestId);
    //       }, 10000);
    //     } else {
    //       this.toastr.success('Request fulfilled. Start downloading file..', 'Success!', {toastLife: 5000});
    //       this.sendDownloadRequest(referenceId, clientRequestId);
    //     }
    //   }
    // }, (err) => {
    //     console.log(err);
    //     this.toastr.error(err.message, 'Error!');
    //   },'');
    }

    sendDownloadRequest(referenceId: string, clientRequestId: string): void {
      let input = {
        referenceId: referenceId,
        clientRequestId: clientRequestId
      }

      console.log('input', input);

    //   this.api.sendRequest("TokenSupplyChainDownloadRequest", null, null, input, (res) => {
    //     this.isRequesting = false;
    //
    //     if (res.status == 0) {
    //
    //       if (res.message) {
    //         console.log('res.message', res.message);
    //         this.toastr.error(res.message.reason, 'Error!', {toastLife: 5000});
    //       } else {
    //         this.toastr.error('Unexpected error occured', 'Error!', {toastLife: 5000});
    //       }
    //   } else {
    //     this.dialogRef.close();
    //   }
    // }, (err) => {
    //     console.log(err);
    //     this.toastr.error(err.message, 'Error!', {toastLife: 5000});
    //   },'');
    }
}
