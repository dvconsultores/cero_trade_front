# Cero Trade

## Project setup

```
# init ic background replica
dfx start

# install dependencies
npm install

# generate declarations
dfx generate

cp src/declarations/market/* .dfx/local/canisters/market/
cp src/declarations/nft/* .dfx/local/canisters/nft/
cp src/declarations/users/* .dfx/local/canisters/users/

# deploy canisters
dfx deploy
```

### Compiles and hot-reloads for development

```
npm run dev
```

### Customize configuration

See [Configuration Reference](https://vitejs.dev/config/).


### Guides

#### Vue frontend
https://internetcomputer.org/docs/current/developer-docs/frontend/vue-frontend

#### Internet identity integration
https://internetcomputer.org/docs/current/developer-docs/integrations/internet-identity/integrate-identity

#### How to export and import identities between devices
* export: `dfx identity export <identity_name> > exported_identity.pem`

* import: `dfx identity import <new_identity_name> <exported_identity_root_file.pem>`

#### Mainnet deploy
https://internetcomputer.org/docs/current/developer-docs/setup/deploy-mainnet