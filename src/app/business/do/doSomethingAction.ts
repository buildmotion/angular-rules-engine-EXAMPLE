import { ActionBase } from './../Index';
import { ActionResult } from 'angular-rules-engine/action/Index';
import rules = require('angular-rules-engine/rules/rules');

/**
 * This is a sample action that can be used to implement business logic. Limit the
 * implementation to a single responsibility.
 *
 * One or more actions can be used to compose a specific operation for the service. 
 */
export class DoSomethingAction extends ActionBase {
    actionName: string = 'DoSomethingAction';
    what: string;
    isDone: boolean;

    /**
     * Use the constructor of the [Action] to provide required elements to
     * execute the action.
     * @param what
     */
    constructor(what: string) {
        super();
        this.what = what;
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
        console.log('Running the [preValidateAction] for the action: ' + this.what);

        this._validationContext
            .withSource(this.actionName)
            .addRule(new rules.AreEqual('ThingsAreEqual', 'The things are not equal.', 'this', 'that', false))
            .addRule(new rules.IsTrue('ThisIsTrue', 'This is not true', this.isDone, true))
            .addRule(new rules.IsTrue('Really?', 'Is it really true?', false))
            .addRule(new rules.StringIsNotNullEmptyRange('StringIsGood', 'The string is not valid.', 'Hi', 3, 10));
    }

    /**
     * Use this method to execute business logic - this method is allowed to execute only if the current action
     * does not contain any rule violations.
     */
    performAction() {
        console.log(`Running the [performAction] for the ${this.actionName}.`);
        console.log(`Working on ${this.what} for the ${this.actionName}.`);
        this.businessProvider.doHttpService.saveSomething(1);

        this.isDone = true;
    }

    /**
     * All concrete actions must override and implement this method. It is defined in the [Action] framework class.
     */
    validateActionResult():ActionResult {
        console.log('Running validateActionResult from action...now return an ActionResult');
        if (this._validationContext.hasRuleViolations) {
            console.log('There are some rule violations here.');
        }

        this.actionResult = this.serviceContext.isGood ? ActionResult.Success : ActionResult.Fail;
        return this.actionResult;
    }
}