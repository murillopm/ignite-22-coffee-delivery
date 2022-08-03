import { Fragment, useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import {
  Bank,
  CreditCard,
  CurrencyDollar,
  MapPinLine,
  Money,
} from 'phosphor-react'

import { CheckoutOrderButton } from '../../components/Buttons/CheckoutOrderButton'
import { PaymentMethodButton } from '../../components/Buttons/PaymentMethodButton'
import { CoffeeCartCard } from '../../components/CoffeeCartCard'
import { FormInput } from '../../components/FormInput'
import {
  CoffeeCartContext,
  PaymentMethods,
} from '../../contexts/CoffeeCartContext'

interface AddressFormInputs {
  zipCode: string
  street: string
  houseNumber: number
  complement?: string
  neighborhood: string
  city: string
  state: string
}

const schema = zod.object({
  zipCode: zod.string().min(8, { message: 'CEP inválido' }),
  street: zod
    .string()
    .min(5, { message: 'A rua deve conter no mínimo 5 caracteres' }),
  houseNumber: zod
    .string()
    .min(1, { message: 'O número deve conter no mínimo 1 caractere' }),
  complement: zod.string().optional(),
  neighborhood: zod
    .string()
    .min(5, { message: 'O bairro deve conter no mínimo 5 caracteres' }),
  city: zod
    .string()
    .min(2, { message: 'A cidade deve conter no mínimo 2 caracteres' }),
  state: zod.string().min(2, {
    message: 'UF inválida',
  }),
})

export function Checkout() {
  const [activePaymentMethod, setActivePaymentMethod] = useState<
    PaymentMethods | undefined
  >(undefined)
  const { cartItems, clearCart, registerCustomerOrder } =
    useContext(CoffeeCartContext)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressFormInputs>({
    resolver: zodResolver(schema),
  })
  const navigate = useNavigate()

  const subTotal = cartItems.reduce(
    (total, item) => total + item.amount * item.price,
    0,
  )
  const deliveryFee = 3.5
  const totalPrice = subTotal + deliveryFee
  const isCartEmpty = cartItems.length === 0

  function formatPriceToBrl(number: number) {
    return Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(number)
  }

  function handleOrderSubmit(data: AddressFormInputs) {
    if (!activePaymentMethod) {
      window.alert('Selecione uma forma de pagamento')
      return
    }
    registerCustomerOrder({
      address: {
        street: data.street,
        city: data.city,
        houseNumber: data.houseNumber,
        neighborhood: data.neighborhood,
        state: data.state,
      },
      paymentMethod: activePaymentMethod,
      items: cartItems,
      totalPrice,
    })
    clearCart()
    navigate('/checkout/success', { replace: true })
  }

  return (
    <form
      className="w-full flex gap-8 items-start px-40 mt-10"
      onSubmit={handleSubmit(handleOrderSubmit)}
    >
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
            <FormInput
              id="zip"
              placeholder="CEP"
              widthInPixels={200}
              errors={errors?.zipCode}
              {...register('zipCode')}
            />
            <FormInput
              id="address"
              placeholder="Rua"
              errors={errors?.street}
              {...register('street')}
            />
            <div className="flex gap-3">
              <FormInput
                id="number"
                type="number"
                placeholder="Número"
                widthInPixels={200}
                errors={errors?.houseNumber}
                {...register('houseNumber')}
              />
              <FormInput
                id="address-complement"
                placeholder="Complemento"
                isOptional
                errors={errors?.complement}
                {...register('complement')}
              />
            </div>
            <div className="flex gap-3">
              <FormInput
                id="neighborhood"
                placeholder="Bairro"
                widthInPixels={200}
                errors={errors?.neighborhood}
                {...register('neighborhood')}
              />
              <FormInput
                id="city"
                placeholder="Cidade"
                errors={errors?.city}
                {...register('city')}
              />
              <FormInput
                errors={errors?.state}
                id="state"
                placeholder="UF"
                widthInPixels={60}
                {...register('state')}
              />
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
              name="Cartão de crédito"
              icon={<CreditCard size={16} className="text-brand-purple" />}
              isActive={activePaymentMethod === 'credit-card'}
              onClick={() => setActivePaymentMethod('credit-card')}
            />
            <PaymentMethodButton
              name="Cartão de débito"
              icon={<Bank size={16} className="text-brand-purple" />}
              isActive={activePaymentMethod === 'debit-card'}
              onClick={() => setActivePaymentMethod('debit-card')}
            />
            <PaymentMethodButton
              name="Dinheiro"
              icon={<Money size={16} className="text-brand-purple" />}
              isActive={activePaymentMethod === 'cash'}
              onClick={() => setActivePaymentMethod('cash')}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col w-[448px]">
        <p className="text-bold text-lg font-brand">Cafés selecionados</p>
        <div className="flex flex-col mt-[15px] gap-6 p-10 bg-brand-base-card rounded-tr-[44px] rounded-bl-[44px] rounded-tl-md rounded-br-md">
          {cartItems.map((item) => (
            <Fragment key={item.id}>
              <CoffeeCartCard
                id={item.id}
                name={item.name}
                image={item.image}
                amount={item.amount}
                price={item.price}
              />
              <div className="h-1 border-b border-b-brand-base-button"></div>
            </Fragment>
          ))}
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center text-brand-base-text">
              <span className="text-sm">Total de itens</span>
              <span className="text-base">{formatPriceToBrl(subTotal)}</span>
            </div>
            <div className="flex justify-between items-center text-brand-base-text">
              <span className="text-sm">Entrega</span>
              <span className="text-base">{formatPriceToBrl(deliveryFee)}</span>
            </div>
            <div className="flex justify-between items-center text-brand-base-subtitle font-bold text-xl">
              <span>Total</span>
              <span>{formatPriceToBrl(totalPrice)}</span>
            </div>
          </div>
          <CheckoutOrderButton
            type="submit"
            label={'Confirmar pedido'}
            disabled={isCartEmpty}
          />
        </div>
      </div>
    </form>
  )
}
