import { Component } from '@angular/core';
import { NewContractDialogComponent } from './components/new-contract-dialog/new-contract-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  entryComponents: [NewContractDialogComponent]
})
export class AppComponent {
  title = 'app';
}
