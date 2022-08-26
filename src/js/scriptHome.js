import {Api} from './api.js';
import { PostMaker } from './postMaker.js';

class HomePage {
    static async header(){
       const token = localStorage.getItem("token@blogKenzie") 
       const id = localStorage.getItem("userId@blogKenzie")

        await Api.buscarUser(token, id)
    }
    static logOut(){
        localStorage.clear()
        window.location.href = "../../index.html"
    }
    static async createPosts(){
        const token = localStorage.getItem("token@blogKenzie") 
        const makePosts = await Api.buscarPostagem(token)
        PostMaker.makeCards(makePosts)
    }
}

HomePage.header()

const btnLogout = document.querySelector(".container__header__button")
btnLogout.addEventListener("click", (event) =>{
    event.preventDefault()
    HomePage.logOut()
})


HomePage.createPosts()