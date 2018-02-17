#!/bin/bash

# ニューステーブル存在チェック
aws dynamodb list-tables \
--profile localstack \
--endpoint-url http://localhost:4569 \
| grep news

if [ "$?" -ne 0 ]
then
  # ニューステーブル作成
  aws dynamodb create-table \
  --profile localstack \
  --endpoint-url=http://localhost:4569 \
  --table-name news \
  --attribute-definitions AttributeName=sequenceId,AttributeType=N \
  --key-schema AttributeName=sequenceId,KeyType=HASH \
  --provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1
fi

# ニューステーブルデータ追加
aws dynamodb batch-write-item \
  --profile localstack \
  --endpoint-url=http://localhost:4569 \
  --request-items file://news.json
