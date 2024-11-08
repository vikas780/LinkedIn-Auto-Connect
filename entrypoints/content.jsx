import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
export default defineContentScript({
  matches: ['https://www.linkedin.com/mynetwork/grow/'],
  main() {
    function AcceptAllButton() {
      const [isProcessing, setIsProcessing] = useState(false)

      const acceptAll = async () => {
        setIsProcessing(true)

        // Find all Accept buttons
        const acceptButtons = Array.from(
          document.querySelectorAll('button')
        ).filter((button) => {
          const spanText = button.querySelector('span')?.innerText
          return spanText === 'Connect'
        })

        // Click each Accept button with a delay
        for (let i = 0; i < acceptButtons.length; i++) {
          acceptButtons[i].click()
          await new Promise((resolve) =>
            setTimeout(resolve, 1000 + Math.random() * 2000)
          )
        }

        setIsProcessing(false)
      }

      return (
        <button
          onClick={acceptAll}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            padding: '10px 15px',
            backgroundColor: 'green',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            zIndex: 1000,
          }}
        >
          {isProcessing ? 'Connecting...' : 'Connect with All'}
        </button>
      )
    }
    if (window.location.href === 'https://www.linkedin.com/mynetwork/grow/') {
      const container = document.createElement('div')
      document.body.appendChild(container)
      const root = createRoot(container)
      root.render(<AcceptAllButton />)
    }
  },
})
