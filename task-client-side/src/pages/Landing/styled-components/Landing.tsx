import styled from 'styled-components'
import tokyo from '../../../assets/japaneseTokyo.jpg'


export const Header : any = styled.div `
    background-image : url(${tokyo});
    width:100%;
    height:400px;
`
export const HeaderContent : any = styled.div `
height : 100%;
width : 100%;
background-color : rgba(0, 0, 0, 0.6);

display:flex;
align-items:center;
justify-content:center;
`
export const HeaderItemH1 : any = styled.h1 `
    color : #fff;
    font-size : 60px;
    color: rgba(255, 255, 255, 1);
`
