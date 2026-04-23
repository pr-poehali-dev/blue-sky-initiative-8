import { useReveal } from "@/hooks/use-reveal"

const SERVICES = [
  {
    title: "Подбор и получение участка без торгов",
    description:
      "Помогаю получить земельный участок от государства без аукциона под ИЖС, ЛПХ, рекреацию и другие цели. Работаю по всей России.",
    buttonLabel: "Получить консультацию",
    href: "#contact",
    direction: "top",
  },
  {
    title: "Проверка земельного участка",
    description:
      "Комплексная проверка перед покупкой или оформлением: анализ рисков, ограничений, ВРИ и градостроительной документации.",
    price: "от 5 000 ₽",
    buttonLabel: "Заказать проверку",
    href: "#contact",
    direction: "right",
  },
  {
    title: "Схема расположения земельного участка (СРЗУ) в Argo",
    description: "Подготовка схемы в профессиональной программе Argo.",
    price: "от 3 000 ₽",
    term: "до 1 суток",
    buttonLabel: "Заказать схему",
    href: "#contact",
    direction: "left",
  },
  {
    title: "Консультация",
    description:
      "Онлайн или письменный разбор вашей ситуации с конкретными рекомендациями. Без воды — только по делу.",
    price: "5 000 ₽",
    buttonLabel: "Записаться на консультацию",
    href: "#contact",
    direction: "bottom",
  },
  {
    title: "Сопровождение в торгах",
    description:
      "Комплексная поддержка участия в аукционах: подбор лота, подготовка и подача документов, представление ваших интересов и оформление результатов.",
    buttonLabel: "Участвовать в торгах",
    href: "#contact",
    direction: "left",
  },
  {
    title: "Бесплатное предоставление земли",
    description: null,
    bullets: [
      "многодетным семьям, инвалидам и участникам СВО (в рамках льгот)",
      "по программам «Арктический гектар» и «Дальневосточный гектар» (доступно всем гражданам России)",
    ],
    buttonLabel: "Узнать, как получить участок бесплатно",
    href: "#contact",
    direction: "right",
  },
]

export function ServicesSection() {
  const { ref, isVisible } = useReveal(0.2)

  return (
    <section
      ref={ref}
      className="flex min-h-screen w-screen shrink-0 snap-start items-center px-6 py-20 md:px-12 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div
          className={`mb-6 transition-all duration-700 md:mb-8 ${
            isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
          }`}
        >
          <h2 className="mb-1 font-serif text-3xl font-light tracking-tight text-foreground md:text-4xl lg:text-5xl">
            Услуги
          </h2>
          <p className="font-mono text-xs text-foreground/60 md:text-sm">/ Чем могу помочь</p>
        </div>

        <div className="grid gap-0 md:grid-cols-2 md:gap-x-16">
          {SERVICES.map((service, i) => (
            <ServiceCard key={i} service={service} index={i} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  )
}

type Service = (typeof SERVICES)[number]

function ServiceCard({
  service,
  index,
  isVisible,
}: {
  service: Service
  index: number
  isVisible: boolean
}) {
  const getRevealClass = () => {
    if (!isVisible) {
      switch (service.direction) {
        case "left": return "-translate-x-16 opacity-0"
        case "right": return "translate-x-16 opacity-0"
        case "top": return "-translate-y-16 opacity-0"
        case "bottom": return "translate-y-16 opacity-0"
        default: return "translate-y-12 opacity-0"
      }
    }
    return "translate-x-0 translate-y-0 opacity-100"
  }

  const handleClick = () => {
    const el = document.querySelector(service.href)
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div
      className={`group flex flex-col border-t border-foreground/20 py-4 transition-all duration-700 hover:border-foreground/50 ${getRevealClass()}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <h3 className="mb-1.5 font-serif text-lg font-light text-foreground md:text-xl">
        {service.title}
      </h3>

      {service.description && (
        <p className="mb-2 max-w-sm text-xs leading-relaxed text-foreground/80 md:text-sm">
          {service.description}
        </p>
      )}

      {service.bullets && (
        <div className="mb-2 max-w-sm">
          <p className="mb-1 text-xs leading-relaxed text-foreground/80 md:text-sm">
            Помогаю получить земельный участок от государства бесплатно:
          </p>
          <ul className="space-y-0.5">
            {service.bullets.map((b, bi) => (
              <li key={bi} className="flex items-start gap-2 text-xs leading-relaxed text-foreground/80 md:text-sm">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-foreground/50" />
                {b}
              </li>
            ))}
          </ul>
        </div>
      )}

      {(service.price || service.term) && (
        <div className="mb-2 flex flex-wrap gap-3">
          {service.price && (
            <span className="font-mono text-xs font-medium text-foreground/90">
              Цена: {service.price}
            </span>
          )}
          {service.term && (
            <span className="font-mono text-xs text-foreground/60">Срок: {service.term}</span>
          )}
        </div>
      )}

      <button
        onClick={handleClick}
        className="mt-auto w-fit rounded-full border border-foreground/30 bg-transparent px-3 py-1.5 text-xs text-foreground transition-all duration-200 hover:border-foreground/60 hover:bg-foreground/10"
      >
        {service.buttonLabel}
      </button>
    </div>
  )
}