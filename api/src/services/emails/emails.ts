import type { QueryResolvers, MutationResolvers } from 'types/graphql'
import { Email } from 'src/mailer/templates/react/emails/email'

import { resend } from 'src/mailer/clients/resend'

import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'

export const emails: QueryResolvers['emails'] = () => {
  return db.email.findMany()
}

export const email: QueryResolvers['email'] = ({ id }) => {
  return db.email.findUnique({
    where: { id },
  })
}

export const createEmail: MutationResolvers['createEmail'] = async ({
  input,
}) => {
  try {
    const emailData = await sendEmail({ input })

    logger.debug(emailData, 'sent email')

    return db.email.create({
      data: emailData,
    })
  } catch (error) {
    throw new Error(error)
  }
}

export const sendEmail: MutationResolvers['createEmail'] = async ({
  input,
}) => {
  try {
    const from = 'RedwoodJS Mailer Service <onboarding@resend.dev>'
    const to = input.to || 'delivered@resend.dev'
    const subject = 'hello world from RedwoodJS'

    logger.debug({ from, to, subject }, 'sending email')

    const data = await resend.emails.send({
      from,
      to,
      subject,
      react: Email(subject),
    })

    const emailData = { from, to, subject, resendId: data.id }

    logger.debug(emailData, 'sent email')

    return emailData
  } catch (error) {
    throw new Error(error)
  }
}
