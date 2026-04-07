import React, { useEffect, useState } from 'react'

type input = {
    children: React.ReactNode
}

const MoveUp = ({children}: input) => {
  const [active, setActive] = useState(false);

    useEffect(() => {
      setActive(true);
    }, []);
  return (
    <div className={`transform ${active ? 'translate-y-0 delay-100' : 'translate-y-20'} transition-transform duration-1000 ease-in-out`}>
      {children}
    </div>
  )
}

export default MoveUp;