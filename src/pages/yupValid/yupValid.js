import * as yup from 'yup'
const emailFieldTip = yup.string().email('Invalid email').required('Required')

const passwordFieldTip = yup
	.string()
	.min(8, 'Password must be minimum 8 characters')
	.matches(/(?=.*[A-Za-z])/, 'Password contains English letters')
	.matches(
		/[A-Z]/,
		'Password must be contain at least one capital letter required'
	)
	.matches(/[0-9]/, 'Password must contain at least one number')
	.required('Required')

export const fieldsScheme = yup.object().shape({
	email: emailFieldTip,
	password: passwordFieldTip,
	confirmPassword: yup
		.string()
		.required('Required')
		.when('password', (password, schema) => {
			if (!password) return schema

			return schema.oneOf([yup.ref('password')], 'Passwords must match')
		})
})
