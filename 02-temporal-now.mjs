// Temporal.Now — 現在時刻の取り方を粒度別に用意する設計。
// Node.js v26.1.0 で実行確認。

const section = (t) => console.log(`\n--- ${t} ---`);

section("1. 現在の Instant（UTC のナノ秒精度の瞬間）");
const instant = Temporal.Now.instant();
console.log("instant         :", instant.toString());
console.log("epochNanoseconds:", instant.epochNanoseconds);
console.log("epochMilliseconds:", instant.epochMilliseconds);

section("2. ローカルタイムゾーンの ZonedDateTime");
const zdt = Temporal.Now.zonedDateTimeISO();
console.log("zonedDateTimeISO:", zdt.toString());
console.log("timeZoneId      :", zdt.timeZoneId);

section("3. 指定したタイムゾーンの ZonedDateTime");
const tokyo = Temporal.Now.zonedDateTimeISO("Asia/Tokyo");
const ny = Temporal.Now.zonedDateTimeISO("America/New_York");
console.log("Asia/Tokyo      :", tokyo.toString());
console.log("America/New_York:", ny.toString());

section("4. 用途別の軽量バリアント");
console.log("plainDateISO    :", Temporal.Now.plainDateISO().toString());
console.log("plainTimeISO    :", Temporal.Now.plainTimeISO().toString());
console.log("timeZoneId()    :", Temporal.Now.timeZoneId());
