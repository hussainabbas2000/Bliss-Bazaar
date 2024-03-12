import Link from 'next/link'

export default function NotFound() {
  return <div>
      <h1>Oho! Something went wrong. The item you are looking for cannot be found - 404. Try something else!</h1>
      <div>
        <Link className='btn btn-link' href="/">Go back to Home</Link>
      </div>
  </div>
}