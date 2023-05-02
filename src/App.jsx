import { useEffect, useState } from 'react'

const useGetQuotes = () => {
  const [quoteBreaking, setQuoteBreaking] = useState([])
  const [loading, setLoading] = useState(false)

  const getQuote = async () => {
    const url = 'https://api.breakingbadquotes.xyz/v1/quotes'
    try {
      setLoading(true)
      const res = await fetch(url)
      const data = await res.json()
      setQuoteBreaking(data[0])
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    return () => getQuote()
  }, [])

  return { getQuote, quoteBreaking, loading }
}

function App() {
  const { getQuote, loading, quoteBreaking } = useGetQuotes()

  return (
    <main className='w-full h-screen'>
      <div className='flex flex-col md:flex-row justify-center items-center gap-3 mt-5 px-4 md:px-0'>
        <div className='text-center md:text-start'>
          <h1 className='uppercase font-bold text-2xl md:text-5xl'>
            Breaking Bad Quotes App
          </h1>
          <button
            onClick={() => getQuote()}
            className='bg-green-700 tracking-widest px-2 py-1 font-semibold uppercase rounded-lg mt-5'
          >
            get other quote
          </button>
        </div>
        <img
          width={200}
          height={200}
          src='./logo-bb.svg'
          alt='imagen logo de walter white'
          loading='lazy'
        />
      </div>

      <article className='flex flex-col mt-10 pb-10 md:pb-0 md:mt-20 w-full md:w-8/12 mx-auto px-4'>
        {loading ? (
          <div className='h-20 w-20 mx-auto rounded-full border-8 border-dotted border-green-700 animate-spin'></div>
        ) : (
          <div className='bg-gray-800 px-4 py-2 rounded-md'>
            <p className='text-2xl mb-5 tracking-wider'>
              {quoteBreaking?.quote}
            </p>
            <p className='text-2xl'>
              By{' '}
              <span className='text-green-500 font-bold text-3xl'>
                {quoteBreaking.author}
              </span>
            </p>
          </div>
        )}
      </article>
    </main>
  )
}

export default App
