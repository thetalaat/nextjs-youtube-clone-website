import { CurrentUserContext } from "@/context/CurrentUserContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useContext, useMemo } from "react";
import { toast } from "react-hot-toast";

interface UseSubscribeProps {
  channelId: string;
}

export const UseSubscribe = ({ channelId }: UseSubscribeProps) => {
  const currentUser = useContext(CurrentUserContext);

  const router = useRouter();

  const hasSubscribed = useMemo(() => {
    if (!currentUser) return false;

    const subscriptions = currentUser.subscribedChannelIds || [];

    return subscriptions.includes(channelId);
  }, [currentUser, channelId]);

  const toggleSubscribed = useCallback(async () => {
    if (!currentUser) {
      alert("Please sign in to subscribe");
      return;
    }

    try {
      if (hasSubscribed) {
        await axios.delete("/api/users/subscriptions", { data: { channelId } });
      } else {
        await axios.post("/api/users/subscriptions", { channelId });
      }
      router.refresh();
      toast.success(
        hasSubscribed ? "Unsubscribe successfully" : "Subscribe successfully"
      );
    } catch (error) {
      toast.error(
        hasSubscribed ? "Could not unsubscribe" : "Could not subscribe"
      );
    }
  }, [currentUser, channelId, hasSubscribed, router]);

  return { hasSubscribed, toggleSubscribed };
};
