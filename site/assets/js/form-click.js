/*
 * サイト内のフォームボタン（forms.gle への直リンク）が押されたことを Meta に送る。
 *
 * 背景:
 *   申込フォームは forms.gle という別ドメインなので、そこにピクセルは置けない。
 *   /form_*.html の転送ページには FormOpen を入れてあるが、サイト内のボタンは
 *   forms.gle へ直リンクしていて転送ページを通らない。そのため Meta からは
 *   「フォームへ向かった人」が見えていなかった（GA4 の form_click では6日で63人）。
 *
 *   GA4 側は既に form_click で拾えているので、ここでは Meta にだけ送る。
 *   両方に送ると GA4 で二重計上になる。
 *
 *   Lead は撃たない。LPのLINEクリックが広告キャンペーンのコンバージョン
 *   イベントなので、ここで混ぜると最適化のシグナルが濁る。
 */
(function () {
  /* フォームIDとフォーム名。site/form_*.html の form_name と同じ値を使う。
     ここを変えると Meta 側で別イベントとして分かれるので、両方まとめて直すこと。 */
  var FORMS = {
    xJ6YhhBAiXSzEJD88: 'web_school',
    '7LSEeqduxJ3G8mfy9': 'venue_seminar',
    QWdwTxHozDBj5ThL8: 'moshi',
    oPNubnzVbGo7wk4z9: 'general_contact',
    ckU7QtrpbpYACsZB9: 'for_school',
    Smcgyt3BGEUqXcC59: 'recruitment'
  };

  document.addEventListener(
    'click',
    function (e) {
      var el = e.target;
      if (!el || !el.closest) return;
      var a = el.closest('a[href*="forms.gle"]');
      if (!a) return;

      var href = a.getAttribute('href') || '';
      var rest = href.split('forms.gle/')[1];
      if (!rest) return;
      var id = rest.split(/[?#\/]/)[0];

      /* リンクは target="_blank" で開くのでこのページは残る。
         転送ページと違い、送信を待つ必要がない。 */
      try {
        if (window.fbq) {
          window.fbq('trackCustom', 'FormOpen', { form_name: FORMS[id] || 'unknown' });
        }
      } catch (err) {
        /* 計測が落ちても、リンクの動作は妨げない */
      }
    },
    true
  );
})();
