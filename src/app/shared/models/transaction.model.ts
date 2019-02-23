export class Transaction {
    hash: string;
    ver: number;
    vin_sz?: number;
    vout_sz?: number;
    lock_time?: number;
    size?: number;
    weight?: number;
    time: number;
    relayed_by?: string;
    block_height?: number;
    tx_index: number;
    inputs?: any[];
    out?: any[]
}