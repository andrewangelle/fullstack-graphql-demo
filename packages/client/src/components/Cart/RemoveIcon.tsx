import React, { useCallback, useState } from 'react';
import { Mutation } from 'react-apollo';

import { removeCartItem } from 'store/';

function RemoveIcon(item: any) {
  const [isHovering, setHover] = useState(false)

  const toggleHover = useCallback(() =>
    setHover(!isHovering),
    [isHovering]
  )

  return (
    <Mutation
      mutation={removeCartItem}
      variables={{ item }}
    >
      {removeCartItem =>
        <h4
          onClick={() => removeCartItem(item)}
          onMouseEnter={toggleHover}
          onMouseLeave={toggleHover}
          style={isHovering ? ({
            color: 'red',
            cursor: 'pointer'
          }) : {}}
        >
          X
        </h4>
      }
    </Mutation>
  )
}

export { RemoveIcon }