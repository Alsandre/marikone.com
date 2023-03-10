import React, { useState } from "react";
import { ContactSectionIcon, TickIcon } from "../icons";
import { StoreInfo } from "./StoreInfo";
import { TextInput } from "./TextInput";
import { Text } from "./Text";
import { usePlatform } from "../hooks/usePlatform";

const URL =
  "https://script.google.com/macros/s/AKfycbyWA81iY-k9_UAx78vEvaMEwJEtXcpJuiqr1lh3RmvRHauPZjP7XXpl7ReJPkMT5Ujo1w/exec";

export const ContactSection = () => {
  const isMobile = usePlatform();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const params = {
    email,
    name,
    message,
  };

  async function sendEmail() {
    const response = await fetch(URL, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "text/plain",
      },
      body: JSON.stringify(params),
    });

    const res = await response.json();
    if (res?.result?.contentLength > 0) {
      setName("");
      setEmail("");
      setMessage("");
      let successMsg = document.getElementById('messege-sent');
      successMsg?.classList.remove('hidden');
      setTimeout(()=>{
        successMsg?.classList.add('hidden');
      }, 3000)
    }
  }

  return (
    <div id='contact-form' className="flex flex-col items-center">
    {!isMobile ? <Text variant='title' className='text-dark-200'>Contact</Text> : <Text variant='title' className='text-dark-200'>Stores</Text>}

      <div className="md:bg-section md:w-1/2 md:min-w-[768px] w-screen rounded-lg mt-8 flex md:flex-row justify-around flex-col md:py-12 md:px-14">
        <div className=" bg-section border-dark-100 md:border-r border-opacity-10 flex basis-[45%] flex-col pt-12 pb-4 md:pt-0 md:pr-12 md:items-start md:mt-0 md:w-fit">
          <StoreInfo
            title="Geo Fashion Lab"
            address="80 Zakaria Paliashvili St, Tbilisi"
            phone="+995 591 212 081"
          />

          <StoreInfo
            title="Comode"
            address="14 Irakli Abashidze St, Tbilisi"
            phone="+995 598 533 959"
          />
        </div>

        {isMobile && <Text variant='title' className='text-dark-200 text-center mt-24 mb-9'>Contact</Text>}
        <div className="flex basis-[55%] md:pl-16 flex-col items-center justify-center">
          <TextInput
            label="Name"
            className="mb-8"
            onChange={(e: any) => setName(e.target.value)}
            value={name}
          />
          <TextInput
            label="Email"
            className="mb-8"
            onChange={(e: any) => setEmail(e.target.value)}
            value={email}
          />
          <TextInput
            label="Message"
            variant="textarea"
            className="mb-8"
            onChange={(e: any) => setMessage(e.target.value)}
            value={message}
          />

          <div className="md:self-start self-center w-full md:w-auto flex flex-col md:block">
            <button
              className="w-32 h-12 bg-accent-200 rounded md:self-start self-center hover:bg-accent-100"
              onClick={sendEmail}
            >
              <Text variant='label' className='text-dark-200'>Submit</Text>
            </button>
            <span id="messege-sent" className="text-sm m-auto md:absolute md:ml-4 hidden">
              <TickIcon/>
              <Text variant="label" className="ml-6 mt-4 text-sent">Message sent</Text>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
