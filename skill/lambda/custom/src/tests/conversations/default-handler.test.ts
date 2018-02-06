import * as conversation from 'alexa-conversation';
import { options } from '../conversation-options';
import { languageStrings } from './../../utterances/language-strings';

/**
 * ヘルプインテントの機能テスト
 */
conversation(options)
  // ヘルプインテントの呼出
  .userSays('AMAZON.HelpIntent')
  // 応答をテキストで受け取る
  .plainResponse
  // 応答テキストと想定している発話内容が完全一致しているか判定
  .shouldEqual(languageStrings['ja-JP'].translation.ASK_HELP_MESSAGE)
  // 終了
  .end();
