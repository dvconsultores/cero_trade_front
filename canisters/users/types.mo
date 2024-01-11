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
    #UserAlreadyExists;
    #UserNotFound;
    #AdminAlreadyExists;
    #AdminNotFound;
    #ZeroAddress;
    #Other;
  };

  public type User = Principal;
  public type IrecId = Text;

  public type DataUser = {
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
    level: Nat;
  };

  public type DataAdminResult = Result<DataAdmin, Error>;

  public type IrecToken = {
    irecId: IrecId;
    tokenId: Text;
    custodial: ?Text;
  };

  public type IrecTokens = [(Text, IrecToken)];

  public type Redention = {
    tokenId: Nat;
    irecId: Text;
    owner: User;
    operator: User;
    metadata: TypesNft.MetadataDesc;
  };

  public type Redentions = [(Text, Redention)];// TrieMap.TrieMap<Text, Types.Redention>;
};
