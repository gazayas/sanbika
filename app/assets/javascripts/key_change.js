// 音符の定義
const SHARP_NOTES = ["A", "A♯", "B", "C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯"];
const FLAT_NOTES = ["A", "B♭", "B", "C", "D♭", "D", "E♭", "E", "F", "G♭", "G", "A♭"];

// chordがslash chord（D/F♯みたいなやつ）の場合は、再起で新しい変数を定義してそれを返すから、
// change()を呼ぶ時に引数を渡すようにした
function trigger() {
  var old_key = document.getElementById("original_key").innerHTML;
  var chords_node_list = document.getElementsByClassName("chord");
  var slash_chords = false; // これは要らない。もしchords_node_listが要らなくなったらnilにした方がいいと思う

  change(old_key, chords_node_list, slash_chords);
}

function check_sharp(note) {
  if (/#/.test(note) || /♯/.test(note)) {
  return true;
  } else {
  return false;
  }
}

function check_flat(note) {
  if (/b/.test(note) || /♭/.test(note)) {
    return true;
  } else {
    return false;
  }
}

// 「b」か「#」がnoteに入っていれば、「♭」か「♯」に変換する
function replace_mark(note) {
  if (check_sharp(note)) {
    note = note.replace(/#/g, "♯"); // gは要らないと思う
  }
  if (check_flat(note)) {
    note = note.replace(/b/g, "♭");
  }
  return note;
}

function position_of(note) {
  if (check_flat(note)) {
    return FLAT_NOTES.indexOf(note);
  } else {
    return SHARP_NOTES.indexOf(note);
  }
}

// 主要のメソッド
function change(old_key, slash_chords, array_option) {
  // chords_node_listはたまに(slash chordの場合)node_listじゃなくて配列なのでchords_listに変えた方がいいかな

  var new_key = document.getElementById('key_box').value;
  if (slash_chords) {
    var chords_html_list = slash_chords;
  } else {
    var chords_html_list = document.getElementsByClassName('chord');
  }

  var chords = [];

  var key_up = true;
  var difference = 0;
  var new_chords = [];


  if (!array_option) {
    for (var i = 0; i < chords_html_list.length; i++) {
      chords.push(chords_html_list[i].getAttribute('name'));
    }
  } else {
    chords = chords_html_list;
    // console.log(chords);
  }

  // 「b」か「#」が入っていれば、「♭」か「♯」に変換する
  old_key = replace_mark(old_key);
  new_key = replace_mark(new_key);
  for (var i = 0; i < chords.length; i++) {
    // console.log(chords[i]);
    chords[i] = replace_mark(chords[i]);
  }

  var old_key_pos = position_of(old_key) + 1;
  var new_key_pos = position_of(new_key) + 1;

  if (old_key_pos > new_key_pos) {
    key_up = false;
    difference = old_key_pos - new_key_pos;
  } else if (old_key_pos < new_key_pos) {
    key_up = true;
    difference = new_key_pos - old_key_pos;
  } else {
    var original_chords = [];
    console.log(chords_html_list);
    for (i = 0; i < chords_html_list.length; i++) {
      // chords_html_list[i]は文字列の場合なら、slash chordになっていることが分かるから、
      // その場合は何もしなくて、chords_html_listは本当にnodeである場合のみoriginal_chordsを実装する。
      // slash chordを使ったらこのfor文の直接前にあるconsole.log();の出力を見てください
      if (typeof chords_html_list[i] != 'string') {
        chords_html_list[i].innerHTML = chords_html_list[i].getAttribute('name');
      }
    }
  }

  for (i = 0; i < chords.length; i++) {

    if (/\//.test(chords[i])) {
      slash_chord_array = chords[i].split("/");

      array_option = true;
      var new_array = change(old_key, slash_chord_array, array_option);
      array_option = false;

      chords[i] = new_array[0] + "/" + new_array[1];
      new_chords.push(chords[i]);
      chords_html_list[i].innerHTML = new_chords[i];
    } else {

    var addition = "";

    switch(true) {
      // chordをnameの属性から取得したので、正規表現で「dim7」などを除いて新しいchordのための計算する
      case /dim7/.test(chords[i]):
        addition = "dim7";
        chords[i] = chords[i].replace(/dim7/, "");
        break;
      case /dim/.test(chords[i]):
        addition = "dim";
        chords[i] = chords[i].replace(/dim/, "");
        break;
      case /2/.test(chords[i]):
        addition = "2";
        chords[i] = chords[i].replace(/2/, "");
        break;
      case /sus4/.test(chords[i]):
        addition = "sus4";
        chords[i] = chords[i].replace(/sus4/, "");
        break;
      case /sus/.test(chords[i]):
        addition = "sus";
        chords[i] = chords[i].replace(/sus/, "");
        break;
      case /maj7/.test(chords[i]):
        addition = "maj7";
        chords[i] = chords[i].replace(/maj7/, "");
        break;
      case /maj/.test(chords[i]):
        addition = "maj";
        chords[i] = chords[i].replace(/maj/, "");
        break;
      case /m7/.test(chords[i]):
        addition = "m7";
        chords[i] = chords[i].replace(/m7/, "");
        break;
      case /m/.test(chords[i]):
        addition = "m";
        chords[i] = chords[i].replace(/m/, "");
        break;
      case /7/.test(chords[i]):
        addition = "7";
        chords[i] = chords[i].replace(/7/, "");
        break;
      case /6/.test(chords[i]):
        addition = "6";
        chords[i] = chords[i].replace(/6/, "");
        break;
      case /9/.test(chords[i]):
        addition = "9";
        chords[i] = chords[i].replace(/9/, "");
        break;
      case /aug/.test(chords[i]):
        addition = "aug";
        chords[i] = chords[i].replace(/aug/, "");
        break;
      case /11/.test(chords[i]):
        addition = "11";
        chords[i] = chords[i].replace(/11/, "");
      default:
        break;
    }

    var old_position = position_of(chords[i]) + 1;
    var new_position = 0; // 最初は定義するだけ

    if (key_up) {
        new_position = old_position + difference;
        if (new_position > 12) {
          new_position -= 12;
        }
     } else {
        new_position = old_position - difference;
        if (new_position < 1) {
          new_position += 12;
        }
    }
    --new_position;

    if (check_flat(chords[i])) {
      new_chords.push(FLAT_NOTES[new_position] + addition);
    } else {
      new_chords.push(SHARP_NOTES[new_position] + addition);
    }
    if (array_option == false) {
    chords_html_list[i].innerHTML = new_chords[i];
    }
  } // array_optionの終わり
  } // 大きなfor文の終わり
  if (array_option) {
    return new_chords;
  }
}
