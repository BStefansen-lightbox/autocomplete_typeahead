const api_key = "<YOUR_API_KEY>"


$(document).ready(function() {
    $("#input-text").on("input", function() {
        var inputValue = $(this).val();
        if (inputValue.length >= 3) {
            fetchDropdown(inputValue);
        } else {
            $("#dropdown").empty(); // Clear dropdown if input field is empty
        }
    });

    function fetchDropdown(inputValue) {
        $.ajax({
            url: "https://api.lightboxre.com/v1/addresses/_autocomplete",
            method: "GET",
            headers: {
                "x-api-key": api_key
            },
            data: {
                text: inputValue,
                countryCode: "US"
            },
            success: function(data) {
                renderDropdown(data.addresses);
            },
            error: function(xhr, status, error) {
                console.error("Error fetching data:", error);
            }
        });
    }
    

    function renderDropdown(addresses) {
        var dropdownOptions = addresses.map(function(item) {
            return $("<option>").text(item.label);
        });
        $("#dropdown").empty().append(dropdownOptions);
        $("#dropdown").prop("size", addresses.length); // Set dropdown size to show all options
        $("#dropdown").prop("multiple", true); // Allow multiple selections
    }
});
