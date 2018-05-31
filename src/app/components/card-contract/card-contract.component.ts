import { Component, OnInit, Input} from '@angular/core';
import { Contract } from '../../interfaces/contract';

@Component({
  selector: 'app-card-contract',
  templateUrl: './card-contract.component.html',
  styleUrls: ['./card-contract.component.css']
})
export class CardContractComponent implements OnInit {
  @Input() public contract : Contract;
  constructor() { }

  ngOnInit() {
    console.log(this.contract);
  }

}
