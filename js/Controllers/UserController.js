class UserController {
    handleUserLogin(jsonResult) {
        let user = $.parseJSON(jsonResult);
        appController.api_key = user.api;

        Cookies.set('api', user.api);
        Cookies.set('user', jsonResult);
    }

    logoutUser() {
        Cookies.remove('api');
        servicesController.loadIndex();
        appController.loadHeader();
    }

    login() {
        let email = $('#email').val();
        let password = $('#password').val();

        $.ajax({
            url: connectionController.url + '/user/login' ,
            dataType: 'html',
            type: 'post',
            contentType: 'application/x-www-form-urlencoded',
            data: {email: email, password: password},
            success: userController.handleUserLogin
        });

        servicesController.loadIndex();
        appController.loadHeaderForUser();
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

                $('.modal-title').html(user.username);
                $('.email').html("Username: " + user.email);
                $('.karma').html("Karma: " + user.karma);

                $('#myModal').modal('toggle');
            }
        });
    }
}