import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
export default defineContentScript({
  matches: ['https://www.linkedin.com/mynetwork/grow/'], // This is out target URL
  main() {
    function AcceptAllButton() {
      const [isProcessing, setIsProcessing] = useState(false)
      const [buttonText, setButtonText] = useState('Connect with All') //with this we can change the button text based on the availability of Connect button
      const [isDisabled, setIsDisabled] = useState(false) // Disable the button if No profiles to connect found

      const acceptAll = async () => {
        setIsProcessing(true)

        // Find all Connect buttons and store it in Array
        const acceptButtons = Array.from(
          document.querySelectorAll('button')
        ).filter((button) => {
          const spanText = button.querySelector('span')?.innerText
          return spanText === 'Connect'
        })

        // Handle the case where no connectable profiles are available
        if (acceptButtons.length === 0) {
          setButtonText('No profiles to connect')
          setIsProcessing(false)
          setIsDisabled(true)
          // Re-enabling the Connect with All button after 2 sec only for the visual feedback to users that the extension checked for connectable profiles but found none.
          setTimeout(() => {
            setButtonText('Connect with All')
            setIsDisabled(false)
          }, 2000)

          return
        }

        // Click each Accept button with a delay
        for (let i = 0; i < acceptButtons.length; i++) {
          acceptButtons[i].click()
          // Here we want delay between each connection request so i use await because it pause/suspend the execution of code (for loop) until the promise get resolved
          await new Promise((resolve) =>
            setTimeout(resolve, 1000 + Math.random() * 2000)
          )
        }

        setIsProcessing(false)
      }

      return (
        <button
          onClick={acceptAll}
          disabled={isDisabled || isProcessing} //disabling the button based on Connect button presence
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            padding: '10px 15px',
            backgroundColor: isDisabled ? 'gray' : 'green',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: isDisabled ? 'not-allowed' : 'pointer',
            zIndex: 1000,
          }}
        >
          {isProcessing ? 'Connecting...' : buttonText}
        </button>
      )
    }
    //Only show Connect with All buton on this URL
    if (window.location.href === 'https://www.linkedin.com/mynetwork/grow/') {
      const container = document.createElement('div')
      document.body.appendChild(container)
      const root = createRoot(container)
      root.render(<AcceptAllButton />)
    }
  },
})
