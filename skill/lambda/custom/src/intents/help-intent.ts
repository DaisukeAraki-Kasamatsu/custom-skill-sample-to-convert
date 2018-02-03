import * as Alexa from 'alexa-sdk';
import { IntentBase } from './intent-base';

/**
 * ヘルプインテントクラス
 */
export class HelpIntent extends IntentBase {

  /**
   * コンストラクタ
   * @param context Alexaハンドラコンテキスト
   */
  constructor(context: Alexa.Handler<any>) {
    super(context);
  }

  /**
   * アクション
   */
  public execute() {
    // スキルレスポンス設定
    this.alexaContext.emit(':ask', this.alexaContext.t('ASK_HELP_MESSAGE'));
  }
}
