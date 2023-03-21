# Backend functionalities

## Password recovery

**Functional requirement's**

- User should be able to recover your password providing your e-mail
- User must receive an email with password recover instructions
- User should be able to reset your password

**Non functional requirement's**

- Use mailtrap to test e-mailing in dev enviroment
- Use Amazon SES for e-mailing in production
- The e-mailing should happend in the background

**Business rules**

- The link sended to the user must expire in 2 hours
- The user must confirm your password when reseting it

## Profile update

**Functional requirement's**

- User should be able to update your name, email and password

**Business rules**

- User can't change your e-mail to one already used
- To update your password the user must inform your old password
- To update your password the user must confirm your new password

## Provider's painel

**Functional requirement's**

- User should be able to list your appointments by a specific day
- The provider must receive a notification when new appointments have benn made
- The provider should be able to see the missed notifications

**Non functional requirement's**

- The provider's appointments in the actual day must be stored in cache
- The provider's notification must be stored in MongoDB
- The provider's notification  must be sended in real time using Socket.io

**Business rules**

- Notification need to have a status of read or not to the provider can controle it

## Appointment's services

**Functional requirement's**

- User should be able to get all the register services provider
- User should be able to list the days of the month with at least one available time of a provider
- User should be able to list the available time in a specific day of the provider
- User should be able to schedule a new appointment with the provider

**Non functional requirement's**

- The list of providers should be stored in cache

**Business rules**

- Every appointment must last exact one hour
- The appointments must be open for schedule between 8h and 17h
- User can't make an appointment at an already busy time 
- User can't make an appointment at a time that already passed
- User cant make an appointment with yourself
-  
