import React from "react"
import EntryPoint from "./EntryPoint"
import styled from "styled-components"
import { HomePageData } from "./HomePageData"

function HomePage () {

    return (
        <Entries>
            {HomePageData.map((data, index) => {
                return <EntryPoint data={data} key={index} />
            })}
        </Entries>
    )
}

const Entries = styled.div`

    display: grid;
  grid-template-columns: auto auto auto auto;
  grid-gap: 100px;
  width: 70%;
  margin: 0 auto;
`

export default HomePage