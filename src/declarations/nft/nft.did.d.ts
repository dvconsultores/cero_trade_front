import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export type ApiError = { 'ZeroAddress' : null } |
  { 'InvalidTokenId' : null } |
  { 'Unauthorized' : null } |
  { 'Other' : null };
export type ExtendedMetadataResult = {
    'Ok' : { 'token_id' : TokenId, 'metadata_desc' : MetadataDesc }
  } |
  { 'Err' : ApiError };
export type InterfaceId = { 'Burn' : null } |
  { 'Mint' : null } |
  { 'Approval' : null } |
  { 'TransactionHistory' : null } |
  { 'TransferNotification' : null };
export interface LogoResult { 'data' : string, 'logo_type' : string }
export type MetadataDesc = Array<MetadataPart>;
export interface MetadataKeyVal { 'key' : string, 'val' : MetadataVal }
export interface MetadataPart {
  'data' : Uint8Array | number[],
  'key_val_data' : Array<MetadataKeyVal>,
  'purpose' : MetadataPurpose,
}
export type MetadataPurpose = { 'Preview' : null } |
  { 'Rendered' : null };
export type MetadataResult = { 'Ok' : MetadataDesc } |
  { 'Err' : ApiError };
export type MetadataVal = { 'Nat64Content' : bigint } |
  { 'Nat32Content' : number } |
  { 'Nat8Content' : number } |
  { 'NatContent' : bigint } |
  { 'Nat16Content' : number } |
  { 'BlobContent' : Uint8Array | number[] } |
  { 'TextContent' : string };
export type MintReceipt = { 'Ok' : MintReceiptPart } |
  { 'Err' : ApiError };
export interface MintReceiptPart { 'id' : bigint, 'token_id' : TokenId }
export type OwnerResult = { 'Ok' : Principal } |
  { 'Err' : ApiError };
export type TokenId = bigint;
export type TxReceipt = { 'Ok' : bigint } |
  { 'Err' : ApiError };
export interface _SERVICE {
  'balanceOf' : ActorMethod<[Principal], bigint>,
  'burn' : ActorMethod<[TokenId], TxReceipt>,
  'getCustodians' : ActorMethod<[], Array<Principal>>,
  'getMaxLimit' : ActorMethod<[], number>,
  'getMetadata' : ActorMethod<[TokenId], MetadataResult>,
  'getMetadataForUser' : ActorMethod<[Principal], ExtendedMetadataResult>,
  'getTokenIdsForUser' : ActorMethod<[Principal], Array<TokenId>>,
  'init' : ActorMethod<[], Array<Principal>>,
  'logo' : ActorMethod<[], LogoResult>,
  'mint' : ActorMethod<[Principal, MetadataDesc], MintReceipt>,
  'name' : ActorMethod<[], string>,
  'ownerOf' : ActorMethod<[TokenId], OwnerResult>,
  'safeTransferFrom' : ActorMethod<[Principal, Principal, TokenId], TxReceipt>,
  'supportedInterfaces' : ActorMethod<[], Array<InterfaceId>>,
  'symbol' : ActorMethod<[], string>,
  'totalSupply' : ActorMethod<[], bigint>,
  'transferFrom' : ActorMethod<[Principal, Principal, TokenId], TxReceipt>,
}
export declare const idlFactory: IDL.InterfaceFactory;
