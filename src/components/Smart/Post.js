import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const GET_POST = gql`
    query GetPost($id: ID!) {
        Post(id: $id) {
            id
            title
            body
            author{
                avatar
                firstName
                lastName
            }
        }
    }
`

class Post extends Component {
    render() {
        const {data: {loading, Post, error}} = this.props
        if (loading) {
            return <p>Loading...</p>
        }
        if (error) {
            return <p>error</p>
        }
        return (
            <div>
                <h1>{Post.title}</h1>
                <p>{Post.body}</p>
                <div><img src={Post.author.avatar} alt="author" /></div>
            </div>
        )
    }
}

export default graphql(GET_POST, {
    options: {
        variables: {
            id: 23
        },
    }
})(Post)
