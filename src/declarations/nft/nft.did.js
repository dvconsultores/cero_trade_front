export const idlFactory = ({ IDL }) => {
  const TokenId = IDL.Nat;
  const ApiError = IDL.Variant({
    'ZeroAddress' : IDL.Null,
    'InvalidTokenId' : IDL.Null,
    'Unauthorized' : IDL.Null,
    'Other' : IDL.Null,
  });
  const TxReceipt = IDL.Variant({ 'Ok' : IDL.Nat, 'Err' : ApiError });
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
  const MetadataResult = IDL.Variant({ 'Ok' : MetadataDesc, 'Err' : ApiError });
  const ExtendedMetadataResult = IDL.Variant({
    'Ok' : IDL.Record({ 'token_id' : TokenId, 'metadata_desc' : MetadataDesc }),
    'Err' : ApiError,
  });
  const LogoResult = IDL.Record({ 'data' : IDL.Text, 'logo_type' : IDL.Text });
  const MintReceiptPart = IDL.Record({ 'id' : IDL.Nat, 'token_id' : TokenId });
  const MintReceipt = IDL.Variant({ 'Ok' : MintReceiptPart, 'Err' : ApiError });
  const OwnerResult = IDL.Variant({ 'Ok' : IDL.Principal, 'Err' : ApiError });
  const InterfaceId = IDL.Variant({
    'Burn' : IDL.Null,
    'Mint' : IDL.Null,
    'Approval' : IDL.Null,
    'TransactionHistory' : IDL.Null,
    'TransferNotification' : IDL.Null,
  });
  return IDL.Service({
    'balanceOf' : IDL.Func([IDL.Principal], [IDL.Nat64], ['query']),
    'burn' : IDL.Func([TokenId], [TxReceipt], []),
    'getCustodians' : IDL.Func([], [IDL.Vec(IDL.Principal)], ['query']),
    'getMaxLimit' : IDL.Func([], [IDL.Nat16], ['query']),
    'getMetadata' : IDL.Func([TokenId], [MetadataResult], ['query']),
    'getMetadataForUser' : IDL.Func(
        [IDL.Principal],
        [ExtendedMetadataResult],
        [],
      ),
    'getTokenIdsForUser' : IDL.Func(
        [IDL.Principal],
        [IDL.Vec(TokenId)],
        ['query'],
      ),
    'init' : IDL.Func([], [IDL.Vec(IDL.Principal)], []),
    'logo' : IDL.Func([], [LogoResult], ['query']),
    'mint' : IDL.Func([IDL.Principal, MetadataDesc], [MintReceipt], []),
    'name' : IDL.Func([], [IDL.Text], ['query']),
    'ownerOf' : IDL.Func([TokenId], [OwnerResult], ['query']),
    'safeTransferFrom' : IDL.Func(
        [IDL.Principal, IDL.Principal, TokenId],
        [TxReceipt],
        [],
      ),
    'supportedInterfaces' : IDL.Func([], [IDL.Vec(InterfaceId)], ['query']),
    'symbol' : IDL.Func([], [IDL.Text], ['query']),
    'totalSupply' : IDL.Func([], [IDL.Nat64], ['query']),
    'transferFrom' : IDL.Func(
        [IDL.Principal, IDL.Principal, TokenId],
        [TxReceipt],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
