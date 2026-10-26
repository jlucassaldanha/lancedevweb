import { getWalletValuesAction } from "@/actions/wallet";
import { WalletValues } from "@/types/wallet";
import { useQuery } from "@tanstack/react-query";

export default function useWalletValues() {
  const { data: walletValues, isPending: isWalletPending, error: walletError } = useQuery<WalletValues>({
    queryKey: ['wallet-values'],
    queryFn: async () => await getWalletValuesAction()
  })

  return {
    walletValues,
    isWalletPending,
    walletError
  }
}