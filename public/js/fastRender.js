$(document).ready(function() {
	$("#productSearchBar").keydown(function () {
		var searchValue = $("#productSearchBar").val();
		$.get("/products/search/" + searchValue, function (results) {
			$("#productList").html(results);
		});
	});
});