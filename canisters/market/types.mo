import Nat "mo:base/Nat";
import Nat8 "mo:base/Nat8";
import Nat16 "mo:base/Nat16";
import Nat32 "mo:base/Nat32";
import Nat64 "mo:base/Nat64";
import Blob "mo:base/Blob";
import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import TypesNft "../nft/Types";

module {
  public type Result<S, E> = {
    #Ok : S;
    #Err : E;
  };

  public type Error = {
    #Unauthorized;
    #TheTokenIsAlreadyOnSale;
    #TokenNotFound;
    #UserAlreadyExists;
    #UserNotFound;
    #AdminAlreadyExists;
    #AdminNotFound;
    #ZeroAddress;
    #TheAmountIsLessThanThePrice;
    #Other;
  };

  public type User = Principal;
  public type TokenId = Text;


  public type Market = {
    tokenId: TokenId;
    metadata: TypesNft.MetadataDesc;
    owner: User;
    price: Nat;
  };

  public type MarketResult = Result<Market, Error>;

  public type MarketInput = {
    tokenId: TokenId;
    price: Nat;
  };

  /*public type DataUser = {
    wallet: User;
    nombre: Text;
    typeUser: Text;
    uid: ?Text;
  };

  public type InputDataUser = {
    nombre: Text;
    typeUser: Text;
    uid: ?Text;
  };

  public type DataUserResult = Result<DataUser, Error>;

  public type DataAdmin = {
    wallet: User;
    nivel: Nat;
  };

  public type DataAdminResult = Result<DataAdmin, Error>;

  

  public type Redention = {
    tokenId: Nat;
    irecId: Text;
    owner: User;
    operator: User;
    metadata: tokenMetadata;
  };

  public type Redentions = HashMap.HashMap<Text, Redention>;*/
};
