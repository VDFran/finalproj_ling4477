PennController.ResetPrefix()
DebugOff()
Sequence("instructions", "gender-trial", randomize("experimental-trial"))

newTrial("instructions",
    defaultText
        .center()
        .print()
    ,
    newText("instructions-1", "Welcome!")
    ,
    newText("instructions-2", "Thank you very much for your participation! This experiment is part of a Cornell University scientific research project. Your decision to complete participant is voluntary. There is no way for us to identify you. The only information we will have, in addition to your responses, is the time at which you completed the survey. The results of the research may be presented at scientific meetings or published in scientific journals. Clicking on the link below indicates that you are at least 18 years of age and agree to complete this experiment voluntarily.")
    ,
    newText("instructions-3", "<b>You will hear a sentence. Please rate how acceptable you think it is on a scale of 1 to 5. Wear headphones if possible.</b>")
    ,
     newText("instructions-4", "Please select 1 to 5 by clicking on the buttons with your mouse.")
   ,
    newButton("wait", "Click to start the experiment")
        .center()
        .print()
        .wait()
)

newTrial("gender-trial",
 defaultText
        .center()
        .print()
    ,
    newText("instructions-1", "Please select your gender")
    ,
    newScale("acceptability", 2)
          .before( newText("(male)") )
          .after( newText("(female)") )
          .callback( getText("warning").hidden() )
          .center()
          .log()
          .print()
        ,
        newText("warning", "Please provide a judgment before you can continue").center().color("red").hidden().print()
        ,
        newButton("continue", "Proceed")
          .print()
          .center()
          .wait( getScale("acceptability").test.selected().failure(getText("warning").visible()) )
          .log()
    )
    


   Template("fillers.csv", row =>
    newTrial("experimental-trial",
    
        newTimer("break", 1000)
            .start()
            .wait()
        ,
        
        //newText("sentence", row.sentence)
        //    .center()
         //   .unfold(row.duration)
        //,    
        newAudio("audio", row.audio)
            .play()
            .log()
        ,
       
        
        newScale("acceptability", 5)
          .before( newText("(very bad)") )
          .after( newText("(very good)") )
          .callback( getText("warning").hidden() )
          .center()
          .log()
          .print()
        ,
        newText("warning", "Please provide a judgment before you can continue").center().color("red").hidden().print()
        ,
        newButton("continue", "Proceed")
          .print()
          .center()
          .wait( getScale("acceptability").test.selected().failure(getText("warning").visible()) )
          .log()
        
    
      
       
    )
    .log("item", row.item)
    .log("type", row.type)
    .log("sentence", row.sentence)
    .log("duration", row.duration)
    .log("tense", row.tense)

    
)
