import { createContext, ReactNode, useEffect, useState } from 'react'
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

export type PaymentMethods = 'credit-card' | 'debit-card' | 'cash'

export const PaymentMethodsToPt = {
  'credit-card': 'Cartão de crédito',
  'debit-card': 'Cartão de débito',
  cash: 'Dinheiro',
}

type LocationCoords = {
  latitude: number
  longitude: number
}

type CustomerOrder = {
  address: {
    street: string
    houseNumber: number
    neighborhood: string
    city: string
    state: string
  }
  paymentMethod: PaymentMethods
  totalPrice: number
  items: CoffeeCartData[]
}

interface CoffeeCartType {
  currentLocation: LocationCoords
  coffeeList: CoffeeData[]
  cartItems: CoffeeCartData[]
  lastCustomerOrder: CustomerOrder
  addItemToCart: (coffeeItem: CoffeeCartData) => void
  removeItemFromCart: (id: number) => void
  incrementItemAmount: (id: number) => void
  decrementItemAmount: (id: number) => void
  clearCart: () => void
  registerCustomerOrder: (data: CustomerOrder) => void
}

interface CoffeCartContextProviderProps {
  children: ReactNode
}

export const CoffeeCartContext = createContext({} as CoffeeCartType)

export function CoffeCartContextProvider({
  children,
}: CoffeCartContextProviderProps) {
  const [cartItems, setCartItems] = useState<CoffeeCartData[]>(() => {
    const storedDataAsJSON = localStorage.getItem('@coffee-delivery:cart-items')
    if (storedDataAsJSON) {
      return JSON.parse(storedDataAsJSON)
    }
    return []
  })
  const [lastCustomerOrder, setLastCustomerOrder] = useState(
    {} as CustomerOrder,
  )
  const [currentLocation, setCurrentLocation] = useState({} as LocationCoords)
  const coffeeList = coffeeData

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((coordinates) => {
      if (coordinates) {
        setCurrentLocation({
          latitude: coordinates.coords.latitude,
          longitude: coordinates.coords.longitude,
        })
      }
    })
  }, [])

  useEffect(() => {
    localStorage.setItem(
      '@coffee-delivery:cart-items',
      JSON.stringify(cartItems),
    )
  }, [cartItems])

  function incrementItemAmount(id: number) {
    const newCartItems = cartItems.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          amount: item.amount + 1,
        }
      }
      return item
    })
    setCartItems(newCartItems)
  }

  function decrementItemAmount(id: number) {
    const newCartItems = cartItems.map((item) => {
      if (item.id === id) {
        const newAmount = item.amount > 1 ? item.amount - 1 : item.amount
        return {
          ...item,
          amount: newAmount,
        }
      }
      return item
    })
    setCartItems(newCartItems)
  }

  function removeItemFromCart(id: number) {
    const newCartItems = cartItems.filter((item) => item.id !== id)
    setCartItems(newCartItems)
  }

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

  function clearCart() {
    setCartItems([])
  }

  function registerCustomerOrder(data: CustomerOrder) {
    setLastCustomerOrder(data)
  }

  return (
    <CoffeeCartContext.Provider
      value={{
        currentLocation,
        coffeeList,
        cartItems,
        addItemToCart,
        removeItemFromCart,
        incrementItemAmount,
        decrementItemAmount,
        clearCart,
        registerCustomerOrder,
        lastCustomerOrder,
      }}
    >
      {children}
    </CoffeeCartContext.Provider>
  )
}
