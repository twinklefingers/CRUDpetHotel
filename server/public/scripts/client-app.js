$(document).ready(function() {

    //do right away
    getOwner();
    getPets();

    //event listeners
    $('#owner_submit').on('click', postOwner);
    $('#pet_submit').on('click', postPet);


}); //doc ready end


/**
 * Add a new pet to the database and refresh the DOM
 */

function postOwner() {
    event.preventDefault();

    //var assignments
    var ownerInfo = {};

    $.each($('#owner_form').serializeArray(), function(i, field) {
        ownerInfo[field.name] = field.value;
    });

    $.ajax({
        type: 'POST',
        url: '/owner',
        data: ownerInfo,
        success: function() {
            console.log('POST /owner works!');
            $('#pet_list').empty();
            // something here to repopulate DOM with new info?
        },
        error: function(response) {
            console.log('POST /owner does not work...', response);
        },
    });
}

function postPet() {
    event.preventDefault();

    //var assignments
    var petInfo = {};
    var owner_id = $("#selectOwners").val();
    petInfo.owner_id = owner_id;

    $.each($('#pets_form').serializeArray(), function(i, field) {
        petInfo[field.name] = field.value;
    });

    $.ajax({
        type: 'POST',
        url: '/pets',
        data: petInfo,
        success: function() {
            console.log('POST /pet works!');
            $('#pet_list').empty();
            // something here to repopulate DOM with new info?
        },
        error: function(response) {
            console.log('POST /pets does not work...');
        },
    });
};

//loads drop down names
function getOwner() {

    $.ajax({
        type: 'GET',
        url: '/owner',
        success: function(owners) {
            $('#selectOwners').empty();
            console.log('GET /owner returns:', owners);
            owners.forEach(function(owners, i) {
                var option = owners.first_name + " " + owners.last_name;
                var owner_id = owners.id;
                var $selectOption = $('<option value="' + owner_id + '">' + option + '</option>');
                $('#selectOwners').append($selectOption);
                // something here to repopulate DOM with new info?
            });
        },
        error: function() {
            console.log('GET /get owners failed');
        },
    });
}

function getPets() {

    $.ajax({
        type: 'GET',
        url: '/pets',
        success: function(pets) {
            console.log('GET /pets returns:', pets);
            pets.forEach(function(pets) {
                var $el = $('<tr></tr>');
                $el.append('<td>' + pets.first_name + ' ' + pets.last_name + '</td>');
                $el.append('<td>' + pets.name + '</td>');
                $el.append('<td>' + pets.breed + '</td>');
                $el.append('<td>' + pets.color + '</td>');
                $el.append('<td>' + '<button class ="update">Update</button>' + '</td>');
                $el.append('<td>' + '<button class ="delete">Delete</button>' + '</td>');
                $el.append('<td>' + '<button class ="checker">Check In/Out</button>' + '</td>');
                $('#pet_list').children().last().append($el);
            });
        },

        error: function(response) {
            console.log('GET /pets fail. No pets could be retrieved!');
        },
    });
}

//everytime toggle class is selected we will send a post request to
//document it on the visits

//liseners and function for delete, modify and toggle class mehthods
//within toggle class listener will fire off function that will
//post quest to server for appointments table and update the table (reword this)
