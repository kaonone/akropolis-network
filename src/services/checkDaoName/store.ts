import { observable, flow } from 'mobx';
import { CancellablePromise } from 'mobx/lib/api/flow';
import { PromisedReturnType } from '_helpers';
import { isNameUsed } from 'shared/helpers/aragon-wrapper';

export interface IState {
  checking: boolean;
  status: 'initial' | 'pending' | 'success' | 'error';
  isAvailable: boolean;
  checkedDomain: string;
}

const initialState: IState = {
  checkedDomain: '',
  checking: false,
  isAvailable: false,
  status: 'initial',
};

export default class DaoNameUtils {
  @observable
  public state: IState = { ...initialState };

  private currentChecking: CancellablePromise<any> | null = null;

  private checkNameAvailabilityFlow = flow(function* checkNameAvailabilityFlow(this: DaoNameUtils, domain: string) {
    if (!domain) {
      this.state = { ...initialState };
      return;
    }

    this.state = {
      ...initialState,
      checking: true,
      status: 'pending',
    };

    try {
      const isUsed: PromisedReturnType<typeof isNameUsed> = yield isNameUsed(domain);
      this.state = {
        checkedDomain: domain,
        isAvailable: !isUsed,
        checking: false,
        status: 'success',
      };
    } catch (error) {
      this.state = {
        checkedDomain: domain,
        isAvailable: false,
        checking: false,
        status: 'error',
      };
    }
  });

  public checkNameAvailability(domain: string) {
    this.currentChecking && this.currentChecking.cancel();
    this.currentChecking = this.checkNameAvailabilityFlow(domain);
  }
}
