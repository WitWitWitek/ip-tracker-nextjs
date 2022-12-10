import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function NotFound() {
    const [counter, setCounter] = useState(5)
    const router = useRouter()
    useEffect(() => {
        let counterInterval;
        if (counter > 0) {
            counterInterval = setInterval(() => {
                setCounter(prevCounter => prevCounter - 1)
            }, 1000)
        } else if (counter === 0) {
            clearInterval(counterInterval)
            router.push('/auth')
        }
        return () => {
            clearInterval(counterInterval)
          }
    }, [counter])
    

    return (
        <div className='ip-tracker__404'>
            <div className="ip-tracker__404-container">
                <h1 className="ip-tracker__404-counter">{counter}</h1>
                <h2>Ops! Something went wrong. You will be redirected to:</h2>
                <p><Link  href="/auth"><a className="ip-tracker__404-link">Login Page</a></Link></p>
            </div>
        </div>
    )
}
