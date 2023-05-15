import styled from 'styled-components'
import { AiOutlineCheck } from'react-icons/ai'

export const HomeContainer = styled.section `
    display : flex;
    flex-direction : column;
    text-align : center;

    width : 100%;
`
export const TaskItemContainer = styled.div `
    display : flex;
    flex-direction : column;
`

export const TaskInput = styled.input.attrs({ type : 'checkbox'}) `
appearance: none;
  -webkit-appearance: none;
    height : 30px;
    width : 30px;
    background-color : green;
    text-align : right;
    float : right;
    background-color : #d5d5d5;
    border : 1px solid black;

    ${AiOutlineCheck} + &:checked {
        background-color : #5bcd3e;
        color : #5bcd3e;
    }
`

export const TaskItem  = styled.span `
margin-left : 3em;
    width : 85%;
    font-size : 30px;
    text-align : left;
    padding : 10px;
    border : 2px solid black;
`