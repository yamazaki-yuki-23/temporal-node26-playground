// Date の構造的な問題を再現するサンプル。
// Node.js v26.1.0 で実行確認。

const section = (title) => console.log(`\n--- ${title} ---`);

section("1. setMonth は元のインスタンスを書き換える（ミュータブル）");
const d1 = new Date("2026-01-31T00:00:00Z");
console.log("before:", d1.toISOString());
d1.setUTCMonth(d1.getUTCMonth() + 1); // 2 月を期待
console.log("after :", d1.toISOString());
// 1/31 の 1 か月後は 3/3 に飛ぶ。元のインスタンスが書き換わるのも問題。

section("2. 月は 0 始まり");
const d2 = new Date(2026, 11, 25); // 12 月を表したい
console.log("Date(2026, 11, 25):", d2.toString());
// 月だけ 0 始まりで、年・日・時・分・秒は普通。混在の罠。

section("3. 存在しない日付が黙って繰り上がる");
const d3 = new Date("2026-02-30T00:00:00Z");
console.log("2026-02-30 →", d3.toISOString());
// 2026/2/30 は無効だが、Date は 3/2 として受け入れる。

section("4. 任意のタイムゾーンが扱えない");
const d4 = new Date("2026-05-17T10:00:00Z");
console.log("UTC文字列        :", d4.toUTCString());
console.log("ローカル文字列   :", d4.toString());
console.log("Asia/Tokyo で表示:", d4.toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" }));
console.log("America/NY で表示:", d4.toLocaleString("en-US", { timeZone: "America/New_York" }));
// 表示はできるが、Date 自体が「Tokyo の日時」として演算するすべがない。

section("5. 日付だけ・時刻だけを表現できない");
const birthday = new Date("2000-04-12"); // 誕生日（時刻は不要）
console.log("誕生日Date:", birthday.toString());
// 時刻 00:00:00 と「UTC として解釈する」前提が勝手につく。

section("6. 精度はミリ秒どまり");
const now = Date.now();
console.log("Date.now() =", now, "(ms)");
// 1ms 未満の差は計れない。高精度計測には不向き。
