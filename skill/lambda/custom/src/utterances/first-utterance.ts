import * as Alexa from 'alexa-sdk';
import { IFirstUtteranceCondition } from '../conditions/first-utterance-condition';
import { IFirstUtteranceResult } from '../models/first-utterance-result';
import { NewsRepository } from '../models/news-repository';
import { UtteranceBase } from './utterance-base';

/**
 * ファースト発話クラス
 */
export class FirstUtterance extends UtteranceBase {
  /**
   * リポジトリ
   */
  private repository: NewsRepository;

  /**
   * コンストラクタ
   * @param context Alexaハンドラコンテキスト
   */
  constructor(context: Alexa.Handler<any>) {
    super(context);

    // リポジトリ作成
    this.repository = new NewsRepository();
  }

  /**
   * 発話内容取得
   * @param condition 条件
   */
  public async respond(condition: IFirstUtteranceCondition): Promise<IFirstUtteranceResult> {
    const result: IFirstUtteranceResult = {
      speech: '',
      repromptSpeech: ''
    };

    // データ取得（非同期）
    const speech = await this.repository.getAsync(condition.sayNumber);

    // 結果をセット
    result.speech = this.alexaContext.t('ASK_ANSWER_NUMBER', speech);
    result.repromptSpeech = this.alexaContext.t('ASK_ANSWER_NUMBER_REPROMPT');

    return result;
  }
}
