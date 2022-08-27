import {Api} from './api.js';

class User{

    static cadastra(){
        let nomeCadastro    = document.getElementsByName("nomeCadastro")[0].value;
        let emailCadastro   = document.getElementsByName("emailCadastro")[0].value;
        let imagemCadastro  = document.getElementsByName("imagemCadastro")[0].value;
        let senhaCadastro   = document.getElementsByName("senhaCadastro")[0].value;

        let data = {
            username: nomeCadastro,
            email: emailCadastro,
            avatarUrl: imagemCadastro,
            password: senhaCadastro
        }

        Api.cadastrar(data);
    }

    static async login(){
        let emailLogin      = document.getElementsByName("emailLogin")[0].value;
        let senhaLogin      = document.getElementsByName("senhaLogin")[0].value;

        let data = {
            email: emailLogin,
            password: senhaLogin
        }

        console.log(await Api.login(data));
    }
}

class Button{

    static cadastrar(){
        let buttonCadastrar = document.getElementById("buttonCadastrar");
        buttonCadastrar.addEventListener("click",function(event){
            event.preventDefault();
            User.cadastra();
        })
    }

    static login(){
        let buttonLogin     = document.getElementById("buttonLogin");
        buttonLogin.addEventListener("click", async function(event){
            event.preventDefault();
            User.login();
        })
    }
}

Button.cadastrar();
Button.login();
