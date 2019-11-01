class UserController {
    handleUserLogin(jsonResult) {
        let user = $.parseJSON(jsonResult);
        if (!user.hasOwnProperty('status') && user.status !== 'failed') {
            appController.api_key = user.api;

            Cookies.set('api', user.api);
            Cookies.set('user', jsonResult);

            servicesController.loadIndex();
            appController.loadHeaderForUser();
        }
    }

    handleRegister(jsonResult){
        let user = $.parseJSON(jsonResult);
        if (user.hasOwnProperty('status') && user.status !== 'failed') {
            appController.loadLogin();
        } else {
            console.log(user);
        }
    }

    logoutUser() {
        Cookies.remove('api');
        Cookies.remove('user');
        servicesController.loadIndex();
        appController.loadHeader();
    }

    register() {
        let email = $('#email').val();
        let password = $('#password').val();
        let username = $('#username').val();

        $.ajax({
            url: connectionController.url + '/user/create' ,
            dataType: 'html',
            type: 'post',
            contentType: 'application/x-www-form-urlencoded',
            data: {email: email, password: password, username: username},
            success: userController.handleRegister
        });
    }

    login() {
        let username = $('#username').val();
        let password = $('#password').val();

        $.ajax({
            url: connectionController.url + '/user/login' ,
            dataType: 'html',
            type: 'post',
            contentType: 'application/x-www-form-urlencoded',
            data: {username: username, password: password},
            success: userController.handleUserLogin
        });
    }


    loadMyAccount() {
        document.title = 'Fivvr | My account';
        $.ajax({
            url: 'Pages/myaccount.html' ,
            dataType: 'html',
            type: 'post',
            contentType: 'application/x-www-form-urlencoded',
            data: {},
            success: function (result) {
                $('#content').html(result);
                let user = $.parseJSON(Cookies.get('user'));

                console.log(user);
                $('.modal-title').html(user.username);
                $('.email').html("Username: " + user.email);
                $('.karma').html("Karma: " + user.karma);
                $('.group').html("Karma: " + user.group);

                $('#myModal').modal('toggle');
            }
        });
    }
}