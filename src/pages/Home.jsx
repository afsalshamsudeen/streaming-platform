import React from 'react'
import styled from 'styled-components'
import Card from '../Components/Card'
import Banner from '../Components/Banner'

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
`

const Home = () => {
  return (
    <Container>
        <Banner/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
    </Container>
  )
}

export default Home
