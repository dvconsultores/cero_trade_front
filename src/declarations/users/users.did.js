export const idlFactory = ({ IDL }) => {
  const User = IDL.Principal;
  const DataAdmin = IDL.Record({ 'level' : IDL.Nat, 'wallet' : User });
  const Error = IDL.Variant({
    'UserAlreadyExists' : IDL.Null,
    'AdminNotFound' : IDL.Null,
    'ZeroAddress' : IDL.Null,
    'Unauthorized' : IDL.Null,
    'Other' : IDL.Null,
    'UserNotFound' : IDL.Null,
    'AdminAlreadyExists' : IDL.Null,
  });
  const DataAdminResult = IDL.Variant({ 'Ok' : DataAdmin, 'Err' : Error });
  const IrecId = IDL.Text;
  const MetadataVal = IDL.Variant({
    'Nat64Content' : IDL.Nat64,
    'Nat32Content' : IDL.Nat32,
    'Nat8Content' : IDL.Nat8,
    'NatContent' : IDL.Nat,
    'Nat16Content' : IDL.Nat16,
    'BlobContent' : IDL.Vec(IDL.Nat8),
    'TextContent' : IDL.Text,
  });
  const MetadataKeyVal = IDL.Record({ 'key' : IDL.Text, 'val' : MetadataVal });
  const MetadataPurpose = IDL.Variant({
    'Preview' : IDL.Null,
    'Rendered' : IDL.Null,
  });
  const MetadataPart = IDL.Record({
    'data' : IDL.Vec(IDL.Nat8),
    'key_val_data' : IDL.Vec(MetadataKeyVal),
    'purpose' : MetadataPurpose,
  });
  const MetadataDesc = IDL.Vec(MetadataPart);
  const Redention = IDL.Record({
    'tokenId' : IDL.Nat,
    'owner' : User,
    'metadata' : MetadataDesc,
    'operator' : User,
    'irecId' : IDL.Text,
  });
  const InputDataUser = IDL.Record({
    'uid' : IDL.Opt(IDL.Text),
    'nombre' : IDL.Text,
    'typeUser' : IDL.Text,
  });
  const DataUser = IDL.Record({
    'uid' : IDL.Opt(IDL.Text),
    'nombre' : IDL.Text,
    'wallet' : User,
    'typeUser' : IDL.Text,
  });
  const DataUserResult = IDL.Variant({ 'Ok' : DataUser, 'Err' : Error });
  const IrecToken = IDL.Record({
    'tokenId' : IDL.Text,
    'irecId' : IrecId,
    'custodial' : IDL.Opt(IDL.Text),
  });
  const IrecTokens = IDL.Vec(IDL.Tuple(IDL.Text, IrecToken));
  const Redentions = IDL.Vec(IDL.Tuple(IDL.Text, Redention));
  return IDL.Service({
    'addAdmin' : IDL.Func([IDL.Nat, IDL.Principal], [DataAdminResult], []),
    'addRedention' : IDL.Func([IrecId, IDL.Nat, User], [Redention], []),
    'createUser' : IDL.Func([InputDataUser], [DataUserResult], []),
    'getAdmin' : IDL.Func([User], [DataAdminResult], ['query']),
    'getIrecTokens' : IDL.Func([User], [IrecTokens], ['query']),
    'getRedentions' : IDL.Func([User], [Redentions], ['query']),
    'getUser' : IDL.Func([User], [DataUser], ['query']),
    'getWallet' : IDL.Func([], [IDL.Principal], []),
    'removeAdmin' : IDL.Func([IDL.Principal], [DataAdminResult], []),
    'tokenizeIrec' : IDL.Func([IrecId, MetadataDesc], [IrecId, IDL.Text], []),
  });
};
export const init = ({ IDL }) => { return []; };
