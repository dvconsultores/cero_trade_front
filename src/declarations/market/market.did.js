export const idlFactory = ({ IDL }) => {
  const TokenId = IDL.Text;
  const MarketInput = IDL.Record({ 'tokenId' : TokenId, 'price' : IDL.Nat });
  const User = IDL.Principal;
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
  const Market = IDL.Record({
    'tokenId' : TokenId,
    'owner' : User,
    'metadata' : MetadataDesc,
    'price' : IDL.Nat,
  });
  const Error = IDL.Variant({
    'UserAlreadyExists' : IDL.Null,
    'TokenNotFound' : IDL.Null,
    'AdminNotFound' : IDL.Null,
    'ZeroAddress' : IDL.Null,
    'Unauthorized' : IDL.Null,
    'Other' : IDL.Null,
    'TheAmountIsLessThanThePrice' : IDL.Null,
    'TheTokenIsAlreadyOnSale' : IDL.Null,
    'UserNotFound' : IDL.Null,
    'AdminAlreadyExists' : IDL.Null,
  });
  const MarketResult = IDL.Variant({ 'Ok' : Market, 'Err' : Error });
  return IDL.Service({
    'addMarket' : IDL.Func([MarketInput], [MarketResult], []),
    'buy' : IDL.Func([TokenId, IDL.Nat], [MarketResult], []),
    'getMarket' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(TokenId, Market))],
        ['query'],
      ),
    'getWallet' : IDL.Func([], [IDL.Principal], []),
    'removeMarket' : IDL.Func([TokenId], [MarketResult], []),
  });
};
export const init = ({ IDL }) => { return []; };
