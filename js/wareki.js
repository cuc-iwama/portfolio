/* 日付定義 */
const today_now = new Date();
const seireki = today_now.getFullYear();

/* 干支定義 */
const eto = ["&#x1f42d;", "&#x1f42e;", "&#x1f42f;", "&#x1f430;", "&#x1f432;", "&#x1f40d;", "&#x1f434;", "&#x1f40f;", "&#x1f435;", "&#x1f414;", "&#x1f436;", "&#x1f417;"];
// 干支算出関数（西暦を渡すと絵文字を返す。西暦-4を12で割った余りが干支のインデックス）
function getEto(year) {
    const etoIndex = (year - 4) % 12;
    const safeEtoIndex = (etoIndex < 0) ? etoIndex + 12 : etoIndex;
    return eto[safeEtoIndex];
}

/* HTML出力定義 */
let tableHtml = "";

/* 繰り返し処理 */
for (let i = 1; i < 101; i++) {
    const targetYear = seireki - i;
    let seirekiDis = `${targetYear} 年`;
    let warekiDis = "";

    /* 和暦算出処理 */
    if (targetYear === 2019) {
        // 2019年は平成31年/令和元年
        warekiDis = `令和 元 年<br>平成 31 年`;
    } else if (targetYear >= 2019) {
        const reiwa = targetYear - 2018;
        warekiDis = `令和 ${reiwa} 年`;
    } else if (targetYear === 1989) {
        // 1989年は昭和64年/平成元年
        warekiDis = `平成 元 年<br>昭和 64 年`;
    } else if (targetYear >= 1989) {
        const heisei = targetYear - 1988;
        warekiDis = `平成 ${heisei} 年`;
    } else if (targetYear === 1926) {
        // 1926年は昭和元年/大正15年
        warekiDis = `昭和 元 年<br>大正 15 年`;
    } else if (targetYear >= 1912) {
        const shouwa = targetYear - 1911;
        warekiDis = `昭和 ${shouwa === 1 ? '元年' : shouwa + '年'} `;
    } else {
        // 1925年より前は大正（一応）
        const taisho = targetYear - 1925;
        warekiDis = `大正 ${taisho} 年`;
    }

    /* 干支代入 */
    const etoDis = getEto(targetYear);

    /* 年齢算出処理 */
    const ageDis = (seireki - targetYear) + "歳";

    /* テーブル行を作成し連結 */
    tableHtml += `<tr><td>${seirekiDis}</td><td>${warekiDis}</td><td>(${ageDis})</td><td>${etoDis}</td></tr>`;
}

/* まとめてHTMLに反映 */
document.getElementById('wareki-table').innerHTML = tableHtml;

/* 来年表示 */
const nextYear = today_now.getFullYear() + 1;
const nextReiwa = nextYear - 2018;
document.getElementById('next-date').textContent = `${nextYear} 年 令和 ${nextReiwa} 年`;
document.getElementById('next-eto').innerHTML = getEto(nextYear);

/* 現在表示 */
const nowReiwa = seireki - 2018;
document.getElementById('today-date').textContent = `${seireki} 年 令和 ${nowReiwa} 年 ${today_now.getMonth() + 1} 月 ${today_now.getDate()} 日`;
document.getElementById('today-eto').innerHTML = getEto(seireki);
