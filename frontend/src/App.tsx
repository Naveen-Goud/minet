import { ThemeProvider } from '@mui/material'
import theme from './theme'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { SignUpPage } from './pages/SignupPage'
import { LoginPage } from './pages/LoginPage'
import WalletCashPage from './pages/WalletCash'
import ForgotPasswordPage from './pages/ForgotPassword'
import TradePage from './pages/TradePage'
import React, { createContext, useMemo, useState } from 'react'
import PurchasePage from './pages/Purchase'
import DetailsPage from './pages/DetailsPage'
import SellPage from './pages/Sell'
import DashboardPage from './pages/Dashboard'

export const UserContext = createContext({ userId: 0 })

export const TradePageLoader = createContext({
  loadPage: true,
  setLoadPage: (value) => {},
})
export const DashboardLoader = createContext({
  loadDashboard: true,
  setLoadDashboard: (value) => {},
})
export const CoinsContext = createContext({
  coinsData: [],
  setCoinsData: (value) => {},
})

export const WatchlistContext = createContext({
  watchlistData: [],
  setWatchlistData: (value) => {},
})
const App = () => {
  const [loadPage, setLoadPage] = useState(false)
  const [coinsData, setCoinsData] = useState<any>([])
  const [loadDashboard, setLoadDashboard] = useState(true)
  const [watchlistData, setWatchlistData] = useState<any>([])
  const memoizedValue = useMemo(() => {
    return { userId: 1 }
  }, [])

  const loadValue = useMemo(
    () => ({
      loadPage,
      setLoadPage,
    }),
    [loadPage, setLoadPage]
  )

  const dashboardValue = useMemo(
    () => ({ loadDashboard, setLoadDashboard }),
    [loadDashboard, setLoadDashboard]
  )

  const watchlistValue = useMemo(
    () => ({ watchlistData, setWatchlistData }),
    [watchlistData, setWatchlistData]
  )

  const coinsValue = useMemo(
    () => ({ coinsData, setCoinsData }),
    [coinsData, setCoinsData]
  )
  return (
    <UserContext.Provider value={memoizedValue}>
      <CoinsContext.Provider value={coinsValue}>
        <WatchlistContext.Provider value={watchlistValue}>
          <DashboardLoader.Provider value={dashboardValue}>
            <TradePageLoader.Provider value={loadValue}>
              <BrowserRouter>
                <ThemeProvider theme={theme}>
                  <Routes>
                    <Route path="/" element={<SignUpPage />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/walletCash" element={<WalletCashPage />} />
                    <Route
                      path="/forgotPassword"
                      element={<ForgotPasswordPage />}
                    />
                    <Route path="/trade" element={<TradePage />} />
                    <Route path="/purchase" element={<PurchasePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/sell" element={<SellPage />} />
                    <Route path="/details" element={<DetailsPage />} />
                  </Routes>
                </ThemeProvider>
              </BrowserRouter>
            </TradePageLoader.Provider>
          </DashboardLoader.Provider>
        </WatchlistContext.Provider>
      </CoinsContext.Provider>
    </UserContext.Provider>
  )
}

export default App
