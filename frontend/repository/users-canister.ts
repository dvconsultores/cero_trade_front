export class UsersCanister {
  users: any
  constructor({ users }) {
    this.users = users
  }

  init(): void {
    console.log("here", this.users);
  }
}
