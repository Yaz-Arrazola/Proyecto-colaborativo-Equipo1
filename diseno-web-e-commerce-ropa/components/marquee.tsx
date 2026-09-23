'use client'

const items = [
  'ENVÍO GRATIS +120€',
  'DEVOLUCIONES EN 30 DÍAS',
  'ALGODÓN ORGÁNICO 100%',
  'EDICIONES LIMITADAS',
  'FABRICADO EN EUROPA',
  'PAGO SEGURO',
]

export function Marquee() {
  return (
    <div className="overflow-hidden border-y border-border bg-foreground py-3.5 text-background">
      <div className="flex w-max animate-[marquee_28s_linear_infinite] gap-10 pr-10">
        {[...items, ...items, ...items].map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-10 text-xs font-semibold uppercase tracking-[0.2em]"
          >
            {item}
            <span className="text-accent">✳</span>
          </span>
        ))}
      </div>
      <style jsx>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(calc(-100% / 3));
          }
        }
      `}</style>
    </div>
  )
}
