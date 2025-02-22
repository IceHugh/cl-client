import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Calendar } from '@/components/ui/calendar'
import { CalendarIcon } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { useAccounts, useSignAndExecuteTransaction } from '@mysten/dapp-kit'
import { useEffect, useState } from 'react'
import { getFullnodeUrl, SuiClient } from '@mysten/sui/client'
import { Transaction } from '@mysten/sui/transactions'

const CALL_OPTION = 0
const PUT_OPTION = 1

interface Coin {
  name: string
  balance: number
}
export function CreateAmmForm() {
  const accounts = useAccounts()
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction()
  const [coins, setCoins] = useState<Coin[]>([])



  async function onSubmit(values: any) {
    console.log('Form values:', values)

    if (!accounts || !accounts[0]) return

    const packageObjectId =
      '0xd82198a8369825beb19a2c4c5209bbe33b1b6dcd320c1b2e7145a54ced05f8b6' // Replace with your package ID
    const vaultOwnerObjectId =
      '0x75efd00fbaa7cd52adb57098466c41db9a052fe48ca68e212f24c346898bd618' // Replace with your treasury cap
    const marketplaceObjectId =
      '0x6231761053767f8680abc0ae9570483d9aae0fb19f6388c9749dd9574d6afa54'
    
    const gas_amount = BigInt(10000000)

    const tx = new Transaction()
    tx.setGasBudget(gas_amount)
    const [coin] = tx.splitCoins(tx.object('0x14b8a33ca973f504046b54698e318339da4cc19517b9d49fbc90bc9064606c42'), [2000e9])
    tx.moveCall({
      target: `${packageObjectId}::tokensmith::write_covered_call`,
      arguments: [
        tx.object(marketplaceObjectId),
        tx.object(vaultOwnerObjectId),
        tx.object('0x6'),
        coin,
      ],
      typeArguments: [
        '0x8ce0522df4a028f0ce8dfff52b36f4ba8a22af036cb57fb1b0ec1c8db2531147::coin::COIN', // Replace with your asset type
        '0xa5eab2387a897a184ad672e343c3f3d0a9b17646dfd1cb432a8902930ec4286f::mock_usdc::MOCK_USDC', // Replace with your USDC type
        '0x639db0afc89a8002a871b2c2c27a2b0f3c3686cfc6b2831c8c0a74f7cfdab64f::mock_option::MOCK_OPTION', // Replace with your option coin type
      ],
    })
    signAndExecuteTransaction(
      {
        transaction: tx,
      },
      {
        onSuccess: (result) => {
          console.log('executed transaction', result)
          // setDigest(result.digest)
        },
      }
    )
  }

  return (
    <Card className='w-full max-w-md'>
      <CardHeader>
        <CardTitle>Create Amm</CardTitle>
      </CardHeader>
      <CardContent>
        <h3 className='text-center text-lg'>Congrats! </h3>
        <p className='text-center'>You have successfully created an option!</p>
      </CardContent>
      <CardFooter>
        <Button className='w-full' onClick={onSubmit}>
          Create AMM Pool for the Option Coin
        </Button>
      </CardFooter>
    </Card>
  )
}
