import * as Alexa from 'alexa-sdk';
import { HandlerStateTypes } from '../enums/handler-state-types';
import { HelpIntent } from '../intents/help-intent';

export const handler: Alexa.Handlers<any> = Alexa.CreateStateHandler(HandlerStateTypes.FIRST_MODE, {
  'FirstIntent': function (this: Alexa.Handler<any>) {
    const sayNumber = this.event.request.intent.slots.number.value;

    if (!sayNumber || !newsContents.hasOwnProperty(sayNumber)) {
      this.emitWithState('Unhandled');
    }

    getNewsAsync(sayNumber)
      .then((content) => {
        this.emit(':ask', this.t('ASK_ANSWER_NUMBER', content), this.t('ASK_ANSWER_NUMBER_REPROMPT'));
      })
      .catch((error) => {
        this.emitWithState('Unhandled');
      });
  },
  'AMAZON.HelpIntent': function (this: Alexa.Handler<any>) {
    (new HelpIntent(this)).execute();
  },
  'AMAZON.StopIntent' : function (this: Alexa.Handler<any>) {
    this.emit(':tell', this.t('TELL_GOOD_BYE'));
  },
  'Unhandled': function (this: Alexa.Handler<any>) {
    this.emit(':ask', this.t('ASK_UNHANDLED_MESSAGE'));
  }
});

const newsContents: {[key: string]: string } = {
  '1': '1番です',
  '2': '2番です',
  '3': '3番です'
};

function getNewsAsync(sayNumber: string) {
  return new Promise((resolve, reject) => {
    resolve(newsContents[sayNumber]);
  });
}
