import * as Alexa from 'alexa-sdk';
import * as AWS from 'aws-sdk';
import { handler as firstHandler } from './handlers/first-handler';
import { handler as newSessionHandler } from './handlers/new-session-handler';
import { handler as startHandler } from './handlers/start-handler';
import { languageStrings } from './utterances/language-strings';

if (!process.env.NODE_ENV) {
  // NODE_ENVが未定義の場合

  // AWSコンフィグ設定
  AWS.config.update({
    accessKeyId: 'dummy',
    secretAccessKey: 'dummy',
    dynamodb: {
      region: 'us-east-1',
      endpoint: 'http://localhost:4569'
    }
  });
}

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
