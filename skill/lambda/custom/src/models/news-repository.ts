import * as AWS from 'aws-sdk';

/**
 * ニュースリポジトリクラス
 */
export class NewsRepository {
  /**
   * DBコンテキスト
   */
  private dbContext: AWS.DynamoDB;

  /**
   * コンストラクタ
   */
  constructor(dbContext: AWS.DynamoDB) {
    this.dbContext = dbContext;
  }

  /**
   * 内容取得
   * @param sayNumber 数字
   * @returns 内容
   */
  public getAsync(sayNumber: string): Promise<string> {
    return new Promise(async (resolve, reject) => {
      // getItemパラメータ設定
      const params: AWS.DynamoDB.GetItemInput = {
        TableName: 'news',
        Key: {
          sequenceId: {
            N: sayNumber
          }
        }
      };

      let result: AWS.DynamoDB.GetItemOutput;

      try {
        // データ取得
        result = await this.dbContext.getItem(params).promise();
      } catch (err) {
        reject(err);
        return;
      }

      // アイテムが未定義であるか判定
      if (!result.Item) {
        // 未定義の場合リジェクト
        reject(`${sayNumber}番のデータは見つかりませんでした。`);
        return;
      }

      // 結果を文字列で返す
      resolve(String(result.Item.contents.S));
    });
  }
}
