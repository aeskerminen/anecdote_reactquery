import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, voteAnecdote } from './requests'
import NotificationContext, { NotificationContextProvider } from './NotificationContext'
import { useContext } from 'react'

const App = () => {
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: () => getAnecdotes()
  })

  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  const handleVote = (anecdote) => {
    newAnecdoteMutation.mutate(anecdote)
    notificationDispatch({type: 'SET', payload: {display: true, msg: `you voted for: ${anecdote.content}`}})
  }

  const [notification, notificationDispatch] = useContext(NotificationContext)

  if (result.isLoading) {
    return <div>loading data...</div>
  } else if (result.isError) {
    return <div>Anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm />

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
