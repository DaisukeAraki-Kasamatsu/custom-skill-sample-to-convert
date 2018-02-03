import * as Alexa from 'alexa-sdk';
import { HandlerStateTypes } from '../enums/handler-state-types';

export const handler: Alexa.Handlers<any> = Alexa.CreateStateHandler(HandlerStateTypes.START_MODE, {
  'Start': function (this: Alexa.Handler<any>) {
    this.handler.state = HandlerStateTypes.FIRST_MODE;
    this.emit(':ask', this.t('ASK_START_MODE'), this.t('ASK_START_MODE_REPROMPT'));
  },
  'HelloWorldIntent': function (this: Alexa.Handler<any>) {
    this.emit(':ask', this.t('TELL_HELLO_WORLD'), this.t('ASK_ANYTHING_ELSE'));
  },
  'AMAZON.HelpIntent': function (this: Alexa.Handler<any>) {
    this.emit(':ask', this.t('ASK_HELP_MESSAGE'));
  },
  'AMAZON.StopIntent' : function (this: Alexa.Handler<any>) {
    this.emit(':tell', this.t('TELL_GOOD_BYE'));
  },
  'Unhandled': function (this: Alexa.Handler<any>) {
    this.emit(':ask', this.t('ASK_UNHANDLED_MESSAGE'));
  }
});
