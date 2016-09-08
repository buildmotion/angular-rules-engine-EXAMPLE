import { ActionBase } from './../Index';
import { ActionResult } from 'angular-rules-engine/action/Index';
import rules = require('angular-rules-engine/rules/rules');
import { Thing } from './../../shared/models/thing';
import { ServiceMessage } from 'angular-rules-engine/service/Index';
import { MessageType } from 'angular-rules-engine/service/Index';
import { ThingIsValidRule } from './../../shared/rules/thingIsValidRule';

/**
 * This is a sample action that can be used to implement business logic. Limit the
 * implementation to a single responsibility.
 *
 * One or more actions can be used to compose a specific operation for the service. 
 */
export class DoSomethingAction extends ActionBase {
    actionName: string = 'DoSomethingAction';
    isDone: boolean;
    thing: Thing;

    /**
     * Use the constructor of the [Action] to provide required elements to
     * execute the action.
     * @param what
     */
    constructor(what: Thing) {
        super();
        this.thing = what;
        console.log(`Running the [${this.actionName}] constructor.`);
    }

    /**
     * Override this method from the base [Action] class to allow for rules to be added to the
     * action's [ValidationContext]. Any rules added to the [ValidationContext] here will be executed when
     * the action's [ValidateAction] method is called - this method is just one of many pipeline methods
     * of the [Action] framework.
     */
    preValidateAction() {
        // add some rules to validate the action;
        console.log(`Running the [preValidateAction] for the ${this.actionName} action.`);

        this._validationContext
            .withSource(this.actionName)
            // .addRule(new rules.AreEqual('ThingsAreEqual', 'The things are not equal.', 'this', 'that', false))
            // .addRule(new rules.IsTrue('ThisIsTrue', 'This is not true', this.isDone, true))
            // .addRule(new rules.IsTrue('Really?', 'Is it really true?', false))
            .addRule(new rules.StringIsNotNullEmptyRange('WhatIsGood', 'The string is not valid.', "hey...", 3, 10, true))
            //.addRule(new ThingIsValidRule('ThingIsGood', 'The specified thing is not valid.', this.thing, true));
    }

    /**
     * Use this method to execute business logic - this method is allowed to execute only if the current action
     * does not contain any rule violations.
     */
    performAction() {
        console.log(`Running the [performAction] for the ${this.actionName}.`);
        this.businessProvider.doHttpService.saveSomething(this.thing).subscribe(
          value => this.thing = value,
          error => this.handleThingError(error),
          () => console.log('always do something here, right?')
      );
        this.isDone = true;
    }

    /**
     * Use this helper function to handle any errors during the request to save something.
     */
    private handleThingError(error: Error){
        // create a new message using the fluent api syntax;
        let message = new ServiceMessage(error.name, error.message)
        .WithDisplayToUser(true)
        .WithMessageType(MessageType.Error)
        .WithSource(this.actionName);

        this.serviceContext.addMessage(message);
    }

    /**
     * All concrete actions must override and implement this method. It is defined in the [Action] framework class.
     */
    validateActionResult():ActionResult {
        console.log('Running validateActionResult from action...now return an ActionResult');
        if (this._validationContext.hasRuleViolations()) {
            console.log('There are some rule violations here.');
        }

        this.actionResult = this.serviceContext.isGood ? ActionResult.Success : ActionResult.Fail;
        return this.actionResult;
    }
}