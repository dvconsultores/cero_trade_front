import TrieMap "mo:base/TrieMap";
import Text "mo:base/Text";
import Principal "mo:base/Principal";
import Array "mo:base/Array";
import Debug "mo:base/Debug";
import Nat "mo:base/Nat";
import Bool "mo:base/Bool";
import Iter "mo:base/Iter";
import Result "mo:base/Result";
import Types "./types";
import Cycles "mo:base/ExperimentalCycles";
import Error "mo:base/Error";
import TypesNft "../nft/Types";
// llamadas entre canister

import Nft "canister:nft";


// canister alias "nft" not defined. this is usually fixed by running 'dfx deploy' or adding 'dependencies' in your dfx.json file
actor Market {
  stable var entriesMarketList : [(Types.TokenId, Types.Market)] = [];

  var marketList = TrieMap.fromEntries<Types.TokenId, Types.Market>(entriesMarketList.vals(), Text.equal, Text.hash);
  

  /*public shared(msg) func prueba() : async Text {
    let currentUser = "hola mundo";
    
    let pru: Text = await Users.prueba();

    Debug.print(pru);
    Debug.print("Tu redencion fue cargada correctamente gracias! :)");

    return currentUser;
  };*/

  /*public func deposit() : async () {
    let amount = Cycles.available();
    
    let deposit = Cycles.accept(amount);
  };

  public shared(msg) func getSavings() : async Nat {
    
    return Cycles.available();
  };*/

  //funcion para obtener el usuario que realiza el llamado
  public shared(msg) func getWallet() : async Principal {
    let currentUser = msg.caller;
    return currentUser;
  };
  
  //funcion agregar nft al market
  public shared (msg) func addMarket(data: Types.MarketInput) : async Types.MarketResult {
    let user : Types.User = msg.caller;

    let isExist = marketList.get(data.tokenId);

    switch isExist {
      case (?isExist) return #Err(#TheTokenIsAlreadyOnSale);
      case (null) {
        let tokenIdNat = Nat.fromText(data.tokenId);
        let idToken: Nat = switch tokenIdNat {
          case (?tokenIdNat) tokenIdNat;
          case (null) {
            0;
          }
        };

        let getMetadataResult = await Nft.getMetadata(idToken);
    
        switch getMetadataResult {
          case (#Err(_Error)) {
            throw Error.reject("Token not found")
          };
          case (#Ok(result)) {
            let metadata: TypesNft.MetadataDesc = result;

            let dataMarket: Types.Market = {
              tokenId = data.tokenId;
              metadata = metadata;
              owner = user;
              price = data.price;
            };

            marketList.put(data.tokenId, dataMarket);
            return #Ok(dataMarket);  
      
          }
        };
      };
    };
  };

  //funcion remover nft del market
  public shared (msg) func removeMarket(tokenId: Types.TokenId) : async Types.MarketResult {
    let user : Types.User = msg.caller;

    let isExist = marketList.get(tokenId);

    switch isExist {
      case (null) return #Err(#TokenNotFound);
      case (?isExist) {
        marketList.delete(tokenId);

        return #Ok(isExist);
      };
    };
  };

  
  //funcion para comprar nft
  public shared (msg) func buy(tokenId: Types.TokenId, amount: Nat) : async Types.MarketResult {
    let user : Types.User = msg.caller;

    let token = marketList.get(tokenId);

    switch token {
      case (null) return #Err(#TokenNotFound); 
      case (?token) {
        let dataToken: Types.Market = token;

        if(amount < dataToken.price) return #Err(#TheAmountIsLessThanThePrice);
        
        /*
          aqui va la accion al realizar al momento de comprar un nft,
          aun por definir.
        */
        
        let tokenIdNat = Nat.fromText(tokenId);
        let idToken: Nat = switch tokenIdNat {
          case (?tokenIdNat) tokenIdNat;
          case (null) {
            0;
          }
        };

        let transferFromResult = await Nft.transferFrom(dataToken.owner, user, idToken);
    
        switch transferFromResult {
          case (#Err(_Error)) {
            throw Error.reject("Token not found")
          };
          case (#Ok(_result)) {
            marketList.delete(tokenId);
        
            return #Ok(token);  
      
          }
        };        
      }
    };
  };


  public query func getMarket() : async [(Types.TokenId, Types.Market)] {
    return Iter.toArray<(Types.TokenId, Types.Market)>(marketList.entries())
  };


  system func preupgrade() {
    entriesMarketList := Iter.toArray(marketList.entries());
  };

  system func postupgrade() {
    entriesMarketList := [];
  };

};
