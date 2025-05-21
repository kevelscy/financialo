import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { esMX } from '@clerk/localizations'

export const AuthProvider = ({ children }) => {
  return (
    <ClerkProvider
      localization={{
        ...esMX,
        formFieldLabel__emailAddress_username: 'Correo o nombre de usuario',
        formFieldInputPlaceholder__emailAddress_username: 'Ingrese un correo o un nombre de usuario',
        badge__activePlan: 'Activo',
        formFieldLabel__firstName: 'Nombre',
        formFieldLabel__lastName: 'Apellido',
        formFieldInputPlaceholder__phoneNumber: 'Ingrese su numero telefónico',
        badge__upcomingPlan: 'Próximo',
        formFieldInputPlaceholder__firstName: 'Nombre',
        formFieldInputPlaceholder__lastName: 'Apellido',
        formFieldLabel__username: 'Nombre de usuario',
        formFieldLabel__phoneNumber: 'Numero de teléfono',
        signUp: {
          ...esMX.signUp,
          continue: {
            ...esMX.signUp.continue,
            title: 'Rellene los campos faltantes',
            subtitle: 'Por favor, complete los datos restantes para continuar.',
          },
        },
        commerce: {
          ...esMX.commerce,
          reSubscribe: 'Re-Subscribirse',
          billedAnnually: 'Pago anual',
          month: 'Mensual',
          subscribe: 'Subscribirse',
          alwaysFree: 'Siempre gratis',
          switchPlan: 'Cambiar a este plan',
          checkout: {
            ...esMX.commerce.checkout,

            perMonth: 'Por mes',
            downgradeNotice: 'Mantendrás tu suscripción actual y sus funciones hasta el final del ciclo de facturación, luego serás cambiado a esta suscripción.',

            title__paymentSuccessful: 'Pago realizado con exito!',
            description__paymentSuccessful: 'Tu nueva suscripción está lista.', // TODO
            title__subscriptionSuccessful: 'Subscripción exitosa!',

            lineItems: {
              ...esMX.commerce.checkout.lineItems,
              title__totalPaid: 'Total pagado',
              title__paymentMethod: 'Metodo de pago'
            }
          }
        },
        userProfile: {
          ...esMX.userProfile,

          emailAddressPage: {
            ...esMX.userProfile.emailAddressPage,
            formHint: 'Necesitará verificar esta dirección de correo electrónico antes de poder agregarla a su cuenta.'
          },

          billingPage: {
            ...esMX.userProfile.billingPage,

            title: 'Subscripción',
            start: {
              ...esMX.userProfile.billingPage.start,

              headerTitle__statements: 'Declaraciones',
              headerTitle__subscriptions: 'Subscripción',

              headerTitle__plans: 'Planes',
            },
            paymentSourcesSection: {
              ...esMX.userProfile.billingPage.paymentSourcesSection,

              title: 'Metodos de pago',
              add: 'Agregar nuevo metodo de pago',
              addSubtitle: 'Añade un nuevo método de pago a tu cuenta.',
            },
            subscriptionsListSection: {
              ...esMX.userProfile.billingPage.subscriptionsListSection,

              title: 'Subscripción',
              actionLabel__switchPlan: 'Cambiar de plan'
            }
          },
          navbar: {
            ...esMX.userProfile.navbar,
            billing: 'Subscripción'
          }
        }
      }}
      appearance={{
        baseTheme: dark
      }}
    >
      {children}
    </ClerkProvider>
  )
}