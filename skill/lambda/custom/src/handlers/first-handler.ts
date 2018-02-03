import * as Alexa from 'alexa-sdk';
import { HandlerStateTypes } from '../enums/handler-state-types';
import { HelpIntent } from '../intents/help-intent';

import { IFirstUtteranceCondition } from '../conditions/first-utterance-condition';
import { IFirstUtteranceResult } from '../models/first-utterance-result';
import { FirstUtterance } from '../utterances/first-utterance';

export const handler: Alexa.Handlers<any> = Alexa.CreateStateHandler(HandlerStateTypes.FIRST_MODE, {
  'FirstIntent': async function (this: Alexa.Handler<any>) {
    const sayNumber = this.event.request.intent.slots.number.value;

    // 発話取得条件設定
    const condition: IFirstUtteranceCondition = {
      sayNumber: sayNumber
    };

    try {
      // 発話内容取得
      const result = await (new FirstUtterance(this)).respond(condition);

      this.emit(':ask', result.speech, result.repromptSpeech);
    } catch (error) {
      this.emitWithState('Unhandled');
    }
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
