import { CurrencyDollar, MapPin, Timer } from 'phosphor-react'
import { useContext } from 'react'
import { CheckoutIllustration } from '../../components/Buttons/Images/CheckoutIllustration'
import {
  CoffeeCartContext,
  PaymentMethodsToPt,
} from '../../contexts/CoffeeCartContext'

export function OrderSuccess() {
  const { lastCustomerOrder } = useContext(CoffeeCartContext)
  const { address, paymentMethod } = lastCustomerOrder
  console.log(lastCustomerOrder)
  return (
    <div className="mt-20 px-40 flex flex-col gap-10">
      <div className="flex flex-col gap-1">
        <h2 className="text-[32px] font-brand font-extrabold text-brand-yellow-dark">
          Uhu! Pedido confirmado
        </h2>
        <p className="text-xl text-brand-base-subtitle">
          Agora é só aguardar que logo o café chegará até você
        </p>
      </div>
      <div className="flex justify-between">
        <div className="p-[1px] w-[526px] rounded-tl-md rounded-br-md rounded-tr-[36px] rounded-bl-[36px] bg-gradient-to-br from-[#DBAC2C] to-[#8047F8] relative">
          <div className="p-[39px] bg-brand-background w-full h-full rounded-tl-md rounded-br-md rounded-tr-[36px] rounded-bl-[36px] flex flex-col gap-8">
            <div className="flex gap-3 items-center">
              <div className="rounded-full w-8 h-8 bg-brand-purple flex justify-center items-center">
                <MapPin
                  weight="fill"
                  className="text-brand-background"
                  size={16}
                />
              </div>
              <p className="text-brand-base-text text-base">
                Entrega em <strong>{address.street}</strong> <br />{' '}
                {address.neighborhood} - {address.city}, {address.state}
              </p>
            </div>
            <div className="flex gap-3 items-center">
              <div className="rounded-full w-8 h-8 bg-brand-yellow flex justify-center items-center">
                <Timer
                  weight="fill"
                  className="text-brand-background"
                  size={16}
                />
              </div>
              <p className="text-brand-base-text text-base">
                Previsão de entrega <br /> <strong>20min - 30min</strong>
              </p>
            </div>
            <div className="flex gap-3 items-center">
              <div className="rounded-full w-8 h-8 bg-brand-yellow flex justify-center items-center">
                <CurrencyDollar
                  weight="fill"
                  className="text-brand-background"
                  size={16}
                />
              </div>
              <p className="text-brand-base-text text-base">
                Pagamento na entrega <br />{' '}
                <strong>{PaymentMethodsToPt[paymentMethod]}</strong>
              </p>
            </div>
          </div>
        </div>
        <CheckoutIllustration />
      </div>
    </div>
  )
}
