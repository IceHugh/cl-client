import { TutorialSection } from '@/components/common/TutorialSection'
import { OptionCard } from '@/components/card/OptionCard'
import { OptionExerciseCard } from '@/components/card/OptionExerciseCard'

export default function PortfolioPage() {
  return (
    <div className='relative flex min-h-screen flex-col'>
      <main className='flex-1'>
        <div className='container py-6 space-y-6 md:py-10'>
          <TutorialSection />

          <div className='grid gap-6 md:grid-cols-2'>
            <OptionCard
              title='Covered Call Option'
              asset='SUI'
              exercisePrice={3.8}
              exerciseDate='2024-12-15 20:00'
              amount={1000}
            />
            <OptionCard
              title='Covered Put Option'
              asset='SUI'
              exercisePrice={3.8}
              exerciseDate='2024-12-15 20:00'
              amount={1000}
            />
          </div>

          <div className='md:max-w-[500px]'>
            <OptionExerciseCard
              asset='SUI'
              exercisePrice={3.8}
              exerciseDate='2024-12-15 20:00'
              amount={1000}
            />
          </div>
        </div>
      </main>
    </div>
  )
}
