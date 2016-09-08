import { Action } from 'angular-rules-engine/action/Index';
import { ServiceContext } from 'angular-rules-engine/service/Index';
// import { ValidationContext } from 'angular-rules-engine/validation/Index'
import { BusinessProvider } from './Index';
import { ServiceMessage } from 'angular-rules-engine/service/Index';
import { MessageType } from 'angular-rules-engine/service/Index';
import { ActionResult } from 'angular-rules-engine/action/Index';

/**
 * Use this class as a base class for [Action] items. It allows you to abstract
 * and implement common behavior for all concrete actions that extend this class.
 */
export class ActionBase extends Action{
    serviceContext: ServiceContext;
    businessProvider: BusinessProvider;
    
    constructor(){
        super();
    }

    /**
     * Use the [Do] method to perform the action. 
     */
    Do(businessProvider: BusinessProvider){
        this.serviceContext = businessProvider.serviceContext;
        this.businessProvider = businessProvider;
        this.execute();

        if(this.actionResult == ActionResult.Fail){
            //TODO: Send this information to the application's log repository;
        }
    }

    /**
     * This method is an override of the [validateAction] in the framework [Action] class.
     */
    validateAction() {
        return this.validationContext.renderRules();
    }

    /**
     * The [postValidateAction] overrides the function in the framework [Action] class. Use this
     * method to perform operations after the rules of the [ValidationContext] have been 
     * executed. 
     */
    postValidateAction(){
        console.log('Running the [postValidateAction');
        if(this._validationContext.hasRuleViolations()){
            this._validationContext.rules.forEach(rule => {
                this.serviceContext.addMessage(new ServiceMessage(rule.name)
                    .WithMessage(rule.message)
                    .WithDisplayToUser(rule.isDisplayable)
                    .WithSource(rule.source)
                    .WithMessageType(MessageType.Error)
                );         
            });
        }
    }
}