"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import ApplyButton from "./ApplyButton";
import LineTextLink from "./LineTextLink";
import { cta, examDate, gradeBranch, site, type GradeKey } from "@/config/site";
import { setExamYear } from "@/lib/tracking";

/**
 * 学年で案内を切り替えるセクション。
 *
 * - 最終学年・既卒 … 国家試験までの残り日数と、必修対策模試／夏模試／冬模試。
 * - 1〜3年生     … カウントダウンは出さず、基礎学力確認模試のみ。
 *
 * 低学年に受験直前の煽り（残り日数）を見せないための出し分けです。
 * 選択は sessionStorage に保存され、以降のイベントに exam_year として付きます。
 */
export default function GradeBranchSection() {
  if (!site.flags.showGradeBranch) return null;

  return <GradeBranchInner />;
}

function GradeBranchInner() {
  const [grade, setGrade] = useState<GradeKey | null>(null);

  const select = (key: GradeKey) => {
    setGrade(key);
    setExamYear(key);
  };

  const panel = grade ? gradeBranch[grade] : null;

  return (
    <section className="bg-cream py-14" aria-labelledby="grade-heading">
      <div className="container-lp max-w-2xl">
        <h2 id="grade-heading" className="section-heading text-center">
          {gradeBranch.heading}
        </h2>
        <p className="mt-2 text-center text-xs text-inkSoft">{gradeBranch.note}</p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {gradeBranch.options.map((o) => {
            const active = grade === o.key;
            return (
              <button
                key={o.key}
                type="button"
                onClick={() => select(o.key)}
                aria-pressed={active}
                className={`min-h-[56px] rounded-full border px-5 py-3 text-base font-bold transition-colors ${
                  active
                    ? "border-wagon-500 bg-wagon-500 text-white shadow-soft"
                    : "border-wagon-200 bg-white text-ink hover:border-wagon-400"
                }`}
              >
                <span className="inline-flex items-center justify-center gap-2">
                  {active ? <Check className="h-5 w-5" aria-hidden="true" /> : null}
                  {o.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* aria-live：選択後に現れる内容を読み上げに伝える */}
        <div aria-live="polite">
          {panel ? (
            <div className="mt-8 rounded-card border border-wagon-100 bg-white p-6 shadow-card">
              {panel.showCountdown ? (
                <Countdown caption={panel.countdownCaption} date={panel.countdownDate} />
              ) : null}

              <h3 className="text-lg font-bold leading-snug text-ink">{panel.heading}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink">{panel.body}</p>

              <h4 className="mt-6 text-sm font-bold text-wagon-600">{panel.moshiHeading}</h4>
              <ul className="mt-3 space-y-2">
                {panel.moshi.map((m) => (
                  <li key={m.name} className="rounded-2xl bg-wagon-50 px-4 py-3">
                    <p className="text-sm font-bold text-ink">{m.name}</p>
                    <p className="mt-1 text-xs leading-relaxed text-inkSoft">
                      {m.description}
                    </p>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-[11px] text-inkSoft">{gradeBranch.scheduleNote}</p>

              <div className="mt-6 flex flex-col items-center gap-2">
                <ApplyButton cta="grade" label={cta.mainLabel} />
                <p className="text-xs text-inkSoft">{cta.notesFree}</p>
                <LineTextLink cta="grade" />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

/**
 * 国家試験までの残り日数。
 * 静的書き出し（build時）の日付が焼き付かないよう、マウント後に計算します。
 * 試験当日を過ぎた場合は何も表示しません。
 */
function Countdown({ caption, date }: { caption: string; date: string }) {
  const [days, setDays] = useState<number | null>(null);

  useEffect(() => {
    // 日本時間の 0:00 を基準に、切り上げで「あと何日」を出す。
    const target = new Date(`${examDate}T00:00:00+09:00`).getTime();
    const now = Date.now();
    const diff = Math.ceil((target - now) / 86400000);
    setDays(diff > 0 ? diff : 0);
  }, []);

  if (days === null || days <= 0) return null;

  return (
    <div className="mb-6 rounded-2xl bg-wagon-50 px-4 py-4 text-center">
      <p className="text-xs text-inkSoft">{caption}</p>
      <p className="mt-1">
        <span className="text-4xl font-bold leading-none text-wagon-600">{days}</span>
        <span className="ml-1 text-base font-bold text-wagon-600">日</span>
      </p>
      <p className="mt-1 text-[11px] text-inkSoft">{date}</p>
    </div>
  );
}
