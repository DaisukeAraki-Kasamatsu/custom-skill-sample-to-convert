import * as AWS from 'aws-sdk';
import * as Chai from 'chai';
import * as Mocha from 'mocha';
import { NewsRepository } from '../../models/news-repository';

const assert = Chai.assert;
const should = Chai.should();

// AWSコンフィグ設定
AWS.config.update({
  accessKeyId: 'dummy',
  secretAccessKey: 'dummy',
  dynamodb: {
    region: 'us-east-1',
    endpoint: 'http://localhost:4569'
  }
});

/**
 * テスト
 */
describe('news-repositoryクラスのテスト', () => {
  // ターゲットインスタンス作成
  const target = new NewsRepository(new AWS.DynamoDB());

  /**
   * テストケース
   */
  describe('メッセージが正しく取得できること', () => {
    it('インスタンスが作成されていること', () => {
      should.not.equal(target, null);
      should.not.equal(target, undefined);
    });

    it('想定した発話が返されること', async () => {
      // 発話内容取得
      const result = await target.getAsync('1');

      // アサーション
      assert.equal(result, '1番ですね');
    });
  });
});
