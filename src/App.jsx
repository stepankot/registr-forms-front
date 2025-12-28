import { useState } from 'react'
import RegisterPageWoYup from './pages/RegisterPageWoYup'
import RegisterPageWithHookForm from './pages/RegisterPageWithHookForm'

function App() {
	const [page, setPage] = useState('first')
	return (
		<>
			{page === 'first' && <RegisterPageWoYup setPage={setPage} />}
			{page === 'second' && <RegisterPageWithHookForm setPage={setPage} />}
		</>
	)
}

export default App
