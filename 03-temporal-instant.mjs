// Temporal.Instant — UTC 基準の「瞬間」をナノ秒精度で表す。
// Node.js v26.1.0 で実行確認。

const section = (t) => console.log(`\n--- ${t} ---`);

section("1. 文字列・エポックから作る");
const fromString = Temporal.Instant.from("2026-05-17T10:00:00Z");
const fromMs = Temporal.Instant.fromEpochMilliseconds(1_779_012_000_000);
const fromNs = Temporal.Instant.fromEpochNanoseconds(1_779_012_000_000_000_000n);
console.log("from string :", fromString.toString());
console.log("from ms     :", fromMs.toString());
console.log("from ns     :", fromNs.toString());

section("2. イミュータブル（add は新しいインスタンスを返す）");
const t0 = Temporal.Instant.from("2026-05-17T10:00:00Z");
const t1 = t0.add({ hours: 3, minutes: 15 });
console.log("t0:", t0.toString(), "← 元は変わらない");
console.log("t1:", t1.toString(), "← 3時間15分後");

section("3. until / since で Duration を取り出す");
const a = Temporal.Instant.from("2026-05-17T10:00:00Z");
const b = Temporal.Instant.from("2026-05-18T11:30:00Z");
console.log("a.until(b)               :", a.until(b).toString());
console.log("largestUnit:'hour' で整形:", a.until(b, { largestUnit: "hour" }).toString());

section("4. ナノ秒精度の差を表現できる");
const ns1 = Temporal.Instant.fromEpochNanoseconds(1_747_476_000_000_000_001n);
const ns2 = Temporal.Instant.fromEpochNanoseconds(1_747_476_000_000_000_002n);
console.log("ns2.epochNanoseconds - ns1.epochNanoseconds =",
  ns2.epochNanoseconds - ns1.epochNanoseconds, "ns");

section("5. Instant ⇄ ZonedDateTime の変換");
const inst = Temporal.Instant.from("2026-05-17T10:00:00Z");
console.log("Asia/Tokyo      :", inst.toZonedDateTimeISO("Asia/Tokyo").toString());
console.log("America/New_York:", inst.toZonedDateTimeISO("America/New_York").toString());
