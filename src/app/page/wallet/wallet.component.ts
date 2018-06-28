import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { ContractsService } from '../../contracts.service';
import * as blockies from '../../../../node_modules/ethereum-blockies/blockies';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {


  private address: string;
  private balance: number;
  private transactions: Array<Transaction> = [];
  dataSource = new MatTableDataSource<Transaction>(this.transactions);

  displayedColumns = ['txHash', 'timestamp', 'from', 'to', 'value'];
  

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('identicon') identicon: ElementRef;
  @Input() walletData: any;
  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  constructor(private contract: ContractsService) { }

  ngOnInit() {
    this.contract.getAccount().then(acc=>{
       this.address = acc;
      this.balance = this.contract.getAccountBalance(acc).c[0]/1000;
      let rawTransactions: Array<any> = this.contract.getAccountTransactions(acc);
      console.log(rawTransactions);
      this.populateTransactionList(rawTransactions);
      this.dataSource = new MatTableDataSource<Transaction>(this.transactions);
      let icon = blockies.create({
        
          seed: acc, 
          size: 15, 
          scale: 3, 

      })
      console.log(this.identicon.nativeElement);
      this.identicon.nativeElement = icon;
      //let toReplace = document.getElementById('identicon');
      //console.log(document.getElementById('identicon'));
      //toReplace.parentNode.replaceChild(icon, toReplace);
    });


  }

  populateTransactionList(transactions: Array<any>){
    transactions.forEach(tran => {
      let tranToPush = {
        txHash: tran.hash,
        from: tran.from,
        to: tran.to,
        timestamp: '3 days 5 hrs ago',
        value: tran.value.c[0]/10000,
        unit: 'WIND'
      };

      this.transactions.push(tranToPush);

    });
  }
}


export interface Transaction {
  txHash: string;
  timestamp: string;
  from: string;
  to: string;
  value: number;
  unit: string;
}

const TRANSACTION_DATA: Transaction[] = [
  {
    txHash: '0x93d1a68e9e65...',
    from: '0x2a0c0dbecc7...',
    to: '0x84aa842839...',
    timestamp: '3 days 5 hrs ago',
    value: 40000,
    unit: 'WIND'
  },
  {
    txHash: '0x93d1a68e9e65...',
    from: '0x2a0c0dbecc7...',
    to: '0x84aa842839...',
    timestamp: '5 days 1 hrs ago',
    value: 10000,
    unit: 'WIND'
  },
  {
    txHash: '0x93d1a68e9e65...',
    from: '0x2a0c0dbecc7...',
    to: '0x84aa842839...',
    timestamp: '5 days 4 hrs ago',
    value: 126.00,
    unit: 'USDT'
  }
];
