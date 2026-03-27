import { MagneticButton } from "@/components/magnetic-button"
import { useReveal } from "@/hooks/use-reveal"

export function AboutSection({ scrollToSection }: { scrollToSection?: (index: number) => void }) {
  const { ref, isVisible } = useReveal(0.3)

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start items-center px-4 pt-20 md:px-12 md:pt-0 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid gap-8 md:grid-cols-[1fr_1.1fr] md:gap-16 lg:gap-20">
          {/* Left side - Story */}
          <div>
            <div
              className={`mb-6 transition-all duration-700 md:mb-12 ${
                isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
              }`}
            >
              <h2 className="mb-3 font-serif text-3xl font-light leading-[1.1] tracking-tight text-foreground md:mb-4 md:text-6xl lg:text-7xl">
                Анна Калинина —
                <br />
                земельный
                <br />
                <span className="text-foreground/40">эксперт</span>
              </h2>
            </div>

            <div
              className={`space-y-3 transition-all duration-700 md:space-y-4 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              <p className="max-w-md text-sm leading-relaxed text-foreground/90 md:text-lg">
                Специалист по оформлению земельных участков с юридическим образованием. Помогаю разобраться с землёй и принять грамотное, безопасное решение.
              </p>
              <p className="max-w-md text-sm leading-relaxed text-foreground/90 md:text-lg">
                Моя задача — не просто продать услугу, а помочь вам получить реальный результат. Работаю дистанционно по всей России.
              </p>
            </div>
          </div>

          {/* Right side - Photo */}
          <div
            className={`relative flex items-center justify-center transition-all duration-1000 ${
              isVisible ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            <div className="relative h-[55vh] w-full max-w-xs md:h-[70vh] md:max-w-sm">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-foreground/10 to-transparent" />
              <img
                src="https://cdn.poehali.dev/projects/9f03a55d-1e5f-471c-9937-f7cd9fa168c2/bucket/5186a134-1220-446d-bc63-d0c2e840eae1.jpg"
                alt="Анна Калинина — земельный эксперт"
                className="h-full w-full rounded-2xl object-cover object-top"
              />
              <div className="absolute inset-0 rounded-2xl ring-1 ring-foreground/20" />
            </div>
          </div>
        </div>

        <div
          className={`mt-8 flex flex-wrap gap-3 transition-all duration-700 md:mt-16 md:gap-4 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
          style={{ transitionDelay: "750ms" }}
        >
          <MagneticButton size="lg" variant="primary" onClick={() => scrollToSection?.(5)}>
            Получить консультацию
          </MagneticButton>
          <MagneticButton size="lg" variant="secondary" onClick={() => scrollToSection?.(1)}>
            Смотреть кейсы
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}