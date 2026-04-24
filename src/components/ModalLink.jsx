import { useModal } from '../context/ModalContext'
import { isModalLink } from '../utils/linkUtils'

const ModalLink = ({ link, children, onClick, className, ...props }) => {
  const { openFromLink } = useModal()

  if (!link || link === '#' || link.trim() === '') {
    return <span className={className} {...props}>{children}</span>
  }

  const handleClick = (e) => {
    e.preventDefault()
    if (onClick) onClick(e)
    if (isModalLink(link)) {
      openFromLink(link)
    }
  }

  return (
    <a href={link} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  )
}

export default ModalLink