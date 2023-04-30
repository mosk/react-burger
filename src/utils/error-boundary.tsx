import React, { Component, ErrorInfo, FC, ReactNode, useEffect, useState } from "react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

const Timer: FC = () => {
  const [counter, setCounter] = useState(10);

  useEffect(() => {
    const interval = setInterval(() => {
      if (counter > -100) {
        setCounter(counter - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [counter]);

  return <span className="text text_type_digits-large">{counter}</span>;
};

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <h1
          className="text text_type_main-large"
          style={{
            display: "block",
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "auto",
            margin: "0",
            textAlign: "center",
            transform: "translate(-50%, -50%)",
          }}
        >
          Что-то не работает :( <br />
          <br />
          Начинаем обратный отсчёт до&nbsp;самоликвидации: <br />
          <br />
          <Timer />
        </h1>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
