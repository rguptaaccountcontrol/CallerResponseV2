exports.greeting_task = async function (context, event, callback, RB) {
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
    let { CurrentTaskConfidence } = event;
    let CurrentConfidencevalue = Number(CurrentTaskConfidence);
    let RouteBalance;
    let SIFAmount;

    if (Memory.SIFAmount === undefined) SIFAmount = 0;
    else SIFAmount = Memory.SIFAmount;

    if (Memory.RouteBalance === undefined) RouteBalance = 400;
    else RouteBalance = Memory.RouteBalance;

    console.log("RouteBalance: " + RouteBalance);

    if (Memory.check_cnt === undefined) {
      Remember.check_cnt = 0;
      console.log("Counter: " + Remember.check_cnt);
    }
    // First time the CurrentConfidencevalue is 0
    else {
      if (CurrentConfidencevalue === 0) {
        console.log("CurrentConfidencevalue: " + CurrentConfidencevalue);
        Remember.check_cnt = Memory.check_cnt + 1;
      }
    }

    // This code runs when comming from Address_task
    if (Remember.check_cnt === 0) {
      if (SIFAmount > 0)
        Prompt = `and your Reduced Balance amount is  $${SIFAmount}.
                  Are you calling to make a payment of your reduced balance 
                  amount of $${SIFAmount} say payment, for our mailing address or
                  web address say address, to speak to a representative say agent,
                  to hear these options again say repeat`;
      else
        Prompt = `Are you calling to make a payment say payment,
                   for our mailing address or web address say address,
                   to speak to a representative say agent,
                   to hear these options again say repeat`;
    }
    else {
      if (Memory.AFlag)
        Prompt = `To make a payment say payment or press 1,
                   to speak to a representative say agent or press 3,
                   to hear these options again say repeat or press 0.`;
      else
        if (SIFAmount > 0)
          Prompt = `and your Reduced Balance amount is $${SIFAmount}.
                  Are you calling to make a payment of your reduced balance 
                  amount of $${SIFAmount}, say payment or press 1,
                  for our mailing address or web address say address or press 2,
                  to speak to a representative say agent or press 3,
                  to hear these options again say repeat or press 0.`;
        else
          Prompt = `To make a payment say payment or press 1,
                    for our mailing address or web address say address or press 2,
                    to speak to a representative say agent or press 3,
                    to hear these options again say repeat or press 0.`;
    }

    if (Remember.check_cnt <= 3 || Remember.check_cnt === undefined) {
      Say = `Your total balance is $${RouteBalance} , `;
      Say += Prompt;

      Listen = {
        voice_digits: {
          num_digits: 1,
          finish_on_key: "#",
          redirects: {
            0: "task://greeting",
            1: "task://payment",
            2: "task://Address",
            3: "task://Agent",
          },
        },
      };
    } else {
      Say = `I'm sorry didn't quite get that. `;
      Redirect = "task://Agent";
    }

    //End of your code.

    RB(Say, Listen, Remember, Collect, Tasks, Redirect, Handoff, callback);
  } catch (error) {
    console.error(error);
    callback(error);
  }
};
