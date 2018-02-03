import * as Alexa from 'alexa-sdk';

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

const handlerStates = {
  NONE: '',
  START_MODE: '_START_MODE',
  FIRST_MODE: '_FIRST_MODE'
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

const newsContents: {[key: string]: string } = {
  '1': '1番です',
  '2': '2番です',
  '3': '3番です'
};

const newSessionHandler: Alexa.Handlers<any> = {
  'LaunchRequest': function (this: Alexa.Handler<any>) {
    this.handler.state = handlerStates.START_MODE;
    this.emitWithState('Start');
  },
  'AMAZON.HelpIntent': function (this: Alexa.Handler<any>) {
    this.emit(':ask', this.t('ASK_HELP_MESSAGE'));
  },
  'Unhandled': function (this: Alexa.Handler<any>) {
    this.emit(':ask', this.t('ASK_UNHANDLED_MESSAGE'));
  }
};

const startHandler: Alexa.Handlers<any> = Alexa.CreateStateHandler(handlerStates.START_MODE, {
  'Start': function (this: Alexa.Handler<any>) {
    this.handler.state = handlerStates.FIRST_MODE;
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

const firstHandler: Alexa.Handlers<any> = Alexa.CreateStateHandler(handlerStates.FIRST_MODE, {
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
  'AMAZON.StopIntent' : function (this: Alexa.Handler<any>) {
    this.emit(':tell', this.t('TELL_GOOD_BYE'));
  },
  'Unhandled': function (this: Alexa.Handler<any>) {
    this.emit(':ask', this.t('ASK_UNHANDLED_MESSAGE'));
  }
});

function getNewsAsync(sayNumber: string) {
  return new Promise((resolve, reject) => {
    resolve(newsContents[sayNumber]);
  });
}
