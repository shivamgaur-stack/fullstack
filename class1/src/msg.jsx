import React, { Component } from 'react'

export class msg extends Component {
    componentWillUnmount(){
        console.log("component will unmount")
    }
  render() {
    return (
      <div>msg</div>
    )
  }
}

export default msg