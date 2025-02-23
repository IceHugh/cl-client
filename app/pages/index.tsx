import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { CheckCircle2 } from "lucide-react"

export default function CryptoForm() {
  const [amount, setAmount] = useState<string>('0')
  const [walletAddresses, setWalletAddresses] = useState<string>('')
  const [splitAmount, setSplitAmount] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)

  const getWalletCount = () => {
    return walletAddresses.split('\n').filter((address) => address.trim())
      .length
  }

  const getAmountPerWallet = () => {
    const walletCount = getWalletCount()
    if (!walletCount || !amount) return 0
    return Number.parseFloat(amount) / walletCount
  }

  const handleConfirm = () => {
    setShowSuccessDialog(true)
  }

  return (
    <>
      <div className='max-w-2xl mx-auto p-6 space-y-8'>
        <div className='space-y-2'>
          <h2 className='text-2xl font-semibold'>1. Input the:</h2>
          <Label htmlFor='wallets'>
            Enter Separate wallet addresses on a new line
          </Label>
          <Textarea
            id='wallets'
            className='min-h-[100px]'
            placeholder='sui addresses'
            value={walletAddresses}
            onChange={(e) => setWalletAddresses(e.target.value)}
          />
        </div>

        <div className='space-y-6'>
          <div className='space-y-2'>
            <h2 className='text-2xl font-semibold'>2. Choose a Asset</h2>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder='---' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='sui'>Sui</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='amount'>Enter Amount to Send</Label>
            <div className='relative'>
              <div className='absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-sm'>
                0
              </div>
              <Input
                id='amount'
                type='number'
                className='pl-12'
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>

          <div className='space-y-4'>
            <div className='flex items-center justify-between'>
              <div className='space-y-0.5'>
                <Label>Split the amount</Label>
                <p className='text-sm text-muted-foreground'>
                  Activate this option to divide the amount per wallet.
                </p>
              </div>
              <Switch checked={splitAmount} onCheckedChange={setSplitAmount} />
            </div>

            {splitAmount && (
              <div className='bg-[#fff9e6] p-4 rounded-lg border border-[#f5e6b3]'>
                <p className='font-mono'>
                  AMOUNT PER WALLET: {getAmountPerWallet()}
                </p>
              </div>
            )}
          </div>
          <Button className='w-full' size="lg" onClick={handleConfirm}>
            Confirm Airdrop
          </Button>
        </div>
      </div>

      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center justify-center mb-4">
              <CheckCircle2 className="h-12 w-12 text-green-500" />
            </div>
            <DialogTitle className="text-center text-xl">Transaction Submitted Successfully!</DialogTitle>
            <DialogDescription className="text-center space-y-2">
              <p>Your airdrop transaction has been submitted to the network.</p>
              <div className="mt-4 p-3 bg-slate-50 rounded-lg">
                <p className="font-medium">Transaction Details:</p>
                <p>Total Amount: {amount} SUI</p>
                <p>Number of Recipients: {getWalletCount()}</p>
                {splitAmount && (
                  <p>Amount per Wallet: {getAmountPerWallet()} SUI</p>
                )}
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center">
            <Button
              variant="secondary"
              onClick={() => setShowSuccessDialog(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
