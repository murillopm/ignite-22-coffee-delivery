import {
  Bank,
  CreditCard,
  CurrencyDollar,
  MapPinLine,
  Money,
} from 'phosphor-react'
import { useState } from 'react'
import { PaymentMethodButton } from '../../components/Buttons/PaymentMethodButton'
import { FormInput } from '../../components/FormInput'

type PaymentMethods = 'credit-card' | 'debit-card' | 'cash'

export function Checkout() {
  const [activePaymentMethod, setActivePaymentMethod] = useState<
    PaymentMethods | undefined
  >(undefined)

  return (
    <form className="w-full flex gap-8 items-start px-40 mt-10">
      <div className="flex-1 flex flex-col">
        <p className="text-bold text-lg font-brand">Complete seu pedido</p>
        <div className="p-10 flex flex-col bg-brand-base-card rounded-md gap-8 mt-[15px]">
          <div className="flex gap-2">
            <MapPinLine className="text-brand-yellow-dark" size={22} />
            <div>
              <p className="text-brand-base-subtitle text-base">
                Endereço de Entrega
              </p>
              <p className="text-brand-base-text text-sm">
                Informe o endereço onde deseja receber seu pedido
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <FormInput id="zip" placeholder="CEP" widthInPixels={200} />
            <FormInput id="address" placeholder="Rua" />
            <div className="flex gap-3">
              <FormInput id="number" placeholder="Número" widthInPixels={200} />
              <FormInput
                id="address-complement"
                placeholder="Complemento"
                isOptional
              />
            </div>
            <div className="flex gap-3">
              <FormInput
                id="neighborhood"
                placeholder="Bairro"
                widthInPixels={200}
              />
              <FormInput id="city" placeholder="Cidade" />
              <FormInput id="state" placeholder="UF" widthInPixels={60} />
            </div>
          </div>
        </div>
        <div className="p-10 mt-3 flex flex-col bg-brand-base-card rounded-md gap-8">
          <div className="flex gap-2">
            <CurrencyDollar className="text-brand-purple" size={22} />
            <div>
              <p className="text-brand-base-subtitle text-base">Pagamento</p>
              <p className="text-brand-base-text text-sm">
                O pagamento é feito na entrega. Escolha a forma que deseja pagar
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <PaymentMethodButton
              type="button"
              name="Cartão de crédito"
              icon={<CreditCard size={16} className="text-brand-purple" />}
              isActive={activePaymentMethod === 'credit-card'}
              onClick={() => setActivePaymentMethod('credit-card')}
            />
            <PaymentMethodButton
              type="button"
              name="Cartão de débito"
              icon={<Bank size={16} className="text-brand-purple" />}
              isActive={activePaymentMethod === 'debit-card'}
              onClick={() => setActivePaymentMethod('debit-card')}
            />
            <PaymentMethodButton
              type="button"
              name="Dinheiro"
              icon={<Money size={16} className="text-brand-purple" />}
              isActive={activePaymentMethod === 'cash'}
              onClick={() => setActivePaymentMethod('cash')}
            />
            <input type="button" />
          </div>
        </div>
      </div>
      {/* <div className="flex flex-col w-[448px]">
        <p className="text-bold text-lg font-brand">Cafés selecionados</p>
        <div className="p-10 bg-brand-base-card rounded-tr-[44px] rounded-bl-[44px] rounded-tl-md rounded-br-md"></div>
      </div> */}
    </form>
  )
}
