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
export function CreateOptionForm() {
  const accounts = useAccounts()
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction()
  const [coins, setCoins] = useState<Coin[]>([])
  useEffect(() => {
    if (accounts && accounts.length > 0) {
      if (accounts[0].address) {
        fetchMeMeInfo()
      }
    }
  }, [accounts])

  const fetchMeMeInfo = async () => {
    const client = new SuiClient({
      url: getFullnodeUrl('testnet'),
    })
    const allCoins = await client.getAllCoins({
      owner: accounts[0].address,
    })
    let _coins: { name: string; balance: number }[] = []
    for (const SingleCoin of allCoins.data) {
      const { balance, coinType } = SingleCoin
      const resource = await client.getCoinMetadata({
        coinType,
      })
      if (resource?.name) {
        const coin = _coins.find((c) => c.name === resource.name)
        if (coin) {
          coin.balance += Number(balance)
        } else {
          _coins.push({
            name: resource.name,
            balance: Number(balance),
          })
        }
      }
    }
    setCoins(_coins)
  }

  const formSchema = z.object({
    optionType: z.string().min(1, 'Please select an option type'),
    asset: z.string().min(1, 'Please select an asset'),
    amount: z.string().min(1, 'Please enter an amount'),
    strikePrice: z.string().min(1, 'Please enter a strike price'),
    exerciseDate: z.date({
      required_error: 'A date of birth is required.',
    }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      optionType: '',
      asset: '',
      amount: '',
      strikePrice: '',
      exerciseDate: new Date(),
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('Form values:', values)

    if (!accounts || !accounts[0]) return

    const packageObjectId =
      '0xd82198a8369825beb19a2c4c5209bbe33b1b6dcd320c1b2e7145a54ced05f8b6' // Replace with your package ID
    const treasuryCap =
      '0xd4e8f78f6c37d0d4b07c43e3572aae1ecb8642c1b38591755bc5e6e0d44fa884' // Replace with your treasury cap
    const marketplaceObjectId =
      '0x6231761053767f8680abc0ae9570483d9aae0fb19f6388c9749dd9574d6afa54' // Replace with your marketplace object ID
    const gas_amount = BigInt(10000000)

    const tx = new Transaction()
    tx.setGasBudget(gas_amount)

    const optionType = values.optionType === 'call' ? CALL_OPTION : PUT_OPTION
    const expireDate = BigInt(new Date(values.exerciseDate).getTime())
    const priceNumerator = BigInt(Number(values.strikePrice) * 100)
    const priceDenominator = BigInt(100)
    const assetDecimals = 9
    const usdcDecimals = 6
    console.log(expireDate)

    tx.moveCall({
      target: `${packageObjectId}::tokensmith::init_option_vault`,
      arguments: [
        tx.object('0x6'),
        tx.object(treasuryCap),
        tx.pure.u8(optionType),
        tx.pure.u64(expireDate),
        tx.pure.u64(priceNumerator),
        tx.pure.u64(priceDenominator),
        tx.pure.u8(assetDecimals),
        tx.pure.u8(usdcDecimals),
        tx.object(marketplaceObjectId),
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
        <CardTitle>Create Option</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='optionType'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Option Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select Option Type' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='call'>CALL</SelectItem>
                      <SelectItem value='put'>PUT</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='asset'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Underlying Assets</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select Assets Type' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='sui'>SUI</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='amount'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input placeholder='Value' type='number' {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='strikePrice'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Strike Price</FormLabel>
                  <FormControl>
                    <Input placeholder='Value' type='number' {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='exerciseDate'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Exercise Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-[240px] justify-start text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        <CalendarIcon />
                        {field.value ? (
                          format(field.value, 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0' align='start'>
                      <Calendar
                        mode='single'
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
            <div className='flex justify-between text-sm'>
              <span>Deployment Fee:</span>
              <span>0.99 SUI</span>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <Button className='w-full' onClick={form.handleSubmit(onSubmit)}>
          Create Option
        </Button>
      </CardFooter>
    </Card>
  )
}
