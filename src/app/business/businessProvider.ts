import { Inject, Injectable } from '@angular/core';
import { ServiceContext } from 'angular-rules-engine/service/index';
import { DoSomethingAction } from './Index';
import { DoHttpService } from './../services/index';

@Injectable()
export class BusinessProvider {

    serviceContext: ServiceContext;

    /**
     * The constructor for the [BusinessProvider]. It provides access to lower-level services (i.e., Http).
     * @param doHttpService
     */
    constructor( @Inject(DoHttpService) public doHttpService: DoHttpService) {
        console.log('Running the [BusinessProvider] constuctor.');
    }

    /**
     * This is a sample [BusinessProvider] method that uses a specific [Action] to
     * implement the business logic...
     * @param what
     */
    doSomething(what: string): boolean {
        console.log('Running the [doSomething] method of the BusinessProvider.');

        // 1. initialize an action;
        let action = new DoSomethingAction(what);

        // 2. setup the action with dependencies; and execute;
        action.Do(this);

        // 3. return action output;
        return action.isDone;
    }
}
