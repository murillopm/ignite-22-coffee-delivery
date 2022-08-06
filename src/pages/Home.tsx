import { useContext, useEffect } from 'react'
import { Coffee, Package, ShoppingCart, Timer } from 'phosphor-react'
import axios from 'axios'

import { BannerImg } from '../components/Buttons/Images/BannerImg'
import { CoffeeCard } from '../components/CoffeeCard'
import { CoffeeCartContext } from '../contexts/CoffeeCartContext'

export function Home() {
  const { coffeeList, currentLocation } = useContext(CoffeeCartContext)

  useEffect(() => {
    async function getAddress() {
      const response =
        await axios.get(`https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json
    ?apiKey=2Cw2fYs8TE6hWaScfDTsHbTpjVfDLIzAVo6HXkE591g
    &mode=retrieveAddresses
    &prox=41.8842,-87.6388,250`)
      console.log(response)
    }
    getAddress()
  }, [])

  return (
    <div className="w-full flex flex-col">
      <div className="h-[544px] px-40 py-[92px] flex items-center justify-between gap-14 bg-[url('/bannerBackground.svg')]">
        <div>
          <h1 className="font-brand font-extrabold text-5xl text-brand-base-title">
            Encontre o café perfeito para qualquer hora do dia
          </h1>
          <p className="mt-4 text-xl text-brand-base-subtitle">
            Com o Coffee Delivery você recebe seu café onde estiver, a qualquer
            hora
          </p>
          <div className="mt-16 flex items-center gap-10 flex-wrap text-brand-base-text">
            <div className="flex items-center gap-3 min-w-[232px]">
              <span className="w-8 h-8 flex items-center justify-center bg-brand-yellow-dark rounded-full text-brand-background">
                <ShoppingCart weight="fill" size={16} />
              </span>
              Compra simples e segura
            </div>
            <div className="flex items-center gap-3 min-w-[232px]">
              <span className="w-8 h-8 flex items-center justify-center bg-brand-base-text rounded-full text-brand-background">
                <Package weight="fill" size={16} />
              </span>
              Embalagem mantém o café intacto
            </div>
            <div className="flex items-center gap-3 min-w-[232px]">
              <span className="w-8 h-8 flex items-center justify-center bg-brand-yellow rounded-full text-brand-background">
                <Timer weight="fill" size={16} />
              </span>
              Entrega rápida e rastreada
            </div>
            <div className="flex items-center gap-3 min-w-[232px]">
              <span className="w-8 h-8 flex items-center justify-center bg-brand-purple rounded-full text-brand-background">
                <Coffee weight="fill" size={16} />
              </span>
              O café chega fresquinho até você
            </div>
          </div>
        </div>
        <span>
          <BannerImg />
        </span>
      </div>
      <div className="pt-8 px-40">
        <h2 className="text-[32px] font-brand font-extrabold">Nossos cafés</h2>
        <div className="mt-[54px] mb-36 w-full flex flex-wrap items-center gap-8">
          {coffeeList.map((coffee) => (
            <CoffeeCard
              key={coffee.id}
              id={coffee.id}
              name={coffee.name}
              description={coffee.description}
              image={coffee.image}
              labels={coffee.labels}
              price={coffee.price}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
