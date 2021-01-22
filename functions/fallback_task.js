exports.fallback_task =async function(context, event, callback,RB) {
    try {
    let Listen = false;
    let Remember = {};
    let Collect = false;
    let Tasks = false;
    let Redirect = false;
    let Handoff = false;
    let Say = "";
    // Add your code here.
    const Memory = JSON.parse(event.Memory);
    console.log('fallback task');
    if(Memory.check_cnt===undefined)
    {
      Remember.check_cnt=1;
      console.log('Counter: '+Remember.check_cnt);
    }
    else{
      Remember.check_cnt = Memory.check_cnt + 1;
      console.log('Counter: '+Remember.check_cnt);
    }

    console.log('Fallback Counter: '+ Remember.check_cnt);
    if(Remember.check_cnt >= 2)
    {
        Say = `I'm sorry didn't quite get that. `;
        Redirect="task://Agent";
      //console.log(JSON.stringify(Memory));
      
    }
    else
    {
      switch (Remember.check_cnt) {

        case 1:
          Say=`I didn't quite get that.`;
          break;

        case 2:
          Say=`Hmm... I still did not get that.`;
          break;

        default:
          Say=`I'm sorry didn't quite get that.`;
          break;
      }
    //Say=`I'm sorry didn't quite get that.`;
      Redirect="task://greeting";
    }
     //End of your code.

  RB(Say, Listen, Remember, Collect, Tasks, Redirect, Handoff, callback);

} catch (error) {
console.error(error);
callback( null,error);
}
};