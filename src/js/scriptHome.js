import {Api} from './api.js';

// //////////////////////////////////////////////////////////////////////////

const btnLogout = document.querySelector(".container__header__button");

btnLogout.addEventListener("click", (event) =>{
    event.preventDefault();
    HomePage.logOut()
})

const btnCreatePost = document.getElementById("btnCreatePost");

btnCreatePost.addEventListener("click", (event) => {
    event.preventDefault();
    HomePage.createPost()
})


// //////////////////////////////////////////////////////////////////////////

class HomePage {
    static async header(){
        const token = localStorage.getItem("token@blogKenzie") 
        const id = localStorage.getItem("userId@blogKenzie")

        const user = await Api.buscarUser(token, id)
        Render.makeHeader(user)
    }

    static logOut(){
        localStorage.clear()
        window.location.href = "../../index.html"
    }

    static async renderPosts(){
        const token = localStorage.getItem("token@blogKenzie") 
        const makePosts = await Api.buscarPostagem(token)
        Render.makeCards(makePosts)
    }

    static async createPost(){
        let newPost = document.getElementsByName("newPost")[0].value;

        let data = {
            content: newPost
        }
        await Api.criarPost(data);
        document.location.reload(true);
    }

    static async deletePost(id){
        await Api.deletarPost(id);
        document.location.reload(true)
    }

    static async editPost(id, data){
        await Api.modificarPost(id, data);
        document.location.reload(true)
    }
    
    static buttonDeletePost(id){
        const btnDeletePostCheck = document.getElementById("btnDeletePostCheck");
        btnDeletePostCheck.addEventListener("click", (event) => {
            event.preventDefault();
            this.deletePost(id);
        })

    }

    static buttonEditPost(id){
        const btnTextareaEditPost = document.getElementById("btnTextareaEditPost");
        btnTextareaEditPost.addEventListener("click", (event) => {
            event.preventDefault();
            const textareaEditPost = document.getElementById("textareaEditPost");
            this.editPost(id, textareaEditPost.value);
            textareaEditPost.innerText = "";
        })
    }
}

HomePage.header()

HomePage.renderPosts()


class Render{
    static async makeHeader(obj){
        const imgHeader = document.querySelector(".container__header__imagem")
        const nameDiv = document.querySelector(".container__header__name")

        imgHeader.src = obj.avatarUrl
        nameDiv.innerHTML = obj.username
    }
    
    static async makeCards(obj){
        const ulCards = document.querySelector(".container__main__ul");
        ulCards.innerText = "";
        const id = localStorage.getItem("userId@blogKenzie");

        const postData = obj.data;

        postData.forEach(element => {
            
                const liCard = document.createElement("li")
                const divCard = document.createElement("div")
                const imgCard = document.createElement("img")
                const divButtons = document.createElement("div")
                const imgButtonEdit = document.createElement("img")
                const imgButtonDelete = document.createElement("img")
                const sectionCard = document.createElement("section")
                const h2SectionCard = document.createElement("h2")
                const pSectionCard = document.createElement("p")
                const spanSectionCard = document.createElement("span")

                const data = element.createdAt.split("T")
                const dataArr = data[0].split("-")
                const dataToString = dataArr.reverse().join("/")

                liCard.classList.add("container__main__card")

                imgCard.src = element.user.avatarUrl
                imgButtonEdit.src = "../img/edit.png"
                imgButtonDelete.src = "../img/trash-bin.png"
                h2SectionCard.innerText = element.user.username
                pSectionCard.innerText = element.content
                spanSectionCard.innerText = dataToString;

                imgButtonEdit.addEventListener("click", (event) => {
                    let editModal = document.getElementsByClassName("container__edit__modal")[0];
                    editModal.classList.remove("modal__hidden");
                    editModal.classList.add("modal__block");
                    HomePage.buttonEditPost(element.id);
                })

                imgButtonDelete.addEventListener("click", (event) => {
                    let editModal = document.getElementsByClassName("container__delete__modal")[0];
                    editModal.classList.remove("modal__hidden");
                    editModal.classList.add("modal__block");
                    HomePage.buttonDeletePost(element.id);
                })

                ulCards.appendChild(liCard)
                liCard.appendChild(divCard)
                divButtons.append(imgButtonEdit, imgButtonDelete)

                sectionCard.append(h2SectionCard, pSectionCard, spanSectionCard)
                if(element.user.id == id){
                    divCard.append(imgCard, divButtons, sectionCard)
                }else{
                    divCard.append(imgCard,sectionCard)

                }
                
        });
        return ulCards
    }  
}