import { useReveal } from "@/hooks/use-reveal"
import { useState } from "react"
import { MagneticButton } from "@/components/magnetic-button"

const faqs = [
  {
    question: "Можно ли получить землю бесплатно?",
    answer:
      "Да, в ряде случаев. Всё зависит от основания, региона и цели использования участка. Сначала проверяю реальную возможность — и только потом берёмся за работу.",
  },
  {
    question: "Если уже был отказ — есть ли шанс?",
    answer:
      "В большинстве случаев да. Часто причина отказа — ошибки в подаче или неправильно оформленные документы. Разбираю ситуацию и даю конкретное решение.",
  },
  {
    question: "Можно ли проверить участок перед покупкой?",
    answer:
      "Да, и это обязательный этап. Помогу выявить скрытые риски и ограничения — зонирование, обременения, несоответствие ВРИ — прежде чем вы потратите деньги.",
  },
  {
    question: "Работаете ли вы с регионами?",
    answer:
      "Да, работаю по всей России. Большинство вопросов решается дистанционно — переписка, звонки, анализ документов онлайн.",
  },
]

export function FaqSection({ scrollToSection }: { scrollToSection?: (index: number) => void }) {
  const { ref, isVisible } = useReveal(0.3)
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start items-center px-4 pt-20 md:px-12 md:pt-0 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid gap-8 md:grid-cols-[1fr_1.4fr] md:gap-16 lg:gap-24">
          <div className="flex flex-col justify-center">
            <div
              className={`transition-all duration-700 ${
                isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
              }`}
            >
              <h2 className="mb-3 font-sans text-4xl font-light leading-[1.1] tracking-tight text-foreground md:text-6xl lg:text-7xl">
                Частые
                <br />
                вопросы
              </h2>
              <p className="mb-6 font-mono text-sm text-foreground/60 md:text-base">/ FAQ</p>
              <p className="max-w-xs text-sm leading-relaxed text-foreground/80 md:text-base">
                Не нашли ответ? Напишите — разберу вашу ситуацию лично.
              </p>
            </div>
            <div
              className={`mt-8 transition-all duration-700 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              <MagneticButton variant="primary" size="lg" onClick={() => scrollToSection?.(5)}>
                Задать вопрос
              </MagneticButton>
            </div>
          </div>

          <div className="flex flex-col justify-center space-y-1">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`border-b border-foreground/10 transition-all duration-700 ${
                  isVisible ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="flex w-full items-start justify-between py-4 text-left md:py-5"
                >
                  <span className="pr-4 font-sans text-base font-light text-foreground md:text-lg">
                    {faq.question}
                  </span>
                  <span className="mt-0.5 shrink-0 font-mono text-lg text-foreground/40 transition-transform duration-300" style={{ transform: openIndex === i ? "rotate(45deg)" : "rotate(0deg)" }}>
                    +
                  </span>
                </button>
                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{ maxHeight: openIndex === i ? "200px" : "0px" }}
                >
                  <p className="pb-4 text-sm leading-relaxed text-foreground/70 md:text-base">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
