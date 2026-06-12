import Link from 'next/link';

export default function EnterLaboratoryCTA({ expId }: { expId: string }) {
  return (
    <div className="my-16 text-center">
      <Link 
        href={`/?exp=exp-${expId}`}
        aria-label={`Enter 3D Laboratory to view experiment ${expId}`}
        className="inline-flex items-center justify-center px-8 py-4 text-sm font-medium tracking-widest text-emerald-400 uppercase border border-emerald-500/30 rounded bg-emerald-500/10 hover:bg-emerald-500/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
      >
        Enter 3D Laboratory
      </Link>
    </div>
  );
}
