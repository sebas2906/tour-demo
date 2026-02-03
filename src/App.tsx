import { useMemo, useState } from 'react'
import { MapleMark } from './brand/MapleMark'
import { useLocalStorageState } from './lib/storage'
import { HOTSPOTS } from './tour/hotspots'
import { TourCanvas } from './tour/TourCanvas'

function App() {
  const [selectedId, setSelectedId] = useState<string | undefined>()
  const [collectedIds, setCollectedIds] = useLocalStorageState<string[]>(
    'tourvirtual.collectedHotspots.v1',
    [],
  )

  const collectedSet = useMemo(() => new Set(collectedIds), [collectedIds])

  const selected = useMemo(
    () => HOTSPOTS.find((h) => h.id === selectedId),
    [selectedId],
  )

  const progress = (collectedIds.length / HOTSPOTS.length) * 100

  const [quizAnswerIndex, setQuizAnswerIndex] = useState<number | undefined>()
  const quizResult =
    selected && quizAnswerIndex !== undefined
      ? quizAnswerIndex === selected.quiz.answerIndex
        ? 'correct'
        : 'wrong'
      : undefined

  function selectHotspot(id: string) {
    setSelectedId(id)
    setQuizAnswerIndex(undefined)
  }

  function markCollected(id: string) {
    setCollectedIds((prev) => (prev.includes(id) ? prev : [...prev, id]))
  }

  return (
    <div className="h-full bg-slate-950 text-slate-100">
      <div className="flex h-full">
        <aside className="hidden w-90 shrink-0 border-r border-slate-800 bg-slate-950/80 p-5 md:block">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3">
                <MapleMark />
                <div>
                  <div className="text-xs font-semibold tracking-wide text-red-300">
                    CANADIAN
                    <span className="ml-1 italic text-red-400">English</span>
                    <span className="ml-1 text-slate-300">Institute</span>
                  </div>
                  <h1 className="mt-1 text-xl font-semibold leading-tight">
                    Virtual 360 Tour + Vocabulary
                  </h1>
                </div>
              </div>
              <p className="mt-2 text-sm text-slate-300">
                Explora el tour, toca hotspots, y aprende vocabulario real para viajar.
              </p>
            </div>
          </div>

          <div className="mt-5 rounded-xl border border-slate-800 bg-slate-900/40 p-4">
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span>Progress</span>
              <span>
                {collectedIds.length}/{HOTSPOTS.length} hotspots
              </span>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full bg-linear-to-r from-red-500 to-rose-400"
                style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
              />
            </div>
            <div className="mt-3 text-xs text-slate-400">
              Tip: mantén presionado y arrastra para mirar alrededor.
            </div>
          </div>

          <div className="mt-5">
            <div className="text-xs font-semibold tracking-wide text-slate-300">
              Hotspots
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {HOTSPOTS.map((h) => {
                const done = collectedSet.has(h.id)
                const active = selectedId === h.id
                return (
                  <button
                    key={h.id}
                    onClick={() => selectHotspot(h.id)}
                    className={
                      'rounded-lg border px-3 py-2 text-left text-sm transition ' +
                      (active
                        ? 'border-red-400 bg-red-500/10'
                        : 'border-slate-800 bg-slate-900/30 hover:border-slate-600')
                    }
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{h.label}</span>
                      <span
                        className={
                          'text-xs ' +
                          (done ? 'text-emerald-300' : 'text-slate-500')
                        }
                      >
                        {done ? '✓' : '•'}
                      </span>
                    </div>
                    <div className="mt-1 text-xs text-slate-400">
                      Word: <span className="text-slate-200">{h.quiz.word}</span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-slate-800 bg-linear-to-b from-slate-900/60 to-slate-950/40 p-4">
            <div className="text-xs font-semibold tracking-wide text-slate-200">
              Promo
            </div>
            <p className="mt-2 text-sm text-slate-300">
              ¿Quieres tours guiados en inglés para tu negocio o para viajar con confianza?
              Prueba una clase gratis.
            </p>
            <div className="mt-3 flex gap-2">
              <a
                className="inline-flex flex-1 items-center justify-center rounded-lg bg-red-500 px-3 py-2 text-sm font-semibold text-slate-950 hover:bg-red-400"
                href="https://wa.me/593999293026?text=Hi%21%20I%20want%20to%20book%20a%20free%20trial%20English%20class."
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp (free trial)
              </a>
              <button
                className="rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-200 hover:border-slate-500"
                onClick={() => {
                  setSelectedId(undefined)
                  setQuizAnswerIndex(undefined)
                }}
              >
                Reset view
              </button>
            </div>
            <div className="mt-2 text-xs text-slate-500">
              Reemplaza el email y el branding con tu negocio real.
            </div>
          </div>
        </aside>

        <main className="relative flex-1">
          <div className="absolute inset-0">
            <TourCanvas
              collectedIds={collectedSet}
              selectedId={selectedId}
              onSelectHotspot={selectHotspot}
            />
          </div>

          <div className="pointer-events-none absolute left-0 right-0 top-0 flex items-center justify-between p-4 md:hidden">
            <div className="pointer-events-auto rounded-xl border border-slate-800 bg-slate-950/70 px-3 py-2 text-sm">
              <div className="flex items-center gap-2">
                <MapleMark />
                <div>
                  <div className="text-xs font-semibold text-red-300">
                    CANADIAN <span className="italic text-red-400">English</span>{' '}
                    <span className="text-slate-300">Institute</span>
                  </div>
                  <div className="font-semibold">360 Tour</div>
                </div>
              </div>
            </div>
            <div className="pointer-events-auto rounded-xl border border-slate-800 bg-slate-950/70 px-3 py-2 text-xs text-slate-300">
              {collectedIds.length}/{HOTSPOTS.length}
            </div>
          </div>

          {selected && (
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 p-4">
              <div className="pointer-events-auto mx-auto w-full max-w-3xl rounded-2xl border border-slate-800 bg-slate-950/80 p-4 backdrop-blur">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-xs font-semibold tracking-wide text-slate-300">
                      POINT OF INTEREST
                    </div>
                    <div className="mt-1 text-lg font-semibold">
                      {selected.tourismTitle}
                    </div>
                    <p className="mt-2 text-sm text-slate-300">{selected.tourismText}</p>
                  </div>
                  <button
                    className="rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-200 hover:border-slate-500"
                    onClick={() => setSelectedId(undefined)}
                  >
                    Close
                  </button>
                </div>

                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-3">
                    <div className="text-xs font-semibold tracking-wide text-slate-300">
                      Vocabulary Quiz
                    </div>
                    <div className="mt-1 text-sm text-slate-200">
                      <span className="font-semibold">Word:</span> {selected.quiz.word}
                    </div>
                    <div className="mt-2 text-sm text-slate-300">{selected.quiz.prompt}</div>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      {selected.quiz.choices.map((c, idx) => (
                        <button
                          key={c}
                          onClick={() => setQuizAnswerIndex(idx)}
                          className={
                            'rounded-lg border px-3 py-2 text-left text-sm transition ' +
                            (quizAnswerIndex === idx
                              ? 'border-red-400 bg-red-500/10'
                              : 'border-slate-800 bg-slate-950/20 hover:border-slate-600')
                          }
                        >
                          {c}
                        </button>
                      ))}
                    </div>

                    {quizResult && (
                      <div className="mt-3 text-sm">
                        {quizResult === 'correct' ? (
                          <div className="rounded-lg border border-emerald-900/50 bg-emerald-500/10 px-3 py-2 text-emerald-200">
                            Correct. Example: “{selected.quiz.example}”
                          </div>
                        ) : (
                          <div className="rounded-lg border border-rose-900/50 bg-rose-500/10 px-3 py-2 text-rose-200">
                            Not quite. Try again.
                          </div>
                        )}
                      </div>
                    )}

                    <div className="mt-3 flex gap-2">
                      <button
                        disabled={quizResult !== 'correct'}
                        onClick={() => markCollected(selected.id)}
                        className={
                          'rounded-lg px-3 py-2 text-sm font-semibold ' +
                          (quizResult === 'correct'
                            ? 'bg-emerald-400 text-slate-950 hover:bg-emerald-300'
                            : 'bg-slate-800 text-slate-400')
                        }
                      >
                        Collect word
                      </button>
                      <button
                        className="rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-200 hover:border-slate-500"
                        onClick={() => setQuizAnswerIndex(undefined)}
                      >
                        Reset quiz
                      </button>
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-3">
                    <div className="text-xs font-semibold tracking-wide text-slate-300">
                      What you’re learning
                    </div>
                    <ul className="mt-2 space-y-2 text-sm text-slate-300">
                      <li>
                        <span className="font-semibold text-slate-200">Speaking:</span>{' '}
                        greetings, asking for help, ordering food.
                      </li>
                      <li>
                        <span className="font-semibold text-slate-200">Tourism English:</span>{' '}
                        useful phrases for real situations.
                      </li>
                      <li>
                        <span className="font-semibold text-slate-200">Confidence:</span>{' '}
                        practice in a safe, interactive space.
                      </li>
                    </ul>

                    <div className="mt-3 rounded-lg border border-slate-800 bg-slate-950/20 p-3">
                      <div className="text-xs font-semibold tracking-wide text-slate-300">
                        Collected words
                      </div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {collectedIds.length === 0 ? (
                          <span className="text-sm text-slate-500">
                            No words yet. Collect your first one.
                          </span>
                        ) : (
                          collectedIds.map((id) => {
                            const h = HOTSPOTS.find((x) => x.id === id)
                            if (!h) return null
                            return (
                              <span
                                key={id}
                                className="rounded-full border border-emerald-900/50 bg-emerald-500/10 px-3 py-1 text-sm text-emerald-200"
                              >
                                {h.quiz.word}
                              </span>
                            )
                          })
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default App
