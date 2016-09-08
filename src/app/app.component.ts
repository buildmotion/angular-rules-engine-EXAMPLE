import { Component } from '@angular/core';
import { DoService } from './Index';
import { BusinessProvider } from './business/index';
import { DoHttpService } from './services/index';
import { ServiceContext } from 'angular-rules-engine/service/index';
import { ServiceMessage } from 'angular-rules-engine/service/index';
import { MessageType } from 'angular-rules-engine/service/index';
import { Thing } from './shared/models/index';

@Component({
    moduleId: module.id,
    selector: 'app-root',
    templateUrl: 'app.component.html',
    providers: [ServiceContext, DoService, BusinessProvider, DoHttpService],
    styleUrls: ['app.component.css']
})
export class AppComponent {
    title = 'app works: ';
    result: Thing;
    hasSomething: boolean = false;

/**
 * 
 */
    constructor(
        private businessProvider: BusinessProvider,
        private doService: DoService) {

        // 1. make a service call to do something amazing; 
        let something = new Thing();
        something.name = 'build something amazing';
        something.description = 'The close and thoughtful observer more and more learns to recognize his limitations. He realizes that with the steady growth of knowledge more and more new problems keep on emerging.';
        this.result = this.doService.doSomething(something);

        // 2. check the results of the service call;
        if (this.doService.serviceContext.isGood()) {
            console.log(`Result: ${this.result} from the doService.`);
            this.hasSomething = true;//flips the bit to display the thing;
        } else {
            // programmatically add a new service message;
            this.doService.serviceContext.addMessage(
                new ServiceMessage('DoServiceError', 'Service errors exist.')
                    .WithDisplayToUser(true)
                    .WithMessageType(MessageType.Error)
                    .WithSource('app.component')
            );

            // show the error messages from the service context;
            console.log(`Preparing to write out the errors. Error count is ${this.doService.serviceContext.ErrorMessages.length}`)
            this.doService.serviceContext.ErrorMessages.filter(f => f.DisplayToUser)
                .forEach(e => console.log(e.toString()));
        }
    }
}
