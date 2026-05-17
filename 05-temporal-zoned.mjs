// ZonedDateTime — 「タイムゾーン込みの日時」。夏時間（DST）も扱える。
// Node.js v26.1.0 で実行確認。

const section = (t) => console.log(`\n--- ${t} ---`);

section("1. 同じ Instant でもタイムゾーンが違えば壁時計の表示は変わる");
const inst = Temporal.Instant.from("2026-05-17T10:00:00Z");
console.log("UTC             :", inst.toString());
console.log("Asia/Tokyo      :", inst.toZonedDateTimeISO("Asia/Tokyo").toPlainDateTime().toString());
console.log("Europe/London   :", inst.toZonedDateTimeISO("Europe/London").toPlainDateTime().toString());
console.log("America/New_York:", inst.toZonedDateTimeISO("America/New_York").toPlainDateTime().toString());

section("2. DST 切替日: ニューヨークの 2026-03-08 02:00 は存在しない");
// 2:00 は夏時間で 3:00 にスキップされる。
const dst = Temporal.ZonedDateTime.from("2026-03-08T02:30[America/New_York]");
console.log("入力 2026-03-08T02:30 [America/New_York]");
console.log("→ 実際の時刻       :", dst.toString());
console.log("→ オフセット        :", dst.offset);
// Temporal はデフォルトで「後ろのオフセット（DST後）」を採用し、暗黙に時刻を 3:30 に補正する。

section("3. 同じ壁時計の時刻を別タイムゾーンに『移す』");
const tokyo9 = Temporal.ZonedDateTime.from("2026-05-17T09:00[Asia/Tokyo]");
const sameInstantInNY = tokyo9.withTimeZone("America/New_York");
console.log("Tokyo 09:00 = NY:", sameInstantInNY.toString());

section("4. 同じ『壁時計の時刻』を別タイムゾーンに『置き換える』");
const ny9 = tokyo9.toPlainDateTime().toZonedDateTime("America/New_York");
console.log("NY も 09:00:", ny9.toString());
// withTimeZone は瞬間を保つ、toZonedDateTime は壁時計を保つ。違いが構文に出る。

section("5. DST の境目をまたぐ Duration");
const before = Temporal.ZonedDateTime.from("2026-03-07T12:00[America/New_York]");
const after = before.add({ days: 1 });
console.log("3/7 12:00 + 1 day :", after.toString());
// 1 日後でも壁時計は 12:00 だが、実経過時間は 23 時間（DST で 1 時間進む）。
console.log("実経過時間         :", before.until(after, { largestUnit: "hour" }).toString());
