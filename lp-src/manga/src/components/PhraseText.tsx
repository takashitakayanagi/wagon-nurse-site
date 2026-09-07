/**
 * 「文節ごと改行」を実現するテキスト表示コンポーネント。
 *
 * 文字列中の区切り記号「｜」（全角）または「|」（半角）で分割し、
 * 各まとまりを inline-block の <span> として並べます。
 * これにより、行の折り返しはまとまりの境界でのみ発生し、
 * 語句の途中や末尾1文字だけが次行に落ちるのを防げます（全ブラウザ対応）。
 *
 * 例）"これが、｜国試に落ちてしまった人の｜リアルです…"
 *   → 「これが、」「国試に落ちてしまった人の」「リアルです…」の3まとまりで改行。
 *
 * 区切り記号が無い文字列はそのまま1まとまりとして表示されます。
 */
export default function PhraseText({ text }: { text: string }) {
  const parts = text.split(/[｜|]/).filter((p) => p.length > 0);

  return (
    <span className="phrase">
      {parts.map((p, i) => (
        <span key={i}>{p}</span>
      ))}
    </span>
  );
}
