import getSubscriptionVideos from "@/actions/getSubscriptionVideos";
import SubscriptionList from "@/components/subscriptions/SubscriptionList";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";

export default async function Subscriptions() {
  const subscriptionVideos = await getSubscriptionVideos();

  return subscriptionVideos.length ? <SubscriptionList videos={subscriptionVideos} /> : <div className="flex justify-center items-center w-full h-[60vh]">No videos found</div>;
}
