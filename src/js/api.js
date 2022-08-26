export class Api {
    static baseUrl = "https://blog-m2.herokuapp.com";

    static headers = {
        "Content-Type": "application/json",
    };

    static token = "";

    static async cadastrar(data){
        await fetch(`${this.baseUrl}/users/register`,{
            method: "POST",
            headers:  this.headers,
            body: JSON.stringify(data)
        })
        .then((res) => res.json())
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
        
    };

    static async login(data){
        let response =  await fetch(`${this.baseUrl}/users/login`,{
            method: "POST",
            headers:  this.headers,
            body: JSON.stringify(data)
        })
        .then((res) => res.json())
        .then((res) => {
            this.token = res.token;
            localStorage.setItem("token@blogKenzie", this.token);
            localStorage.setItem("userId@blogKenzie", res.userId);
            return res;
        })
        .catch((error) => error);
        
        if (this.token){
            window.location.href = "./src/pages/home.html"
        }else{
            return response;
        }

    };    

    static async buscarUser(id){

    };

    static async buscarPostagem(){

    };

    static async buscarPostagemId(id){

    };

    static async criarPost(data){

    };

    static async modificarPost(id){

    };

    static async deletarPost(id){

    };
}