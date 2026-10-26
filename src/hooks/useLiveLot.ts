import { getLiveRoomStatusByIdAction, getPublicLotByIdActions } from "@/actions/lots";
import { LiveLot, PublicLot } from "@/types/lots";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function useLiveLot() {
  const { id } = useParams() as { id: string };
  
  const { data: liveData, isPending: isLivePending, error: liveError } = useQuery<LiveLot>({
    queryKey: ['live-lot', id],
    queryFn: async () => await getLiveRoomStatusByIdAction(id),
    refetchInterval: 2000,
  })

  return {
    liveData,
    isLivePending,
    liveError,
  }
}