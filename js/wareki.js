/* 日付定義 */
const today_now = new Date();
const seireki = today_now.getFullYear();
const today = `${seireki} 年 ${today_now.getMonth() + 1} 月 ${today_now.getDate()} 日`;

/* 干支定義 */
const eto = ["&#x1f42d;", "&#x1f42e;", "&#x1f42f;", "&#x1f430;", "&#x1f432;", "&#x1f40d;", "&#x1f434;", "&#x1f40f;", "&#x1f435;", "&#x1f414;", "&#x1f436;", "&#x1f417;"];
// 干支を計算する関数（西暦を渡すと絵文字を返す）
function getEto(year) {
    const etoIndex = (year - 4) % 12;
    const safeEtoIndex = (etoIndex < 0) ? etoIndex + 12 : etoIndex;
    return eto[safeEtoIndex];
}

/* 現在表示 */
document.getElementById('today-date').textContent = today;

let tableHtml = "";

/* 繰り返し処理 */
for (let i = 0; i < 51; i++) {
    const targetYear = seireki - i;
    let seirekiDis = `${targetYear} 年`;
    let warekiDis = "";

    /* 和暦算出処理 */
    if (targetYear >= 2019) {
        const reiwa = targetYear - 2018;
        warekiDis = `令和 ${reiwa === 1 ? '元' : reiwa} 年`;
    } else if (targetYear >= 1989) {
        const heisei = targetYear - 1988;
        warekiDis = `平成 ${heisei === 1 ? '元' : heisei} 年`;
    } else {
        const shouwa = targetYear - 1925;
        warekiDis = `昭和 ${shouwa === 64 ? '1（昭和64/平成元）' : shouwa} 年`; // 昭和64年はそのまま計算
    }

    /* 干支算出処理 (西暦-4を12で割った余りが干支のインデックスになる) */
    const etoIndex = (targetYear - 4) % 12;
    // マイナスになる場合を考慮した安全な剰余計算
    const safeEtoIndex = (etoIndex < 0) ? etoIndex + 12 : etoIndex;
    const etoDis = eto[safeEtoIndex];

    /* テーブル行を作成し連結 */
    tableHtml += `<tr><td>${seirekiDis}</td><td>${warekiDis}</td><td>${etoDis}</td></tr>`;
}

/* まとめてHTMLに反映 */
document.getElementById('wareki-table').innerHTML = tableHtml;

/* 来年表示 */
const nextYear = today_now.getFullYear() + 1;
const nextReiwa = nextYear - 2018;
document.getElementById('next-date').textContent = `${nextYear} 年 令和 ${nextReiwa} 年`;
document.getElementById('next-eto').innerHTML = getEto(nextYear);
