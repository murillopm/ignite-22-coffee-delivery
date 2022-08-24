import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { coffeeData } from '../lib/coffeeData'
import { geoLocationApiClient } from '../services/axios'

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

type UserLocation = {
  city: string
  state: string
}

interface CoffeeCartType {
  location: UserLocation
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
  const [location, setLocation] = useState({} as UserLocation)
  const coffeeList = coffeeData

  useEffect(() => {
    localStorage.setItem(
      '@coffee-delivery:cart-items',
      JSON.stringify(cartItems),
    )
  }, [cartItems])

  const getAddress = useCallback(async (lat: number, lng: number) => {
    const { data } = await geoLocationApiClient.get('', {
      params: {
        location: `${lat},${lng}`,
      },
    })

    const city = data.results[0].locations[0].adminArea5
    const state = data.results[0].locations[0].adminArea3

    setLocation({ city, state })
  }, [])

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      if (coords) {
        getAddress(coords.latitude, coords.longitude)
      }
    })
  }, [getAddress])

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
        location,
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
