import { Inject, Injectable } from '@angular/core';
import { BusinessProvider } from './business/index';
import { ServiceContext } from 'angular-rules-engine/service/index';

@Injectable()
export class DoService {
    serviceName: string = 'DoService';
    serviceContext: ServiceContext = new ServiceContext();

    /**
     * The constructor for the [Do] service. Ng2 components can use this service
     * to abstract the implementation of the business logic of the application. 
     * @param businessProvider: The [BusinessProvider] coordinates the business logic operations
     * of the application.
     */
    constructor(
        @Inject(BusinessProvider) private businessProvider: BusinessProvider) {
        console.log('Running the [DoService] constructor.');
        this.businessProvider.serviceContext = this.serviceContext;
    }

    /**
     * Use this method to do whatever you want it to do. Just define [what] using the
     * signature of the method. 
     * @param what
     */
    doSomething(what: string): boolean {
        console.log(`Running the [doSomething] method of the ${this.serviceName}.`);
        return this.businessProvider.doSomething(what);
    }
}
