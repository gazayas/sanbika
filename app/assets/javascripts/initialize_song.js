/* songs/show.html.erbで使います */

function replace_marks(str) {
  if (check_sharp(str)) {
    str = str.replace(/#/g, "♯");
  }
  if (check_flat(str)) {
    str = str.replace(/b/g, "♭");
  }
  return str;
}

$(document).ready(function() {

  var chord_span = [];

  $("#song_body").find("em").each(function () {
    $(this).replaceWith('<span class="chords">' + this.innerHTML + '</span>');
    chord_span.push(this.innerHTML);
  });

  for(var i = 0; i < chord_span.length; i++) {
    // &nbsp;がtinymceに表示されてしまうので、普通の空白と入れ替えます
    chord_span[i] = chord_span[i].replace(/&nbsp;/g, " ");
    // 全角の空白を半角の空白と入れ替えます(でないと、splitの動作がうまく行けない)
    chord_span[i] = chord_span[i].replace(/　/g, "  ");
    // <br/>を統一し、前後に空白を置きます
    chord_span[i] = chord_span[i].replace(/<br\s?\/?>/, " <br/> ");

    chord_span[i] = chord_span[i].split(" ");
  }

  var new_innerHTML = [];

  for(var i = 0; i < chord_span.length; i++) {

    var new_str = "";

    for(var x = 0; x < chord_span[i].length; x++) {
      // chord_span[i].split(" "); で空白がなくなるので、また入れておきます
      if(chord_span[i][x] == "") {
        chord_span[i][x] = " ";
      }
      // chordの場合, spanで包む
      if(chord_span[i][x] != " " && chord_span[i][x] != "<br/>") {
        chord_span[i][x] = '<span class="chord" name="' + chord_span[i][x] + '">' + chord_span[i][x] + '</span>';
        // また空白は多分なくなったので、spanの実装をしてから後尾の方につけます
        chord_span[i].splice((x + 1), 0, " ");
      }
      // 「b」が入ってしまうと、replace_marksで♭になってしまうので一時的に「*」と入れ替えます
      if(chord_span[i][x] == "<br/>"){
        chord_span[i][x] = chord_span[i][x].replace("<br/>", "*");
      }
      new_str += chord_span[i][x];
    }

    // 最後のchord_span[i][x]は空白だったらもう１つ空白が追加されてしまう
    // new_str.pop()にするなら、配列にしないとダメなので、この方がいいかな。
    if (/\s$/.test(new_str)) {
      new_str = new_str.replace(/\s$/, "");
    }

    new_str = replace_marks(new_str);

    if (/\*/.test(new_str)) {
      new_str = new_str.replace(/\*/, "<br>");
    }
    new_innerHTML.push(new_str);
  }

  var chords = document.getElementsByClassName('chords');

  for(var i = 0; i < chords.length; i++) {
    chords[i].innerHTML = new_innerHTML[i];
  }

  // song.title_yomikataをtooltipとして表示します
  $(function () {
    $('[data-toggle="tooltip"]').tooltip();
  });
  // content_tagではdata-toggleなどを定義できないのでjsの方でしています
  document.getElementById('song_title').setAttribute('data-toggle', 'tooltip');
  document.getElementById('song_title').setAttribute('data-placement', 'bottom');

  // iframeにクラスをつける
  $('iframe').addClass('embed-responsive-item');
});