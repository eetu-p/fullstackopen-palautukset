const Notification = ({ notification }) => {
  if (notification) return (
    <div 
      className="notification" 
      style={{
        borderColor: (notification.isError ? "red" : "green"), 
        backgroundColor: (notification.isError ? "lightpink" : "darkseagreen")
      }}
    >
      {notification.message}
    </div>
  )
}

export default Notification