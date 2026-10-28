import { useAuth } from "@/contexts/authContext";
import { UserRole } from "@/types/user";
import { redirect } from "next/navigation";

export default function useAuthRedirect(role: UserRole) {
  const auth = useAuth();

  if (!auth.token) {
    redirect('/login')
  }

  if (auth.user?.role !== role) {
    redirect('/bad')
  }
}