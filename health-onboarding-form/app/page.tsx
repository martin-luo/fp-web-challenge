export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900">
      <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col justify-center px-6 py-16 sm:px-10">
        <div className="flex flex-col gap-8">
          <span className="text-sm uppercase tracking-[0.2em] text-zinc-500">
            Fitness Passport
          </span>
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
              A welcoming gym for every body, every goal.
            </h1>
            <p className="max-w-2xl text-lg leading-7 text-zinc-600">
              Train with confidence in a clean, fully equipped facility with
              expert guidance, flexible memberships, and supportive staff. Start
              your onboarding in minutes.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              className="inline-flex h-12 items-center justify-center rounded-full bg-zinc-900 px-6 text-base font-medium text-white transition-colors hover:bg-zinc-800"
              href="/sign-up"
            >
              Start your membership
            </a>
            <div className="text-sm text-zinc-500 sm:self-center">
              No commitment required to explore options.
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
