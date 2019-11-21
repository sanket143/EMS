$(".checkout").click(function (e) {
    e.preventDefault();
    var ele = $(this);

    var id = $(this).attr("data-id");

    $("#visitors_data").addClass("loading");    

    $.ajax({
        url: "/api/checkout",
        type: "post",
        data: {
            id: id
        },
        success: function (data) {
            if(data.auth){

                // Emptied fields
                ele.parent().html(data.fields.timestamp);

                // Show message
                $("#modalmsg").text("Successfully Checked Out!");
                $("#checkedinmsg").modal("show");
            } else {

                // Show Error message
                $("#modalmsg").text("Error occured while Checking Out!");
                $("#checkedinmsg").modal("show");
            }

            $("#visitors_data").removeClass("loading");
        },
        error: function (err) {
            
            // Show Error message
            $("#modalmsg").text("Error occured while Checking Out!");
            $("#checkedinmsg").modal("show");
            $("#visitors_data").removeClass("loading");
        }
    })
})