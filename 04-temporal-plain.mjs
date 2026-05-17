// PlainDate / PlainTime / PlainDateTime — タイムゾーンも暦も持たない「壁掛け時計」的な値。
// Node.js v26.1.0 で実行確認。

const section = (t) => console.log(`\n--- ${t} ---`);

section("1. PlainDate（日付だけ）");
const birthday = Temporal.PlainDate.from("2000-04-12");
console.log("birthday    :", birthday.toString());
console.log("dayOfWeek   :", birthday.dayOfWeek); // 1=月, 7=日
console.log("daysInMonth :", birthday.daysInMonth);
console.log("inLeapYear  :", birthday.inLeapYear);

section("2. 存在しない日付は受け付けない");
try {
  Temporal.PlainDate.from("2026-02-30");
} catch (e) {
  console.log("error:", e.message);
}
// Date と違い、Temporal は黙って繰り上げない。

section("3. PlainTime（時刻だけ）");
const morningAlarm = Temporal.PlainTime.from("08:00");
console.log("alarm        :", morningAlarm.toString());
console.log("hour         :", morningAlarm.hour);
console.log("+ 90 minutes:", morningAlarm.add({ minutes: 90 }).toString());

section("4. PlainDateTime（タイムゾーンなしの日時）");
const meeting = Temporal.PlainDateTime.from("2026-05-17T15:30");
console.log("meeting        :", meeting.toString());
console.log("+ 2 hours      :", meeting.add({ hours: 2 }).toString());
console.log("with year=2030 :", meeting.with({ year: 2030 }).toString());

section("5. 月だけ・年月だけ・月日だけも別クラスで扱える");
const yearMonth = Temporal.PlainYearMonth.from("2030-12"); // カード有効期限
const monthDay = Temporal.PlainMonthDay.from("--12-25"); // 毎年のクリスマス
console.log("PlainYearMonth :", yearMonth.toString());
console.log("PlainMonthDay  :", monthDay.toString());

section("6. PlainDate → ZonedDateTime に「タイムゾーンを与えて」昇格");
const date = Temporal.PlainDate.from("2026-05-17");
const zdt = date.toZonedDateTime({ timeZone: "Asia/Tokyo", plainTime: "09:00" });
console.log("Tokyo 09:00:", zdt.toString());
