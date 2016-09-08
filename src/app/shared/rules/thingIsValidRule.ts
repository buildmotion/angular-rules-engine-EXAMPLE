import { CompositeRule } from 'angular-rules-engine/rules/index';
import { Thing } from './../models/index'
import {StringIsNotNullEmptyRange} from  'angular-rules-engine/rules/rules';
import {IsNotNullOrUndefined} from  'angular-rules-engine/rules/rules';

export class ThingIsValidRule extends CompositeRule {

    target: Thing;

    /**
     * The constructor for the [ThingIsValidRule].
     * @param name: The name of the rule.
     * @param message: The message to display when the rule is violated.
     * @param target: The target that the rule(s) will be evaluated against.
     * @param minLength: The minimum allowed length of the target value.
     * @param maxLength: The maximum allowed length of the target value.
     */
    constructor(name: string, message: string, target: Thing, isDisplayable: boolean = false) {
        super(name, message);
        this.target = target;
        this.configureRules();
    }

     /**
     * A helper method to configure/add rules to the validation context. 
     */
    configureRules() {
        this.rules.push(new IsNotNullOrUndefined('StringIsNotNull', 'The string target is null or undefined.', this.target));
        if (this.target != null) {
            // 1. validate the name;
            this.rules.push(new StringIsNotNullEmptyRange('ThingNameIsValid', 'The name of the thing is not valid.', this.target.name, 3, 42, true));
            this.rules.push(new StringIsNotNullEmptyRange('ThingDescriptionIsValid', 'The description of the thing is not valid.', this.target.description, 3, 42, true));
        }
    }
}