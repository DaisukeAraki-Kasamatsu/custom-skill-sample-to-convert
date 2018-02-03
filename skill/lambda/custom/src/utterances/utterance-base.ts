import * as Alexa from 'alexa-sdk';

/**
 * 発話基底クラス
 */
export abstract class UtteranceBase {
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
