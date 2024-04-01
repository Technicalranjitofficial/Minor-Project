'use client'
 
export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div className="pt-28 w-full">
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again or refresh the page</button>
    </div>
  )
}