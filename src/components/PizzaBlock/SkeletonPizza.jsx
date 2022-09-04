import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = (props) => (
  <ContentLoader 
    className="pizza-block"
    speed={2}
    width={280}
    height={467}
    viewBox="0 0 280 467"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="130" cy="130" r="130" /> 
    <rect x="-1" y="281" rx="8" ry="8" width="280" height="26" /> 
    <rect x="0" y="324" rx="7" ry="7" width="280" height="60" /> 
    <rect x="0" y="399" rx="12" ry="12" width="90" height="40" /> 
    <rect x="123" y="400" rx="25" ry="25" width="153" height="40" />
  </ContentLoader>
)

export default MyLoader