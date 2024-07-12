import axios from 'axios'

const baseUrl = 'http://localhost:3001'

export const getAnecdotes = () => {
    return axios.get(`${baseUrl}/anecdotes`).then(res => res.data)
}

export const createAnecdote = (anecdote) => {
    return axios.post(`${baseUrl}/anecdotes`, anecdote).then(res => res.data)
}

export const voteAnecdote = (anecdote) => {
    return axios.put(`${baseUrl}/anecdotes/${anecdote.id}`, {...anecdote, votes: anecdote.votes + 1}).then(res => res.data)
}