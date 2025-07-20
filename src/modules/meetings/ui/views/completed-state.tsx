import { MeetingGetOne } from "../../types"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpenTextIcon, SparklesIcon, FileTextIcon, FileVideoIcon, ClockFadingIcon } from "lucide-react"
import Link from "next/link"
import Markdown from "react-markdown";
import { GenreatedAvatar } from "@/components/generated-avatar"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { formatDuration } from "@/lib/utils"
import { Transcript } from "./transcript"

interface Props{
  data: MeetingGetOne
}

export const CompletedState = ({data}:Props) => {
  return(
    <div className="flex flex-col gap-y-4">
      <Tabs defaultValue="summary">
        <div className="bg-zinc-600 rounded-lg border px-3">
          <ScrollArea>
            <TabsList className="p-0 bg-background justify-start rounded-none h-13">
              <TabsTrigger 
                value="summary"
                className="rounded-none bg-zinc-600 text-white data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground h-full hover:bg-zinc-500"
              >
                <BookOpenTextIcon />
                Summary
              </TabsTrigger>
              <TabsTrigger 
                value="transcript"
                className="rounded-none bg-zinc-600 text-white data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground h-full hover:bg-zinc-500"
              >
                <FileTextIcon />
                Transcript
              </TabsTrigger>
              <TabsTrigger 
                value="recording"
                className="rounded-none bg-zinc-600 text-white data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground h-full hover:bg-zinc-500"
              >
                <FileVideoIcon />
                Recording
              </TabsTrigger>
              <TabsTrigger 
                value="chat"
                className="rounded-none bg-zinc-600 text-white data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground h-full hover:bg-zinc-500"
              >
                <SparklesIcon />
                Ask AI
              </TabsTrigger>
            </TabsList>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
        <TabsContent value="transcript">
          <Transcript meetingId={data.id} />
        </TabsContent>
        <TabsContent value="recording">
          <div className="bg-zinc-700 rounded-lg border px-4 py-5">
            <video src={data.recordingUrl!} className="w-full rounded-lg" controls />
          </div>
        </TabsContent>
        <TabsContent value="summary">
          <div className="bg-zinc-700 rounded-lg border">
            <div className="px-4 py-5 gap-y-5 flex flex-col col-span-5">
              <h2 className= "text-white text-2xl font-medium capitalize">{data.name}</h2>
              <div className="flex gap-x-2 items-center">
                <Link href={`/agents/${data.agent.id}`} className="flex items-center gap-x-3 underline underline-offset-4 capitalize">
                  <GenreatedAvatar variant="botttsNeutral" seed={data.agent.name} className="size-5 [&>svg]:text-white" />
                  <p className="text-white">{data.agent.name}</p>
                </Link>{" "}
                <p className="text-amber-50">{data.startedAt ? format(data.startedAt, "PPP") : "" }</p>
              </div>
              <div className="flex gap-x-2 items-center">
                <SparklesIcon className="size-4" />
                <p className="text-white">General Summary</p>
              </div>
              <Badge variant='outline' className="flex items-center gap-x-2 [&>svg]:size-4">
                <ClockFadingIcon className="text-blue-700" />
                {data.duration ? formatDuration(data.duration) : ""}
              </Badge>
              <div>
                <Markdown
                  components={{
                    h1: (props) => (
                      <h1 className="text-white text-2xl font-medium mb-6" {...props} />
                    ),
                    h2: (props) => (
                      <h2 className="text-white text-xl font-medium mb-6" {...props} />
                    ),
                    h3: (props) => (
                      <h3 className="text-white text-lg font-medium mb-6" {...props} />
                    ),
                    h4: (props) => (
                      <h4 className="text-white text-base font-medium mb-6" {...props} />
                    ),
                    p: (props) => (
                      <p className="text-white mb-6 leading-relaxed {...props}" />
                    ),
                    ul: (props) => (
                      <ul className="text-white list-disc list-inside mb-6" {...props} />
                    ),
                    ol: (props) => (
                      <ol className="text-white list-decimal list-inside mb-6" {...props} />
                    ),
                    li: (props) => (
                      <li className="text-white mb-1" {...props} />
                    ),
                    strong: (props) => (
                      <strong className="text-white font-semibold" {...props} />
                    ),
                    code: (props) => (
                      <code className= "text-white bg-gray-100 px-1 py-0.5 rounded" {...props} />
                    ),
                    blockquote: (props) => (
                      <blockquote className="text-white border-l-4 pl-4 italic my-4" {...props} />
                    ),
                  }}
                >
                  {data.summary}
                </Markdown>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}