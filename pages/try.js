import { useEffect, useState } from 'react'
import io from 'socket.io-client'
let socket;
import Head from 'next/head'

const Home = () => {
  const [input, setInput] = useState('')

  useEffect(() => {
      socketInitializer();
      return () => {
        console.log("This will be logged on unmount");
      }
    })

  const socketInitializer = async () => {
    await fetch('/api/socket');
    socket = io()

    socket.on('connect', () => {
      console.log('connected')
    })

    socket.on('update-input', msg => {
      setInput(msg)
    })
  }

  const onChangeHandler = (e) => {
    setInput(e.target.value)
    socket.emit('input-change', e.target.value)
  }
console.log(input)
  return (
   <>
    <input
      placeholder="Type something"
      value={input}
      onChange={onChangeHandler}
    />
    <Head>
    <title>{input}</title>
  </Head>
  </>
  )
}

export default Home;