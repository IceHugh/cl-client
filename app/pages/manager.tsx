import { OptionCard } from "@/components/card/OptionCard"

export default function ManagePage() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <div className="flex max-w-[980px] flex-col items-start gap-2">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">Manage</h1>
          <div className="w-full grid gap-6 md:grid-cols-2">
            <OptionCard
              title="Covered Call Option"
              asset="SUI"
              exercisePrice={3.8}
              exerciseDate="2024-12-15 20:00"
              amount={2000}
            />
            {/* <OptionCard
              title="Covered Put Option"
              asset="SUI"
              exercisePrice={3.8}
              exerciseDate="2024-12-15 20:00"
              amount={2000}
            /> */}
          </div>
        </div>
      </section>
    </div>
  )
}

