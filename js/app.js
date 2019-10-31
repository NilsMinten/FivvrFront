class App {
    url = 'http://0.0.0.0:8000';
    api_key = null;

    loadLogin() {
        $('#content').load('Pages/login.html');
        document.title = 'Fivvr | Login'
    }

    loadHeader () {
        $("#header").load("Assets/header.html");
    }

    loadHeaderForUser () {
        $("#header").load("Assets/header_user.html");
    }
}