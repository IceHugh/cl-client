import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface OptionExerciseCardProps {
  typename?: string
  asset: string
  exercisePrice: number
  exerciseDate: string
  amount: number
  onExercise?: () => void
}

export function OptionExerciseCard({
  typename = "0x...",
  asset,
  exercisePrice,
  exerciseDate,
  amount,
  onExercise,
}: OptionExerciseCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Exercise Covered Call Option</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Option Coin Typename:</span>
            <span>{typename}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Underlying Asset:</span>
            <span>{asset}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Exercise Price:</span>
            <span>{exercisePrice} USDC</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Exercise Date:</span>
            <span>{exerciseDate}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Amount:</span>
            <span>{amount} Option Coins</span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="text-sm text-muted-foreground">Exercise amount:</div>
          <Input type="number" placeholder="100 SUI" />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={onExercise}>
          Exercise
        </Button>
      </CardFooter>
    </Card>
  )
}

