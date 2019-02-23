import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import { BlockChainService } from './services/block-chain.service';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule
],
  declarations: [],
  providers: [BlockChainService]
})
export class SharedModule { }
