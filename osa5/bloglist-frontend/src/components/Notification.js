import PropTypes from 'prop-types'

const Notification = ({ notification }) => {
  if (notification) return (
    <div
      className="notification"
      id="notification"
      style={{
        borderColor: (notification.isError ? 'red' : 'green'),
        backgroundColor: (notification.isError ? 'lightpink' : 'darkseagreen')
      }}
    >
      {notification.message}
    </div>
  )
}

Notification.propTypes = {
  notification: PropTypes.object
}

export default Notification