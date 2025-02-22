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
      <main>
        <QueryClientProvider client={queryClient}>
          <SuiClientProvider networks={networkConfig} defaultNetwork='testnet'>
            <WalletProvider autoConnect>
              <Header />
              <section className='container mx-auto'>
                <AppRoutes />
              </section>
              <Footer />
            </WalletProvider>
          </SuiClientProvider>
        </QueryClientProvider>
      </main>
    </>
  )
}

export default App
