/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { motion } from 'framer-motion'

import Image from 'next/image'
import { ThemeToggle } from '@/components/theme/theme-toggle'
import { useQuery } from '@tanstack/react-query'
import { getUserProfilByPseudo } from '@/actions/user-action'

import UserLinkSkeleton from './link-page-skeleton'
import { BlocVideo } from './blocs/bloc-video'
import { blocs, profilData } from '@/src/constants/user-link-data'
import { BlocUrl } from './blocs/bloc-url'
import { ProductBloc } from './blocs/product-bloc'

type Props = {
  pseudo: string,
  isPreview?: boolean
}

export default function UserLink({ pseudo, isPreview }: Props) {


  const { isLoading, data } = useQuery({
    queryKey: ['profil', pseudo],
    queryFn: async () => {
      const response = await getUserProfilByPseudo(pseudo as string);
      if (response.success) {
        return response.data;
      }
      return null;
    }
  });


  if (isLoading) {
    return <UserLinkSkeleton isPreview={isPreview} />
  }

  return (
    <div className="min-h-screen relative  flex flex-col items-center">
      <header className="absolute top-0 right-0 z-10 m-2">
        <ThemeToggle />
      </header>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`w-full max-w-lg ${!isPreview ? "sm:border md:m-4 sm:border-purple-950" : ""} sm:rounded-lg shadow-xl overflow-hidden`}
      >
        <div className="relative flex items-center justify-center mt-12">
          {/* {
            profilData?.banner &&
            <Image
              src={profilData?.banner}
              alt="Banner"
              layout="contain"
              objectFit="cover"
              className=""
              width={1000} height={100}
            />
          } */}
          {
            profilData?.image &&
            <Image
              src={profilData.image}
              alt="Profile"
              width={112}
              height={112}
              objectFit='contain'
              className={`w-20 h-20 p-2 ${!isPreview ? "sm:w-28 sm:h-28" : ""} rounded-full mb-2 border border-white  shadow-lg  `}
            />
          }
        </div>
        <div className={`p-2 text-center mt-4 ${!isPreview ? "md:p-4  " : ""}`}>
          <div className="">
            <h1 className="text-xl font-bold mb-3 ">{profilData.pseudo}</h1>
            <p className="text-base p-2 text-muted-foreground leading-5 text-justify mb-4">{profilData.description}</p>

            <motion.div
              className="flex justify-center space-x-1 mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {profilData.socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${link.color} p-2 rounded-full hover:opacity-80 transition-opacity duration-200`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {
                    link.icon ?
                      <link.icon /> : null
                  }
                </motion.a>
              ))}
            </motion.div>

            <div className="space-y-10">
              {blocs.map((bloc, blocIndex) => (
                <motion.div
                  key={blocIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: blocIndex * 0.1 }}
                >
                  <h2 className="text-lg font-semibold underline mb-2">{bloc.name}</h2>
                  <div className="space-y-4">
                    {bloc.subBlocs && bloc.subBlocs.map((subBloc, subBlocIndex) => {

                      return (
                        <>
                          {
                            subBloc.type === "VIDEO" &&
                            <BlocVideo subBloc={subBloc} />
                          }
                          <motion.div
                            key={subBlocIndex}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {
                              subBloc.type === "URL" &&
                              <BlocUrl subBloc={subBloc} />
                            }
                          </motion.div>
                        </>
                      )
                    }
                    )}
                    {
                      bloc.products && 
                        <ProductBloc products={bloc.products}/>
                    }
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

