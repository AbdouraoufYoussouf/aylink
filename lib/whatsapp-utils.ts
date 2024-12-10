
import { redirect } from 'next/navigation'

export async function sendWhatsAppMessage(formData: FormData) {
    const name = formData.get('name') as string
    const phone = formData.get('phone') as string
    const message = formData.get('message') as string

    const personalizedMessage = `Bonjour ${name}, merci pour votre message : "${message}". Nous vous contacterons bientôt.`

    try {
        const response = await fetch(`https://graph.facebook.com/v17.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                messaging_product: 'whatsapp',
                to: phone,
                type: 'text',
                text: { body: personalizedMessage },
            }),
        })

        if (!response.ok) {
            throw new Error('Failed to send WhatsApp message')
        }

        console.log('WhatsApp message sent successfully')
        redirect('/thank-you') // Redirigez vers une page de remerciement
    } catch (error) {
        console.error('Error sending WhatsApp message:', error)
        // Gérez l'erreur (par exemple, redirigez vers une page d'erreur ou affichez un message à l'utilisateur)
    }
}


export function getWhatsAppLink(whatsappNumber: string, message: string): string {
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message.trim())}`;
}