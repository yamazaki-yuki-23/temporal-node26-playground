// Temporal.Duration — 期間・差分の表現。算術と丸めが API で揃っている。
// Node.js v26.1.0 で実行確認。

const section = (t) => console.log(`\n--- ${t} ---`);

section("1. リテラル風に作る / ISO 8601 文字列から作る");
const d1 = Temporal.Duration.from({ hours: 2, minutes: 30 });
const d2 = Temporal.Duration.from("P1DT3H");
console.log("d1:", d1.toString());
console.log("d2:", d2.toString());

section("2. since / until で日時の差を取る");
const a = Temporal.PlainDateTime.from("2026-05-01T09:00");
const b = Temporal.PlainDateTime.from("2026-05-17T17:30");
console.log("b.since(a):", b.since(a).toString());
console.log("largestUnit=hour:", b.since(a, { largestUnit: "hour" }).toString());

section("3. round で粒度を揃える");
const dur = Temporal.Duration.from({ minutes: 130, seconds: 45 });
console.log("dur                          :", dur.toString());
console.log("round({ largestUnit: 'hour'}):", dur.round({ largestUnit: "hour" }).toString());
console.log("round({ smallestUnit:'min'}):", dur.round({ smallestUnit: "minute" }).toString());

section("4. ZonedDateTime と組み合わせるとカレンダーを考慮した加算ができる");
const start = Temporal.ZonedDateTime.from("2026-01-31T10:00[Asia/Tokyo]");
const oneMonthLater = start.add({ months: 1 });
console.log("1/31 + 1 month:", oneMonthLater.toString());
// Date の setMonth と違い、月末は月末として丸められる（2/28 や 2/29 になる）。

section("5. compare で比較");
const short = Temporal.Duration.from({ minutes: 90 });
const long = Temporal.Duration.from({ hours: 2 });
console.log("compare(short, long) =", Temporal.Duration.compare(short, long));
