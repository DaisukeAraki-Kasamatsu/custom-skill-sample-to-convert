/**
 * ニュースリポジトリクラス
 */
export class NewsRepository {
  /**
   * コンストラクタ
   */
  constructor() {
    // 処理なし
  }

  /**
   * 内容取得
   * @param sayNumber 数字
   * @returns 内容
   */
  public getAsync(sayNumber: string): Promise<string> {
    // データ（便宜上このクラスに定義しているが、本来はデータベースからエンティティを返す想定）
    const newsContents: {[key: string]: string } = {
      '1': '1番です',
      '2': '2番です',
      '3': '3番です'
    };

    return new Promise((resolve, reject) => {
      if (newsContents[sayNumber]) {
        resolve(newsContents[sayNumber]);
      } else {
        reject();
      }
    });
  }
}
