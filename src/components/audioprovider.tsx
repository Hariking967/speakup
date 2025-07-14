"use client";

import {
  StreamVideoClient,
  StreamVideoProvider,
  StreamVideo,
} from "@stream-io/video-react-sdk";
import { useMemo } from "react";

type Props = {
  apiKey: string;
  token: string;
  children: React.ReactNode;
};

export function AudioProvider({ apiKey, token, children }: Props) {
  // 👇 useMemo ensures the client is only created once per session
  const client = useMemo(() => {
    return new StreamVideoClient({ apiKey, token });
  }, [apiKey, token]);

  return (
    <StreamVideoProvider client={client}>
      <StreamVideo client={client}>{children}</StreamVideo>
    </StreamVideoProvider>
  );
}
