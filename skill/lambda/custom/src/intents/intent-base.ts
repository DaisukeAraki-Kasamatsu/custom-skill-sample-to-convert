import * as Alexa from 'alexa-sdk';

/**
 * インテント基底クラス
 */
export class IntentBase {
  /**
   * プロパティ - Alexaハンドラコンテキスト
   */
  protected alexaContext: Alexa.Handler<any>;

  /**
   * コンストラクタ
   * @param context Alexaハンドラコンテキスト
   */
  constructor(context: Alexa.Handler<any>) {
    this.alexaContext = context;
  }
}
