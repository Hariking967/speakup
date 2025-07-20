import { useState } from "react";
import { format } from "date-fns";
import { SearchIcon } from "lucide-react";
import Highlighter from "react-highlight-words";
import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { generateAvatarUri } from "@/lib/avatar";

interface Props{
  meetingId: string;
}

export const Transcript = ({ meetingId }:Props) => {
  const trpc = useTRPC();
  const {data} = useQuery(trpc.meetings.getTranscript.queryOptions({id:meetingId}))
  const [searchQuery, setSearchQuery] = useState("");
  const filteredData = (data ?? []).filter((item)=>item.text.toString().toLowerCase().includes(searchQuery.toLocaleLowerCase()))
}