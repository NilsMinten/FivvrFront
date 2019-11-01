class App {
    url = 'http://0.0.0.0:8000';
    api_key = null;

    loadLogin() {
        $('#content').load('Pages/login.html');
        document.title = 'Fivvr | Login'
    }

    loadRegister() {
        $('#content').load('Pages/register.html');
        document.title = 'Fivvr | Register'
    }

    loadHeader () {
        $("#header").load("Assets/header.html");
    }

    loadHeaderForUser () {
        $("#header").load("Assets/header_user.html");
    }
}