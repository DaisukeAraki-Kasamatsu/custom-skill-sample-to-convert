import * as Chai from 'chai';
import * as Mocha from 'mocha';
import * as Sinon from 'sinon';

import * as Alexa from 'alexa-sdk';
import * as AWS from 'aws-sdk';
import { It, Mock } from 'moq.ts';
import { IFirstUtteranceCondition } from '../../conditions/first-utterance-condition';
import { NewsRepository } from '../../models/news-repository';
import { FirstUtterance } from '../../utterances/first-utterance';
import { languageStrings } from '../../utterances/language-strings';

const assert = Chai.assert;
const should = Chai.should();

// コンテキストモック
const contextMock = new Mock<Alexa.Handler<any>>('test')
  // 初回の発話
  .setup((sender) => sender.t(It.Is((token: string) => token === 'ASK_ANSWER_NUMBER'), It.IsAny()))
  .callback((token: string, args: any[]) => {
    return `${languageStrings['ja-JP'].translation.ASK_ANSWER_NUMBER}`.replace('%s', args.toString());
  })

  // 追加の発話
  .setup((sender) => sender.t(It.Is((token: string) => token === 'ASK_ANSWER_NUMBER_REPROMPT')))
  .returns(`${languageStrings['ja-JP'].translation.ASK_ANSWER_NUMBER_REPROMPT}`)
  ;

/**
 * テスト
 */
describe('first-utteranceクラスのテスト', () => {
  // ニュースリポジトリスタブ
  const repository = new NewsRepository(new AWS.DynamoDB());

  // スタブ作成
  const repositoryStubGetAsync = Sinon.stub(repository, 'getAsync');

  // 戻り値を設定
  repositoryStubGetAsync.returns('テストだよ');

  // ターゲットインスタンス作成
  const target = new FirstUtterance(contextMock.object(), repository);

  /**
   * テストケース
   */
  describe('メッセージが正しく取得できること', () => {
    // アサーション
    it('インスタンスが作成されていること', () => {
      should.not.equal(target, null);
      should.not.equal(target, undefined);
    });

    // アサーション
    it('想定した発話が返されること', async () => {
      // 発話条件設定
      const condition: IFirstUtteranceCondition = {
        sayNumber: '1'
      };

      // 発話内容取得
      const result = await target.respond(condition);

      assert.equal(result.speech, 'テストだよ。他に聞きたい数字はありますか？');
      assert.equal(result.repromptSpeech, '数字を言ってください。');
    });
  });
});
