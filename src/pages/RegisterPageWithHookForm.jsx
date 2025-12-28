import { useState, useEffect, useRef } from 'react'
import InputFieldName from '../components/inputFieldName'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { fieldsScheme } from './yupValid/yupValid'

const initialValues = {
	email: '',
	password: '',
	confirmPassword: ''
}

export default function RegisterPageWithHookForm({ setPage }) {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm({
		defaultValues: initialValues,
		resolver: yupResolver(fieldsScheme)
	})

	const sumbitBtnRef = useRef(null)

	const onSubmit = formData => {
		console.log(formData)
		reset()
	}

	const isError = Object.keys(errors).length > 0
	if (!isError) sumbitBtnRef.current?.focus()
	return (
		<div className="page">
			<button
				className="move"
				onClick={() => setPage('first')}
			>
				Move to Register Form Without Yup
			</button>
			<div className="register-container second">
				<form
					className="form-group"
					onSubmit={handleSubmit(onSubmit)}
				>
					<div className="field">
						<InputFieldName
							title="E-mail"
							isError={errors.email}
						/>
						<input
							className={errors.email ? 'errorField' : ''}
							placeholder="example@mail.com"
							name="email"
							type="text"
							{...register('email')}
						/>
					</div>
					<div className="field">
						<InputFieldName
							title="Password"
							isError={errors.password}
						/>
						<input
							className={errors.password ? 'errorField' : ''}
							name="password"
							type="password"
							placeholder="Password"
							{...register('password')}
						/>
					</div>
					<div className="field">
						<InputFieldName
							title="Confirm Password"
							isError={errors.confirmPassword}
						/>
						<input
							className={errors.confirmPassword ? 'errorField' : ''}
							name="confirmPassword"
							type="password"
							placeholder="Password"
							{...register('confirmPassword')}
						/>
					</div>
					<button
						type="submit"
						disabled={isError}
						ref={sumbitBtnRef}
					>
						Register
					</button>
				</form>
			</div>
			<div className="errorBlock">
				{errors.email?.message ||
					errors.password?.message ||
					errors.confirmPassword?.message}
			</div>
		</div>
	)
}
