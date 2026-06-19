import { ChevronLeft } from 'lucide-react'

export function OtpStepSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="md:hidden h-[56px] gap-[16px] flex items-center">
        <div className="w-[24px] h-[24px] flex items-center justify-center">
          <ChevronLeft className="opacity-50" />
        </div>
        <div className="h-[28px] w-[180px] bg-secondary rounded-full" />
      </div>
      <div className="mt-[24px] flex flex-col gap-[24px]">
        <div className="h-[20px] w-full bg-secondary rounded-full" />

        <div className="flex flex-col gap-[8px]">
          <div className="h-[20px] w-[40px] bg-secondary rounded-full" />
          <div className="h-[40px] w-full bg-secondary rounded-full" />
        </div>

        <div className="py-[16px] flex flex-col gap-[10px]">
          <div className="h-[52px] w-full bg-secondary rounded-full" />
          <div className="h-[52px] w-full bg-secondary rounded-full" />
        </div>
      </div>
    </div>
  )
}
