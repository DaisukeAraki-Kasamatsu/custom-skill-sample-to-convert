'use strict';
var Alexa = require('alexa-sdk');

exports.handler = function(event, context, callback) {
  var alexa = Alexa.handler(event, context, callback);
  if (process.env.APP_ID) alexa.appId = process.env.APP_ID;
  alexa.resources = languageStrings;
  alexa.registerHandlers(newSessionHandler, startHandler, firstHandler);
  alexa.execute();
};

const handlerStates = {
  NONE: '',
  START_MODE: '_START_MODE',
  FIRST_MODE: '_FIRST_MODE'
};

var languageStrings = {
  "ja-JP": {
    "translation": {
      "TELL_WELCOME_MESSAGE": "タイろうへようこそ。 ",
      "ASK_HELP_MESSAGE": "声を聞かせて、と言ってください。",
      "ASK_START_MODE": "ファーストモードに変更します。数字を言ってください。",
      "ASK_START_MODE_REPROMPT": "数字を言ってください。",
      "ASK_UNHANDLED_MESSAGE": "すみません、よく聞きとれませんでした。もう一回言ってください。",
      "TELL_GOOD_BYE": "さようなら",
      "TELL_UNHANDLED_MESSAGE": "すみません、よく聞きとれませんでした。",
      "ASK_ANSWER_NUMBER": "%s。他に聞きたい数字はありますか？",
      "ASK_ANSWER_NUMBER_REPROMPT": "数字を言ってください。",
      "TELL_HELLO_WORLD": "こんにちは、世界",
      "ASK_ANYTHING_ELSE": "他になにかありますか？",
    }
  }
};

const newsContents = {
  "1": "1番です",
  "2": "2番です",
  "3": "3番です",
};

const newSessionHandler = {
  'LaunchRequest': function () {
    this.handler.state = handlerStates.START_MODE;
    this.emitWithState('Start');
  },
  'AMAZON.HelpIntent': function() {
    this.emit(':ask', this.t('ASK_HELP_MESSAGE'));
  },
  'Unhandled': function() {
    this.emit(':ask', this.t('ASK_UNHANDLED_MESSAGE'));
  }
};

const startHandler = Alexa.CreateStateHandler(handlerStates.START_MODE, {
  'Start': function () {
    this.handler.state = handlerStates.FIRST_MODE;
    this.emit(':ask', this.t('ASK_START_MODE'), this.t('ASK_START_MODE_REPROMPT'));
  },
  'HelloWorldIntent': function() {
    this.emit(':ask', this.t('TELL_HELLO_WORLD'), this.t('ASK_ANYTHING_ELSE'));
  },
  'AMAZON.HelpIntent': function() {
    this.emit(':ask', this.t('ASK_HELP_MESSAGE'));
  },
  'AMAZON.StopIntent' : function() {
    this.emit(':tell', this.t('TELL_GOOD_BYE'));
  },
  'Unhandled': function() {
    this.emit(':ask', this.t('ASK_UNHANDLED_MESSAGE'));
  }
});

const firstHandler = Alexa.CreateStateHandler(handlerStates.FIRST_MODE, {
  'FirstIntent': function () {
    var sayNumber = this.event.request.intent.slots.number.value;

    if (!sayNumber || !newsContents.hasOwnProperty(sayNumber)) {
      this.emitWithState("Unhandled");
    }

    getNewsAsync(sayNumber)
      .then((content) => {
        this.emit(':ask', this.t('ASK_ANSWER_NUMBER', content), this.t('ASK_ANSWER_NUMBER_REPROMPT'));
      })
      .catch((error) => {
        this.emitWithState("Unhandled");
      });
  },
  'AMAZON.StopIntent' : function() {
    this.emit(':tell', this.t('TELL_GOOD_BYE'));
  },
  'Unhandled': function() {
    this.emit(':ask', this.t('ASK_UNHANDLED_MESSAGE'));
  }
});

function getNewsAsync(number) {
  return new Promise(function(resolve, reject) {
    resolve(newsContents[number]);
  });
}
