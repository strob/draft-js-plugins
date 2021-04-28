import { List } from 'immutable';
export interface BlockKeyStore {
    add(key: string): List<string>;
    remove(key: string): List<string>;
    includes(key: string): boolean;
    getAll(): List<string>;
}
export default function createBlockKeyStore(): BlockKeyStore;
