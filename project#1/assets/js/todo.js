// when you click on an item, it gets crossed
$("ul").on("click", "li", function(){
	$(this).toggleClass("completed");
});

// when you click on dustbin, item gets removed from the todo list
$("ul").on("click", "span",function(event){
   $(this).parent().fadeOut(500,function(){
      $(this).remove();
   });

});

// For entering a new item in to-do list
$("input[type='text']").keypress(function(event){
    if(event.which === 13)
    {
    	var todo = $(this).val();
    	$(this).val("");
    	$("ul").append("<li><span>x </span>" + todo + "</li>");
    }
});

// when you click on + sign, input box slides
$(".bi-plus").click(function(){
   $(".inputbox").slideToggle();
})
