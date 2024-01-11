import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface DataAdmin { 'level' : bigint, 'wallet' : User }
export type DataAdminResult = { 'Ok' : DataAdmin } |
  { 'Err' : Error };
export interface DataUser {
  'uid' : [] | [string],
  'nombre' : string,
  'wallet' : User,
  'typeUser' : string,
}
export type DataUserResult = { 'Ok' : DataUser } |
  { 'Err' : Error };
export type Error = { 'UserAlreadyExists' : null } |
  { 'AdminNotFound' : null } |
  { 'ZeroAddress' : null } |
  { 'Unauthorized' : null } |
  { 'Other' : null } |
  { 'UserNotFound' : null } |
  { 'AdminAlreadyExists' : null };
export interface InputDataUser {
  'uid' : [] | [string],
  'nombre' : string,
  'typeUser' : string,
}
export type IrecId = string;
export interface IrecToken {
  'tokenId' : string,
  'irecId' : IrecId,
  'custodial' : [] | [string],
}
export type IrecTokens = Array<[string, IrecToken]>;
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
export interface Redention {
  'tokenId' : bigint,
  'owner' : User,
  'metadata' : MetadataDesc,
  'operator' : User,
  'irecId' : string,
}
export type Redentions = Array<[string, Redention]>;
export type User = Principal;
export interface _SERVICE {
  'addAdmin' : ActorMethod<[bigint, Principal], DataAdminResult>,
  'addRedention' : ActorMethod<[IrecId, bigint, User], Redention>,
  'createUser' : ActorMethod<[InputDataUser], DataUserResult>,
  'getAdmin' : ActorMethod<[User], DataAdminResult>,
  'getIrecTokens' : ActorMethod<[User], IrecTokens>,
  'getRedentions' : ActorMethod<[User], Redentions>,
  'getUser' : ActorMethod<[User], DataUser>,
  'getWallet' : ActorMethod<[], Principal>,
  'removeAdmin' : ActorMethod<[Principal], DataAdminResult>,
  'tokenizeIrec' : ActorMethod<[IrecId, MetadataDesc], [IrecId, string]>,
}
