import { IconPlusTypoProps } from '../components/molecules/IconPlusTypo'

export const TimePeriods = ['1H', '24H', '1W', '1M', '1Y', 'ALL']
export const DeliveryFee = 'Delivery fees'
export const sell = 'SELL'
export const buy = 'BUY'
export const SignUpFormHeading = 'Signup with Minet'

export const SignupFormFieldLabels = ['Full Name', 'Email', 'Password']

export const SignupFormFieldPlaceholders = [
  'Eg : John Doe',
  'you@company.com',
  'Create Password',
]
export const PasswordHelper =
  'A min of 8 characters with at least 1 special character and number included'

export const SignUpButton = 'Sign up'
export const SocialIcons = [
  {
    src: '../assets/icons/google.svg',
    label: 'Google',
    auth0: 'google-oauth2',
  },
  {
    src: '../assets/icons/facebook.svg',
    label: 'Facebook',
    auth0: 'facebook',
  },
  {
    src: '../assets/icons/microsoft.svg',
    label: 'Microsoft',
    auth0: 'windowslive',
  },
]
export const SignUpCaptions = ['Already have an account?', 'Login']
export const Navbarelelements = [
  'logo',
  'dashboard',
  'portfolio',
  'trade',
  'notification',
  'logout',
]

export const PaymentMethodCaptions = [
  {
    label1: 'PaymentMethod',
    label2: 'Visa credit ...8845',
    icon: '../assets/icons/Group 43.svg',
  },
  {
    label1: 'Delivery fees',
    label2: '0.001 BTC',
    icon: '../assets/icons/Group 43.svg',
  },
  {
    label1: 'Deposit to',
    label2: 'Bitcoin wallet',
    icon: '../assets/icons/Group 43.svg',
  },
]

export let PaymentMethodCaptionsSell = [
  {
    label1: 'Paying through',
    label2: `wallet`,
    icon: '../assets/icons/Group 43.svg',
  },
  {
    label1: 'Delivery fees',
    label2: `0.001`,
    icon: '../assets/icons/Group 43.svg',
  },
  {
    label1: 'Deposit to',
    label2: 'Rupee Coin',
    icon: '../assets/icons/Group 43.svg',
  },
]


export const OrderSummaryButton = 'BUY NOW'

export const OrderAction = 'You are buying'

export const SellAction = 'You are selling'
export const SellSummaryButton = 'SELL NOW'
export const Dashboardactiveelement = 'dashboardactive'
export const AmountDetailsTitle = 'Amount Details'
export const validationsPatterns = {
  email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
  password: /^(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/,
}

export const socialLoginArray: Array<IconPlusTypoProps> = [
  {
    iconSrc: 'assets/icons/google.svg',
    labelText: 'Google',
    iconAlt: 'google',
  },
  {
    iconSrc: 'assets/icons/stripe.svg',
    labelText: 'Facebook',
    iconAlt: 'facebook',
  },
  {
    iconSrc: 'assets/icons/xero.svg',
    labelText: 'Microsoft',
    iconAlt: 'microsoft',
  },
]

export const LoginFormConstants = {
  heading: 'Login To Minet',
  labels: ['Email', 'Password'],
  forgotPasswordText: 'Forgot Password',
  noAccountText: ["Don't have an account? ", 'Signup'],
}

export const DeliveryDetails = [
  {
    name: 'Instant',
    time: '2-5 minutes',
    deliveryFee: '0.001 BTC',
  },
  {
    name: 'Faster',
    time: '4 hours',
    deliveryFee: '0.0001 BTC',
  },
  {
    name: 'Fast',
    time: '120 hours',
    deliveryFee: '0.00001 BTC',
  },
]
export const DeliveryDetailsPlaceholder = {
  name: 'Instant : 2-5 min',
  fees: 'Transaction fees: 0.001 BTC',
}
export const none = 'None'

export const ForgotPasswordConstants = {
  heading: 'Forgot Password',
  label: ['Email', 'Reset code'],
  placeholder: ['you@company.com', '8 digits code'],
  button: ['Send Reset Link', 'Reset Password'],
  captions: ['Back to', 'Login'],
}
export enum Action {
  sell = 'sell',
  purchase = 'purchase',
}

export const Cash = 'USD coin (cash)'

export const Max = ['Sell max', 'Buy max']

export const SliderMinValues = [0.00001, 0.01]

export const WalletWatchlistValues = {
  marketCap: 'Market cap',
  volume: 'Vol. 24H',
  circulatingSupply: 'Circulating Supply',
}
export const WalletWatchListButton = 'ADDED TO WATCHLIST'

export const PortfolioValueConsts = {
  totalInvestmentsText: 'Total Investment',
}
export const FooterCaptions = ['Dashboard', 'Careers', 'Legal & Privacy']
export const FooterYear = '© 2023 Minet'
export const FooterLangauages = 'English'
export const FooterButton = 'Need Help'

export const emptyTransactionMsg =
  "you don't own any crypto.Send yourself some crypto to get started."

export const AllAssetsButtonsTitle = ['All Assets', 'Watchlist']
export const AllAssetsInputFieldPlaceholder = 'Search all assets'

export const AllAssetsTextIcons = ['24h', 'All Assets']

const bitcoin = '../assets/icons/bitcoin.svg'
const ethereum = '../assets/icons/ethereum.svg'

export const AllAssetRows = [
  {
    id: 1,
    Name: { name: 'Bitcoin', currency: 'BTC', imageSrc: bitcoin },
    Price: '$123,000',
    Change: -5.9,
    MarketCap: '$60T',
    favorite: false,
  },
  {
    id: 2,
    Name: { name: 'Ethereum', currency: 'ETH', imageSrc: ethereum },
    Price: '$123,909',
    Change: 2.3,
    MarketCap: '$90T',
    favorite: true,
  },
  {
    id: 3,
    Name: { name: 'Dogecoin', currency: 'DTC', imageSrc: bitcoin },
    Price: '$123,878',
    Change: 1.5,
    MarketCap: '$25T',
    favorite: true,
  },
]

export const choosecryptoheading = 'Choose crypto'

export const Cashwatchlistvalues = {
  heading: 'USD Coin',
  cash: 'Cash',
  buttons: ['CASH DEPOSIT', 'WITHDRAWAL'],
}

export const ResetPasswordConstants = {
  heading: 'Reset Password',
  label: ['Enter Password', 'Re-Enter  Password'],
  button: ['Reset Password', 'login'],
  message: [
    'a min of 8 characters with 1 special character and number included.',
  ],
}
export const WalletTableConsts = {
  filterText: '1M',
}

export const BackendUrl = 'https://bc98ms.bootcamp64.tk/'

export const apiBase = 'https://bc98ms.bootcamp64.tk'

export const ForgotPasswordPageConstants = {
  messages: {
    internalServerError: 'Some Internal server error ocurred, please try again',
    emailNotFound: 'Email not found, try again',
    errorOcurred: 'Error occurred:',
    invalidCode: 'Invalid code, try again',
  },
}

export const DetailsPageConstant = [
  'The world’s first cryptocurrency, Bitcoin is stored and exchanged securely on the internet through a digital ledger known as a blockchain. Bitcoins are divisible into smaller units known as satoshis each satoshi is worth 0.00000001 bitcoin.',
  'Official Website',
  'White Paper',
]
export const DetailsImg = [
  { src: '../assets/icons/website.svg' },
  { src: '../assets/icons/paperwork.svg' },
]

export const headerComponent = {
  iconSrc: 'assets/icons/bitcoin.svg',
  name: 'Bitcoin',
  currency: 'BTC',
  number: 8.2,
  marketCap: '$64.2T',
  volume: '$2.9T',
  circulatingSupply: '18.8M BTC',
}

export const DetailsPageWatchlist = [
  {
    iconSrc: 'assets/icons/ethereum.svg',
    currencyType: 'Ethereum',
    currencyValue: '$ 1250.02',
    currencyAcronym: 'Moves tightly together',
    isProfit: false,
    profitLoss: '+ 86.00%',
  },
  {
    iconSrc: 'assets/icons/bitcoin.svg',
    currencyType: 'Bitcoin',
    currencyValue: '$ 34065.02',
    currencyAcronym: 'Moves tightly together',
    isProfit: true,
    profitLoss: '+ 10.00%',
  },
  {
    iconSrc: '../assets/icons/cardano.svg',
    currencyType: 'cardana',
    currencyAcronym: 'Moves tightly together',
    currencyValue: '$3,285,553.73',
    profitLoss: '100%',
  },
  {
    iconSrc: '../assets/icons/dogecoin.svg',
    currencyType: 'DogeCoin',
    currencyAcronym: 'Moves tightly together',
    currencyValue: '$3,25,553.73',
    profitLoss: '80%',
  },
  {
    iconSrc: '../assets/icons/XRP.svg',
    currencyType: 'XPR',
    currencyAcronym: 'Moves tightly together',
    currencyValue: '$60.20',
    profitLoss: '10%',
  },
  {
    iconSrc: '../assets/icons/usddollar.svg',
    currencyType: 'usd',
    currencyAcronym: 'Moves tightly together',
    currencyValue: '$3,285,55.73',
    profitLoss: '70%',
  },
]

export const Graphdata = [
  {
    id: 'Bitcoin',
    color: '#B71A33',
    data: [
      { x: '2023-06-26', y: 220 },
      { x: '2023-06-27', y: 230 },
      { x: '2023-06-28', y: 225 },
      { x: '2023-06-29', y: 240 },
      { x: '2023-06-30', y: 235 },
      { x: '2023-07-01', y: 250 },
      { x: '2023-07-02', y: 245 },
      { x: '2023-07-03', y: 260 },
    ],
  },
]

export const DetailsHeader = {
  id: 'BTC',
  name: 'Bitcoin',
  iconUrl: '../assets/icons/bitcoin.svg',
  price: 34065.02,
  marketCap: 590000675120.24,
  circulatingSupply: 19662000.4,
}

export const DashboardPageConstant = [
  'My Portfolio Value',
  '10 coins (3 active)',
  'Click on currency name below to display it on the graph',
]
export const DetailsTitle = ['Overview', 'Wallet']

export const currencySelectionData: Array<{
  id: number
  label: string
  color: string
}> = [
  {
    id: 1,
    label: 'Bitcoin',
    color: 'rgba(247, 147, 26, 0.20)',
  },
  {
    id: 2,
    label: 'XRP',
    color: 'rgba(34, 34, 34, 0.20)',
  },
  {
    id: 3,
    label: 'Polkadot',
    color: 'rgba(230, 0, 122, 0.20)',
  },
  {
    id: 4,
    label: 'Ethereum',
    color: 'rgba(98, 126, 234, 0.20)',
  },
  {
    id: 5,
    label: 'Tether',
    color: 'rgba(38, 161, 123, 0.20)',
  },
  {
    id: 6,
    label: 'Ethereum 2',
    color: 'rgba(25, 25, 113, 0.20)',
  },
  {
    id: 7,
    label: 'Dodge Coin',
    color: 'rgba(219, 201, 132, 0.20)',
  },
]


export const DashboardConstants=[" Watchlist","Discover Assets","View Watchlist"," My Portfolio Value"]
export const months = [
  'A',
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]