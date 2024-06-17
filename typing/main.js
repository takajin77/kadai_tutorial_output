// 変数宣言
// 以下初期化が必要な変数
// untypedを宣言する。中身は変数で変動するので、letで！一旦空で宣言するため''
let untypedJs = '';
// 入力済みの文字列を入れる変数定義
let typedJs = '';
// スコアを定義。はじめは0とわかっているので0を記入
let scoreJs = 0;


// 必要なhtml要素の取得
const untypedField = document.getElementById('untyped');
const typedField = document.getElementById('typed');
const wrapJs = document.getElementById('wrap');
const startJs = document.getElementById('start');
const countJs = document.getElementById('count');


// 複数のテキストを格納する配列
const textLists = [
  'Hello World','This is my App','How are you?',
  'Today is sunny','I love JavaScript!','Good morning',
  'I am Japanese','Let it be','Samurai',
  'Typing Game','Information Technology',
  'I want to be a programmer','What day is today?',
  'I want to build a web app','Nice to meet you',
  'Chrome Firefox Edge Safari','machine learning',
  'Brendan Eich','John Resig','React Vue Angular',
  'Netscape Communications','undefined null NaN',
  'Thank you very much','Google Apple Facebook Amazon',
  'ECMAScript','console.log','for while if switch',
  'var let const','Windows Mac Linux iOS Android',
  'programming'
];

// ランダムなテキストを表示する
const createText = () => {

  // 正タイプした文字列をクリアする
  typedJs= '';
  typedField.textContent = typedJs;
  // 文字列をランダムにするMath.randomこれは少数点以下が出るので、切り捨てるためMath.floorをさらにつける
  let random=(Math.floor(Math.random()*textLists.length));
  untypedJs = textLists[random];
  // untypedFieldにランダムに生成したテキストを代入する
  untypedField.textContent = untypedJs;
};

// キー入力の判定
const keyPress = e => {
  // 間違っている場合
  // 入力された文字と変数untypedの先頭文字を比較し、不一致の場合は処理終了をする

  if (e.key !== untypedJs.substring(0, 1)) {
    wrapJs.classList.add('misstyped');
    setTimeout(() => {
      wrapJs.classList.remove('misstyped');
    }, 100);
    return;
  }
  // 合っている場合
  scoreJs++;
  wrapJs.classList.remove('misstyped');
  // typed(タイピングした文字を格納する関数)にuntypedの先頭文字を格納
  typedJs += untypedJs.substring(0,1);
  // untypedに2文字目以降の文字列を再代入する
  untypedJs = untypedJs.substring(1);
  typedField.textContent = typedJs;
  untypedField.textContent = untypedJs;


  // テキストがなくなったら、新しいテキストを表示
  if (untypedJs ==='') {
    createText();
  }
};

// タイピングスキルのランクを判定
const rankCheck = scoreJs => {
  // テキストを格納する変数を作る
  let text = '';
  // スコアに応じて異なるメッセージを変数textに格納する
  if (scoreJs < 100) {
    text=`あなたのランクはCです。/nBランクまであと${100-scoreJs}です。`;
  }
  else if (scoreJs < 200) {
    text = `あなたのランクはBです。/nAランクまであと${200 - scoreJs}です。`;
  }
  else if (scoreJs < 300) {
    text = `あなたのランクはAです。/nAランクまであと${300 - scoreJs}です。`;
  }
  else if (scoreJs >= 300) {
    text = `あなたのランクはSです。/nおめでとうございます!`;
  }

  生成したメッセージと一緒に文字列を返す
  return `${scoreJs}文字打てました!/n${text}/n [OK]リトライ / [キャンセル]終了`;
};

// ゲーム終了
const gameOver = id => {
  clearInterval(id);

  const result = confirm(rankCheck(scoreJs));
  // OKボタンを押したらリロードする
  if (result === ture) {
    window.location.reload();
  }
};

// カウントダウンタイマー
const timer = () => {
  // タイマー部分のHTML要素(P要素)を取得
  let time = countJs.textContent;
  const id = setInterval(() => {
    // カウントダウンする
    time--;
    countJs.textContent = time;
    if (time <= 0) {
      gameOver(id);
    }
  }, 1000);
 };

// ゲームスタート時の処理
document.addEventListener('click', () => {
  // タイマー開始
  timer();
  // ランダムなテキストを表示
  createText();
  // キーボードのイベント処理
  // document.addEventListener('keypress', keyPress);
  // キーが押されたときにkeyPress関数を呼び出してください。
  // という意味。keyPressは上にあるように出力を確認する
  document.addEventListener('keypress', keyPress);
  // スタートボタンを非表示
  startJs.style.display = 'none';
  タイマー開始を知らせるための関数
});

untypedField.textContent = 'スタートボタンで開始';