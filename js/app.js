class App {
    connectionController;
    paymentController;
    servicesController;
    userController;

    constructor (
        connectionController,
        paymentController,
        servicesController,
        userController
    ) {
        this.connectionController = connectionController;
        this.paymentController = paymentController;
        this.servicesController = servicesController;
        this.userController = userController;
    }

    loadIndex() {
        let json_result = this.connectionController.getData('/service', {});
        console.log(json_result);
        $("#header").html(json_result);
    }

    loadHeader () {
        $("#header").load("Assets/header.html");
    }

    loadHeaderForUser () {
        $("#header").load("Assets/header_user.html");
    }

    loadFooter () {
        $("#footer").load("Assets/footer.html");
    }
}