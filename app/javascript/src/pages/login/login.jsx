//External Imports
import React, { useState } from "react";

//Components
import Title from "@components/title/title";
import UserEntryWidget from "@components/loginWidget/userEntryWidget";
import SignUpWidget from "@components/loginWidget/signupWidget";
import LoginWidget from "@components/loginWidget/loginWidget";

//Stylesheets
import "./login.scss";
import UserOptions from "../../components/loginWidget/userOptions";

export default function StartScreen() {
  const [currentWidget, setCurrentWidget] = useState("options");
  const optionsToSelect = [
    currentWidget === "signup" && "login" || currentWidget === "login" && "signup",
    "options"
  ]

  function setCurrentWidgetState(widget) {
    setCurrentWidget(widget)
  };

  return (
    <main className="overflow-hidden max-h-screen h-screen bg-black flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <header className="sm:mx-auto sm:w-full sm:max-w-4xl">
        <Title />
      </header>
      
      <section className="mx-auto mt-8 lg:mt-4 py-2 px-5 sm:w-full sm:max-w-xl relative intricate-border">
        { currentWidget == "options" 
          && <UserEntryWidget setCurrentWidgetState={ setCurrentWidgetState } /> 
        }
        { currentWidget == "signup" 
          && <SignUpWidget />

        }
        { currentWidget == "login" 
          && <LoginWidget />
        }
        { currentWidget !== "options"
          && <UserOptions
              options={ optionsToSelect }
              setCurrentWidgetState={ setCurrentWidgetState }  
            />
        }
      </section>
    </main>
  )
};