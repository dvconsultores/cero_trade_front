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
import Error "mo:base/Error";
import TypesNft "../nft/Types";

import Nft "canister:nft";


actor Users {
  stable var entriesUsers : [(Types.User, Types.DataUser)] = [];
  stable var entriesAdmins : [(Types.User, Types.DataAdmin)] = [];
  stable var entriesRedentionsUser : [(Types.User, Types.Redentions)] = [];
  stable var entriesIrecTokensUser : [(Types.User, Types.IrecTokens)] = [];
  

  var users = TrieMap.fromEntries<Types.User, Types.DataUser>(entriesUsers.vals(), Principal.equal, Principal.hash);
  var admins = TrieMap.fromEntries<Types.User, Types.DataAdmin>(entriesAdmins.vals(), Principal.equal, Principal.hash);
  var redentionsUser = TrieMap.fromEntries<Types.User, Types.Redentions>(entriesRedentionsUser.vals(), Principal.equal, Principal.hash);
  var irecTokensUser = TrieMap.fromEntries<Types.User, Types.IrecTokens>(entriesIrecTokensUser.vals(), Principal.equal, Principal.hash);


  /* public shared(msg) func prueba() : async Text {

    let currentUser: Text = "si funciono " #  Principal.toText(msg.caller);
    // Debug.print();
    return currentUser;
  }; */

  //funcion para obtener el usuario que realiza el llamado
  public shared(msg) func getWallet() : async Principal {
    let currentUser = msg.caller;
    return currentUser;
  };
  
  //funcion agregar administrador
  public shared (msg) func addAdmin(level: Nat, user: Principal) : async Types.DataAdminResult {
    let caller : Types.User = msg.caller;

    let isExist = admins.get(user);

    switch isExist {
      case (?isExist) return #Err(#AdminAlreadyExists);
      case (null) {
        let dataAdmin: Types.DataAdmin = {
          wallet = user;
          level = level;
        };

        let create = admins.put(user, dataAdmin);
        return #Ok(dataAdmin);
      };
    };
  };

  //funcion remover administrador
  public shared (msg) func removeAdmin(user: Principal) : async Types.DataAdminResult {
    let caller : Types.User = msg.caller;

    let isExist = admins.get(user);

    switch isExist {
      case (?isExist) {
        admins.delete(user);

        return #Ok(isExist);
      };
      case (null) return #Err(#AdminNotFound);
    };
  };

  //funcion para crear el usuaio
  public shared (msg) func createUser(data: Types.InputDataUser) : async Types.DataUserResult {
    let user : Types.User = msg.caller;

    let isExist = users.get(user);

    switch isExist {
      case (?isExist) return #Err(#UserAlreadyExists);
      case (null) {
        let dataUser: Types.DataUser = {
          wallet = user;
          nombre = data.nombre;
          typeUser = data.typeUser;
          uid = data.uid;
        };

        let create = users.put(user, dataUser);
        return #Ok(dataUser);
      };
    };
  };


  //funcion para crear el usuaio
  public shared (msg) func addRedention(irecId: Types.IrecId, tokenId: Nat, operator: Types.User) : async Types.Redention {
    let user : Types.User = msg.caller;

    let resultRedention = redentionsUser.get(user);

    var redentions : Types.Redentions = switch resultRedention {
      case (null) {
        []
      };
      case (?resultRedention) resultRedention;
    };


    let getMetadataResult = await Nft.getMetadata(tokenId);
    
    switch getMetadataResult {
      case (#Err(_Error)) {
        throw Error.reject("Token not found")
      };
      case (#Ok(result)) {
        let metadata: TypesNft.MetadataDesc = result;
        
        let burnResult = await Nft.burn(tokenId);

        switch burnResult {
          case (#Err(_Error)) {
            throw Error.reject("Token not found")
          };
          case (#Ok(_result)) {
            // let metadata: TypesNft.MetadataDesc = result;

            let resultIrecToken = irecTokensUser.get(user);

            switch resultIrecToken {
              case (null) {
                throw Error.reject("Irec not found")
              };
              case (?resultIrecToken) {
                let irecTokensMap = TrieMap.fromEntries<Text, Types.IrecToken>(resultIrecToken.vals(), Text.equal, Text.hash);
                
                irecTokensMap.delete(irecId);

                irecTokensUser.put(user, Iter.toArray(irecTokensMap.entries()));

                
                let dataRedention: Types.Redention = {
                  tokenId = tokenId;
                  irecId = irecId;
                  owner = user;
                  operator = operator;
                  metadata = metadata;
                };
                
                let redentionsMap = TrieMap.fromEntries<Text, Types.Redention>(redentions.vals(), Text.equal, Text.hash);

                redentionsMap.put(irecId, dataRedention);

                redentionsUser.put(user, Iter.toArray(redentionsMap.entries()));      
                
                return dataRedention

              }
            };
          }
        };  
  
        /*let resultIrecToken = irecTokensUser.get(user);

        var irecTokens: Types.IrecTokens = switch resultIrecToken {
          case (null) {
            []
          };
          case (?resultIrecToken) resultIrecToken;
        };

        let tokenId: Text = Nat.toText(dataMint.token_id);

        let irecTokensMap = TrieMap.fromEntries<Text, Types.IrecToken>(irecTokens.vals(), Text.equal, Text.hash);
        let dataIrecToken: Types.IrecToken = {
          irecId = irecId;
          tokenId = tokenId;
          custodial = null;
        };
        irecTokensMap.put(irecId, dataIrecToken);

        irecTokensUser.put(user, Iter.toArray(irecTokensMap.entries()));

        return tokenId*/
      }
    };
    
  };

  
  //funcion tokenizar token
  public shared ({caller}) func tokenizeIrec(irecId: Types.IrecId, metadata: TypesNft.MetadataDesc) : async (Types.IrecId, Text) {
    let user : Types.User = caller;

    let resultUser = users.get(user);
    
    var dataUser : Types.DataUser = switch resultUser {
      case (null) {
        throw Error.reject("user not found")
      };
      case (?resultUser) {
        let uid: ?Text = resultUser.uid;
        switch uid {
          case (null) {
            throw Error.reject("unauthorized user")
          };
          case (?uid) resultUser
        };
      };
    };
    
    // aca se realiza el tokenizado del token

    //metadata token
    /*let metadataKeyVal: [TypesNft.MetadataKeyVal] = [
      { key= "title"; val= #TextContent("e"); },
      { key= "description"; val= #TextContent("e"); },
      { key= "media"; val= #TextContent("e"); },
      { key= "irec"; val= #TextContent("e"); }
    ];
    let metadataPart: TypesNft.MetadataPart = {
      purpose = #Preview;
      key_val_data = metadataKeyVal;
      data = "IREC";
    };
    let metadata: TypesNft.MetadataDesc = [metadataPart];*/

    let mintResult = await Nft.mint(caller, metadata);
    
    switch mintResult {
      case (#Err(_Error)) {
        throw Error.reject("Unauthorized")
      };
      case (#Ok(result)) {
        let dataMint: TypesNft.MintReceiptPart = result;
        
        let resultIrecToken = irecTokensUser.get(user);

        var irecTokens: Types.IrecTokens = switch resultIrecToken {
          case (null) {
            []
          };
          case (?resultIrecToken) resultIrecToken;
        };

        let tokenId: Text = Nat.toText(dataMint.token_id);

        let irecTokensMap = TrieMap.fromEntries<Text, Types.IrecToken>(irecTokens.vals(), Text.equal, Text.hash);
        let dataIrecToken: Types.IrecToken = {
          irecId = irecId;
          tokenId = tokenId;
          custodial = null;
        };
        irecTokensMap.put(irecId, dataIrecToken);

        irecTokensUser.put(user, Iter.toArray(irecTokensMap.entries()));

        return (irecId, tokenId)
      }
    };
  };
  
  
  //funcion para consultar una actividad en espesifico
  public query func getAdmin(user : Types.User) : async Types.DataAdminResult {
    let result = admins.get(user);

    switch result {
      case (null) return #Err(#AdminNotFound);
      case (?result) return #Ok(result);
    };
  };

  //funcion para consultar una actividad en espesifico
  /* public query func getUser(user : Types.User) : async Types.DataUserResult {
    let result = users.get(user);

    switch result {
      case (null) return #Err(#UserNotFound);
      case (?result) return #Ok(result);
    };
  }; */

  //funcion para consultar una actividad en espesifico
  public query func getUser(user : Types.User) : async Types.DataUser {
    let result = users.get(user);

    switch result {
      case (null) return throw Error.reject("User not found") ;
      case (?result) return result;
    };
  };


  public query func getIrecTokens(user : Types.User) : async Types.IrecTokens {
    let result = irecTokensUser.get(user);

    switch result {
      case (null) return throw Error.reject("User not found") ;
      case (?result) return result;
    };
  };

  public query func getRedentions(user : Types.User) : async Types.Redentions {
    let result = redentionsUser.get(user);

    switch result {
      case (null) return throw Error.reject("User not found") ;
      case (?result) return result;
    };
  };



  system func preupgrade() {
    entriesUsers := Iter.toArray(users.entries());
    entriesAdmins := Iter.toArray(admins.entries());
    entriesRedentionsUser := Iter.toArray(redentionsUser.entries());
    entriesIrecTokensUser := Iter.toArray(irecTokensUser.entries());
  };

  system func postupgrade() {
    entriesUsers := [];
    entriesAdmins := [];
    entriesRedentionsUser := [];
    entriesIrecTokensUser := [];
  };

};
