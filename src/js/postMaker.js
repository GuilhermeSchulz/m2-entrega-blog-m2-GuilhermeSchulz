export class PostMaker{
    static async makeHeader(obj){
        const imgHeader = document.querySelector(".container__header__imagem")
        const nameDiv = document.querySelector(".container__header__name")

        imgHeader.src = obj.avatarUrl
        nameDiv.innerHTML = obj.username


    }
    static async makeCards(obj){
        const ulCards = document.querySelector(".container__main__ul")
        const id = localStorage.getItem("userId@blogKenzie")

        const postData = obj.data

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
                spanSectionCard.innerText = dataToString

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