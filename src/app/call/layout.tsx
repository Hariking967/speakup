import { TRPCReactProvider } from "@/trpc/client"
import { NuqsAdapter } from "nuqs/adapters/next"
import { Toaster } from "sonner"

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <NuqsAdapter>
      <TRPCReactProvider>
            <main className='flex flex-col h-screen w-screen bg-zinc-800'>
                <Toaster></Toaster>
                {children}
            </main>
      </TRPCReactProvider>
    </NuqsAdapter>
  )
}
