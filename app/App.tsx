import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { AppRoutes } from './AppRoutes'
import {
  createNetworkConfig,
  SuiClientProvider,
  WalletProvider,
  useAccounts,
} from '@mysten/dapp-kit'
import { getFullnodeUrl } from '@mysten/sui/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import test from 'node:test'

// Config options for the networks you want to connect to
const { networkConfig } = createNetworkConfig({
  localnet: { url: getFullnodeUrl('localnet') },
  mainnet: { url: getFullnodeUrl('mainnet') },
  testnet: { url: getFullnodeUrl('testnet') },
})
const queryClient = new QueryClient()

function App() {
  // console.log(accounts)

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <SuiClientProvider networks={networkConfig} defaultNetwork='testnet'>
          <WalletProvider autoConnect>
            <main className='h-screen flex flex-col'>
              <Header />
              <section className='container mx-auto flex-1'>
                <AppRoutes />
              </section>
              <Footer />
            </main>
          </WalletProvider>
        </SuiClientProvider>
      </QueryClientProvider>
    </>
  )
}

export default App
