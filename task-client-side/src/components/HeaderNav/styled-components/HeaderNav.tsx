import styled from 'styled-components'

export const Navigation = styled.nav `
background-color : #060b26;


display : flex;
flex-direction : column;
height : 100%;

position : absolute;
justify-content : space-between;

    & i {
        margin : 15px;
    }

    & span {
         margin : 15px;
         color : skyblue;
    }
`


export const ItemList = styled.div `
    display : flex;

    & i {
        font-size : 1.5em;
        color : skyblue;
    }

    &:hover {
        background-color : rgba(255, 255, 255, 0.1) ;
    }
`

export const MenuBars = styled.div `
    color : skyblue;
    cursor : pointer;
    text-align : right;
    border-bottom : 1px solid black;

    font-size : 1.5em;
    padding-right : 0.5em;
    padding-top : 0.5em;

    &:hover {
        background-color : rgba(255, 255, 255, 0.1) ;
    }
`