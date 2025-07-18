"use client";

import { useState, useEffect } from "react";
import { AudioProvider } from "@/components/audioprovider";
import AudioCall from "@/components/audiocall";

type Props = {
  userId: string;
  callId: string;
};

export default function CallPage({ userId, callId }: Props) {
  const [creds, setCreds] = useState<{ apiKey: string; token: string } | null>(null);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    // ✅ Guard to prevent useEffect from firing with invalid inputs
    if (!userId || !callId || fetched) return;

    fetch("/api/stream-call-token", {
      method: "POST",
      body: JSON.stringify({ userId, callId }),
      headers: { "Content-Type": "application/json" },
    })
      .then((r) => r.json())
      .then((data) => {
        setCreds({ apiKey: data.apiKey, token: data.token });
        setFetched(true); // ✅ prevents re-fetching
      })
      .catch((err) => {
        console.error("Failed to fetch Stream token:", err);
      });
  }, [userId, callId, fetched]);

  if (!creds) return <div>Loading audio call...</div>;

  return (
    <AudioProvider apiKey={creds.apiKey} token={creds.token}>
      <AudioCall callId={callId} />
    </AudioProvider>
  );
}
