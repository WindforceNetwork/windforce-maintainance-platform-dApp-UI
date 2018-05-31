import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {
  displayedColumns = ['txHash', 'timestamp', 'from', 'to', 'value'];
  dataSource = new MatTableDataSource<Transaction>(TRANSACTION_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor() { }

  ngOnInit() {
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
