export default function InputFieldName(props) {
	const { isError, title } = props
	return (
		<label className="fieldName">
			{title}
			<label className="errorSym">{isError ? '*' : ''}</label>
		</label>
	)
}
