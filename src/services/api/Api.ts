// import { bind } from 'decko';
// import HttpActions from './HttpActions';

// import BaseApi from './BaseApi';

class Api {
  // private actions: HttpActions;

  constructor(public baseUrl: string, public version: string = 'v1') {
    // this.actions = new HttpActions(`${baseUrl}/${version}`);
  }

  // @bind
  // public setToken(token: string | null) {
  //   const apiSet: BaseApi[] = [this.data];

  //   apiSet.forEach(item => item.token = token);
  // }
}

export default Api;
