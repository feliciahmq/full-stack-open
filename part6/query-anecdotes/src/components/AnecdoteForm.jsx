import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from "../requests"
import { useNotifsHandler } from "../hooks/useNotificationHooks" 

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const notifsHandler = useNotifsHandler()

  const newAnecdoteMutation = useMutation({ 
    mutationFn: createAnecdote, 
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      // gets query with 'anecdotes' key, fetch anecdotes from server, update and renders state on server
      notifsHandler({ content: `'${newAnecdote.content}' created`})
    }
  })

  const getId = () => (100000 * Math.random()).toFixed(0)

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value

    if (content.length < 5) {
      alert('Anecdote content must be at least 5 characters long')
      return
    }

    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ 
      content,
      id: getId(),
      votes: 0
    })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
