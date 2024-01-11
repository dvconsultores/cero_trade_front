import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type Error = { 'UserAlreadyExists' : null } |
  { 'TokenNotFound' : null } |
  { 'AdminNotFound' : null } |
  { 'ZeroAddress' : null } |
  { 'Unauthorized' : null } |
  { 'Other' : null } |
  { 'TheAmountIsLessThanThePrice' : null } |
  { 'TheTokenIsAlreadyOnSale' : null } |
  { 'UserNotFound' : null } |
  { 'AdminAlreadyExists' : null };
export interface Market {
  'tokenId' : TokenId,
  'owner' : User,
  'metadata' : MetadataDesc,
  'price' : bigint,
}
export interface MarketInput { 'tokenId' : TokenId, 'price' : bigint }
export type MarketResult = { 'Ok' : Market } |
  { 'Err' : Error };
export type MetadataDesc = Array<MetadataPart>;
export interface MetadataKeyVal { 'key' : string, 'val' : MetadataVal }
export interface MetadataPart {
  'data' : Uint8Array | number[],
  'key_val_data' : Array<MetadataKeyVal>,
  'purpose' : MetadataPurpose,
}
export type MetadataPurpose = { 'Preview' : null } |
  { 'Rendered' : null };
export type MetadataVal = { 'Nat64Content' : bigint } |
  { 'Nat32Content' : number } |
  { 'Nat8Content' : number } |
  { 'NatContent' : bigint } |
  { 'Nat16Content' : number } |
  { 'BlobContent' : Uint8Array | number[] } |
  { 'TextContent' : string };
export type TokenId = string;
export type User = Principal;
export interface _SERVICE {
  'addMarket' : ActorMethod<[MarketInput], MarketResult>,
  'buy' : ActorMethod<[TokenId, bigint], MarketResult>,
  'getMarket' : ActorMethod<[], Array<[TokenId, Market]>>,
  'getWallet' : ActorMethod<[], Principal>,
  'removeMarket' : ActorMethod<[TokenId], MarketResult>,
}
