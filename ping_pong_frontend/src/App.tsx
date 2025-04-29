import { ChangeEvent, FormEvent, useEffect, useState } from "react"

const App = () => {
  const [message, setMessage] = useState('')
  const [socket, setSocket] = useState<WebSocket | null>(null)
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");

    ws.onclose = () => {
      console.log("disconnected!")
    }

    ws.onerror = (err) => {
      console.error(err)
    }

    ws.onmessage = (message) => {
      alert(message.data)
    }

    setSocket(ws);
  }, [])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    socket?.send(message)
  }

  return (
      <form onSubmit={handleSubmit} style={{
        backgroundColor: 'black',
        height: '100vh',
        width: '100vw',
        display: 'flex',
        gap: '20px',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <input type="text" placeholder="Text message..." onChange={handleChange} />
        <button type="submit">Send Message</button>
      </form>
  )
}

export default App