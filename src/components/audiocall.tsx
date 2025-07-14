"use client";
import { useEffect } from "react";
import {
  useCall,
  useCallStateHooks,
  Audio,
} from "@stream-io/video-react-sdk";

type Props = { callId: string };

export default function AudioCall({ callId }: Props) {
  const call = useCall();
  const { useParticipants } = useCallStateHooks();
  const participants = useParticipants();

  useEffect(() => {
    if (call) {
      call.join({ create: true, video: false });
      return () => { call.leave(); };
    }
  }, [call, callId]);

  return (
    <div>
      {participants.map((p) => (
        <Audio key={p.sessionId} participant={p} />
      ))}
      <button onClick={() => call?.microphone.disable()}>Mute</button>
      <button onClick={() => call?.microphone.enable()}>Unmute</button>
    </div>
  );
}
