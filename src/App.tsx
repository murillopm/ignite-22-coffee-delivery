import { BrowserRouter } from 'react-router-dom'
import { CoffeCartContextProvider } from './contexts/CoffeeCartContext'
import { Router } from './Router'

export function App() {
  return (
    <BrowserRouter>
      <CoffeCartContextProvider>
        <Router />
      </CoffeCartContextProvider>
    </BrowserRouter>
  )
}
