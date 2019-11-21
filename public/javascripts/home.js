$("#submitentry").click(function (e) {
    e.preventDefault();

    var ele = $("#entry-form");    
    var email = $("#email");
    var lastname = $("#lastname");
    var firstname = $("#firstname");
    var contact = $("#contactnumber");

    ele.addClass("loading");
    
    $.ajax({
        url: "/api/submitentry",
        type: "post",
        data: {
            email: email.val().trim(),
            contact: contact.val().trim(),
            lastname: lastname.val().trim(),
            firstname: firstname.val().trim()
        },
        success: function (data) {
            if(data.auth){

                // Emptied fields
                email.val("");;
                contact.val("");
                lastname.val("");
                firstname.val("");

                // Show message
                $("#modalmsg").text("Successfully Checked In!");
                $("#checkedinmsg").modal("show");
            } else {

                // Show Error message
                $("#modalmsg").text("Error Occured!");
                $("#checkedinmsg").modal("show");
            }

            ele.removeClass("loading");
        },
        error: function (err) {
            
            // Show Error message
            $("#modalmsg").text("Error Occured!");
            $("#checkedinmsg").modal("show");
            ele.removeClass("loading");
        }
    })
})