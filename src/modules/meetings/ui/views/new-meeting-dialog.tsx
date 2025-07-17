import { ResponsiveDialog } from "@/components/dialogue";
import MeetingForm from "./meeting-form";
import { useRouter } from "next/navigation";

interface NewMeetingDialogueProps{
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function NewMeetingDialogue({open, onOpenChange}:NewMeetingDialogueProps) {
  const router = useRouter();
  return (
    <ResponsiveDialog title="New Meeting" description="Create a new meeting" open={open} onOpenChange={onOpenChange}>
      <MeetingForm
        onSuccess={(id)=>{
          onOpenChange(false);
          router.push(`/meetings/${id}`)
        }}
        onCancel={()=> onOpenChange}
      />
    </ResponsiveDialog>
  )
}
