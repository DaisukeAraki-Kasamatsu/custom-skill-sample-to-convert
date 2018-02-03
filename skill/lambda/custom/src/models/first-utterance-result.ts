/**
 * 発話結果 インタフェース
 */
export interface IFirstUtteranceResult {
  /**
   * 初回の発話
   */
  speech: any;

  /**
   * 追加の発話
   */
  repromptSpeech: any;
}
