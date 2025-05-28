import { Loader2 } from 'lucide-react';

export function LoadingPage() {
  return (
    <div className="h-full flex items-center justify-center bg-background z-50">
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
    </div>
  );
}
