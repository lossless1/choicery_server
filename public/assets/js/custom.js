$('.btn-contact').click(function(){
  var customerId = $(this).attr('data-customer-id');
  $('#requestSubmition').off("click");
  
  $('#requestSubmition').click(function(){
    var data = {};
    data['companyId'] = 100;
    data['customerId'] = customerId;
    $("#requestForm").serializeArray().map(function(x){
      data[x.name] = x.value;
    });
    console.log(data);

//        fetch('http://api.choicery.app/requests',{
//        method: 'POST',
//        body: JSON.stringify(data),
//        })
//        .then(res => res.json())
//        .then(requests => {
//          console.log(requests)
//          })
//        .catch((err) => {
//          console.log()
//        } );
    
    $('#modal').modal('hide');
    $('#requestForm')[0].reset();
    $('#messageSucess').addClass('show');
  });
});