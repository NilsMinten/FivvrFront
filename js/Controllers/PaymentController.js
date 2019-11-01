class PaymentController {
    buyService(service_id) {
        $.ajax({
            url: connectionController.url + '/service/buy/' + service_id,
            dataType: 'html',
            type: 'post',
            contentType: 'application/x-www-form-urlencoded',
            data: { api: Cookies.get('api') },
            success: function (result) {
                console.log(result);
            }
        });
    }
}