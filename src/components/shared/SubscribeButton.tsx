"use client";

import { UseSubscribe } from "@/hooks/useSubscribe";
import Button from "./Button";

interface SubscribeButtonProps {
  channelId: string;
}

const SubscribeButton: React.FC<SubscribeButtonProps> = ({ channelId }) => {
  const { hasSubscribed, toggleSubscribed } = UseSubscribe({ channelId });
  return (
    <Button
      type={hasSubscribed ? "rounded-dark" : "rounded"}
      onClick={toggleSubscribed}
    >
      {hasSubscribed ? "Subscribed" : "Subscribe"}
    </Button>
  );
};

export default SubscribeButton;
