import React, { Component } from 'react'
import { Query } from "react-apollo";
import gql from "graphql-tag";

export default class Test extends Component {
  state = {
    opened: false
  }
  onBtnClick = () => {
    this.setState(prev => {
      return {
        opened: !prev.opened
      }
    })
  }
  render() {
    return (
      <div>
        <Query
          query={gql`
          query getAllProducts($count: Int!){
              allProducts(count: $count) {
                id
                name
                price
              }
            }
          `}
          variables={{
            count: 2
          }}
        >
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;
        
            return data.allProducts.map(({ id, name, price }) => (
              <div key={id}>
                <p>Product name: {name}</p>
                <p>Product price: {price}</p>
              </div>
            ));
          }}
        </Query>
        <button onClick={this.onBtnClick}>Show Posts</button>
        {this.state.opened &&
          <div>
            <Query
              query={gql`
                {
                  allPosts(count: 10) {
                    id
                    title
                    author {
                      firstName
                      avatar
                    }
                  }
                }
              `}
            >
              {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error :(</p>;
            
                return data.allPosts.map(({ id, author: { avatar,  firstName}, title }) => (
                  <div key={id}>
                    <p>
                      <img src={avatar} alt={firstName} />
                      <span>{firstName}</span>
                    </p>
                    <p>Post Title: {title}</p>
                  </div>
                ));
              }}
            </Query>
          </div>  
        }
        
      </div>
    )
  }
}
