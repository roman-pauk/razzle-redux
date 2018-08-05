import React, { Component } from 'react'
import {withApollo, ApolloConsumer } from 'react-apollo'

class Home extends Component {
    render() {
        console.log(this.props)
        return (
            <div>
                Home component!
            </div>
        )
    }
}
// export default withApollo(Home)
export default () => (
    <ApolloConsumer>
        {cache => <Home cache={cache} />}
    </ApolloConsumer>
)