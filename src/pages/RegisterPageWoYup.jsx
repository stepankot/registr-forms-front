import { useState, useEffect, useRef } from 'react'
import * as validator from '../utils/validator'
import InputFieldName from '../components/inputFieldName'

const initialState = {
	email: '',
	password: '',
	confirmPassword: ''
}

export default function RegisterPageWoYup() {
	const [formData, setFormData] = useState(initialState)
	const [validationError, setValidationError] = useState(null)
	const registerButtonRef = useRef()

	const onSubmit = event => {
		event.preventDefault()
		if (!(formData.email && formData.password && formData.confirmPassword)) {
			return setValidationError({
				error: 'Full all fields',
				email: 'email',
				password: 'password',
				confirmPassword: 'confirmPassword'
			})
		}
		console.log(formData)
		setValidationError(null)
		setFormData(initialState)
	}

	const handleValidation = () => {
		const emailError = validator.emailValidator(formData.email)
		const passwordError = validator.passwordValidator(formData.password)
		const confirmPasswordErros = validator.isCorrectPasswords(
			formData.password,
			formData.confirmPassword
		)
		if (emailError)
			return setValidationError({ email: 'email', error: emailError })
		if (passwordError)
			return setValidationError({
				password: 'password',
				error: passwordError
			})
		if (confirmPasswordErros)
			return setValidationError({
				confirmPassword: 'confirmPassword',
				error: confirmPasswordErros
			})
		setValidationError(null)
	}

	const handleInputChange = ({ target }) => {
		setFormData({ ...formData, [target.name]: target.value })
	}

	useEffect(() => {
		if (formData.email) {
			handleValidation()
		}
	}, [formData])

	return (
		<div className="page">
			<div className="register-container">
				<form
					className="form-group"
					onSubmit={onSubmit}
				>
					<div className="field">
						<InputFieldName
							title="E-mail"
							isError={validationError?.email}
						/>
						<input
							className={validationError?.email ? 'errorField' : ''}
							placeholder="example@mail.com"
							name="email"
							type="email"
							onChange={handleInputChange}
							value={formData.email}
						/>
					</div>
					<div className="field">
						<InputFieldName
							title="Password"
							isError={validationError?.password}
						/>
						<input
							className={validationError?.password ? 'errorField' : ''}
							name="password"
							type="password"
							placeholder="Password"
							onChange={handleInputChange}
							value={formData.password}
						/>
					</div>
					<div className="field">
						<InputFieldName
							title="Confirm Password"
							isError={validationError?.confirmPassword}
						/>
						<input
							className={validationError?.confirmPassword ? 'errorField' : ''}
							name="confirmPassword"
							type="password"
							onChange={handleInputChange}
							value={formData.confirmPassword}
							placeholder="Password"
						/>
					</div>
					<button
						type="submit"
						ref={registerButtonRef}
						disabled={validationError}
					>
						Register
					</button>
				</form>
			</div>
			<div className="errorBlock">{validationError?.error}</div>
		</div>
	)
}
