import React from 'react'
import FallbackUi from './FallbackUi'

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false, error: null}
    }

    static getDerivedStateFromError(error) {
        return { hasError: true }
    }

    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo)
    }

    render() {
        if (this.state.hasError) {
            return <FallbackUi error={this.state.error} />
        }
        return this.props.children
    }
}

export default ErrorBoundary