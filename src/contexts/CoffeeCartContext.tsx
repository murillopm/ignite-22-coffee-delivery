import { createContext, ReactNode, useState } from 'react'
import { coffeeData } from '../lib/coffeeData'

type CoffeeData = {
  id: number
  name: string
  description: string
  image: string
  labels: string[]
  price: number
}

type CoffeeCartData = {
  id: number
  name: string
  image: string
  amount: number
  price: number
}

interface CoffeeCartType {
  coffeeList: CoffeeData[]
  cartItems: CoffeeCartData[]
  addItemToCart: (coffeeItem: CoffeeCartData) => void
}

interface CoffeCartContextProviderProps {
  children: ReactNode
}

export const CoffeeCartContext = createContext({} as CoffeeCartType)

export function CoffeCartContextProvider({
  children,
}: CoffeCartContextProviderProps) {
  const [cartItems, setCartItems] = useState<CoffeeCartData[]>([])
  const coffeeList = coffeeData

  function addItemToCart(coffeeItem: CoffeeCartData) {
    const itemIndex = cartItems.findIndex((item) => item.id === coffeeItem.id)
    const isItemAlreadyInCart = itemIndex > -1

    if (!isItemAlreadyInCart) {
      setCartItems((state) => [...state, coffeeItem])
    } else {
      const newCartItems = cartItems?.map((item) => {
        if (item.id === coffeeItem.id) {
          return {
            ...item,
            amount: coffeeItem.amount,
          }
        } else {
          return item
        }
      })
      setCartItems(newCartItems)
    }
  }

  return (
    <CoffeeCartContext.Provider
      value={{ coffeeList, cartItems, addItemToCart }}
    >
      {children}
    </CoffeeCartContext.Provider>
  )
}
