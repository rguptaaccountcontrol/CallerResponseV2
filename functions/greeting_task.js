exports.greeting_task =async function(context, event, callback,RB) {
    try {
    let Listen = false;
    let Remember = {};
    let Collect = false;
    let Tasks = false;
    let Redirect = false;
    let Handoff = false;
    let Say = "";
    // Add your code here.
    console.log("greeting_task");
    const Memory = JSON.parse(event.Memory);
    let RouteBalance;
    let mailingAddress;
    let webPaymentAddress;

    if(Memory.RouteBalance === undefined)
     RouteBalance=400;
    else
     RouteBalance=Memory.RouteBalance;

     if(Memory.mailingAddress=== undefined)
       mailingAddress='Woodland';
    else
       mailingAddress=Memory.mailingAddress;
    
    if(Memory.webPaymentAddress=== undefined)
       webPaymentAddress='test@convergentusa.com';
    else
      webPaymentAddress=Memory.webPaymentAddress;
    
    console.log('mailingAddress: '+ mailingAddress);
    console.log('webPaymentAddress: '+ webPaymentAddress);
    console.log('RouteBalance: '+ RouteBalance);

    if(Memory.check_cnt===undefined)
    {
      Remember.check_cnt=0;
      console.log('Counter: '+Remember.check_cnt);
    }
   // This code runs when comming from Address_task
   if(Remember.check_cnt===0)
         Prompt = `To make a payment or payment arrangement say payment ,
                   for our mailing address or web address say address ,
                   to speak to a representative say agent ,
                   to hear these options again say repeat`;
    else{
      if(Memory.AFlag)
         Prompt = `To make a payment or payment arrangement say payment or press 1 ,
                   to speak to a representative say agent or press 3 ,
                   to hear these options again say repeat or press 0.`;
      else
          Prompt = `To make a payment or payment arrangement say payment or press 1 ,
                    for our mailing address or web address say address or press 2 ,
                    to speak to a representative say agent or press 3 ,
                    to hear these options again say repeat or press 0.`;
      
    }



    
   Say = `You can pay your Total balance or less than your total balance of $${RouteBalance} , `;
   Say += Prompt;
    
   Listen = {
     "voice_digits":{
       "num_digits": 1,
       "finish_on_key": "#",
       "redirects": {
           0: "task://greeting",
           1: "task://payment",
           2: "task://Address",
           3: "task://Agent"
       }
     }
   }
  
  
    //End of your code.
  
   RB(Say, Listen, Remember, Collect, Tasks, Redirect, Handoff, callback);
  
} catch (error) {
console.error(error);
callback( error);
}
};