import * as Alexa from 'alexa-sdk';
import { handler as firstHandler } from './handlers/first-handler';
import { handler as newSessionHandler } from './handlers/new-session-handler';
import { handler as startHandler } from './handlers/start-handler';
import { languageStrings } from './utterances/language-strings';

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
