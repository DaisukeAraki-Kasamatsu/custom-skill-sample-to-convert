import * as Alexa from 'alexa-sdk';
import { HandlerStateTypes } from '../enums/handler-state-types';
import { HelpIntent } from '../intents/help-intent';

export const handler: Alexa.Handlers<any> = {
  'LaunchRequest': function (this: Alexa.Handler<any>) {
    this.handler.state = HandlerStateTypes.START_MODE;
    this.emitWithState('Start');
  },
  'AMAZON.HelpIntent': function (this: Alexa.Handler<any>) {
    (new HelpIntent(this)).execute();
  },
  'Unhandled': function (this: Alexa.Handler<any>) {
    this.emit(':ask', this.t('ASK_UNHANDLED_MESSAGE'));
  }
};
