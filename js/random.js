/* 結果初期表示 */
let resultText = "-";
let $result = document.getElementById('result');
$result.innerHTML = resultText;

/* 抽選処理 */
document.getElementById("button").addEventListener("click", function() {
    /* 入力値取得 */
    const getText = document.getElementsByClassName('input-choice');
    const getResultText = getText[0].value;
    let resultLines = getResultText.split(/\r\n|\n/);
    resultLines = resultLines.map(line => line.trim()).filter(line => line !== ""); //前後の空白を削り、空行を配列から除外

    /* 何も入力されていない場合 */
    if (resultLines.length === 0) {
        $result.innerHTML = "-";
        return;
    }

    /* ランダム処理 */
    const randomIndex = Math.floor(Math.random() * resultLines.length);
    resultText = resultLines[randomIndex];

    /* 結果出力 */
    $result.innerHTML = resultText;
});
