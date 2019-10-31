class KarmaController {
    __displayUserKarma(json) {
        $("#content").html();

        let objections = $.parseJSON(json);

        let content = $('<div>', {'class': 'container'});
        let header = $('<h1>', {'class': 'karma header'});
        header.html('Karma management');
        let table = $('<table>', {'class': 'table'});
        let table_header = $('<thead>', {'class': ''});
        let table_header_row = $('<tr>', {'class': ''});
        let table_header_user = $('<th>', {'class': ''});
        table_header_user.html('Objection id');
        let table_header_reason = $('<th>', {'class': ''});
        table_header_reason.html('Reason');
        let table_header_status = $('<th>', {'class': ''});
        table_header_status.html('Status');
        let table_header_buttons = $('<th>', {'class': ''});
        table_header_buttons.html('Accept');
        let table_content = $('<tbody>', {'class': ''});


        $.each(objections, function (index, objection) {
            let table_row = $('<tr>', {'class': ''});
            let table_row_user = $('<td>', {'class': ''});
            let table_row_reason = $('<td>', {'class': ''});
            let table_row_status = $('<td>', {'class': ''});
            let table_row_buttons = $('<td>', {'class': ''});

            table_row_user.html(objection.objection_id);
            table_row_reason.html(objection.reason);
            if (objection.accepted) {
                table_row_status.html('accepted');
            }else if (objection.accepted === false) {
                table_row_status.html('denied');
            } else {
                table_row_status.html('waiting');
            }

            let accept_button = $('<a>', {'class': 'btn btn-success btn-small', 'href': '#', 'onclick': 'karmaController.acceptKarmaRequest('+objection.objection_id+')'});
            let deny_button = $('<a>', {'class': 'btn btn-danger btn-small', 'href': '#', 'onclick': 'karmaController.denyKarmaRequest('+objection.objection_id+')'});
            accept_button.append('Accept');
            deny_button.append('Deny');
            table_row_buttons.append(accept_button);
            table_row_buttons.append(deny_button);


            table_row.append(table_row_user);
            table_row.append(table_row_reason);
            table_row.append(table_row_status);
            table_row.append(table_row_buttons);

            table_content.append(table_row);
        });

        content.append(header);
        content.append(table);
        table.append(table_header);
        table.append(table_content);
        table_header.append(table_header_row);
        table_header_row.append(table_header_user);
        table_header_row.append(table_header_reason);
        table_header_row.append(table_header_status);
        table_header_row.append(table_header_buttons);

        $('#content').html(content);
    }

    acceptKarmaRequest(request_id) {
        $.ajax({
            url: connectionController.url + '/administrator/karma/' + request_id + '/accept' ,
            dataType: 'html',
            type: 'post',
            contentType: 'application/x-www-form-urlencoded',
            data: {api: Cookies.get('api')},
            success: servicesController.loadIndex()
        });
    }

    denyKarmaRequest(request_id) {
        $.ajax({
            url: connectionController.url + '/administrator/karma/' + request_id + '/deny' ,
            dataType: 'html',
            type: 'post',
            contentType: 'application/x-www-form-urlencoded',
            data: {api: Cookies.get('api')},
            success: servicesController.loadIndex()
        });
    }

    loadUser(user_id) {
        document.title = 'Fivvr | User Karma';

        $.ajax({
            url: connectionController.url + '/administrator/karma/' + user_id ,
            dataType: 'html',
            type: 'post',
            contentType: 'application/x-www-form-urlencoded',
            data: {api: Cookies.get('api')},
            success: this.__displayUserKarma
        });
    }
}