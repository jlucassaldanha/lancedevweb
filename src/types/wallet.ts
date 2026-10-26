export interface WalletValues {
  totalBalance: string
  committedBalance: string
  availableBalance: string
}

export interface DepositResponse {
  message: string,
  wallet: {
    id: string
  } & WalletValues
}