import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useAccounts } from '@mysten/dapp-kit'
import { useState, useEffect } from 'react'

interface OptionCardProps {
  title: string
  asset: string
  exercisePrice: number
  exerciseDate: string
  amount: number
  onExercise?: () => void
  onSwap?: () => void
}

export function OptionCard({
  title,
  asset,
  exercisePrice,
  exerciseDate,
  amount,
  onExercise,
  onSwap,
}: OptionCardProps) {
  const accounts = useAccounts()
  console.log(accounts)
  const [exercise, setExercise] = useState(false)
  const [exerciseNumber, setExerciseNumber] = useState(0)
  // const [swap, setSwap] = use(false)
  useEffect(() => {
    console.log(accounts)
  }, [accounts])

  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-2 text-sm'>
          <div className='flex justify-between'>
            <span className='text-muted-foreground'>Underlying Asset:</span>
            <span>{asset}</span>
          </div>
          <div className='flex justify-between'>
            <span className='text-muted-foreground'>Exercise Price:</span>
            <span>{exercisePrice} USDC</span>
          </div>
          <div className='flex justify-between'>
            <span className='text-muted-foreground'>Exercise Date:</span>
            <span>{exerciseDate}</span>
          </div>
          <div className='flex justify-between'>
            <span className='text-muted-foreground'>Amount:</span>
            <span>{amount} Option Coins</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className='grid grid-cols-2 gap-2'>
        {exercise ? (
          <>
            <Button onClick={() => setExercise(true)}>Exercise</Button>
            <Button variant='outline' onClick={onSwap}>
              Swap
            </Button>
          </>
        ) : (
          <>
            <Input type="number" value={exerciseNumber} onChange={(e) => setExerciseNumber(Number(e.target.value))}></Input>
            <Button onClick={() => setExercise(false)}>Exercise</Button>
          </>
        )}
      </CardFooter>
    </Card>
  )
}
