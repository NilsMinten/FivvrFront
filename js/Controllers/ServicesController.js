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

        $('#content').html(service_page);
        document.title = 'Fivvr | ' + service.title;
    }

    loadService(service_id) {
        $.ajax({
            url: connectionController.url + '/service/' + service_id ,
            dataType: 'html',
            type: 'post',
            contentType: 'application/x-www-form-urlencoded',
            data: { api: ''},
            success: this.__handleService
        });
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