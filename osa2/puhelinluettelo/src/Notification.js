const Notification = ({ message, isError }) => {
  if (message) return (
    <div className="notification" style={{borderColor: (isError ? "red" : "green"), backgroundColor: (isError ? "lightpink" : "darkseagreen")}}>
      <p>{message}</p>
    </div>
  )
}

export default Notification