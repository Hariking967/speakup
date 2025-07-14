import { StreamClient } from "@stream-io/node-sdk";

const streamClient = new StreamClient(
  process.env.STREAM_API_KEY!,
  process.env.STREAM_API_SECRET!
);

export async function getStreamCallToken(userId: string, callId: string) {
  await streamClient.upsertUsers([{ id: userId }]);
  const token = streamClient.generateCallToken({
    user_id: userId,
    call_cids: [ `default:${callId}` ],
    validity_in_seconds: 60 * 60,  // valid for 1 hour
    role: "participant",
  });
  return token;
}
