import { Component, ViewChild, OnDestroy, ElementRef } from '@angular/core';
import { Block, Transaction } from './shared/models';
import { BlockChainService } from './shared/services/block-chain.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  @ViewChild('blockSelect') blockSelect: ElementRef;
  ObjectKeys = Object.keys;
  blocks: Block[];
  block: Block;
  transaction: Transaction;
  subscriptions: Subscription[] = [];

  constructor(private blockChainService: BlockChainService) {
    const subscription = this.blockChainService.blocks((new Date()).getTime()).subscribe(response => {
      this.blocks = response;
    });
    this.subscriptions.push(subscription);
  }

  latestBlock(): void {
    const subscription = this.blockChainService.latestBlock().subscribe(response => {
      this.block = response;
      this.transaction = null;
      this.blockSelect.nativeElement.value = 'Select';
    });
    this.subscriptions.push(subscription);
  }

  blockSelectionChange(evt: any) {
    if (evt.target.value === 'Select') {
      this.block = null;
      this.transaction = null;
      return;
    }
    const subscription = this.blockChainService.getSingleBlock(evt.target.value).subscribe(response => {
      this.block = response;
      this.transaction = null;
    });
    this.subscriptions.push(subscription);
  }

  txChange(evt: any) {
    if (evt.target.value === 'Select') {
      this.transaction = null;
      return;
    }
    const subscription = this.blockChainService.getSingleTransaction(this.blockSelect.nativeElement.value, evt.target.value).subscribe(response => {
      this.transaction = response;
    });
    this.subscriptions.push(subscription);
  }

  ngOnDestroy() {
    while (this.subscriptions.length !== 0) {
      this.subscriptions.pop().unsubscribe();
    }
  }
}
