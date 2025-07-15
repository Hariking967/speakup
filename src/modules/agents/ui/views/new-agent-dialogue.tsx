import { ResponsiveDialog } from "@/components/dialogue";
import AgentForm from "./agent-form";

interface NewAgentDialogueProps{
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function NewAgentDialogue({open, onOpenChange}:NewAgentDialogueProps) {
  return (
    <ResponsiveDialog title="New Agent" description="Create a new agent" open={open} onOpenChange={onOpenChange}>
      <AgentForm onSuccess={()=>onOpenChange(false)} onCancel={()=>onOpenChange(false)} />
    </ResponsiveDialog>
  )
}
