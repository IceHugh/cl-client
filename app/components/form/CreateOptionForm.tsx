import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { useAccounts } from "@mysten/dapp-kit"
import { use, useEffect, useState } from "react"
import { getFullnodeUrl, SuiClient } from "@mysten/sui/client"
import { WalletAccount } from "@mysten/wallet-standard"




export function CreateOptionForm() {
  // const [address, setAddress] = useState("")
  const accounts = useAccounts()
  const [coinNames, setCoinNames] = useState<string[]>([])
  const [coinBalances, setCoinBalances] = useState<string[]>([])


    
  //     const client = new SuiClient({
  //       url: getFullnodeUrl("testnet"),
  //     })
  //     const objects = await client.getOwnedObjects({
  //       owner: accounts[0].address,
  //     });
  //     for (const object of objects.data) {
  //       console.log(object)
  //     }
  //     const resource = client.getCoinMetadata({
  //       coinType: "0x75843eb5d02b04fbc7ea0ec6b2173688139798b7ac1656af8bee0090e6a2ff04::my_coin::MY_COIN",
  //     });
      // console.log(resource)

      // console.log(resources)
  
  // const [marketplaceId,setMarketplaceId] = useState("0x5a4a826dee99a1486c26895c6cb00dbea8aa3b43d72cb655125564c77f8092ca")
  // const [packageid, setPackageId] = useState(
  //   "0xbfa6bd48a5dac421fc20390d3909ce7a8ddce08d0a020cb907e390f33319c7b0"
  // );
  useEffect(() => {
    if (accounts && accounts.length > 0) {
      if(accounts[0].address) {
        console.log(accounts[0].address)
        fetchMeMeInfo()
      }
    }

  }, [accounts])


  const fetchMeMeInfo = async () => {
    
    const client = new SuiClient({
      url: getFullnodeUrl("testnet"),
    })
    // const resources = await client.getOwnedObjects({
    //   owner: accounts[0].address,
    // });
    // console.log(resources)
    const allCoins = await client.getAllCoins({
      owner: accounts[0].address,
    })
    let names: string[] = []
    let balances: string[] = []
    console.log(allCoins)
    for (const SingleCoin of allCoins.data) {
      // console.log(SingleCoin)
      if (SingleCoin.balance) {
        balances.push(SingleCoin.balance)
      }
      // console.log(SingleCoin.coinType)
      const resource = await client.getCoinMetadata({
        coinType: SingleCoin.coinType,
      });
      if (resource && resource.name) {
        // console.log(resource.name)
        names.push(resource.name)
      }
    }
    setCoinNames(names)
    setCoinBalances(balances)

    // 这里balance是作为上限值，用户输入的amount数量不能超过balance
    console.log("All coin balances:", balances)
    console.log("All coin names:", names)
  }
 


  const formSchema = z.object({
    asset: z.string().min(1, "Please select an asset"),
    amount: z.string().min(1, "Please enter an amount"),
    strikePrice: z.string().min(1, "Please enter a strike price"),
    exerciseDate: z.string().min(1, "Please select an exercise date"),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      asset: "",
      amount: "",
      strikePrice: "",
      exerciseDate: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Create Covered CALL Option</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="asset"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Underlying Assets</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Assets Type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="sui">SUI</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input placeholder="Value" type="number" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="strikePrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Strike Price</FormLabel>
                  <FormControl>
                    <Input placeholder="Value" type="number" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="exerciseDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Exercise Date</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Date" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="2024-12-15">2024-12-15</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <div className="flex justify-between text-sm">
              <span>Deployment Fee:</span>
              <span>0.99 SUI</span>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={form.handleSubmit(onSubmit)}>
          Create Option
        </Button>
      </CardFooter>
    </Card>
  )
}

