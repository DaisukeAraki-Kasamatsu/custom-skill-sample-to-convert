import * as Alexa from 'alexa-sdk';
import { handler as firstHandler } from './handlers/first-handler';
import { handler as newSessionHandler } from './handlers/new-session-handler';
import { handler as startHandler } from './handlers/start-handler';

export const handler = (
  event: Alexa.RequestBody<any>,
  context: Alexa.Context,
  callback: (err: any, response: any) => void) => {

  const alexa = Alexa.handler(event, context, callback);
  if (process.env.APP_ID) { alexa.appId = process.env.APP_ID; }
  alexa.resources = languageStrings;
  alexa.registerHandlers(newSessionHandler, startHandler, firstHandler);
  alexa.execute();
};

const languageStrings = {
  'ja-JP': {
    'translation': {
      'TELL_WELCOME_MESSAGE': 'タイろうへようこそ。 ',
      'ASK_HELP_MESSAGE': '声を聞かせて、と言ってください。',
      'ASK_START_MODE': 'ファーストモードに変更します。数字を言ってください。',
      'ASK_START_MODE_REPROMPT': '数字を言ってください。',
      'ASK_UNHANDLED_MESSAGE': 'すみません、よく聞きとれませんでした。もう一回言ってください。',
      'TELL_GOOD_BYE': 'さようなら',
      'TELL_UNHANDLED_MESSAGE': 'すみません、よく聞きとれませんでした。',
      'ASK_ANSWER_NUMBER': '%s。他に聞きたい数字はありますか？',
      'ASK_ANSWER_NUMBER_REPROMPT': '数字を言ってください。',
      'TELL_HELLO_WORLD': 'こんにちは、世界',
      'ASK_ANYTHING_ELSE': '他になにかありますか？'
    }
  }
};
