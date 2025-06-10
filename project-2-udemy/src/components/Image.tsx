interface Iprops {
    imgURL: string;
    alt: string;
    className: string;
}
function Image({imgURL, alt, className}: Iprops) {
  return (
    <img src={imgURL} alt={alt} className={className} />
  )
}

export default Image