import { Transaction } from './transaction.model';
export class Block {
    hash: string;
    ver?: number;
    prev_block?: string;
    next_block?: string[];
    mrkl_root?: string;
    fee?: number;
    time: number;
    bits?: number;
    nonce?: number;
    n_tx?: number;
    size?: number;
    block_index?: number;
    main_chain?: boolean;
    height: number;
    received_time?: number;
    relayed_by?: string;
    tx?: Transaction[];
    txIndexes?: number[]
}