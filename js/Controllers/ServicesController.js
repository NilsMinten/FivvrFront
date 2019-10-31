class ServicesController {
    __handleServices(json_result) {
        let services = $.parseJSON(json_result);
        let services_html = $("<div>", {"class": "services row"});
        $.each(services, function (index, service) {
            let service_col = $("<div>", {"class": "col-sm-12 col-md-4 "});
                let service_div = $("<div>", {"class": "service_block card", "onclick": "servicesController.loadService("+service.id+")"});
                    let service_card = $("<div>", {"class": "card-body"});
                        let service_header = $("<h5>", {'class': 'service_header card-title'});
                        let service_content = $("<p>", {'class': 'service_content'});
                        let service_card_footer = $("<div>", {"class": "row"});
                            let service_author = $("<div>", {'class': 'service_author col-sm-12 col-md-6'});
                            let service_cost = $("<hdiv>", {'class': 'service_cost col-sm-6 col-md-3'});
                            let service_upvotes = $("<div>", {'class': 'service_upvotes col-sm-6 col-md-3'});

            service_header.html(service.title);
            service_content.html(service.description);
            service_author.html(service.author);
            service_cost.html(service.cost);
            service_upvotes.html(service.upvotes);

            service_col.append(service_div);
            service_div.append(service_card);
            service_card.append(service_header);
            service_card.append(service_content);
            service_card.append(service_card_footer);
            service_card_footer.append(service_author);
            service_card_footer.append(service_cost);
            service_card_footer.append(service_upvotes);

            services_html.append(service_col);
        });

        $('#content').html(services_html);
    }

    __handleService(json_data) {
        let service = $.parseJSON(json_data);
        let is_author = service.author_role;

        let service_page = $('<div>', {'class': 'service_page'});
            let service_title = $('<h1>', {'class': 'service_header'});
            let service_content = $('<p>', {'class': 'service_content'});
                let service_footer = $("<div>", {"class": "row"});
                    let service_author = $("<div>", {'class': 'service_author col-sm-12 col-md-6'});
                    let service_cost = $("<hdiv>", {'class': 'service_cost col-sm-6 col-md-3'});
                    let service_upvotes = $("<div>", {'class': 'service_upvotes col-sm-6 col-md-3'});

        service_title.html(service.title);
        service_content.html(service.description);
        service_author.html(service.author);
        service_cost.html(service.cost);
        service_upvotes.html(service.upvotes);

        service_page.append(service_title);
        service_page.append(service_content);
        service_page.append(service_footer);
        service_footer.append(service_author);
        service_footer.append(service_cost);
        service_footer.append(service_upvotes);

        if (is_author) {
            let admin_bar = $('<div>', {'class': 'row'});
            let edit_button = $('<button>', { 'class': 'btn btn-primary', 'onclick': 'servicesController.loadEditService('+service.id+')'});
            let delete_button = $('<button>', { 'class': 'btn btn-primary', 'onclick': 'servicesController.loadDeleteService('+service.id+')'});
            edit_button.html('Edit');
            delete_button.html('Delete');

            admin_bar.html(edit_button);
            admin_bar.append(delete_button);
            service_page.append(admin_bar);
        } else {
            let upvote_bar = $('<div>', {'class': 'row'});
            let edit_button = $('<button>', { 'class': 'btn btn-primary', 'onclick': 'servicesController.likeService('+service.id+')'});
            edit_button.html('Like');

            upvote_bar.html(edit_button);
            service_page.append(upvote_bar);
        }

        if (Cookies.get('user')) {
            let user = $.parseJSON(Cookies.get('user'));

            if (user.group === 'admin') {
                let site_admin_bar = $('<div>', {'class': 'row'});
                let manage_button = $('<button>', { 'class': 'btn btn-primary', 'onclick': 'karmaController.loadUser('+service.user_id+')'});

                manage_button.html('Manage user karma');

                site_admin_bar.html(manage_button);
                service_page.append(site_admin_bar);
            }
        }

        $('#content').html(service_page);
        document.title = 'Fivvr | ' + service.title;
    }

    likeService(service_id) {
        $.ajax({
            url: connectionController.url + '/service/upvote/' + service_id ,
            dataType: 'html',
            type: 'post',
            contentType: 'application/x-www-form-urlencoded',
            data: {},
            success: this.loadService(service_id)
        });
    }

    loadService(service_id) {
        let api = '';
        if (Cookies.get('api')) {
            api = Cookies.get('api');
        }

        $.ajax({
            url: connectionController.url + '/service/' + service_id ,
            dataType: 'html',
            type: 'post',
            contentType: 'application/x-www-form-urlencoded',
            data: { api: api },
            success: this.__handleService
        });
    }

    __handleEditService(json_data) {
        let service = $.parseJSON(json_data);

        $('#title').val(service.title);
        $('#description').val(service.description);
        $('#cost').val(service.cost);
        $('#service_id').val(service.id);
    }

    loadEditService(service_id) {
        $('#content').load('/Pages/editservice.html');

        let api = '';
        if (Cookies.get('api')) {
            api = Cookies.get('api');
        }

        $.ajax({
            url: connectionController.url + '/service/' + service_id ,
            dataType: 'html',
            type: 'post',
            contentType: 'application/x-www-form-urlencoded',
            data: { api: api },
            success: this.__handleEditService
        });
    }

    deleteService() {
        let service_id = $('#service_id').val();

        let api = '';
        if (Cookies.get('api')) {
            api = Cookies.get('api');
        }

        $.ajax({
            url: connectionController.url + '/service/delete/' + service_id ,
            dataType: 'html',
            type: 'post',
            contentType: 'application/x-www-form-urlencoded',
            data: { api: api },
            success: this.loadIndex()
        });
    }

    loadDeleteService(service_id) {
        $('#content').load('/Pages/deleteservice.html');
        setTimeout(function () {
            $('#service_id').val(service_id);
        }, 100);
    }

    editService() {
        let title = $('#title').val();
        let description = $('#description').val();
        let cost = $('#cost').val();
        let service_id = $('#service_id').val();

        $.ajax({
            url: connectionController.url + '/service/edit/' + service_id,
            dataType: 'html',
            type: 'post',
            contentType: 'application/x-www-form-urlencoded',
            data: { api: Cookies.get('api'), title: title, description: description, cost: cost * 100 },
            success: servicesController.loadIndex()
        });
    }

    createService() {
        let title = $('#title').val();
        let description = $('#description').val();
        let cost = $('#cost').val();

        $.ajax({
            url: connectionController.url + '/service/create',
            dataType: 'html',
            type: 'post',
            contentType: 'application/x-www-form-urlencoded',
            data: { api: Cookies.get('api'), title: title, description: description, cost: cost * 100 },
            success: servicesController.loadIndex()
        });
    }

    loadServiceCreate() {
        document.title = 'Fivvr | Create Service';
        $("#content").load('/Pages/newservice.html')
    }

    loadIndex() {
        $.ajax({
            url: connectionController.url + '/service' ,
            dataType: 'html',
            type: 'post',
            contentType: 'application/x-www-form-urlencoded',
            data: {},
            success: this.__handleServices
        });
        document.title = 'Fivvr | Homepage';
    }
}