import Nat "mo:base/Nat";
import Nat8 "mo:base/Nat8";
import Nat16 "mo:base/Nat16";
import Nat32 "mo:base/Nat32";
import Nat64 "mo:base/Nat64";
import List "mo:base/List";
import Array "mo:base/Array";
import Option "mo:base/Option";
import Bool "mo:base/Bool";
import Principal "mo:base/Principal";
import Blob "mo:base/Blob";
import Debug "mo:base/Debug";
import Types "./Types";
//import Market "canister:market";



// shared actor class NFT(custodian: Principal, init : Types.NonFungibleToken) = Self {
actor NFT {
  stable var transactionId: Types.TransactionId = 0;
  stable var nfts = List.nil<Types.Nft>();
  //stable var custodians = List.make<Principal>(custodian);
  /*stable var custodians = List.fromArray<Principal>([
    Principal.fromText("dqerg-34aaa-aaaaa-qaapq-cai"), // canister nft
    Principal.fromText("gm7ld-quaaa-aaaaa-qaaqa-cai"), // canister users
    Principal.fromText("dxfxs-weaaa-aaaaa-qaapa-cai") // canister market
  ]);*/
  stable var custodians = List.nil<Principal>();
  stable var logoResult: Types.LogoResult = {
    logo_type = "";
    data = "";
  };
  stable var logoType: Types.LogoResult = logoResult;
  stable var nameType : Text = "Cero Trade";
  stable var symbolType : Text = "CT";
  stable var maxLimit : Nat16 = 3;
  stable var tokenNextId: Nat = 0;

  /*stable var transactionId: Types.TransactionId = 0;
  stable var nfts = List.nil<Types.Nft>();
  //stable var custodians = List.make<Principal>(custodian);
  stable var custodians = List.nill<Principal>();
  stable var logoType : Types.LogoResult = init.logo;
  stable var nameType : Text = init.name;
  stable var symbolType : Text = init.symbol;
  stable var maxLimit : Nat16 = init.maxLimit;
  stable var tokenNextId: Nat = 0;*/


  // https://forum.dfinity.org/t/is-there-any-address-0-equivalent-at-dfinity-motoko/5445/3
  let null_address : Principal = Principal.fromText("aaaaa-aa");

  public func init() : async [Principal] {
    let initialSize = List.size(custodians);
    Debug.print("size: " # Nat.toText(initialSize));
    if(initialSize == 0) {
      Debug.print("paso");
      /*let list = List.fromArray<Principal>([
        Principal.fromText("dqerg-34aaa-aaaaa-qaapq-cai"), // canister nft
        Principal.fromText("gm7ld-quaaa-aaaaa-qaaqa-cai"), // canister users
        Principal.fromText("dxfxs-weaaa-aaaaa-qaapa-cai") // canister market
      ]);
      custodians := list;*/

      //localnet
      /*custodians := List.push(Principal.fromText("dqerg-34aaa-aaaaa-qaapq-cai"), custodians); // canister nft
      custodians := List.push(Principal.fromText("gm7ld-quaaa-aaaaa-qaaqa-cai"), custodians); // canister users
      custodians := List.push(Principal.fromText("dxfxs-weaaa-aaaaa-qaapa-cai"), custodians); // canister market*/

      //mainnet
      custodians := List.push(Principal.fromText("jt4za-yiaaa-aaaap-abrla-cai"), custodians); // canister nft
      custodians := List.push(Principal.fromText("ju57u-vqaaa-aaaap-abrlq-cai"), custodians); // canister users
      custodians := List.push(Principal.fromText("j27s4-oaaaa-aaaap-abrkq-cai"), custodians); // canister market
      /*
        market: https://a4gq6-oaaaa-aaaab-qaa4q-cai.raw.icp0.io/?id=j27s4-oaaaa-aaaap-abrkq-cai
        nft: https://a4gq6-oaaaa-aaaab-qaa4q-cai.raw.icp0.io/?id=jt4za-yiaaa-aaaap-abrla-cai
        users: https://a4gq6-oaaaa-aaaab-qaa4q-cai.raw.icp0.io/?id=ju57u-vqaaa-aaaap-abrlq-cai
      */
    };
    List.toArray(custodians)
  };

  public query func getCustodians() : async [Principal] {
    List.toArray(custodians)
  };

  public query func balanceOf(user: Principal) : async Nat64 {
    return Nat64.fromNat(
      List.size(
        List.filter(nfts, func(token: Types.Nft) : Bool { token.owner == user })
      )
    );
  };

  public query func ownerOf(token_id: Types.TokenId) : async Types.OwnerResult {
    let item = List.find(nfts, func(token: Types.Nft) : Bool { token.id == token_id });
    switch (item) {
      case (null) {
        return #Err(#InvalidTokenId);
      };
      case (?token) {
        return #Ok(token.owner);
      };
    };
  };

  public shared({ caller }) func safeTransferFrom(from: Principal, to: Principal, token_id: Types.TokenId) : async Types.TxReceipt {  
    if (to == null_address) {
      return #Err(#ZeroAddress);
    } else {
      return await transferFromInternal(from, to, token_id, caller);
    };
  };

  public shared({ caller }) func transferFrom(from: Principal, to: Principal, token_id: Types.TokenId) : async Types.TxReceipt {
    return await transferFromInternal(from, to, token_id, caller);
  };

  func transferFromInternal(from: Principal, to: Principal, token_id: Types.TokenId, caller: Principal) : async Types.TxReceipt {
    let item = List.find(nfts, func(token: Types.Nft) : Bool { token.id == token_id });
    switch (item) {
      case null {
        return #Err(#InvalidTokenId);
      };
      case (?token) {
        if (
          caller != token.owner and
          not List.some(custodians, func (custodian : Principal) : Bool { custodian == caller })
        ) {
          return #Err(#Unauthorized);
        } else if (Principal.notEqual(from, token.owner)) {
          return #Err(#Other);
        } else {
          var isTranfer: Bool = true;
          nfts := List.map(nfts, func (item : Types.Nft) : Types.Nft {
            if (item.id == token.id) {
              let update : Types.Nft = {
                owner = to;
                id = item.id;
                metadata = token.metadata;
              };
              
              isTranfer := true;

              return update;
            } else {
              return item;
            };
          });

          /*if(isTranfer) {
            Market.removeMarket("1");
          };*/

          transactionId += 1;
          return #Ok(transactionId);   
        };
      };
    };
  };


  public query func supportedInterfaces() : async [Types.InterfaceId] {
    return [#TransferNotification, #Burn, #Mint];
  };

  public query func logo() : async Types.LogoResult {
    return logoType;
  };

  public query func name() : async Text {
    return nameType;
  };

  public query func symbol() : async Text {
    return symbolType;
  };

  public query func totalSupply() : async Nat64 {
    return Nat64.fromNat(
      List.size(nfts)
    );
  };

  public query func getMetadata(token_id: Types.TokenId) : async Types.MetadataResult {
    let item = List.find(nfts, func(token: Types.Nft) : Bool { token.id == token_id });
    switch (item) {
      case null {
        return #Err(#InvalidTokenId);
      };
      case (?token) {
        return #Ok(token.metadata);
      }
    };
  };

  public query func getMaxLimit() : async Nat16 {
    return maxLimit;
  };

  public func getMetadataForUser(user: Principal) : async Types.ExtendedMetadataResult {
    let item = List.find(nfts, func(token: Types.Nft) : Bool { token.owner == user });
    switch (item) {
      case null {
        return #Err(#Other);
      };
      case (?token) {
        return #Ok({
          metadata_desc = token.metadata;
          token_id = token.id;
        });
      }
    };
  };

  public query func getTokenIdsForUser(user: Principal) : async [Types.TokenId] {
    let items = List.filter(nfts, func(token: Types.Nft) : Bool { token.owner == user });
    let tokenIds = List.map(items, func (item : Types.Nft) : Types.TokenId { item.id });
    return List.toArray(tokenIds);
  };

  public shared({ caller }) func burn(token_id: Types.TokenId) : async Types.TxReceipt {
    let item = List.find(nfts, func(token: Types.Nft) : Bool { token.id == token_id });
    switch (item) {
      case null {
        return #Err(#InvalidTokenId);
      };
      case (?token) {
        if (
          caller != token.owner and
          not List.some(custodians, func (custodian : Principal) : Bool { custodian == caller })
        ) {
          return #Err(#Unauthorized);
        } else {
          
          // aca se elimina el nft
          return #Ok(transactionId); 
        };
      };
    };
  };

  public shared({ caller }) func mint(to: Principal, metadata: Types.MetadataDesc) : async Types.MintReceipt {
    Debug.print("quien llama! : " # Principal.toText(caller));
    for (element in List.toArray(custodians).vals()) {
      Debug.print(Principal.toText(element));
    };
    
    if (not List.some(custodians, func (custodian : Principal) : Bool { custodian == caller })) {
      return #Err(#Unauthorized);
    };

    // let newId = Nat64.fromNat(List.size(nfts));
    let newId = tokenNextId;
    let nft : Types.Nft = {
      owner = to;
      id = newId;
      metadata = metadata;
    };

    nfts := List.push(nft, nfts);

    tokenNextId += 1;
    transactionId += 1;

    return #Ok({
      token_id = newId;
      id = transactionId;
    });
  };
};