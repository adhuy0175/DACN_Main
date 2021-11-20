
/*when first load html*/
$(document).ready(
    function () {
        debugger;
        loaddata();
    }
);


    function loaddata() {

        $.ajax(
            {
                // GET data by api
                url: "/api/Demo",
                method: "GET",
                data: "",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
            }
        ).done(
             // Show data to table
            
            function (data) {
                $('#table tbody').empty(); // clear table
                $.each(data, function (i, item) {
                    var rows =
                        "<tr>" +
                    /*    "<td>" + item.EmployeeID + "</td>" +*/
                        "<td>" + item.Name + "</td>" +
                        "<td>" + item.Gender + "</td>" +
                        "<td>" + item.Salary + "</td>" +
                        "<td>" + item.Dept + "</td>" +
                        // id of button it is id of Object in database
                        "<td>" + "<button id=" + item.EmployeeID + // button 
                        ' class="btn btn-primary" style="margin-right: 10px" onclick=editOnclick(this.id)>Edit</button>' +
                        "<button id=" + item.EmployeeID +
                        ' class="btn btn-success" onclick=delOnclick(this.id)>Delete</button></td>'
                    "</tr>";
                    $('#table').append(rows);// add row
                });
                console.log(data);
            }
        ).fail(
            function(data) {
                alert(data);
            }
        );
    };

    function clearDialog() {
        // alert(JSON.stringify(data));
        $("#info1").val("");
        $("#info2").val("");
        $("#info3").val("");
        $("#info4").val("");
    }

   
    var idclick = "";// id temp

    // EDIT
    function editOnclick(clicked_id) {

        this.FormMode = "edit"
        var linkurl = "/api/Demo/" + clicked_id;

        // load data to dialog
        $.ajax(
            {
                url: linkurl,
                method: "GET",
                data: "",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
    
            }
        ).done(
            function (data) {
            // alert(JSON.stringify(data));
            $("#info1").val(data["Name"]);
            $("#info2").val(data["Gender"]);
            $("#info3").val(data["Salary"]);
            $("#info4").val(data["Dept"]);

            console.log(data);
            }
        ).fail(
            function (data) {
                alert(data);
            }
        );

        // put id of Object to idclick variable
        idclick = clicked_id;
        // Show dialog
        var favDialog = document.getElementById('favDialog');
        favDialog.showModal();// Next to dialog
        clearDialog();

    };

    // ADD
    function addOnclick() {
        this.FormMode = "add";
        // Show dialog
        var favDialog = document.getElementById('favDialog');
        favDialog.showModal();// Next to dialog
        clearDialog();
    }

    // DELETE
    function delOnclick(clicked_id) {
        var txt;
        var r = confirm("Are you sure?");
        if (r == true) {
            var linkurl = "/api/Demo/" + clicked_id;
            $.ajax(
                {
                    url: linkurl,
                    method: "DELETE",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json"

                }
            ).done(
                function (data) {
                    alert('success');
                    loaddata();
                }
            ).fail(
                function (data) {
                    alert('fail');
                }
            );
        } else {
            loaddata();
        }
       
       

        //location.reload();// load page
    };

    // SAVE -> POST/PUT
    function saveOnclick() {
        /* alert(idclick);*/
        var sefl = this; // From hien tai
        method = "POST";

        var employe = {};
            employe.Name = $("#info1").val();
            employe.Gender = $("#info2").val();
            employe.Salary = $("#info3").val();
            employe.Dept = $("#info4").val();

        // when method is PUT
        if (sefl.FormMode == "edit") {
            employe.EmployeeID = idclick;
            method = "PUT";
        }

        // UPDATE
        alert(method);
        var linkurl = "/api/Demo/" + idclick;
        $.ajax(
            {
                url: linkurl,
                method: method,
                data: JSON.stringify(employe),
                contentType: "application/json; charset=utf-8",
                dataType: "json"
            }
        ).done(
            function (data) {
                loaddata();
                idclick = "";
                    //alert('success');
            }
        ).fail(
            function (data) {
                alert('fail');
            }
        );
    
      //  location.reload();
    };

