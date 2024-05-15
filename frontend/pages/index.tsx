import Link from 'next/link';

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-8`}
    >
      <div className='flex w-full max-w-5xl flex-col items-center justify-center gap-8'>
        <h1 className='text-center text-2xl font-bold'>Home</h1>
        <Link className='link link-primary' href={'/dashboard'}>
          Go to dashboard
        </Link>
      </div>
    </main>
  );
}
