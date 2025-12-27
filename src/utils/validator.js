export const passwordValidator = password => {
	if (password.length < 8) {
		return 'Password must be atleast 8 character`s'
	}
	if (!/(?=.*[A-Za-z])/.test(password)) {
		return 'Password must contain English letters'
	}

	if (!/[A-Z]/.test(password)) {
		return 'Password must contain at least one uppercase letter'
	}

	if (!password.match(/[0-9]/)) {
		return 'Password must be contain atleast one digit'
	}
	return null
}

const correctEmails = [`gmail.com`, `mail.ru`, `yandex.ru`]

export const emailValidator = email => {
	const emailSymbol = email.indexOf('@')
	if (!emailSymbol) return 'Email is not correct `@` doesn`t exist'
	const emailAddress = email.split('@')[1]
	if (!correctEmails.some(el => el === emailAddress))
		return `E-mail must be: ${correctEmails.join(', ')}`
	return null
}

export const isCorrectPasswords = (password, confirmPassword) => {
	if (password !== confirmPassword) return 'Passwords are not equal'
	return null
}
