# temporal-node26-playground

Node.js v26 で標準化された JavaScript `Temporal` API を実際に触ってみるサンプルコード集です。

Qiita 記事「Node.js v26 で標準化された JavaScript Temporal を触ってみた — Date の何が問題で、Temporal が何を解決するのか」のサポートリポジトリ。

## 必要環境

- Node.js v26 以上（`Temporal` がフラグなしで使えるバージョン）

Volta を使っているなら：

```sh
volta install node@26
node --version
# v26.x.x
```

## ファイル構成

| ファイル | 内容 |
|---|---|
| `01-date-pitfalls.mjs`   | 既存 `Date` の構造的な問題を6つ再現 |
| `02-temporal-now.mjs`    | `Temporal.Now` の取り方バリエーション |
| `03-temporal-instant.mjs`| `Temporal.Instant`（UTC ナノ秒精度の瞬間） |
| `04-temporal-plain.mjs`  | `PlainDate` / `PlainTime` / `PlainDateTime` / `PlainYearMonth` / `PlainMonthDay` |
| `05-temporal-zoned.mjs`  | `ZonedDateTime` と DST 切替日の振る舞い |
| `06-temporal-duration.mjs` | `Duration` と `since` / `until` / `round` |

## 実行

個別実行：

```sh
node 01-date-pitfalls.mjs
node 02-temporal-now.mjs
node 03-temporal-instant.mjs
node 04-temporal-plain.mjs
node 05-temporal-zoned.mjs
node 06-temporal-duration.mjs
```

まとめて実行：

```sh
for f in 0*.mjs; do echo "=== $f ==="; node "$f"; done
```

## 参考

- MDN: [Temporal](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Temporal)
- Publickey: [Node.js 26、Temporal がデフォルトで有効に](https://www.publickey1.jp/blog/26/nodejsdatetemporaltemporalchromeedgefirefoxnodejs.html)

## ライセンス

MIT
